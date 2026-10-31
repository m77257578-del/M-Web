// Service for managing published client projects (أعمال ومشاريع برمجية لعملاء تم نشرها)

export interface ClientProject {
  id: string;
  title: string;              // اسم المنصة / النظام
  clientName: string;         // اسم العميل أو المؤسسة
  industry: string;           // مجال العمل (طبي، تجزئة، لوجستيات، تعليم...)
  location: string;           // الدولة / المدينة (e.g. الرياض، دبي، القاهرة...)
  completionDate: string;     // تاريخ الإطلاق والتدشين
  liveUrl: string;            // رابط المنصة الحية المنشورة
  thumbnail: string;          // صورة المشروع الحية (رابط أو Base64 مرفوع من الجهاز)
  videoUrl?: string;          // فيديو توضيحي أو رابط يوتيوب لقصة نجاح العميل
  gallery?: { type: 'image' | 'video' | 'youtube'; url: string; title?: string }[]; // معرض صور وفيديوهات إضافية
  description: string;        // التحدي والحل البرمجي المبتكر
  results: string[];          // نتائج الأعمال والأرقام المحققة (e.g. "+120 ألف مستخدم", "سرعة 0.7 ثانية")
  technologies: string[];     // حزمة التقنيات المستخدمة
  testimonial?: {
    clientPerson: string;     // اسم المسؤول
    role: string;             // منصبه
    quote: string;            // رأي العميل في العمل والتنفيذ
    rating: number;           // تقييم من 5 نجوم
  };
  isLive: boolean;            // حالة التشغيل الحية
}

const STORAGE_KEY = 'webrex_client_projects_v1';

