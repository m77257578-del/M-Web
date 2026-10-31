import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Copy, 
  Check, 
  Sparkles, 
  Send,
  HelpCircle,
  QrCode,
  DollarSign
} from 'lucide-react';

interface PaymentMethodsProps {
  onSelectPaymentMethod?: (methodName: string) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onSelectPaymentMethod }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const paymentCategories = [
    {
      id: 'instapay-wallets',
      title: 'انستا باي والمحافظ الإلكترونية (InstaPay & E-Wallets)',
      badge: 'الأسرع والأسهل في مصر والشرق الأوسط',
      description: 'تحويلات مالية لحظية بدون أي عمولات إضافية عبر التطبيقات البنكية والمحافظ الرقمية.',
      accent: 'from-emerald-500 to-teal-400',
      methods: [
        {
          id: 'instapay',
          name: 'InstaPay (انستا باي)',
          icon: Smartphone,
          details: 'IPA: webrex@instapay / رقم الجوال: 01000000000',
          copyVal: 'webrex@instapay',
          note: 'تحويل لحظي متاح 24/7 من أي تطبيق بنكي مصري'
        },
        {
          id: 'vodafone-cash',
          name: 'فودافون كاش / المحافظ الرقمية',
          icon: Smartphone,
          details: 'رقم المحفظة: 01000000000',
          copyVal: '01000000000',
          note: 'أكواد شحن مباشر أو تحويل محفظة إلى محفظة'
        },
        {
          id: 'stc-pay',
          name: 'STC Pay / Urpay (السعودية)',
          icon: Smartphone,
          details: 'رقم الجوال المعتمد: 0500000000',
          copyVal: '0500000000',
          note: 'تحويل فوري مالي داخل المملكة العربية السعودية'
        }
      ]
    },
    {
      id: 'bank-transfers',
      title: 'التحويلات البنكية المباشرة (Bank Wire / IBAN)',
      badge: 'معتمد للشركات والمؤسسات',
      description: 'حسابات بنكية رسمية وموثقة في كبرى البنوك العربية لحسابات الشركات والأفراد.',
      accent: 'from-cyan-500 to-blue-500',
      methods: [
        {
          id: 'alrajhi',
          name: 'مصرف الراجحي (السعودية)',
          icon: Building2,
          details: 'IBAN: SA0080000000000000000000',
          copyVal: 'SA0080000000000000000000',
          note: 'الاسم: شركة ويب ريكس للحلول البرمجية'
        },
        {
          id: 'nbe',
          name: 'البنك الأهلي المصري (NBE)',
          icon: Building2,
          details: 'IBAN: EG00000000000000000000000000',
          copyVal: 'EG00000000000000000000000000',
          note: 'حساب رسمي معتمد بالجنيه المصري والدولار'
        },
        {
          id: 'dib',
          name: 'بنك دبي الإسلامي (الإمارات)',
          icon: Building2,
          details: 'IBAN: AE000000000000000000000',
          copyVal: 'AE000000000000000000000',
          note: 'للعملاء والشركات في دولة الإمارات والخليج'
        }
      ]
    },
    {
      id: 'cards-global',
      title: 'البطاقات الائتمانية والدفع الدولي (Visa / MasterCard / PayPal)',
      badge: 'لكافة دول العالم',
      description: 'ادفع بأمان تام عبر بطاقتك البنكية المباشرة مع حماية مشفرة بروتوكول SSL 256-bit.',
      accent: 'from-indigo-500 to-purple-500',
      methods: [
        {
          id: 'visa-mastercard',
          name: 'فيزا وماستركارد ومدى (Visa / MasterCard / Mada)',
          icon: CreditCard,
          details: 'بوابة دفع إلكترونية آمنة ومباشرة',
          copyVal: 'https://webrex.dev/pay',
          note: 'دعم جميع العملات المحلية والدولية تلقائياً'
        },
        {
          id: 'paypal',
          name: 'بايبال (PayPal)',
          icon: Globe,
          details: 'الحساب: pay@webrex.dev',
          copyVal: 'pay@webrex.dev',
          note: 'مثالي للعملاء من أوروبا، أمريكا وكافة دول العالم'
        },
        {
          id: 'tabby-tamara',
          name: 'الدفع الميسر والتقسيط (50% / 50%)',
          icon: Clock,
          details: 'نظام الدفع على دفعتين: 50% عند البدء و 50% عند التسليم',
          copyVal: '50/50 Payment Plan',
          note: 'ضمان كامل لمعاينة واختبار كود مشروعك قبل السداد النهائي'
        }
      ]
    }
  ];

  return (
    <section id="payment-methods" className="py-24 bg-slate-950/60 relative overflow-hidden backdrop-blur-sm border-t border-slate-800/60">
      {/* Background ambient highlights */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-emerald-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-cyan-400 text-xs font-semibold">
            <CreditCard className="w-3.5 h-3.5" />
            <span>طرق وسائل الدفع الرسمية (Payment Methods)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            وسائل دفع متعددة وآمنة{' '}
            <span className="bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              لتسهيل التعامل المالي
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            نوفر لك خيارات دفع مرنة ومتنوعة تناسب جميع الدول والمحافطات، بدءاً من انستا باي والمحافظ الإلكترونية، التحويلات البنكية المباشرة، وحتى البطاقات الائتمانية الدولية مع نظام الدفع الميسر (50% عند البدء و 50% عند التسليم النهائي).
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>تشفير مالي آمن 100% ومعاملات فورية مؤكدة</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Categories Stream */}
        <div className="space-y-12">
          {paymentCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl relative overflow-hidden"
            >
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r ${cat.accent} text-slate-950 shadow-md`}>
                      {cat.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{cat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{cat.description}</p>
                </div>
              </div>

              {/* Methods Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cat.methods.map((method) => {
                  const Icon = method.icon;
                  const isCopied = copiedId === method.id;

                  return (
                    <div
                      key={method.id}
                      className="bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          <button
                            onClick={() => copyToClipboard(method.copyVal, method.id)}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer border border-slate-800 flex items-center gap-1 text-xs"
                            title="نسخ بيانات التحويل"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">تم النسخ</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>نسخ</span>
                              </>
                            )}
                          </button>
                        </div>

                        <h4 className="text-base font-bold text-white mb-2">{method.name}</h4>
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 break-all mb-3 select-all">
                          {method.details}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-2 border-t border-slate-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{method.note}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flexible Payment Workflow Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-right">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>سياسة التعامل المالي العادل والمعتمد</span>
              </div>
              <h4 className="text-xl font-black text-white">
                هل تحتاج إلى استشارة مالية أو فاتورة رسمية باسم مؤسستك؟
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                نقوم بإصدار فواتير إلكترونية معتمدة وإيصالات استلام رسمية لكل دفعة تحويل، مع تقديم ضمان برمجي شامل واتفاقية مستوى خدمة (SLA) لحماية كافة حقوقك.
              </p>
            </div>

            <a
              href="https://wa.me/201000000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%81%D8%B1%D9%8A%D9%82%20%D9%88%D9%8A%D8%A8%20%D8%B1%D9%8A%D9%83%D8%B3%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B7%D8%B1%D9%82%20%D8%A7%D9%84%D8%AF%D9%81%D8%B9%20%D9%88%D8%A7%D9%84%D9%81%D9%88%D8%A7%D8%AA%D9%8A%D8%B1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0 hover:opacity-95 transition-all"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>تواصل مع قسم الحسابات والمالية</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
