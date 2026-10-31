import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Terminal, 
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onNavigateToOrder: () => void;
  onNavigateToPortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onNavigateToOrder, 
  onNavigateToPortfolio 
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Gentle, soft celestial ambiance */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy (Col 1-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 text-right space-y-6"
          >
            
            {/* Top pill badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-inner shadow-cyan-500/20"
            >
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>شريكك التقني المعتمد لتطوير منصات الويب الحديثة</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.2] tracking-tight"
            >
              نحوّل رؤيتك الرقمية إلى{' '}
              <span className="bg-gradient-to-l from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                واقع برمجي فائق الأداء
              </span>
            </motion.h1>

            {/* Subheading / Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal"
            >
              في شركة <strong className="text-white font-bold">ويب ريكس - WebRex</strong>، نتخصص في برمجة وتطوير وتصميم أي مشروع ويب مخصص؛ من المنصات الرقمية المعقدة والأنظمة الإدارية السحابية وحتى المتاجر الإلكترونية الضخمة، بأعلى معايير الحماية والسرعة.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onNavigateToOrder}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40 active:scale-95 cursor-pointer"
              >
                <span>اطلب مشروعك الآن</span>
                <Send className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={onNavigateToPortfolio}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-200 cursor-pointer"
              >
                <span>استكشف سابقة الأعمال</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Quick Guarantees / Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">كود مخصص 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">حماية مشددة ABAC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">قواعد بيانات Firestore</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">تسليم فائق السرعة</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Interactive Code / Architecture Preview Card (Col 8-12) */}
          <motion.div 
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative glow border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-teal-500/20 to-indigo-500/30 blur-lg" />

              <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>WebRex Engine v2.4</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                    LIVE SYSTEM
                  </span>
                </div>

                {/* Terminal Code Snippet with Firestore Architecture */}
                <div className="p-5 font-['JetBrains_Mono',monospace] text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto space-y-3 dir-ltr text-left">
                  <div className="text-slate-500 italic">// WebRex Core Architecture</div>
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-cyan-300">webrexProject</span> = {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">client:</span>{' '}
                    <span className="text-emerald-300">"Your Vision"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">database:</span>{' '}
                    <span className="text-amber-300">"Firebase Firestore"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">collections:</span> [
                    <span className="text-cyan-300">'projects'</span>,{' '}
                    <span className="text-cyan-300">'orders'</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">securityRules:</span>{' '}
                    <span className="text-teal-300">'ABAC Hardened v2'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">performance:</span>{' '}
                    <span className="text-cyan-400">99.8</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">status:</span>{' '}
                    <span className="text-emerald-400">"Ready to Deploy 🚀"</span>
                  </div>
                  <div>{'}'};</div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-slate-500">Output: Production Static SPA</span>
                    <span className="text-emerald-400 font-semibold">Latency: 14ms</span>
                  </div>
                </div>

                {/* Feature highlight ticker underneath terminal */}
                <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-800 bg-slate-900/60 border-t border-slate-800 text-center py-3">
                  <div>
                    <div className="text-base font-extrabold text-white font-mono">+65</div>
                    <div className="text-[11px] text-slate-400">مشروع منجز</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-cyan-400 font-mono">100%</div>
                    <div className="text-[11px] text-slate-400">معايير أمان</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-emerald-400 font-mono">24/7</div>
                    <div className="text-[11px] text-slate-400">دعم متواصل</div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
