import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Code2, 
  Headphones, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Briefcase, 
  Terminal, 
  Laptop,
  Check,
  MessageSquare,
  Clock,
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
  Globe
} from 'lucide-react';

type TrackType = 'developers' | 'customer-service';

export const JoinUs: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<TrackType>('developers');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Frontend Developer (React / Next.js)');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('1-3 سنوات');
  const [linkOrCv, setLinkOrCv] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const developerRoles = [
    'Frontend Developer (React / Next.js / Tailwind)',
    'Backend Engineer (Node.js / Express / APIs / PostgreSQL)',
    'Full-Stack Software Engineer',
    'Mobile & PWA Developer (React Native / Flutter / Web)',
    'UI/UX & Product Designer (Figma)',
    'DevOps & Cloud Systems Specialist (Docker / CI/CD)'
  ];

  const customerServiceRoles = [
    'أخصائي خدمة عملاء ومبيعات تقنية (Customer Care & Sales)',
    'موظف دعم فني ومساعدة عملاء المنصات (Technical Helpdesk)',
    'مدير حسابات ونجاح العملاء (Customer Success Manager)',
    'مشغل محادثات حية ومتابعة واتساب (Live Chat & WhatsApp Operations)',
    'أخصائي جودة وتجربة العملاء (Customer Experience & Quality)'
  ];

  const handleTrackChange = (track: TrackType) => {
    setActiveTrack(track);
    setRole(track === 'developers' ? developerRoles[0] : customerServiceRoles[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const stored = localStorage.getItem('webrex_developer_applicants');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({
        id: (activeTrack === 'developers' ? 'DEV-' : 'CS-') + Date.now(),
        track: activeTrack === 'developers' ? 'مبرمجين وتطوير' : 'خدمة عملاء ودعم فني',
        name,
        role,
        phone,
        experience,
        portfolioUrl: linkOrCv,
        notes,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('webrex_developer_applicants', JSON.stringify(list.slice(0, 80)));
    } catch (err) {
      console.warn('Could not save applicant locally:', err);
    }
    setSubmitted(true);
  };

  const whatsAppDirectUrl = `https://wa.me/201000000000?text=${encodeURIComponent(
    `مرحباً فريق ويب ريكس،\nأود الانضمام لفريقكم كـ: ${role} (${activeTrack === 'developers' ? 'مسار البرمجة' : 'مسار خدمة العملاء'})\nالاسم: ${name}\nرقم الهاتف: ${phone}\nالخبرة: ${experience}\nالرابط أو السيرة الذاتية: ${linkOrCv}`
  )}`;

  return (
    <section id="join-us" className="py-20 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-cyan-400 text-xs font-semibold">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>انضم إلى فريق عمل ويب ريكس</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            فرص عمل وانضمام <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">للمبرمجين وممثلي خدمة العملاء</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            نوسع عائلتنا دائماً بالكفاءات الشغوفة! سواء كنت مهندس برمجيات تبني منصات سحابية قوية، أو خبير خدمة عملاء ودعم فني يمتلك لباقة تواصل عالية واستجابة سريعة.
          </p>

          {/* Track Switcher (مبرمجين vs خدمة عملاء) */}
          <div className="pt-6 flex justify-center">
            <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-xl">
              <button
                type="button"
                onClick={() => handleTrackChange('developers')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTrack === 'developers'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>مسار المبرمجين والمطورين</span>
              </button>

              <button
                type="button"
                onClick={() => handleTrackChange('customer-service')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTrack === 'customer-service'
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>مسار خدمة العملاء والدعم الفني</span>
              </button>
            </div>
          </div>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-emerald-500/40 text-center space-y-5 max-w-xl mx-auto shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">تم استلام طلب انضمامك بنجاح!</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {activeTrack === 'developers'
                ? 'شكراً لك، سيقوم الفريق التقني بمراجعة سابقة أعمالك والتواصل معك عبر واتساب لمناقشة المشاريع المتاحة.'
                : 'شكراً لك، سيقوم مسؤول الموارد البشرية وإدارة خدمة العملاء بمراجعة بياناتك والتواصل معك هاتفياً.'}
            </p>
            <div className="pt-3">
              <a
                href={whatsAppDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إرسال السيرة الذاتية مباشرة لإدارة ويب ريكس عبر واتساب</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Highlights */}
            <div className="lg:col-span-5 space-y-4 text-right flex flex-col justify-between">
              {activeTrack === 'developers' ? (
                /* Developer Perks */
                <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-5 h-full flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>مميزات العمل معنا كمبرمج:</span>
                  </h4>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">عمل مرن عن بُعد 100%</h5>
                      <p className="text-xs text-slate-400 mt-0.5">حرية العمل من أي مكان مع تسليم ومراجعة كود عبر GitHub.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">مشاريع ومنصات كبرى</h5>
                      <p className="text-xs text-slate-400 mt-0.5">بناء وتطوير أنظمة ERP ومتاجر وأكاديميات تخدم مئات آلاف الزوار.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 shrink-0">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">عقود ومكافآت مجزية</h5>
                      <p className="text-xs text-slate-400 mt-0.5">دفعات مالية منتظمة لكل مشروع ومكافآت لجودة ونظافة الكود.</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Customer Service Perks */
                <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-5 h-full flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Headphones className="w-4 h-4" />
                    <span>مميزات العمل في خدمة العملاء:</span>
                  </h4>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">ورديات وساعات عمل مرنة</h5>
                      <p className="text-xs text-slate-400 mt-0.5">إمكانية اختيار الشيفت المناسب (صباحي / مسائي) عن بُعد.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 shrink-0">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">بيئة عمل احترافية ومحترمة</h5>
                      <p className="text-xs text-slate-400 mt-0.5">تدريب شامل على كافة أنظمة المنصة وأدوات إدارة المحادثات السريعة.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">رواتب ثابتة وعمولات إضافية</h5>
                      <p className="text-xs text-slate-400 mt-0.5">راتب شهري مجزي مع بونص عند إغلاق استشارات وطلبات المنصات.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="p-7 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4 text-right shadow-2xl">
                
                <div className="pb-2 border-b border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    نموذج التقديم: {activeTrack === 'developers' ? 'فريق المطورين' : 'فريق خدمة العملاء'}
                  </span>
                  <span className="text-[11px] text-cyan-400">جميع الحقول مطلوبة</span>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: محمد عبد الله"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Role select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الوظيفة أو التخصص المطلوب *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    {(activeTrack === 'developers' ? developerRoles : customerServiceRoles).map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      رقم الهاتف / واتساب *
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 000 0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 text-left font-mono"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      سنوات الخبرة *
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="مبتدئ / حديث تخرج">مبتدئ / حديث تخرج</option>
                      <option value="1 - 3 سنوات">1 - 3 سنوات</option>
                      <option value="3 - 5 سنوات">3 - 5 سنوات</option>
                      <option value="أكثر من 5 سنوات">أكثر من 5 سنوات (خبير)</option>
                    </select>
                  </div>
                </div>

                {/* Link or Portfolio */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {activeTrack === 'developers' 
                      ? 'رابط معرض الأعمال أو GitHub أو LinkedIn *'
                      : 'رابط السيرة الذاتية (Google Drive / LinkedIn) أو حسابك *'}
                  </label>
                  <input
                    type="url"
                    required
                    dir="ltr"
                    value={linkOrCv}
                    onChange={(e) => setLinkOrCv(e.target.value)}
                    placeholder="https://github.com/your-username or cv link"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 text-left font-mono"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    نبذة سريعة عن مهاراتك أو سابق خبراتك
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={activeTrack === 'developers' 
                      ? 'اذكر أحدث أطر العمل التي تستخدمها (React, Node, etc)...' 
                      : 'اذكر خبراتك السابقة في الرد على العملاء واللباقة وسرعة الكتابة...'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال طلب الانضمام إلى ويب ريكس</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
