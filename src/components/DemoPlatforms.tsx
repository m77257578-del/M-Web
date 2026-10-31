import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, 
  Smartphone, 
  Tablet, 
  Play, 
  Pause,
  RotateCcw,
  RotateCw,
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  Award, 
  CreditCard, 
  Tag, 
  Layers, 
  Send,
  Eye,
  Film,
  Image as ImageIcon,
  Check,
  Code2,
  Lock,
  ArrowRight
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { DemoPlatform, PlatformMedia, getDemoPlatforms } from '../services/demoPlatforms';

const Player: any = (ReactPlayer as any).default || ReactPlayer;

interface DemoPlatformsProps {
  onSelectPlatformToOrder: (platformTitle: string, planType: 'monthly' | 'annual' | 'lifetime', price: number, currency: string) => void;
}

export const DemoPlatforms: React.FC<DemoPlatformsProps> = ({ onSelectPlatformToOrder }) => {
  const [platforms, setPlatforms] = useState<DemoPlatform[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<DemoPlatform | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewTab, setPreviewTab] = useState<'live' | 'video' | 'gallery' | 'pricing'>('live');
  const [selectedPlanTab, setSelectedPlanTab] = useState<Record<string, 'monthly' | 'annual' | 'lifetime'>>({});
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [liveViewMode, setLiveViewMode] = useState<'iframe' | 'overview'>('iframe');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<any>(null);
  const currentTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(100);

  const handleRewind = () => {
    const newTime = Math.max(0, currentTimeRef.current - 10);
    currentTimeRef.current = newTime;
    if (playerRef.current) {
      if (typeof playerRef.current.seekTo === 'function') {
        try { playerRef.current.seekTo(newTime, 'seconds'); } catch (e) {}
      } else if (typeof playerRef.current.getInternalPlayer === 'function') {
        try {
          const internal = playerRef.current.getInternalPlayer();
          if (internal && typeof internal.seekTo === 'function') {
            internal.seekTo(newTime, true);
          }
        } catch (e) {}
      }
    }
  };

  const handleForward = () => {
    const newTime = Math.min(durationRef.current || 100, currentTimeRef.current + 10);
    currentTimeRef.current = newTime;
    if (playerRef.current) {
      if (typeof playerRef.current.seekTo === 'function') {
        try { playerRef.current.seekTo(newTime, 'seconds'); } catch (e) {}
      } else if (typeof playerRef.current.getInternalPlayer === 'function') {
        try {
          const internal = playerRef.current.getInternalPlayer();
          if (internal && typeof internal.seekTo === 'function') {
            internal.seekTo(newTime, true);
          }
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    loadPlatforms();
    const handleStorageChange = () => loadPlatforms();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadPlatforms = () => {
    const list = getDemoPlatforms();
    setPlatforms(list);
  };

  const categories = ['all', ...Array.from(new Set(platforms.map(p => p.category)))];

  const filteredPlatforms = selectedCategory === 'all' 
    ? platforms 
    : platforms.filter(p => p.category === selectedCategory);

  const getActivePlan = (platformId: string): 'monthly' | 'annual' | 'lifetime' => {
    return selectedPlanTab[platformId] || 'lifetime';
  };

  const setActivePlan = (platformId: string, plan: 'monthly' | 'annual' | 'lifetime') => {
    setSelectedPlanTab(prev => ({ ...prev, [platformId]: plan }));
  };

  const handleOpenPreview = (platform: DemoPlatform, defaultTab: 'live' | 'video' | 'gallery' | 'pricing' = 'live') => {
    setActivePreviewPlatform(platform);
    setPreviewTab(defaultTab);
    setActiveMediaIndex(0);
    setPreviewDevice('desktop');
    setIframeKey(Date.now());
  };

  // Convert youtube links into embed links safely
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return url;
  };

  return (
    <section id="demo-platforms" className="py-20 relative overflow-hidden">
      {/* Decorative subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>معاينة حية ومباشرة للحلول الجاهزة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            منصات برمجية جاهزة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">للمعاينة والشراء الفوري</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            استعرض وجرّب المنصة مباشرة داخل تطبيقنا في محاكي تفاعلي متقدم بكامل وظائفها. اختر النموذج المالي المناسب لمشروعك (اشتراك شهري، سنوي مخفض، أو تمليك دائم بكامل كود المصدر).
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'جميع المنصات والأنظمة' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPlatforms.map((platform) => {
            const currentPlan = getActivePlan(platform.id);
            const videos = platform.media.filter(m => m.type === 'video' || m.type === 'youtube');
            const images = platform.media.filter(m => m.type === 'image');

            return (
              <motion.div
                key={platform.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-xl flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Top Thumbnail & Action Badges */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-950 border border-slate-800 group-hover:border-slate-700">
                    <img 
                      src={platform.thumbnail} 
                      alt={platform.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {platform.badge && (
                        <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-black shadow-md shadow-cyan-500/30">
                          {platform.badge}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-cyan-300 text-[11px] font-bold border border-cyan-500/30 backdrop-blur-sm">
                        {platform.category}
                      </span>
                    </div>

                    {/* Quick Media Indicators */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {videos.length > 0 && (
                        <button
                          onClick={() => handleOpenPreview(platform, 'video')}
                          className="px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-[11px] font-bold flex items-center gap-1 backdrop-blur-sm cursor-pointer shadow"
                          title="مشاهدة فيديو الشرح"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>فيديو</span>
                        </button>
                      )}
                      {images.length > 0 && (
                        <span className="px-2 py-1 rounded-lg bg-slate-900/80 text-slate-200 text-[11px] font-medium flex items-center gap-1 backdrop-blur-sm">
                          <ImageIcon className="w-3 h-3 text-cyan-400" />
                          <span>{images.length} صور</span>
                        </span>
                      )}
                    </div>

                    {/* Interactive Preview Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-[2px]">
                      <button
                        onClick={() => handleOpenPreview(platform, 'live')}
                        className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 cursor-pointer transform hover:scale-105 transition-all"
                      >
                        <Laptop className="w-4 h-4" />
                        <span>معاينة حية داخل التطبيق الآن</span>
                      </button>
                    </div>

                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-semibold text-white/90">محاكي شاشات حاسوب وجوال متوفر</span>
                      <span className="text-cyan-400 font-bold flex items-center gap-1">
                        <span>تجربة فورية</span>
                        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                    {platform.title}
                  </h3>
                  <p className="text-cyan-300/90 text-xs sm:text-sm font-medium mb-3">
                    {platform.subtitle}
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {platform.description}
                  </p>

                  {/* Target Audience */}
                  {platform.clientTarget && (
                    <div className="mb-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span><strong>مناسبة لـ:</strong> {platform.clientTarget}</span>
                    </div>
                  )}

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>المميزات البرمجية والمواصفات:</span>
                    </h4>
                    <ul className="space-y-2">
                      {platform.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {platform.features.length > 4 && (
                        <li className="text-[11px] text-cyan-400 font-semibold pt-1">
                          + {platform.features.length - 4} مميزات إضافية متوفرة في المعاينة التفصيلية
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {platform.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3-Tier Pricing Model Selector */}
                <div className="pt-6 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
                    <span>اختر نظام الشراء أو الاشتراك:</span>
                    <span className="text-[11px] text-cyan-400 font-normal">تسعير مباشر محدد من الإدارة</span>
                  </div>

                  {/* Plan Tabs */}
                  <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 mb-4">
                    <button
                      onClick={() => setActivePlan(platform.id, 'monthly')}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        currentPlan === 'monthly'
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>نظام شهري</div>
                      <div className="text-[10px] font-mono mt-0.5 opacity-90">{platform.pricing.monthly}{platform.pricing.currency}/ش</div>
                    </button>

                    <button
                      onClick={() => setActivePlan(platform.id, 'annual')}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center relative cursor-pointer ${
                        currentPlan === 'annual'
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>نظام سنوي</span>
                      </div>
                      <div className="text-[10px] font-mono mt-0.5 opacity-90">{platform.pricing.annual}{platform.pricing.currency}/س</div>
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                        توفير 20%
                      </span>
                    </button>

                    <button
                      onClick={() => setActivePlan(platform.id, 'lifetime')}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        currentPlan === 'lifetime'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>تمليك دائم</div>
                      <div className="text-[10px] font-mono mt-0.5 opacity-90">{platform.pricing.lifetime}{platform.pricing.currency}</div>
                    </button>
                  </div>

                  {/* Selected Plan Details Note */}
                  <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 mb-5 text-xs text-slate-300">
                    {currentPlan === 'monthly' && (
                      <div className="flex items-start gap-2">
                        <CreditCard className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">الاشتراك الشهري ({platform.pricing.monthly}{platform.pricing.currency}/شهر):</strong>
                          <p className="text-slate-400 text-[11px] mt-0.5">
                            {platform.pricing.monthlyNote || 'يشمل الاستضافة السحابية الآمنة والصيانة الفنية الدورية والتحديثات الأمنية المستمرة.'}
                          </p>
                        </div>
                      </div>
                    )}
                    {currentPlan === 'annual' && (
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">الاشتراك السنوي المخفض ({platform.pricing.annual}{platform.pricing.currency}/سنة):</strong>
                          <p className="text-slate-400 text-[11px] mt-0.5">
                            {platform.pricing.annualNote || 'توفير شهرين مجاناً، دومين احترافي هدية، ونسخ احتياطي يومي مشفر.'}
                          </p>
                        </div>
                      </div>
                    )}
                    {currentPlan === 'lifetime' && (
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">شراء وتمليك دائم ({platform.pricing.lifetime}{platform.pricing.currency} لمرة واحدة):</strong>
                          <p className="text-slate-400 text-[11px] mt-0.5">
                            {platform.pricing.lifetimeNote || 'تسليم كود المصدر (Source Code) كاملاً 100%، بدون أي عمولة مبيعات، وترخيص تجاري حر مدى الحياة.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleOpenPreview(platform, 'live')}
                      className="px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-cyan-500/30 text-cyan-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>معاينة حية داخل التطبيق</span>
                    </button>

                    <button
                      onClick={() => {
                        const price = currentPlan === 'monthly' 
                          ? platform.pricing.monthly 
                          : currentPlan === 'annual' 
                            ? platform.pricing.annual 
                            : platform.pricing.lifetime;
                        onSelectPlatformToOrder(
                          `${platform.title} (${currentPlan === 'monthly' ? 'شهري' : currentPlan === 'annual' ? 'سنوي' : 'تمليك دائم'})`,
                          currentPlan,
                          price,
                          platform.pricing.currency
                        );
                      }}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>اطلب هذه المنصة الآن</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* IN-APP INTERACTIVE PREVIEW SIMULATOR MODAL               */}
      {/* (Keeps user INSIDE the app without navigating away!)     */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activePreviewPlatform && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-slate-950 w-screen h-screen overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900 border-0 rounded-none w-full h-full flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Single Floating Translucent Top Header Bar for True 100% Fullscreen Preview */}
              <div className="fixed top-3 left-3 right-3 z-50 bg-slate-950/90 border border-slate-800/90 rounded-2xl p-2 px-3 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-2">
                {/* Left side: Title and Status badge */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-xs">
                    {activePreviewPlatform.title}
                  </span>
                  <span className="hidden xl:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    معاينة حية 100%
                  </span>
                </div>

                {/* Center: Device Switcher & Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  {/* Viewport device toggles */}
                  <div className="flex items-center gap-0.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        previewDevice === 'desktop' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                      }`}
                      title="شاشة كمبيوتر عريضة"
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">كمبيوتر</span>
                    </button>
                    <button
                      onClick={() => setPreviewDevice('tablet')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        previewDevice === 'tablet' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                      }`}
                      title="شاشة تابلت"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">تابلت</span>
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        previewDevice === 'mobile' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                      }`}
                      title="شاشة جوال"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">موبايل</span>
                    </button>
                  </div>

                  {/* Preview Mode Tabs */}
                  <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setPreviewTab('live')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        previewTab === 'live' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      المعاينة الحية
                    </button>
                    {activePreviewPlatform.media.some(m => m.type === 'video' || m.type === 'youtube') && (
                      <button
                        onClick={() => setPreviewTab('video')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          previewTab === 'video' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        الفيديو
                      </button>
                    )}
                    <button
                      onClick={() => setPreviewTab('gallery')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        previewTab === 'gallery' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      الواجهات
                    </button>
                  </div>

                  <button
                    onClick={() => setIframeKey(Date.now())}
                    className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer border border-slate-800"
                    title="إعادة تحميل الصفحة"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right side: Minimize / Order CTA / Close */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const currentPlan = getActivePlan(activePreviewPlatform.id);
                      const price = currentPlan === 'monthly'
                        ? activePreviewPlatform.pricing.monthly
                        : currentPlan === 'annual'
                          ? activePreviewPlatform.pricing.annual
                          : activePreviewPlatform.pricing.lifetime;
                      setActivePreviewPlatform(null);
                      onSelectPlatformToOrder(
                        activePreviewPlatform.title,
                        currentPlan,
                        price,
                        activePreviewPlatform.pricing.currency
                      );
                    }}
                    className="hidden sm:flex px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs items-center gap-1 shadow cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>طلب حجز</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setActivePreviewPlatform(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-cyan-500/30 shadow"
                    title="تصغير / الخروج من وضع الشاشة الكاملة"
                  >
                    <Minimize2 className="w-4 h-4" />
                    <span>تصغير الشاشة</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setActivePreviewPlatform(null);
                    }}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                    title="إغلاق المعاينة"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body Container - 100% FULL SCREEN */}
              <div className="flex-1 bg-slate-950 p-0 overflow-hidden flex flex-col items-center justify-center w-full h-full">
                {/* 1. LIVE SIMULATOR TAB */}
                {previewTab === 'live' && (
                  <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    <div 
                      className={`bg-slate-900 overflow-hidden flex flex-col transition-all duration-300 ${
                        previewDevice === 'desktop'
                          ? 'w-full h-full max-w-none rounded-none border-0'
                          : previewDevice === 'tablet'
                            ? 'w-[768px] max-w-full h-[92%] my-auto rounded-2xl border border-slate-700/80 shadow-2xl'
                            : 'w-[390px] max-w-full h-[92%] my-auto rounded-2xl border border-slate-700/80 shadow-2xl'
                      }`}
                    >
                      {/* Simulated Interactive Browser Frame */}
                      <div className="flex-1 bg-slate-950 overflow-hidden flex flex-col relative">
                        {/* Live Frame Body - 100% Pure Fullscreen Viewport */}
                        {liveViewMode === 'iframe' && activePreviewPlatform.liveDemoUrl ? (
                          <div className="flex-1 bg-white relative w-full h-full overflow-hidden">
                            <iframe
                              key={iframeKey}
                              src={activePreviewPlatform.liveDemoUrl}
                              title={activePreviewPlatform.title}
                              className="w-full h-full border-0 bg-white"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          /* Interactive Overview Cards Fallback */
                          <div className="min-h-full p-4 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-y-auto">
                            {/* Mock Nav */}
                            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm">
                                  MW
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-white">{activePreviewPlatform.title}</h4>
                                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>خادم نشط وسريع الاستجابة</span>
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                                  {activePreviewPlatform.category}
                                </span>
                              </div>
                            </div>

                            {/* Hero Showcase inside simulator */}
                            <div className="py-8 text-center max-w-2xl mx-auto">
                              <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold mb-3">
                                نظام سحابي مرخص جاهز للتشغيل الفوري
                              </div>
                              <h2 className="text-xl sm:text-3xl font-black text-white mb-3">
                                {activePreviewPlatform.title}
                              </h2>
                              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                                {activePreviewPlatform.description}
                              </p>

                              {/* Simulated Interactive Controls */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                                  <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                                  <div className="text-[10px] text-slate-400">زمن الاستجابة</div>
                                  <div className="text-xs font-bold text-white font-mono">0.6s فائق</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                                  <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                                  <div className="text-[10px] text-slate-400">مستوى الأمان</div>
                                  <div className="text-xs font-bold text-white font-mono">تشفير 256-bit</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                                  <Layers className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                                  <div className="text-[10px] text-slate-400">لوحات الإدارة</div>
                                  <div className="text-xs font-bold text-white font-mono">شاملة الصلاحيات</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                                  <Code2 className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                                  <div className="text-[10px] text-slate-400">السورس كود</div>
                                  <div className="text-xs font-bold text-white font-mono">متاح للتمليك</div>
                                </div>
                              </div>

                              {/* Features preview pills */}
                              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 text-right">
                                <h5 className="text-xs font-bold text-cyan-400 mb-2">أبرز الوظائف البرمجية المدمجة:</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {activePreviewPlatform.features.map((f: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                      <span>{f}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Simulator Footer Bar */}
                            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                              <span>هل ترغب بطلب المنصة أو تخصيص هوية خاصة بك؟</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setPreviewTab('pricing')}
                                  className="text-cyan-400 hover:underline font-bold"
                                >
                                  عرض طرق الباقات
                                </button>
                                <span>•</span>
                                <button
                                  onClick={() => {
                                    const currentPlan = getActivePlan(activePreviewPlatform.id);
                                    const price = currentPlan === 'monthly'
                                      ? activePreviewPlatform.pricing.monthly
                                      : currentPlan === 'annual'
                                        ? activePreviewPlatform.pricing.annual
                                        : activePreviewPlatform.pricing.lifetime;
                                    setActivePreviewPlatform(null);
                                    onSelectPlatformToOrder(
                                      activePreviewPlatform.title,
                                      currentPlan,
                                      price,
                                      activePreviewPlatform.pricing.currency
                                    );
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 cursor-pointer"
                                >
                                  طلب حجز فوري
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. VIDEO TOUR TAB */}
                {previewTab === 'video' && (
                  <div className="w-full max-w-4xl my-auto flex flex-col items-center justify-center">
                    {(() => {
                      const videoItem = activePreviewPlatform.media.find(m => m.type === 'video' || m.type === 'youtube');
                      if (!videoItem) {
                        return (
                          <div className="text-center p-8 bg-slate-900 rounded-2xl border border-slate-800">
                            <Film className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                            <p className="text-slate-300 text-sm">لم يتم رفع فيديو لهذه المنصة بعد، يمكنك رفع فيديو أو إدراج رابط يوتيوب من لوحة الأدمن.</p>
                          </div>
                        );
                      }

                      return (
                        <div id="demo-video-wrapper" className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative group">
                          <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                            <span className="font-bold flex items-center gap-2">
                              <Film className="w-4 h-4 text-cyan-400" />
                              <span>{videoItem.title || 'شرح فيديو احترافي لوظائف المنصة'}</span>
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">جودة فائقة HD</span>
                              <button
                                onClick={() => {
                                  const elem = document.getElementById('demo-video-wrapper');
                                  if (elem) {
                                    if (!document.fullscreenElement) {
                                      elem.requestFullscreen().catch(err => console.error(err));
                                    } else {
                                      document.exitFullscreen().catch(err => console.error(err));
                                    }
                                  }
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border border-cyan-500/30 shadow"
                                title="توسيع ملء الشاشة لعرض بجودة عالية"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>توسيع (Fullscreen)</span>
                              </button>
                            </div>
                          </div>

                          {/* Video Container */}
                          <div className="aspect-video w-full bg-black relative overflow-hidden group">
                            {videoItem.type === 'youtube' || videoItem.url.includes('youtube.com') || videoItem.url.includes('youtu.be') ? (
                              <iframe
                                src={getEmbedUrl(videoItem.url)}
                                title={videoItem.title || 'Platform Video Tour'}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={videoItem.url}
                                playsInline
                                autoPlay={isPlaying}
                                preload="none"
                                className="w-full h-full object-cover"
                              />
                            )}

                            {/* Overlay Control Bar */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end">
                              <div className="p-3 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center gap-4">
                                <button
                                  onClick={handleRewind}
                                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white transition-all cursor-pointer"
                                  title="ترجيع 10 ثواني"
                                >
                                  <RotateCcw className="w-5 h-5" />
                                </button>

                                <button
                                  onClick={() => setIsPlaying(!isPlaying)}
                                  className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 transition-all cursor-pointer"
                                >
                                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                                </button>

                                <button
                                  onClick={handleForward}
                                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white transition-all cursor-pointer"
                                  title="تقديم 10 ثواني"
                                >
                                  <RotateCw className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 3. GALLERY TAB */}
                {previewTab === 'gallery' && (
                  <div className="w-full max-w-4xl h-full flex flex-col">
                    {(() => {
                      const imageItems = activePreviewPlatform.media.filter(m => m.type === 'image');
                      const currentMedia = imageItems[activeMediaIndex] || { url: activePreviewPlatform.thumbnail, title: activePreviewPlatform.title };

                      return (
                        <div className="flex-1 flex flex-col justify-between">
                          {/* Main Image View */}
                          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative flex items-center justify-center p-2 mb-4">
                            <img
                              src={currentMedia.url}
                              alt={currentMedia.title || activePreviewPlatform.title}
                              className="max-h-[60vh] max-w-full object-contain rounded-xl"
                              loading="lazy"
                            />
                            {currentMedia.title && (
                              <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-xs text-white font-bold">
                                {currentMedia.title}
                              </div>
                            )}
                          </div>

                          {/* Thumbnails row */}
                          <div className="flex items-center gap-3 overflow-x-auto pb-2">
                            {imageItems.map((img, idx) => (
                              <button
                                key={img.id || idx}
                                onClick={() => setActiveMediaIndex(idx)}
                                className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                  activeMediaIndex === idx
                                    ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-400/20'
                                    : 'border-slate-800 opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" loading="lazy" />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 4. PRICING & TIERS TAB */}
                {previewTab === 'pricing' && (
                  <div className="w-full max-w-4xl py-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-white mb-2">أنظمة الترخيص والتسعير للمنصة</h3>
                      <p className="text-xs sm:text-sm text-slate-300">
                        اختر النظام الأنسب لميزانيتك واحتياجاتك؛ من الاشتراك الشهري المرن إلى التمليك التام لكود المصدر.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Monthly Plan */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
                        <div>
                          <div className="text-xs font-bold text-cyan-400 mb-1">الخيار المرن</div>
                          <h4 className="text-lg font-black text-white mb-2">نظام اشتراك شهري</h4>
                          <div className="text-3xl font-black text-white font-mono mb-3">
                            {activePreviewPlatform.pricing.monthly} {activePreviewPlatform.pricing.currency}
                            <span className="text-xs text-slate-400 font-sans"> / شهرياً</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            {activePreviewPlatform.pricing.monthlyNote || 'استضافة سريعة وصيانة دورية ودعم فني مستمر بدون التزام طويل الأجل.'}
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300 mb-6">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>استضافة سحابية شاملة</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>تحديثات أمنية مستمرة</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>دعم فني عبر واتساب والبريد</span>
                            </li>
                          </ul>
                        </div>

                        <button
                          onClick={() => {
                            setActivePreviewPlatform(null);
                            onSelectPlatformToOrder(
                              `${activePreviewPlatform.title} (شهري)`,
                              'monthly',
                              activePreviewPlatform.pricing.monthly,
                              activePreviewPlatform.pricing.currency
                            );
                          }}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                        >
                          اختيار الاشتراك الشهري
                        </button>
                      </div>

                      {/* Annual Plan */}
                      <div className="bg-slate-900/90 border-2 border-cyan-500 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-cyan-500/10">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 text-[11px] font-black px-3 py-0.5 rounded-full shadow">
                          توفير شهرين مجاناً
                        </span>
                        <div>
                          <div className="text-xs font-bold text-amber-400 mb-1">الأكثر توفيراً</div>
                          <h4 className="text-lg font-black text-white mb-2">نظام اشتراك سنوي</h4>
                          <div className="text-3xl font-black text-white font-mono mb-3">
                            {activePreviewPlatform.pricing.annual} {activePreviewPlatform.pricing.currency}
                            <span className="text-xs text-slate-400 font-sans"> / سنوياً</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            {activePreviewPlatform.pricing.annualNote || 'خصم 20% + نطاق (.com) مجاني + نسخ احتياطي يومي مشفر وتجهيز مجاني لهوية المنصة.'}
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300 mb-6">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>دومين ونطاق مجاني لعام كامل</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>تخصيص كامل للألوان والشعار</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>أولوية قصوى في الدعم الفني</span>
                            </li>
                          </ul>
                        </div>

                        <button
                          onClick={() => {
                            setActivePreviewPlatform(null);
                            onSelectPlatformToOrder(
                              `${activePreviewPlatform.title} (سنوي)`,
                              'annual',
                              activePreviewPlatform.pricing.annual,
                              activePreviewPlatform.pricing.currency
                            );
                          }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                        >
                          اختيار الاشتراك السنوي
                        </button>
                      </div>

                      {/* Lifetime Ownership Plan */}
                      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400 transition-all">
                        <div>
                          <div className="text-xs font-bold text-emerald-400 mb-1">الاستقلالية المطلقة</div>
                          <h4 className="text-lg font-black text-white mb-2">نظام تمليك دائم</h4>
                          <div className="text-3xl font-black text-white font-mono mb-3">
                            {activePreviewPlatform.pricing.lifetime} {activePreviewPlatform.pricing.currency}
                            <span className="text-xs text-slate-400 font-sans"> / لمرة واحدة</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            {activePreviewPlatform.pricing.lifetimeNote || 'امتلاك كامل لكود المصدر وقواعد البيانات وتثبيته على سيرفرك الخاص دون أي رسوم متكررة.'}
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300 mb-6">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>تسليم كود المصدر النظيف 100%</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>بدون أي عمولة على مبيعاتك للأبد</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>جلسة تدريبية لنقل الإدارة الفنية</span>
                            </li>
                          </ul>
                        </div>

                        <button
                          onClick={() => {
                            setActivePreviewPlatform(null);
                            onSelectPlatformToOrder(
                              `${activePreviewPlatform.title} (تمليك دائم)`,
                              'lifetime',
                              activePreviewPlatform.pricing.lifetime,
                              activePreviewPlatform.pricing.currency
                            );
                          }}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-md shadow-emerald-500/20"
                        >
                          طلب شراء وتمليك دائم
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
