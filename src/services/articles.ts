// Service for managing tech & programming articles/blog posts, published and edited from Admin Panel

export interface Article {
  id: string;
  title: string;            // عنوان المقال
  slug?: string;
  excerpt: string;          // مقتطف تمهيدي
  content: string;          // المحتوى الكامل للمقال (يدعم فقرات وعناوين ونقاط)
  category: string;         // تصنيف المقال (معمارية البرمجيات، أمان الويب، الأداء والسرعة، التجارة الإلكترونية، إلخ)
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  coverImage: string;       // رابط أو صورة مرفوعة Base64
  readTime: string;         // وقت القراءة التقريبي (e.g. '5 دقائق')
  tags: string[];           // الوسوم التقنية
  publishedAt: string;      // تاريخ النشر
  viewsCount?: number;      // عدد المشاهدات
  isFeatured?: boolean;     // مقال مميز
}

const STORAGE_KEY = 'webrex_articles_v1';

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'art-clean-architecture',
    title: 'كيف تبني منصة برمجية تتحمل ملايين الزيارات: أسرار المعمارية النظيفة (Clean Architecture)',
    excerpt: 'دليل عملي للمؤسسين والمهندسين حول كيفية فصل منطق الأعمال عن أطر العمل، وضمان استقرار الخوادم أثناء الضغط العالي مع تقليل التكلفة بنسبة 40%.',
    content: `عندما تطلق مشروعك البرمجي، فإن التحدي الأكبر لا يكمن في كتابة الكود ليعمل فحسب، بل في كتابة كود يستطيع التوسع والتكيف دون أن ينهار مع ازدياد المستخدمين.

في هذا المقال العملي، نستعرض المبادئ الأساسية التي نتبعها في منصة WebRex لبناء منصات وتطبيقات ويب سحابية فائقة القوة:

1. فصل طبقات النظام (Decoupled Layered Architecture):
يجب ألا تعتمد قواعد البيانات ومكتبات العرض الخارجية بشكل مباشر على جوهر منطق الأعمال (Core Domain Logic). هذا يسمح بتغيير قاعدة البيانات أو المزود السحابي دون الحاجة لإعادة كتابة النظام من الصفر.

2. استراتيجيات التخزين المؤقت الذكي (Intelligent Caching):
استخدام Redis للتخزين المؤقت للبيانات المتكررة يقلل الضغط على قواعد البيانات العلائقية مثل PostgreSQL بنسبة تفوق 75%، مما يمنح النظام سرعة استجابة مذهلة تقل عن 80 مللي ثانية.

3. معالجة المهام الخلفية غير المتزامنة (Background Jobs & Queues):
المهام الثقيلة مثل معالجة الفيديوهات، توليد الفواتير الضريبية، وإرسال إشعارات الواتساب والبريد يجب أن تُنفذ عبر صفوف معالجة مستقلة (Message Queues) لضمان عدم تجميد واجهة المستخدم لحظة النقر.

4. المراقبة والحماية الاستباقية:
تتبع الأخطاء لحظياً وحماية نقاط الدخول ضد هجمات DDoS ومحاولات الحقن عبر طبقات حماية سحابية مشفرة.`,
    category: 'معمارية وهندسة البرمجيات',
    author: {
      name: 'م. أحمد خالد',
      role: 'كبير مهندسي النظم السحابية في ويب ريكس',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 دقائق قراءة',
    tags: ['Architecture', 'Performance', 'Microservices', 'PostgreSQL', 'Redis'],
    publishedAt: '2024-10-24',
    viewsCount: 1420,
    isFeatured: true
  },
  {
    id: 'art-security-web-apps',
    title: 'أهم 7 معايير أمنية لحماية المتاجر والمنصات التعليمية من الاختراق وسرقة المحتوى',
    excerpt: 'كيف نحمي الفيديوهات التعليمية الحصرية من التسجيل والشاشات المزدوجة، ونضمن تشفير بوابات الدفع الإلكترونية وفق أعلى المواصفات الدولية.',
    content: `يمثل المحتوى الرقمي والبيانات المالية للعملاء الأصول الأكثر قيمة لأي مشروع إلكتروني. في هذا المقال نكشف التقنيات الدفاعية المتقدمة التي ندمجها في كل مشروع:

1. التشفير المتقدم للفيديوهات الرقمية (Dynamic DRM & Watermarking):
لحماية كورسات المدرسين والمدربين، نقوم بتطبيق علامات مائية متحركة تشمل رقم هاتف الطالب واسمه بشكل عشوائي غير متوقع، مما يجعل تصوير الشاشة بكاميرا خارجية أمراً يكشف هوية المسرب فوراً، بالإضافة لحظر برامج التسجيل وإضافات المتصفح.

2. الحماية الصارمة لبوابات الدفع (PCI-DSS Compliance):
عدم تخزين أرقام البطاقات الحساسة على خوادم التطبيق والاعتماد على التوكن المشفر (Tokenization) عبر بوابات معتمدة دولياً.

3. مكافحة هجمات CSRF و XSS و SQL Injection:
استخدام استعلامات مُجهزة (Parameterized Queries) والتحقق الدقيق من المدخلات في طبقة الـ API قبل وصولها لمنطق المعالجة.

4. نظام الصلاحيات الصارم وتحديد معدل الطلبات (Rate Limiting):
منع هجمات التخمين للكلمات السرية وتحديد عدد الطلبات لكل IP مع إشعارات فورية بالإشعارات المشبوهة.`,
    category: 'أمان الويب وحماية المحتوى',
    author: {
      name: 'م. ياسين المنصوري',
      role: 'مستشار الأمن السيبراني واختبار الاختراق',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 دقائق قراءة',
    tags: ['Security', 'Cybersecurity', 'DRM', 'Encryption', 'Fintech'],
    publishedAt: '2024-10-18',
    viewsCount: 980,
    isFeatured: false
  },
  {
    id: 'art-custom-vs-ready-scripts',
    title: 'البرمجة الخاصة المخصصة أم القوالب الجاهزة؟ متى تختار التمليك الكامل لبرمجياتك؟',
    excerpt: 'مقارنة شاملة بين بناء منصتك من الصفر بكود ملكية خاصة وتمليك دائم، وبين الاعتماد على اشتراكات شهرية في منصات المنشئ الجاهز.',
    content: `يواجه رواد الأعمال وأصحاب المشاريع سؤالاً جوهرياً عند البدء: هل أعتمد على منصات التأجير الجاهزة أم أمتلك منصتي البرمجية الخاصة بكامل كود المصدر؟

أولاً: تكلفة الاستثمار على المدى الطويل
المنصات المستأجرة تبدو رخيصة في الشهر الأول، لكن مع نمو المبيعات وعدد العملاء ترتفع العمولات الشهرية وتكاليف الإضافات لتصل إلى آلاف الدولارات سنوياً، بينما البرمجة بنظام التمليك تدفع لمرة واحدة وتظل ملكيتك وسيرفراتك للأبد دون أي نسب مئوية على أرباحك.

ثانياً: حرية التطوير وإضافة المزايا
في البرمجة الخاصة، لا توجد قيود على أي فكرة فريدة تريدها؛ يمكنك ربط أي نظام محاسبي، إضافة مسار طلب غير تقليدي، وتعديل الواجهات بنسبة 100%.

ثالثاً: سرعة الأداء وتجربة المستخدم
المواقع المبرمجة كوداً نظيفاً (Custom Clean Code) لا تحتوي على مئات الأسطر الزائدة غير المستخدمة الموجودة في القوالب الجاهزة، مما يعطي سرعة فائقة ترفع من تصنيف الموقع في محركات البحث (Google SEO) وتضاعف المبيعات.`,
    category: 'استراتيجيات التحول الرقمي',
    author: {
      name: 'م. عمر رضوان',
      role: 'مدير تطوير الحلول البرمجية في ويب ريكس',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 دقائق قراءة',
    tags: ['Business', 'Custom Dev', 'ROI', 'Startups', 'WebRex'],
    publishedAt: '2024-10-10',
    viewsCount: 1650,
    isFeatured: true
  }
];

export const getArticles = (): Article[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ARTICLES;
  } catch (err) {
    console.error('Error reading articles from localStorage:', err);
    return DEFAULT_ARTICLES;
  }
};

export const saveArticles = (articles: Article[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (err) {
    console.error('Error saving articles to localStorage:', err);
  }
};

export const addArticle = (article: Omit<Article, 'id' | 'publishedAt'>): Article => {
  const current = getArticles();
  const newArticle: Article = {
    ...article,
    id: `art-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    publishedAt: new Date().toISOString().split('T')[0],
    viewsCount: 1
  };
  const updated = [newArticle, ...current];
  saveArticles(updated);
  return newArticle;
};

export const updateArticle = (id: string, updates: Partial<Article>): boolean => {
  const current = getArticles();
  const index = current.findIndex(a => a.id === id);
  if (index === -1) return false;
  current[index] = { ...current[index], ...updates };
  saveArticles(current);
  return true;
};

export const deleteArticle = (id: string): boolean => {
  const current = getArticles();
  const filtered = current.filter(a => a.id !== id);
  if (filtered.length === current.length) return false;
  saveArticles(filtered);
  return true;
};

export const resetArticles = (): Article[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
  return DEFAULT_ARTICLES;
};
