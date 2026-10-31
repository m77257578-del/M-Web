import React from 'react';
import { 
  Code2, 
  Send, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Database,
  ArrowUp,
  Heart
} from 'lucide-react';
import { SocialIcons } from './SocialIcons';

interface FooterProps {
  onNavigateToOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateToOrder 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950/80 backdrop-blur-md border-t border-slate-900 text-slate-400 relative overflow-hidden">
      
      {/* Top Banner inside Footer */}
      <div className="border-b border-slate-800/80 bg-slate-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">هل أنت مستعد لبدء مشروعك البرمجي القادم؟</h4>
              <p className="text-xs text-slate-400">استشارة تقنية مجانية وتحليل فني لمواصفات مشروعك خلال ساعات.</p>
            </div>
          </div>
          <button
            onClick={onNavigateToOrder}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer shadow-md shadow-cyan-400/20"
          >
            اطلب استشارة مجانية الآن
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <Code2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-white font-['JetBrains_Mono',monospace]">
                  Web<span className="text-cyan-400">Rex</span>
                </span>
                <span className="text-xs text-slate-400">ويب ريكس للحلول البرمجية</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              شركة برمجية متخصصة في ابتكار وتطوير حلول الويب المخصصة، المنصات الرقمية، الأنظمة الإدارية والمتاجر الإلكترونية، بمعايير أمان مشددة وسرعة استثنائية.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>متاحون لاستقبال وتنفيذ المشاريع البرمجية الجديدة</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white tracking-wide">أقسام المنصة</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#demo-platforms" className="hover:text-cyan-400 transition-colors text-cyan-300 font-semibold">منصات المعاينة والتسعير</a>
              </li>
              <li>
                <a href="#client-projects" className="hover:text-cyan-400 transition-colors">أعمال العملاء المنشورة</a>
              </li>
              <li>
                <a href="#articles" className="hover:text-cyan-400 transition-colors text-cyan-300 font-semibold">مقالاتنا وأدلتنا التقنية</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">خطط الأسعار والباقات</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">خدمات البرمجة والأنظمة</a>
              </li>
              <li>
                <a href="#join-us" className="hover:text-cyan-400 transition-colors text-emerald-300 font-semibold">انضم إلينا (مبرمجين وخدمة عملاء)</a>
              </li>
              <li>
                <a href="#order-form" className="hover:text-cyan-400 transition-colors">اطلب مشروعك الآن</a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white tracking-wide">الخدمات التقنية</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">المنصات التعليمية LMS</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">المتاجر الإلكترونية وبوابات الدفع</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">الأنظمة الإدارية ERP & CRM</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">تطبيقات الويب وتكامل APIs</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">قواعد بيانات Firestore والأمان السحابي</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white tracking-wide">تواصل معنا</h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/201000000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-mono"
                  dir="ltr"
                >
                  WhatsApp: +20 100 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a 
                  href="mailto:contact@webrex.dev" 
                  className="hover:text-cyan-400 transition-colors font-mono"
                  dir="ltr"
                >
                  contact@webrex.dev
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>خدمات برمجية وهندسة منصات رقمية للشركات ورواد الأعمال</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Social Media Squircle Icons Row (Matching User Request) */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-xs font-semibold text-slate-400">
            تواصل وتابع قنوات <strong className="text-white">ويب ريكس</strong> على وسائل التواصل الاجتماعي:
          </div>
          <SocialIcons />
        </div>

        {/* Bottom copyright row with tal5es style agency signature */}
        <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()} لشركة <strong className="text-slate-200">ويب ريكس - WebRex</strong>.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-cyan-400 font-mono font-semibold">تصميم وبرمجة وكالة WebRex.dev للحلول البرمجية</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
