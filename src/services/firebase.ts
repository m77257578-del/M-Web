import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy,
  Firestore 
} from 'firebase/firestore';
import { Project, Order, FirebaseConfig } from '../types';
import { SAMPLE_PROJECTS } from '../data/sampleProjects';

const STORAGE_KEY = 'webrex_firebase_config';
const LOCAL_ORDERS_KEY = 'webrex_local_orders';

let currentApp: FirebaseApp | null = null;
let currentDb: Firestore | null = null;

// Read config from localStorage or env
export function getStoredFirebaseConfig(): FirebaseConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read stored Firebase config:', e);
  }

  // Check if env vars are present
  const envProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (envProjectId && envApiKey) {
    return {
      apiKey: envApiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${envProjectId}.firebaseapp.com`,
      projectId: envProjectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
  }

  return null;
}

export function saveStoredFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  // Reset instance to reinitialize
  currentApp = null;
  currentDb = null;
  initFirebase();
}

export function removeStoredFirebaseConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
  currentApp = null;
  currentDb = null;
}

// Initialize Firebase
export function initFirebase(): Firestore | null {
  if (currentDb) return currentDb;

  const config = getStoredFirebaseConfig();
  if (!config || !config.apiKey || !config.projectId) {
    return null;
  }

  try {
    const apps = getApps();
    currentApp = apps.length > 0 ? getApp() : initializeApp(config);
    currentDb = getFirestore(currentApp);
    return currentDb;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return null;
  }
}

export function isFirebaseConnected(): boolean {
  return initFirebase() !== null;
}

// Subscribe to 'projects' collection
export function subscribeToProjects(
  onProjectsUpdated: (projects: Project[], isLiveFromFirestore: boolean) => void
): () => void {
  const db = initFirebase();
  if (!db) {
    // If not connected, immediately provide sample projects
    onProjectsUpdated(SAMPLE_PROJECTS, false);
    return () => {};
  }

  try {
    const projectsCol = collection(db, 'projects');
    const unsubscribe = onSnapshot(
      projectsCol,
      (snapshot) => {
        if (snapshot.empty) {
          // If the Firestore collection is empty, return the rich sample projects
          onProjectsUpdated(SAMPLE_PROJECTS, false);
        } else {
          const list: Project[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || 'مشروع بدون اسم',
              description: data.description || '',
              tag: data.tag || 'مشروع ويب',
              image: data.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
              demoUrl: data.demoUrl || '#',
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt || new Date()
            };
          });
          onProjectsUpdated(list, true);
        }
      },
      (error) => {
        console.warn('Firestore projects listener error, using fallback:', error);
        onProjectsUpdated(SAMPLE_PROJECTS, false);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Could not setup Firestore snapshot listener:', err);
    onProjectsUpdated(SAMPLE_PROJECTS, false);
    return () => {};
  }
}

// Fetch projects once
export async function fetchProjects(): Promise<{ projects: Project[]; isLive: boolean }> {
  const db = initFirebase();
  if (!db) {
    return { projects: SAMPLE_PROJECTS, isLive: false };
  }

  try {
    const projectsCol = collection(db, 'projects');
    const snapshot = await getDocs(projectsCol);
    if (snapshot.empty) {
      return { projects: SAMPLE_PROJECTS, isLive: false };
    }
    const projects: Project[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || 'مشروع بدون اسم',
        description: data.description || '',
        tag: data.tag || 'مشروع ويب',
        image: data.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        demoUrl: data.demoUrl || '#',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt || new Date()
      };
    });
    return { projects, isLive: true };
  } catch (error) {
    console.warn('Error fetching projects from Firestore:', error);
    return { projects: SAMPLE_PROJECTS, isLive: false };
  }
}

// Submit order to 'orders' collection
export async function submitOrderToFirestore(orderData: {
  name: string;
  phone: string;
  details: string;
}): Promise<{ success: boolean; id?: string; mode: 'firestore' | 'local'; error?: string }> {
  // Always save locally to ensure customer never loses order data
  saveLocalOrder(orderData);

  const db = initFirebase();
  if (!db) {
    return {
      success: true,
      id: 'LOCAL-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      mode: 'local'
    };
  }

  try {
    const ordersCol = collection(db, 'orders');
    // Schema adherence: name, phone, details, timestamp
    const docRef = await addDoc(ordersCol, {
      name: orderData.name.trim(),
      phone: orderData.phone.trim(),
      details: orderData.details.trim(),
      timestamp: serverTimestamp()
    });

    return {
      success: true,
      id: docRef.id,
      mode: 'firestore'
    };
  } catch (error: any) {
    console.error('Error submitting order to Firestore:', error);
    return {
      success: false,
      mode: 'firestore',
      error: error?.message || 'حدث خطأ أثناء الاتصال بقاعدة البيانات. تم حفظ طلبك محلياً.'
    };
  }
}

// Seed sample projects directly to Firestore
export async function seedSampleProjectsToFirestore(): Promise<{
  success: boolean;
  count: number;
  error?: string;
}> {
  const db = initFirebase();
  if (!db) {
    return {
      success: false,
      count: 0,
      error: 'يرجى ربط إعدادات Firebase أولاً لتتمكن من إضافة المشاريع.'
    };
  }

  try {
    const projectsCol = collection(db, 'projects');
    let addedCount = 0;
    for (const proj of SAMPLE_PROJECTS) {
      await addDoc(projectsCol, {
        title: proj.title,
        description: proj.description,
        tag: proj.tag,
        image: proj.image,
        demoUrl: proj.demoUrl,
        createdAt: serverTimestamp()
      });
      addedCount++;
    }
    return { success: true, count: addedCount };
  } catch (error: any) {
    console.error('Error seeding sample projects:', error);
    return {
      success: false,
      count: 0,
      error: error?.message || 'تعذر إضافة المشاريع لقاعدة البيانات. تأكد من صلاحيات الكتابة.'
    };
  }
}

// Local storage orders helper
function saveLocalOrder(order: { name: string; phone: string; details: string }) {
  try {
    const existingRaw = localStorage.getItem(LOCAL_ORDERS_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift({
      ...order,
      id: 'ORD-' + Date.now(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('Could not save order locally:', e);
  }
}

export function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteLocalOrder(orderId: string): void {
  try {
    const orders = getLocalOrders().filter(o => o.id !== orderId);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.warn('Could not delete local order:', e);
  }
}

export async function addProjectToFirestore(project: {
  title: string;
  description: string;
  tag: string;
  image: string;
  demoUrl: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const db = initFirebase();
  if (!db) {
    // If not connected, save to local projects custom list
    try {
      const stored = localStorage.getItem('webrex_custom_projects');
      const list = stored ? JSON.parse(stored) : [];
      const newProj = {
        id: 'CUSTOM-' + Date.now(),
        ...project,
        createdAt: new Date().toISOString()
      };
      list.unshift(newProj);
      localStorage.setItem('webrex_custom_projects', JSON.stringify(list));
      return { success: true, id: newProj.id };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  }

  try {
    const projectsCol = collection(db, 'projects');
    const docRef = await addDoc(projectsCol, {
      title: project.title.trim(),
      description: project.description.trim(),
      tag: project.tag.trim(),
      image: project.image.trim(),
      demoUrl: project.demoUrl.trim(),
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error adding project to Firestore:', error);
    return { success: false, error: error?.message || 'تعذر إضافة المشروع لقاعدة البيانات.' };
  }
}

export function getDeveloperApplicants(): any[] {
  try {
    const raw = localStorage.getItem('webrex_developer_applicants');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteDeveloperApplicant(id: string): void {
  try {
    const list = getDeveloperApplicants().filter(a => a.id !== id);
    localStorage.setItem('webrex_developer_applicants', JSON.stringify(list));
  } catch (e) {
    console.warn(e);
  }
}
