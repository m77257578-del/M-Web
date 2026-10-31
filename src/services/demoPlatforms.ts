// Service for managing live interactive demo platforms, pricing tiers (monthly, annual, lifetime),
// features, and multi-format media (local device upload or external YouTube/video links).

export interface PlatformMedia {
  id: string;
  type: 'image' | 'video' | 'youtube';
  url: string; // Base64 data URL if uploaded, or external URL
  title?: string;
  isUploaded?: boolean;
}

export interface PlatformPricing {
  monthly: number;   // اشتراك شهري
  annual: number;    // اشتراك سنوي
  lifetime: number;  // تمليك دائم بكامل السورس كود
  currency: string;  // e.g. '$' | 'ر.س'
  monthlyNote?: string;
  annualNote?: string;
  lifetimeNote?: string;
}

export interface DemoPlatform {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  liveDemoUrl: string;
  badge?: string;
  pricing: PlatformPricing;
  features: string[];
  techStack: string[];
  media: PlatformMedia[];
  thumbnail: string;
  clientTarget?: string;
  createdAt: string;
}

const STORAGE_KEY = 'webrex_demo_platforms_v1';

export const DEFAULT_DEMO_PLATFORMS: DemoPlatform[] = [
  {
    id: 'demo-lms-academy',
    title: 'منصة "أكاديميكس برو" للتعليم والتدريب الذكي',
    subtitle: 'حل برمجي سحابي شامل للمدرسين، الأكاديميات ومراكز التدريب مع حماية المحتوى',
    category: 'منصات تعليمية وإدارية',
    badge: 'الأكثر طلباً للأكاديميات',
    description: 'نظام إدارة تعلم (LMS) متكامل ومصمم بتقنيات حديثة لحماية الفيديوهات من التسجيل، يشمل بنك أسئلة ذكي، امتحانات بتصحيح آلي، شهادات رقمية مشفرة، وبوابات دفع إلكترونية متعددة مع اشتراكات شهرية وسنوية للطلاب.',
    liveDemoUrl: 'https://nextjs.org',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
    pricing: {
      monthly: 49,
      annual: 450,
      lifetime: 1450,
      currency: '$',
      monthlyNote: 'يشمل الاستضافة السحابية والصيانة الشهرية والتحديثات المستمرة',
      annualNote: 'توفير شهرين مجاناً + نطاق مجاني + نسخ احتياطي يومي',
      lifetimeNote: 'تمليك دائم، نقل كامل للسورس كود وقواعد البيانات، ترخيص تجاري غير مقيد'
    },
    features: [
      'مشغل فيديو مشفر ضد برامج تصوير الشاشة مع علامات مائية ديناميكية',
      'بنك أسئلة تفاعلي يولد نماذج اختبارات متغيرة لكل طالب تلقائياً',
      'بوابات دفع إلكترونية مدمجة (فيزا، ماستركارد، مدى، محافظ رقمية)',
      'لوحة تحكم إدارية منفصلة للمدرس، المساعدين، والطلاب وأولياء الأمور',
      'نظام إصدار شهادات إتمام رقمية مع كود QR للتحقق السريع',
      'تطبيق ويب تقدمي (PWA) يعمل كالموبايل وسريع التحميل'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Cloudflare Stream', 'Stripe & Fawry API'],
    media: [
      {
        id: 'm1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
        title: 'واجهة المنصة الرئيسية واللوحة التفاعلية'
      },
      {
        id: 'm2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        title: 'شاشة الدروس التفاعلية ومشغل الفيديو المشفر'
      },
      {
        id: 'm3',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'جولة تفصيلية داخل لوحة التحكم والامتحانات الذكية'
      }
    ],
    clientTarget: 'المدرسون الخصوصيون، المعاهد والمدارس، صناع المحتوى التعليمي',
    createdAt: '2024-10-15'
  },
  {
    id: 'demo-ecommerce-multivendor',
    title: 'منصة "ريكس كارت إكستريم" للتجارة الإلكترونية المتعددة',
    subtitle: 'متجر سحابي فائق السرعة يدعم البيع المباشر والمتاجر المتعددة وتتبع الشحنات',
    category: 'متاجر إلكترونية وحلول تجزئة',
    badge: 'سرعة استجابة 99/100',
    description: 'منصة بيع وتجارة إلكترونية برمجية حديثة تمنحك استقلالية تامة عن منصات الاشتراكات المغلقة. إدارة متقدمة للمخزون والفروع، فواتير ضريبية، ربط مع شركات الشحن، وسلة شراء بنقرة واحدة.',
    liveDemoUrl: 'https://vitejs.dev',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    pricing: {
      monthly: 59,
      annual: 590,
      lifetime: 1850,
      currency: '$',
      monthlyNote: 'دعم فني واستضافة سريعة على سيرفرات سحابية مخصصة',
      annualNote: 'خصم 20% + دومين احترافي + تهيئة SEO كاملة مجاناً',
      lifetimeNote: 'كود سورس كامل بدون أي عمولة على المبيعات مدى الحياة'
    },
    features: [
      'سلة تسوق وشراء بنقرة واحدة (One-Step Checkout) لرفع التحويلات',
      'ربط تلقائي مع بوابات الدفع (Tabby, Tamara, Moyasar, PayTabs, Visa)',
      'نظام إدارة مخزون دقيق يدعم تعدد الفروع والمستودعات والباركود',
      'فواتير إلكترونية متوافقة مع متطلبات هيئة الزكاة والضريبة (ZATCA)',
      'محرك كوبونات وتخفيضات ذكي وإشعارات العروض التلقائية',
      'تطبيق ويب خفيف جداً يفتح في أقل من ثانية واحدة'
    ],
    techStack: ['React', 'Fastify / Node.js', 'Redis', 'PostgreSQL', 'TailwindCSS', 'Algolia Search'],
    media: [
      {
        id: 'm4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
        title: 'واجهة المتجر العصرية المتوافقة مع كافة الشاشات'
      },
      {
        id: 'm5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        title: 'لوحة إدارة المنتجات والمخزون والطلبات الواردة'
      }
    ],
    clientTarget: 'العلامات التجارية، تجار التجزئة، الموزعون وأصحاب المتاجر',
    createdAt: '2024-10-20'
  },
  {
    id: 'demo-erp-cloudflow',
    title: 'نظام "ريكس فلو ERP" السحابي لإدارة الشركات والمالية',
    subtitle: 'نظام مؤسسي متكامل لإدارة الحسابات، الموارد البشرية، الفواتير والمخازن',
    category: 'أنظمة إدارة المؤسسات والشركات',
    badge: 'نظام معتمد ومطابق للمعايير',
    description: 'نظام ERP سحابي مبني لربط كافة أقسام شركتك في واجهة موحدة. يشمل الحسابات العامة، الأصول، فواتير المبيعات والمشتريات، كشوف الرواتب، وتقارير أرباح وخسائر لحظية بالذكاء التحليلي.',
    liveDemoUrl: 'https://tailwindcss.com',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    pricing: {
      monthly: 79,
      annual: 790,
      lifetime: 2400,
      currency: '$',
      monthlyNote: 'تحديثات دورية، دعم 24/7، نسخ احتياطي يومي مشفر',
      annualNote: 'تخصيص مجاني لشعار وهوية الشركة + تدريب لفريق العمل',
      lifetimeNote: 'ترخيص كامل غير محدود للمستخدمين، وتثبيت على سيرفر العميل الخاص'
    },
    features: [
      'دليل حسابات شجري مرن، قيود يومية آلية، وتقارير ميزانية عمومية لحظية',
      'إدارة متقدمة للموظفين والحضور والإجازات ومسيرات الرواتب',
      'ربط كامل بين المبيعات، المشتريات، وحركة المستودعات تلقائياً',
      'صلاحيات وصول دقيقة حسب الرتب والمسؤوليات (RBAC)',
      'لوحات بيانات ورسوم بيانية تفاعلية تساعد الإدارة على اتخاذ القرار',
      'تصدير فوري للتقارير بصيغ PDF, Excel مع ختم رقمي'
    ],
    techStack: ['React', 'Express / Node.js', 'PostgreSQL', 'Docker', 'Chart.js', 'TailwindCSS'],
    media: [
      {
        id: 'm6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        title: 'اللوحة المالية الشاملة والمؤشرات التنفيذية'
      },
      {
        id: 'm7',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        title: 'إدارة دورة المبيعات والمشتريات والفواتير'
      }
    ],
    clientTarget: 'الشركات المتوسطة والصغيرة، المكاتب المهنية، المصانع والمؤسسات',
    createdAt: '2024-10-25'
  },
  {
    id: 'demo-medical-care',
    title: 'منصة "ريكس كلينك برو" لحجز العيادات والمراكز الطبية',
    subtitle: 'إدارة مواعيد المرضى، الملفات الطبية، الفحوصات والوصفات الإلكترونية',
    category: 'منصات طبية وصحية',
    badge: 'حماية وتشفير بيانات المرضى',
    description: 'نظام طبي رقمي شامل يسهل على المرضى حجز المواعيد واختيار الأطباء والاطلاع على نتائج التحاليل، ويوفر للأطباء ملفات طبية إلكترونية متكاملة مع إمكانية طباعة الروشتات وكتابة التقارير.',
    liveDemoUrl: 'https://lucide.dev',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    pricing: {
      monthly: 45,
      annual: 430,
      lifetime: 1350,
      currency: '$',
      monthlyNote: 'رسائل واتساب تلقائية لتذكير المرضى بمواعيدهم',
      annualNote: 'توفير شهرين مجاناً + دعم فني مباشر واستضافة سريعة',
      lifetimeNote: 'سورس كود كامل، ملكية حرة بدون قيود وتركيب على سيرفرك'
    },
    features: [
      'حجز مواعيد أونلاين وتأكيد فوري مع إرسال تذكير عبر واتساب',
      'سجل طبي إلكتروني موحد لكل مريض يشمل التاريخ المرضي والأشعات',
      'وصفات طبية إلكترونية قابلة للطباعة وتتبع صرف الأدوية',
      'إدارة أطباء متعددين، غرف الكشف، والورديات وجداول العمل',
      'إدارة الفواتير والتحصيل ونسب الأطباء وشركات التأمين الصحي',
      'واجهة سهلة الاستخدام تناسب موظفي الاستقبال والمرضى من الموبايل'
    ],
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Twilio/WhatsApp API'],
    media: [
      {
        id: 'm8',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        title: 'واجهة حجز المواعيد وجدول الأطباء'
      }
    ],
    clientTarget: 'العيادات والمجمعات الطبية، المعامل، المراكز العلاجية المتخصصة',
    createdAt: '2024-10-28'
  }
];

let cachedPlatforms: DemoPlatform[] | null = null;

export const getDemoPlatforms = (): DemoPlatform[] => {
  if (cachedPlatforms) return cachedPlatforms;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      cachedPlatforms = DEFAULT_DEMO_PLATFORMS;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_PLATFORMS));
      return DEFAULT_DEMO_PLATFORMS;
    }
    const parsed = JSON.parse(data);
    cachedPlatforms = Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEMO_PLATFORMS;
    return cachedPlatforms;
  } catch (err) {
    console.error('Error reading demo platforms from localStorage:', err);
    return DEFAULT_DEMO_PLATFORMS;
  }
};

