import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  PenTool, 
  Terminal, 
  ShieldCheck, 
  Rocket, 
  ArrowLeft, 
  Layers
} from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'التحليل ودراسة المتطلبات',
      desc: 'نجلس معك ونستمع لأهداف مشروعك، نحلل الجمهور المستهدف والمنافسين، ونحدد المعمارية التقنية الأنسب.',
      icon: <Compass className="w-5 h-5 text-cyan-400" />
    },
    {
      step: '02',
      title: 'تصميم الواجهات وتجربة المستخدم',
      desc: 'بناء مخططات تفاعلية (Wireframes & UI/UX) عصرية تتناسب مع هوية علامتك قبل كتابة سطر كود واحد.',
      icon: <PenTool className="w-5 h-5 text-teal-400" />
    },
    {
      step: '03',
      title: 'البرمجة والتطوير السحابي',
      desc: 'كتابة الأكواد بأحدث لغات وتقنيات الويب، ربط قاعدة بيانات Firestore، وتكامل واجهات البرمجة APIs.',
      icon: <Terminal className="w-5 h-5 text-indigo-400" />
    },
    {
      step: '04',
      title: 'فحص الأمان وتدقيق الأداء',
      desc: 'اختبارات ضغط مكثفة، تدقيق قواعد أمان الحماية ABAC، وفحص التوافق الكامل مع مختلف الشاشات والمتصفحات.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      step: '05',
      title: 'الإطلاق الرسمي والدعم الفني',
      desc: 'نشر المشروع على خوادم سحابية فائقة السرعة، تسليم الوثائق البرمجية، وتقديم دعم فني مستمر لضمان النجاح.',
      icon: <Rocket className="w-5 h-5 text-rose-400" />
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-900/60 relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>منهجية العمل والإنتاج</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            كيف نحول فكرتك إلى مشروع ناجح؟
          </h2>
          
          <p className="text-slate-400 text-base">
            خطوات واضحة وشفافة نتبعها في ويب ريكس لضمان تسليم مشروعك في الموعد المحدد وبأعلى جودة هندسية ممكنة.
          </p>
        </motion.div>

        {/* Steps Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors duration-300 space-y-3 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-cyan-400/80 transition-colors">
                    {item.step}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 text-slate-700">
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
