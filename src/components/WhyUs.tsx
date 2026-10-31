import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Code2, 
  Sparkles, 
  Gauge, 
  Headphones, 
  Smartphone, 
  Lock
} from 'lucide-react';

export const WhyUs: React.FC = () => {
  const points = [
    {
      icon: <Gauge className="w-6 h-6 text-cyan-400" />,
      title: 'سرعة فائقة وأداء استثنائي',
      desc: 'نبني مواقعنا وفق أفضل معايير السرعة (Core Web Vitals) مع زمن استجابة لا يتعدى بضع أجزاء من الثانية وتحميل فوري للواجهات.'
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-400" />,
      title: 'حماية وأمان سحابي مشدد',
      desc: 'نطبق قواعد أمان حصرية على مستوى قاعدة البيانات Firestore Security Rules تمنع تسريب البيانات أو العبث بها بنسبة 100%.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-indigo-400" />,
      title: 'كود نظيف ومعمارية قابلة للتوسع',
      desc: 'كود معياري منظم (Modular Clean Code) قابل للتطوير والإضافة مستقبلاً دون الحاجة لإعادة كتابة النظام من الصفر.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-teal-400" />,
      title: 'متوافق مع جميع الشاشات والأجهزة',
      desc: 'تجربة استخدام مخصصة وسلسة على الهواتف الذكية، الأجهزة اللوحية، والشاشات المكتبية بمختلف المقاسات.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'تصميم وهوية خاصة ببراندك',
      desc: 'لا نعتمد على قوالب جاهزة مكررة؛ نصمم كل واجهة من الصفر لتعبر بدقة عن هوية نشاطك التجاري وتبهر عملاءك.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-rose-400" />,
      title: 'دعم فني وضمان برمجي متواصل',
      desc: 'نمنحك ضماناً على البرمجة مع دعم فني مستمر للرد على أي استفسارات أو إجراء التحديثات الفنية اللازمة.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-950/60 relative overflow-hidden backdrop-blur-sm">
      {/* Main Container with smooth fade-in and slide-up once on scroll */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Heading with Motion and viewport={{ once: true }} */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>معايير التميز الهندسي</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            لماذا يختار رواد الأعمال "ويب ريكس"؟
          </h2>
          
          <p className="text-slate-400 text-base">
            لأننا لا نقدم مجرد أكواد، بل نصنع أصولاً رقمية عالية القيمة ترفع من مبيعاتك وتسرع من نجاح مشروعك.
          </p>
        </motion.div>

        {/* Grid of features with Motion Stagger and viewport={{ once: true }} */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-colors duration-300 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {point.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};
