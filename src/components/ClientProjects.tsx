import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Quote, 
  ArrowUpRight,
  ShieldCheck,
  Award,
  Globe,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Film,
  Maximize2,
  X
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { ClientProject, getClientProjects } from '../services/clientProjects';

const Player: any = (ReactPlayer as any).default || ReactPlayer;

interface ClientProjectsProps {
  onNavigateToOrder?: () => void;
}

export const ClientProjects: React.FC<ClientProjectsProps> = ({ onNavigateToOrder }) => {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ClientProject | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');
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
    loadProjects();
    const handleStorageChange = () => loadProjects();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadProjects = () => {
    setProjects(getClientProjects());
  };

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

  const industries = ['all', ...Array.from(new Set(projects.map(p => p.industry)))];

  const filteredProjects = selectedIndustry === 'all'
    ? projects
    : projects.filter(p => p.industry === selectedIndustry);

  return (
    <section id="client-projects" className="py-20 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/60 border border-teal-500/30 text-teal-300 text-xs font-bold mb-4">
            <Award className="w-4 h-4 text-teal-400" />
            <span>مشاريع برمجية تم تسليمها وتشغيلها بنجاح</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            أعمال برمجية منشورة <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">لعملاء نفخر بشراكتهم</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            استعرض نماذج حقيقية من المنصات والأنظمة التي قمنا بتطويرها لشركات ومؤسسات في السعودية، الإمارات ومصر، وتعمل الآن في بيئة الإنتاج الحية بكفاءة استثنائية.
          </p>

          {/* Industry Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedIndustry === ind
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 shadow-lg shadow-teal-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {ind === 'all' ? 'كافة القطاعات والمجالات' : ind}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/80 border border-slate-800/90 hover:border-teal-500/40 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Image & Live Status Header */}
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-950 border border-slate-800">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Live Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                      <span>منشور ويعمل حياً</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-teal-300 text-[11px] font-bold border border-teal-500/30 backdrop-blur-sm">
                      {project.industry}
                    </span>
                  </div>

                  {/* Location badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-3 py-1 rounded-xl backdrop-blur-sm border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{project.location}</span>
                  </div>

                  {/* Launch Link & Video Button Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveVideoUrl(project.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                        setActiveVideoTitle(project.title);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow backdrop-blur-sm cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>فيديو المشروع</span>
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-teal-500 hover:text-slate-950 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-all border border-teal-500/30 shadow backdrop-blur-sm"
                    >
                      <span>زيارة الموقع</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Client Info Bar */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span className="text-slate-400">العميل:</span>
                    <strong className="text-white">{project.clientName}</strong>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{project.completionDate}</span>
                  </div>
                </div>

                {/* Project Title & Description */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Measurable Business Results */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-teal-900/40">
                  <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    <span>النتائج والإنجازات التشغيلية للمشروع:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {project.results.map((res: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Testimonial Card */}
                {project.testimonial && (
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 relative">
                    <Quote className="w-6 h-6 text-teal-500/20 absolute top-3 left-3" />
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                      {Array.from({ length: project.testimonial.rating }).map((_, i: number) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 italic mb-3 leading-relaxed">
                      "{project.testimonial.quote}"
                    </p>
                    <div className="text-[11px] text-slate-400">
                      <strong className="text-white block">{project.testimonial.clientPerson}</strong>
                      <span>{project.testimonial.role}</span>
                    </div>
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>تصفح المنصة على الإنترنت</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {onNavigateToOrder && (
                  <button
                    onClick={onNavigateToOrder}
                    className="px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 hover:text-white font-bold text-xs transition-all cursor-pointer"
                  >
                    اطلب مشروعاً مماثلاً
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Popup with Fullscreen Support */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-teal-500/40 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center gap-2 truncate max-w-md">
                  <Play className="w-4 h-4 text-red-500 fill-current shrink-0" />
                  <span className="truncate">{activeVideoTitle}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const elem = document.getElementById('client-video-modal-wrapper');
                      if (elem) {
                        if (!document.fullscreenElement) {
                          elem.requestFullscreen().catch(err => console.error(err));
                        } else {
                          document.exitFullscreen().catch(err => console.error(err));
                        }
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-teal-500/30 shadow"
                    title="توسيع ملء الشاشة لعرض بجودة عالية"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>توسيع (Fullscreen)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveVideoUrl(null);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div id="client-video-modal-wrapper" className="aspect-video w-full bg-black relative overflow-hidden group">
                {activeVideoUrl && (activeVideoUrl.includes('youtube.com') || activeVideoUrl.includes('youtu.be')) ? (
                  <iframe
                    src={getEmbedUrl(activeVideoUrl)}
                    title="Client Project Video Tour"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeVideoUrl || ''}
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
                      className="p-3 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 transition-all cursor-pointer"
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
