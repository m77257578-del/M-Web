import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  User, 
  FileText, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  Copy, 
  Check, 
  MessageSquare
} from 'lucide-react';
import { submitOrderToFirestore } from '../services/firebase';

interface OrderFormProps {
  initialService?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState(
    initialService ? `أرغب في طلب: ${initialService}.\n` : ''
  );
  const [projectCategory, setProjectCategory] = useState<string>('موقع مخصص');

  useEffect(() => {
    if (initialService) {
      setDetails(`أرغب في طلب: ${initialService}.\n`);
      setProjectCategory(initialService.includes('باقة') ? initialService : 'موقع مخصص');
    }
  }, [initialService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [orderReferenceId, setOrderReferenceId] = useState<string>('');
  const [submissionMode, setSubmissionMode] = useState<'firestore' | 'local'>('firestore');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Quick project types helper
  const projectTypes = [
    { label: 'متجر إلكتروني متكامل', desc: 'متجر سحابي سريع مع بوابات دفع' },
    { label: 'نظام إدارة سحابي (ERP/CRM)', desc: 'لوحة تحكم للموظفين والعمليات' },
    { label: 'موقع شركة / صفحة هبوط', desc: 'موقع تعريفي احترافي بتصميم مخصص' },
    { label: 'منصة ويب متقدمة', desc: 'تطبيق ويب تفاعلي متعدد الصلاحيات' },
    { label: 'تطوير أو صيانة موقع حالي', desc: 'تسريع، تأمين، أو إضافة مزايا جديدة' },
  ];

  const handleSelectProjectType = (type: string) => {
    setProjectCategory(type);
    if (!details.includes(type)) {
      setDetails((prev) => {
        const trimmed = prev.trim();
        return trimmed ? `${trimmed}\nنوع المشروع المختار: ${type}` : `نوع المشروع المختار: ${type}\nتفاصيل الفكرة: `;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim()) {
      setErrorMessage('يرجى إدخال اسمك بالكامل.');
      return;
    }
    if (name.trim().length < 3) {
      setErrorMessage('يجب أن يحتوي الاسم على 3 أحرف على الأقل.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('يرجى إدخال رقم الواتساب للتواصل معك.');
      return;
    }
    if (phone.trim().length < 7) {
      setErrorMessage('يرجى التأكد من كتابة رقم هاتف صالح.');
      return;
    }
    if (!details.trim()) {
      setErrorMessage('يرجى كتابة بعض تفاصيل المشروع أو متطلباتك.');
      return;
    }
    if (details.trim().length < 8) {
      setErrorMessage('يرجى توضيح متطلبات المشروع بصورة أكثر تفصيلاً (8 أحرف على الأقل).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calls Firebase Firestore addDoc on 'orders' collection
      const result = await submitOrderToFirestore({
        name,
        phone,
        details: `[التصنيف: ${projectCategory}]\n${details}`
      });

      if (result.success) {
        setSubmitSuccess(true);
        setOrderReferenceId(result.id || 'WR-' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setSubmissionMode(result.mode);
        // Reset fields
        setName('');
        setPhone('');
        setDetails('');
      } else {
        setErrorMessage(result.error || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'تعذر الاتصال بالخادم. يرجى المحاولة مجدداً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefId = () => {
    if (orderReferenceId) {
      navigator.clipboard.writeText(orderReferenceId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  // WhatsApp quick link for direct contact
  const cleanPhoneForWhatsApp = phone.replace(/[^0-9]/g, '');
  const whatsAppDirectUrl = `https://wa.me/201000000000?text=${encodeURIComponent(
    `مرحباً فريق ويب ريكس،\nأنا: ${name || 'عميل'}\nرقمي: ${phone || ''}\nأود الاستفسار عن مشروع: ${projectCategory}\nالتفاصيل: ${details || 'أرغب في مناقشة تفاصيل المشروع'}`
  )}`;

  return (
    <section id="order-form" className="py-24 bg-slate-950/60 relative overflow-hidden backdrop-blur-sm">
      {/* Background radial glowing effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>طلب مشروع جديد (Contact & Order)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ابدأ مشروعك البرمجي اليوم مع ويب ريكس
          </h2>

          <p className="text-slate-400 text-base">
            املأ بياناتك وتفاصيل مشروعك في النموذج أدناه، وسيتواصل معك مهندسونا التقنيون فوراً لمناقشة خطة العمل.
          </p>
        </motion.div>

        {/* Success Modal / Card State with AnimatePresence */}
        <AnimatePresence mode="wait">
          {submitSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl shadow-emerald-950/30 max-w-2xl mx-auto"
            >
            
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                تم استلام طلبك وتأكيده بنجاح
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                شكراً لك! تم استلام طلب مشروعك بنجاح
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
                يقوم فريق المهندسين في "ويب ريكس" الآن بمراجعة متطلباتك الفنية وسنتواصل معك عبر الواتساب في أقل من ساعتين لمناقشة خطة التنفيذ والعرض المالي.
              </p>
            </div>

            {/* Reference ID card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 inline-flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-md mx-auto">
              <div className="text-right">
                <div className="text-[11px] text-slate-500">رقم الطلب المرجعي في النظام:</div>
                <div className="font-mono text-cyan-300 font-bold text-base sm:text-lg">{orderReferenceId}</div>
              </div>
              <button
                onClick={copyRefId}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId ? 'تم النسخ!' : 'نسخ الرقم'}</span>
              </button>
            </div>

            {/* Actions: Send Another or Chat on WhatsApp */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsAppDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>تواصل فوراً عبر واتساب مع المهندس</span>
              </a>

              <button
                onClick={() => setSubmitSuccess(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                إرسال طلب مشروع آخر
              </button>
            </div>

          </motion.div>
        ) : (
          /* The Interactive Order Form Card */
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
          >
            
            {/* Quick Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-200 mb-3 text-right">
                اختر نوع المشروع المطلوب للبدء السريع:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {projectTypes.map((type) => (
                  <button
                    type="button"
                    key={type.label}
                    onClick={() => handleSelectProjectType(type.label)}
                    className={`p-3 rounded-xl text-right transition-all border cursor-pointer ${
                      projectCategory === type.label
                        ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{type.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              
              {/* Error Alert */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Inputs Grid: Name & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Field 1: name [String] */}
                <div className="space-y-2">
                  <label htmlFor="client-name" className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-cyan-400" />
                      <span>اسم العميل بالكامل *</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">Field: name</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: المهندس أحمد إبراهيم"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all"
                  />
                </div>

                {/* Field 2: phone [String] */}
                <div className="space-y-2">
                  <label htmlFor="client-phone" className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-teal-400" />
                      <span>رقم الواتساب مع كود الدولة *</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">Field: phone</span>
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: +966 50 123 4567 أو +20 100 123 4567"
                    dir="ltr"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-left transition-all"
                  />
                </div>

              </div>

              {/* Field 3: details [String] */}
              <div className="space-y-2">
                <label htmlFor="project-details" className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>تفاصيل المشروع المطلوبة والمميزات المرغوبة *</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Field: details</span>
                </label>
                <textarea
                  id="project-details"
                  required
                  rows={5}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="اشرح لنا فكرة مشروعك، المميزات الأساسية التي تحتاجها، وأي مواقع أو أمثلة تعجبك..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all leading-relaxed resize-y"
                />
              </div>

              {/* Security & Firestore schema reassurance badge */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    بياناتك محمية بقواعد أمان Firestore الصارمة: المستند ينشأ في <code className="text-cyan-300 font-mono">orders</code> مع حظر التعديل والقراءة لغير الإدارة.
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>رد خلال ساعتين</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>جاري إرسال الطلب وحفظه في Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>إرسال طلب المشروع الآن</span>
                    </>
                  )}
                </button>

                {/* Direct WhatsApp fallback */}
                <a
                  href={whatsAppDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>أو تواصل معنا مباشرة عبر واتساب</span>
                </a>
              </div>

            </form>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </section>
  );
};
