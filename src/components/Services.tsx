import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ShoppingBag, 
  Database, 
  Layout, 
  Cpu, 
  Headphones, 
  Zap, 
  ArrowLeft, 
  Check, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const services: ServiceItem[] = [
    {
      id: 'edtech-platforms',
      title: 'برمجة المنصات التعليمية والأكاديميات الرقمية',
      subtitle: 'EdTech & Online Learning Management Systems',
      description: 'نبتكر ونبرمج منصات تعليمية متكاملة للمعلمين والأكاديميات تحمي الفيديوهات من التسجيل أو التحميل، مع نظام امتحانات ذكية وتصحيح تلقائي، اشتراكات وبوابات دفع، ومتابعة فورية لمستوى الطلاب.',
      icon: 'GraduationCap',
      badge: 'تخصص رائد',
      features: [
        'حماية مشددة للمحاضرات والفيديوهات ومنع التحميل والشاشات المزدوجة',
        'نظام بنك أسئلة واختبارات تفاعلية بتصحيح آلي فوري وإصدار شهادات',
        'لوحة تحكم شاملة للمعلم لإدارة المذكرات، الحصص، وأكواد التفعيل',
        'تكامل كامل مع محافظ الدفع الإلكتروني (فودافون كاش، فوري، فيزا، ميزة)'
      ],
      technologies: ['React 19', 'Next.js', 'Firebase Firestore', 'Cloudflare Stream']
    },
    {
      id: 'ecommerce-stores',
      title: 'تطوير المتاجر الإلكترونية وبوابات الدفع',
      subtitle: 'Modern Scalable E-Commerce Platforms',
      description: 'بناء متاجر إلكترونية فائقة السرعة والاستجابة مصممة لرفع معدلات الشراء (Conversion Rates) مع دعم إدارة المخزون اللحظية، الخصومات التلقائية، وتتبع الشحنات المباشر.',
      icon: 'ShoppingBag',
      badge: 'الأعلى مبيعاً',
      features: [
        'ربط جميع بوابات الدفع الإلكتروني المحلية والدولية بسلاسة وأمان',
        'سلة شراء سريعة وخطوات دفع مختصرة (One-Page Checkout)',
        'إدارة دقيقة للمخزون والتنبيه عند نفاد المنتجات أو المتغيرات',
        'تكامل تلقائي مع شركات الشحن وإرسال إشعارات وتحديثات للعملاء'
      ],
      technologies: ['Tailwind CSS', 'Node.js', 'Stripe & Paymob', 'Redis']
    },
    {
      id: 'management-systems',
      title: 'الأنظمة الإدارية ولوحات التحكم السحابية',
      subtitle: 'Custom ERP & Operations Management Dashboards',
      description: 'نطور أنظمة إدارة أعمال مركزية (ERP/CRM) مخصصة لتنظيم عملياتك، الفواتير الإلكترونية المعتمدة، إدارة الموظفين، وتقارير أداء ومخططات تحليلية لحظية لاتخاذ قرارات أسرع.',
      icon: 'Database',
      badge: 'أتمتة الأعمال',
      features: [
        'إدارة صلاحيات دقيقة للمستخدمين والموظفين (RBAC Rules)',
        'تقارير إحصائية ورسوم بيانية تفاعلية في الوقت الفعلي',
        'نظام فواتير سحابي متوافق مع متطلبات الضرائب الإلكترونية',
        'إشعارات وتنبيهات فورية للمهام ومزامنة البيانات اللحظية'
      ],
      technologies: ['Firestore Rules', 'Express', 'TypeScript', 'PostgreSQL']
    },
    {
      id: 'corporate-websites',
      title: 'مواقع الشركات وصفحات الهبوط التسويقية',
      subtitle: 'High-Conversion Corporate & Landing Pages',
      description: 'واجهات مستخدم فريدة تعكس قوة واحترافية علامتك التجارية، مصممة من الصفر بأحدث تقنيات الويب العالمية مع سرعة تحميل قياسية وتهيئة كاملة لمحركات البحث (SEO).',
      icon: 'Layout',
      badge: 'هوية رقمية',
      features: [
        'تصميم تفاعلي متجاوب 100% مع الهواتف الذكية ومختلف الشاشات',
        'سرعة استجابة مذهلة تحقق أعلى تقييم على Google PageSpeed',
        'تهيئة متقدمة للسيو والـ Social Meta Tags لزيادة الزيارات العضوية',
        'لوحة تحكم مرنة وسهلة الاستخدام لإدارة المحتوى الإخباري والمقالات'
      ],
      technologies: ['React', 'Tailwind CSS', 'Vite', 'SEO Schema']
    },
    {
      id: 'web-apps-apis',
      title: 'تطبيقات الويب المخصصة وتكامل الـ APIs',
      subtitle: 'Custom Web Apps & Backend API Integrations',
      description: 'تنفيذ الأفكار البرمجية غير التقليدية وتطبيقات الويب التفاعلية المعقدة، مع بناء وتكامل واجهات برمجة التطبيقات (APIs) وخدمات الربط مع واتساب وبوابات الرسائل القصيرة.',
      icon: 'Cpu',
      badge: 'حلول مخصصة',
      features: [
        'بناء معمارية ميكروسيرفيسز (Microservices) قابلة للتوسع الكبير',
        'ربط منصتك مع واتساب للأعمال (WhatsApp Business API) آلياً',
        'تأمين خطوط الاتصال والتشفير التام لنقل البيانات الحساسة',
        'توثيق برمجي كامل (Swagger / Postman Docs) للمطورين'
      ],
      technologies: ['REST APIs', 'WebSockets', 'Cloud Functions', 'OAuth 2.0']
    },
    {
      id: 'support-devops',
      title: 'الدعم الفني، الأمان السحابي والصيانة المستمرة',
      subtitle: '24/7 DevOps, Security Auditing & Maintenance',
      description: 'فريق مهندسين متكامل يعمل معك كشريك تقني لضمان استقرار مشروعك، وتطبيق قواعد الأمان الصارمة، وإجراء التحديثات الدورية دون انقطاع الخدمة.',
      icon: 'Headphones',
      badge: 'شريك مستمر',
      features: [
        'مراقبة استقرار وسرعة الخوادم والمنصات على مدار الساعة 24/7',
        'تدقيق وتطبيق قواعد حماية قواعد البيانات (Firestore Security Rules)',
        'نسخ احتياطي دوري لقواعد البيانات مع خطة استعادة فورية',
        'تحديث مستمر للتبعيات وسد أي ثغرات أمنية استباقياً'
      ],
      technologies: ['Firestore Rules', 'Cloudflare', 'Docker', 'CI/CD']
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-teal-400" />;
      case 'Database':
        return <Database className="w-6 h-6 text-indigo-400" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-teal-400" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-950/60 relative overflow-hidden backdrop-blur-sm">
      {/* Subtle, soft ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container with smooth fade-in and slide-up once on scroll */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>خدماتنا البرمجية الحصرية (Software Engineering)</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            حلول برمجية متقدمة تصنع الفارق لمشروعك
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            نركز تخصصنا بالكامل في هندسة وبرمجة المنصات الرقمية، الأكاديميات التعليمية، المتاجر الإلكترونية، والأنظمة الإدارية بأعلى معايير السرعة والأمان.
          </p>
        </motion.div>

        {/* Services Grid with Motion and viewport={{ once: true }} */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-7 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-colors duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-950/20"
            >
              <div className="space-y-5">
                
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center justify-center w-13 h-13 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/50 group-hover:scale-105 transition-all duration-300 shadow-md">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-cyan-300">
                    {service.badge}
                  </span>
                </div>

                {/* Titles */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-500 mt-1">
                    {service.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 pt-2 border-t border-slate-800/60">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-cyan-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Footer with Tech chips and CTA */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {service.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-[-3px] transition-all cursor-pointer"
                >
                  <span>اطلب البرمجة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};
