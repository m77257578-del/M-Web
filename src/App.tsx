import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Sparkles, 
  Code2, 
  Layers, 
  ShieldCheck, 
  Users, 
  Send, 
  ArrowRight, 
  Grid,
  CreditCard,
  Laptop,
  Award,
  BookOpen
} from 'lucide-react';
import { Navbar, PlatformTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { DemoPlatforms } from './components/DemoPlatforms';
import { ClientProjects } from './components/ClientProjects';
import { Articles } from './components/Articles';
import { Services } from './components/Services';
import { PaymentMethods } from './components/PaymentMethods';
import { Portfolio } from './components/Portfolio';
import { OrderForm } from './components/OrderForm';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { JoinUs } from './components/JoinUs';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { SpaceBackground } from './components/SpaceBackground';

export default function App() {
  const [activeTab, setActiveTab] = useState<PlatformTab>('all');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [orderServiceTitle, setOrderServiceTitle] = useState('طلب تطوير برمجسي شامل من ويب ريكس');

  const navigateToOrder = (serviceName?: string) => {
    if (serviceName) {
      setOrderServiceTitle(serviceName);
    } else {
      setOrderServiceTitle('طلب تطوير برمجسي شامل من ويب ريكس');
    }
    setWhatsappModalOpen(true);
  };

  const navigateToPortfolio = () => {
    setActiveTab('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabsConfig = [
    { 
      id: 'all' as PlatformTab, 
      label: 'الرئيسية الشاملة', 
      icon: Grid,
      desc: 'استعراض المنصة بالكامل' 
    },
    { 
      id: 'demo-platforms' as PlatformTab, 
      label: 'منصات المعاينة', 
      icon: Laptop,
      desc: 'تجربة حية داخل التطبيق' 
    },
    { 
      id: 'client-projects' as PlatformTab, 
      label: 'أعمال العملاء', 
      icon: Award,
      desc: 'مشاريع حية منشورة' 
    },
    { 
      id: 'articles' as PlatformTab, 
      label: 'مقالاتنا', 
      icon: BookOpen,
      desc: 'أدلة ومعمارية برمجية' 
    },
    { 
      id: 'payment-methods' as PlatformTab, 
      label: 'طرق الدفع', 
      icon: CreditCard,
      desc: 'وسائل الدفع والتحويلات' 
    },
    { 
      id: 'services' as PlatformTab, 
      label: 'خدمات البرمجة', 
      icon: Code2,
      desc: 'المنصات، المتاجر والأنظمة' 
    },
    { 
      id: 'portfolio' as PlatformTab, 
      label: 'سابقة أعمالنا', 
      icon: Layers,
      desc: 'نماذج وتطبيقات الويب' 
    },
    { 
      id: 'about' as PlatformTab, 
      label: 'منهجيتنا', 
      icon: ShieldCheck,
      desc: 'معايير الجودة والسرعة' 
    },
    { 
      id: 'join-us' as PlatformTab, 
      label: 'انضم إلينا', 
      icon: Users,
      desc: 'مبرمجين وخدمة عملاء' 
    },
    { 
      id: 'order' as PlatformTab, 
      label: 'اطلب مشروعك', 
      icon: Send,
      desc: 'نموذج الطلب المباشر' 
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-['Cairo',sans-serif] relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Modern Programming Space & Animated Stars Background */}
      <SpaceBackground />

      {/* 1. Sticky Navbar (Contains secret 3-clicks on platform icon for Admin) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToOrder={() => navigateToOrder()}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 pt-16">
        {/* Hero is always shown on 'all' tab, or as a compact branded header on specific tabs */}
        {activeTab === 'all' ? (
          <>
            <Hero
              onNavigateToOrder={() => navigateToOrder()}
              onNavigateToPortfolio={navigateToPortfolio}
            />

            {/* Interactive Section Switcher Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-4">
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-2.5 backdrop-blur-md shadow-xl shadow-cyan-950/10">
                <div className="flex items-center justify-between pb-2.5 px-3 border-b border-slate-800/60 text-xs">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>تصفح المنصة حسب التبويبات والأقسام:</span>
                  </div>
                  <span className="text-slate-400 hidden sm:inline-block">
                    انقر على أي تبويب للانتقال إلى قسم مخصص ومستقل
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 pt-2.5">
                  {tabsConfig.map((t) => {
                    const Icon = t.icon;
                    const isSelected = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveTab(t.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-200 text-center cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/40 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-slate-950/50 hover:bg-slate-800/50 border border-slate-800/60 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold">{t.label}</span>
                        <span className="text-[9px] text-slate-400 mt-0.5 hidden sm:block truncate w-full">{t.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Complete Stream of Sections */}
            {/* 1. Interactive Demo Platforms with In-App Preview & 3-Tier Pricing */}
            <div id="demo-platforms">
              <DemoPlatforms 
                onSelectPlatformToOrder={(platformTitle) => navigateToOrder(platformTitle)} 
              />
            </div>

            {/* 2. Real Published Client Works */}
            <div id="client-projects">
              <ClientProjects onNavigateToOrder={() => navigateToOrder()} />
            </div>

            {/* 3. Payment Methods */}
            <div id="payment-methods">
              <PaymentMethods onSelectPaymentMethod={(method) => navigateToOrder(method)} />
            </div>

            {/* 4. Articles / Blog Section */}
            <div id="articles">
              <Articles onNavigateToOrder={(context) => navigateToOrder(context)} />
            </div>

            {/* 5. Core Services */}
            <div id="services">
              <Services onSelectService={(serviceTitle) => navigateToOrder(serviceTitle)} />
            </div>

            {/* 6. Portfolio Showcase */}
            <div id="portfolio">
              <Portfolio onNavigateToOrder={() => navigateToOrder()} />
            </div>

            {/* 7. Why Us & Process */}
            <div id="why-us">
              <WhyUs />
            </div>

            <div id="process">
              <Process />
            </div>

            {/* 8. Join Us (Programmers & Customer Service) */}
            <div id="join-us">
              <JoinUs />
            </div>

            {/* 9. Order Form */}
            <div id="order-form">
              <OrderForm initialService={selectedService} />
            </div>

            {/* 10. FAQ */}
            <div id="faq">
              <Faq />
            </div>
          </>
        ) : (
          /* Dedicated Tab View */
          <div className="py-6">
            {/* Tab Header Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                    <span>قسم مخصص</span>
                    <span>•</span>
                    <button 
                      onClick={() => setActiveTab('all')}
                      className="hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>العودة إلى العرض الشامل للمنصة</span>
                      <ArrowRight className="w-3 h-3 rotate-180" />
                    </button>
                  </div>
                  <h1 className="text-2xl font-black text-white">
                    {tabsConfig.find(t => t.id === activeTab)?.label}
                  </h1>
                </div>

                {/* Sub Tab Switcher Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
                  {tabsConfig.map((t) => {
                    const isSelected = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveTab(t.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tab Specific Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'demo-platforms' && (
                <motion.div
                  key="demo-platforms"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <DemoPlatforms onSelectPlatformToOrder={(platformTitle) => navigateToOrder(platformTitle)} />
                </motion.div>
              )}

              {activeTab === 'client-projects' && (
                <motion.div
                  key="client-projects"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ClientProjects onNavigateToOrder={() => navigateToOrder()} />
                </motion.div>
              )}

              {activeTab === 'articles' && (
                <motion.div
                  key="articles"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Articles onNavigateToOrder={(context) => navigateToOrder(context)} />
                </motion.div>
              )}

              {activeTab === 'payment-methods' && (
                <motion.div
                  key="payment-methods"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentMethods onSelectPaymentMethod={(method) => navigateToOrder(method)} />
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Services onSelectService={(serviceTitle) => navigateToOrder(serviceTitle)} />
                </motion.div>
              )}

              {activeTab === 'portfolio' && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Portfolio onNavigateToOrder={() => navigateToOrder()} />
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <WhyUs />
                  <Process />
                  <Faq />
                </motion.div>
              )}

              {activeTab === 'join-us' && (
                <motion.div
                  key="join-us"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <JoinUs />
                </motion.div>
              )}

              {activeTab === 'order' && (
                <motion.div
                  key="order"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <OrderForm initialService={selectedService} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Footer (Contains squircle social media icons matching user's design) */}
      <Footer onNavigateToOrder={() => navigateToOrder()} />

      {/* Secret Admin Modal (Triggered ONLY by 3 consecutive clicks on the platform logo icon) */}
      <AnimatePresence>
        {adminModalOpen && (
          <AdminModal
            isOpen={adminModalOpen}
            onClose={() => setAdminModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        serviceTitle={orderServiceTitle}
      />
    </div>
  );
}