export const saveDemoPlatforms = (platforms: DemoPlatform[]): void => {
  cachedPlatforms = platforms;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(platforms));
  } catch (err) {
    console.error('Error saving demo platforms to localStorage:', err);
    // In production, you'd handle this better (e.g., clear old items, alert user)
  }
};

export const addDemoPlatform = (platform: Omit<DemoPlatform, 'id' | 'createdAt'>): DemoPlatform => {
  const current = getDemoPlatforms();
  const newPlatform: DemoPlatform = {
    ...platform,
    id: `demo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [newPlatform, ...current];
  saveDemoPlatforms(updated);
  return newPlatform;
};

export const updateDemoPlatform = (id: string, updates: Partial<DemoPlatform>): boolean => {
  const current = getDemoPlatforms();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) return false;
  current[index] = { ...current[index], ...updates };
  saveDemoPlatforms(current);
  return true;
};

export const deleteDemoPlatform = (id: string): boolean => {
  const current = getDemoPlatforms();
  const filtered = current.filter(p => p.id !== id);
  if (filtered.length === current.length) return false;
  saveDemoPlatforms(filtered);
  return true;
};

export const resetDemoPlatforms = (): DemoPlatform[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_PLATFORMS));
  return DEFAULT_DEMO_PLATFORMS;
};