export const DEFAULT_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'client-proj-alamal',
    title: 'منصة "أكاديمية النجاح التعليمية" للثانوية والجامعات',
    clientName: 'مؤسسة النجاح للتعليم المتميز',
    industry: 'التعليم الإلكتروني والتدريب الرقمي',
    location: 'الرياض، المملكة العربية السعودية',
    completionDate: 'سبتمبر 2024',
    liveUrl: 'https://al-najah-academy.com',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    description: 'تم تصميم وتطوير منصة تعليمية سحابية خاصة تستوعب أكثر من 40,000 طالب في آن واحد، مع نظام بث محمي بحقوق النشر، وبنك أسئلة يولد اختبارات فريدة، وربط متكامل مع شبكة سداد ومدى.',
    results: [
      'استيعاب أكثر من 45,000 طالب متزامن دون أي توقف',
      'حماية 100% من تسريب الفيديوهات عبر العلامات المائية الديناميكية',
      'زيادة معدل إتمام الدروس بنسبة 65%'
    ],
    technologies: ['React 18', 'Node.js', 'PostgreSQL', 'Redis', 'Cloudflare CDN', 'Stripe & Mada'],
    testimonial: {
      clientPerson: 'د. فيصل السبيعي',
      role: 'المدير التنفيذي للأكاديمية',
      quote: 'فريق ويب ريكس نقل الأكاديمية إلى مستوى عالمي. الحماية الفائقة لمقاطع الفيديو وسلاسة الاختبارات وتوفير مئات الآلاف من تكاليف المنصات المغلقة جعلتنا في الصدارة.',
      rating: 5
    },
    isLive: true
  },
  {
    id: 'client-proj-rawabi',
    title: 'متجر وتطبيق "روابي هايبر ماركت" للتوصيل السريع وتعدد الفروع',
    clientName: 'شركة روابي الشرق للتجارة والتوزيع',
    industry: 'التجارة الإلكترونية والتجزئة الغذائية',
    location: 'جدة، المملكة العربية السعودية',
    completionDate: 'أغسطس 2024',
    liveUrl: 'https://rawabi-hyper.com',
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    description: 'نظام تجارة إلكترونية متصل بـ 8 فروع ومستودعات مركزية. تتبع حي لمركبات التوصيل، إدارة تسعير فورية حسب الفرع الأقرب للعميل، وفواتير إلكترونية معتمدة من هيئة الزكاة.',
    results: [
      'تجهيز وتوصيل أكثر من 3,500 طلب يومياً',
      'زمن تحميل تطبيق الويب 0.6 ثانية فقط',
      'تخفيض تكلفة التشغيل بنسبة 35% عبر الأتمتة'
    ],
    technologies: ['Next.js', 'Fastify', 'PostgreSQL', 'Socket.io', 'Google Maps API', 'ZATCA E-Invoicing'],
    testimonial: {
      clientPerson: 'أ. حسام الغامدي',
      role: 'رئيس العمليات الرقمية',
      quote: 'النظام فائق السرعة، وميزة تعدد الفروع وإدارة المخزون التلقائية حلت لنا أكبر أزمة لوجستية كنا نعاني منها.',
      rating: 5
    },
    isLive: true
  },
  {
    id: 'client-proj-delta-logistics',
    title: 'نظام "دلتا كارجو" لإدارة سلاسل الإمداد والشحن الدولي',
    clientName: 'مجموعة دلتا للشحن واللوجستيات',
    industry: 'اللوجستيات والشحن وتتبع الحاويات',
    location: 'دبي، الإمارات العربية المتحدة',
    completionDate: 'يوليو 2024',
    liveUrl: 'https://delta-freight-systems.ae',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    description: 'بوابة برمجية متطورة لإدارة بوالص الشحن الجوي والبحري، حساب الرسوم الجمركية التلقائي، وتتبع الحاويات عبر الأقمار الصناعية بنظام الخرائط الحية وإشعارات الواتساب.',
    results: [
      'تتبع أكثر من 12,000 حاوية وشحنة شهرياً',
      'تقليل الأخطاء البشرية في بوالص الشحن إلى الصفر',
      'ربط API فوري مع خطوط الملاحة والموانئ'
    ],
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Docker', 'Redis', 'Marine Traffic API'],
    testimonial: {
      clientPerson: 'ك. ماجد المهيري',
      role: 'نائب رئيس مجلس الإدارة',
      quote: 'التزام ويب ريكس بالجودة والكود النظيف مكننا من منافسة كبرى شركات الشحن العالمية بأنظمة برمجية نملكها بالكامل.',
      rating: 5
    },
    isLive: true
  },
  {
    id: 'client-proj-alhayat-med',
    title: 'منظومة "مجمع الحياة الطبي" للملفات وحجز العيادات',
    clientName: 'شركة الحياة للخدمات الطبية المتقدمة',
    industry: 'الرعاية الصحية والمستشفيات',
    location: 'القاهرة، مصر',
    completionDate: 'يونيو 2024',
    liveUrl: 'https://alhayat-medcenter.com',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    description: 'ربط 24 عيادة تخصصية ومختبر تحاليل في نظام إلكتروني واحد، يتيح للمريض حجز الدور ومتابعة الانتظار من البيت واستلام نتائج التحاليل والروشتات أونلاين.',
    results: [
      'خدمة أكثر من 180,000 مريض مسجل',
      'القضاء التام على طوابير الانتظار الورقية',
      'أمان بيانات طبي وتشفير كامل وفق معايير HIPAA'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Twilio SMS & WhatsApp'],
    testimonial: {
      clientPerson: 'د. سامح عبد الرازق',
      role: 'المدير الطبي العام',
      quote: 'التطبيق سهل جداً للأطباء وموظفي الاستقبال، وأشاد به جميع المرضى لسرعته وتوفيره للوقت.',
      rating: 5
    },
    isLive: true
  }
];

export const getClientProjects = (): ClientProject[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CLIENT_PROJECTS));
      return DEFAULT_CLIENT_PROJECTS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CLIENT_PROJECTS;
  } catch (err) {
    console.error('Error reading client projects from localStorage:', err);
    return DEFAULT_CLIENT_PROJECTS;
  }
};

export const saveClientProjects = (projects: ClientProject[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving client projects to localStorage:', err);
  }
};

export const addClientProject = (project: Omit<ClientProject, 'id'>): ClientProject => {
  const current = getClientProjects();
  const newProj: ClientProject = {
    ...project,
    id: `client-proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
  };
  const updated = [newProj, ...current];
  saveClientProjects(updated);
  return newProj;
};

export const updateClientProject = (id: string, updates: Partial<ClientProject>): boolean => {
  const current = getClientProjects();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) return false;
  current[index] = { ...current[index], ...updates };
  saveClientProjects(current);
  return true;
};

export const deleteClientProject = (id: string): boolean => {
  const current = getClientProjects();
  const filtered = current.filter(p => p.id !== id);
  if (filtered.length === current.length) return false;
  saveClientProjects(filtered);
  return true;
};

export const resetClientProjects = (): ClientProject[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CLIENT_PROJECTS));
  return DEFAULT_CLIENT_PROJECTS;
};
