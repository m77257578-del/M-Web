import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, PhoneCall, Bot, User, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'أهلاً بك في دعم ومبيعات WebRex! كيف يمكننا مساعدتك في مشروعك البرمجي اليوم؟',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if chat is enabled by admin in localStorage
  useEffect(() => {
    const checkEnabled = () => {
      try {
        const stored = localStorage.getItem('webrex_chat_enabled');
        if (stored !== null) {
          setEnabled(JSON.parse(stored));
        }
      } catch (e) {
        console.warn(e);
      }
    };

    checkEnabled();
    const interval = setInterval(checkEnabled, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    // Simulate intelligent sales bot response
    setTimeout(() => {
      let replyText = 'شكراً لتواصلك معنا! قام فريق المبيعات بتسجيل استفسارك وسيتم الرد عليك في أسرع وقت. يمكنك أيضاً التواصل المباشر عبر واتساب.';
      if (currentInput.includes('سعر') || currentInput.includes('تكلفة') || currentInput.includes('باقات')) {
        replyText = 'تبدأ أسعار مشاريعنا البرمجية من 299$ للمنصات والمتاجر الجاهزة، وتختلف حسب المتطلبات. هل ترغب في الاطلاع على قسم "منصات المعاينة والتسعير" أو طلب استشارة مجانية؟';
      } else if (currentInput.includes('موقع') || currentInput.includes('متجر') || currentInput.includes('تطبيق')) {
        replyText = 'نحن نبني منصات ويب ومتاجر إلكترونية وأنظمة ERP متطورة باستخدام أحدث تقنيات React و TypeScript و Firebase. هل تفضل منصة جاهزة أم برمجة خاصة لشركتك؟';
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  if (!enabled) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans" dir="rtl">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/30 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">دعم ومبيعات WebRex</h4>
                <p className="text-[11px] text-cyan-300">متواجدون للإجابة على استفساراتك الآن</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-80 overflow-y-auto space-y-3 bg-slate-950/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-600/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl w-fit">
                <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>فريق المبيعات يكتب الرد...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => {
                setInputValue('ما هي أسعار وتكلفة تطوير منصة جديدة؟');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 shrink-0 transition-colors cursor-pointer"
            >
              استفسار عن الأسعار
            </button>
            <button
              onClick={() => {
                setInputValue('كيف يمكنني طلب معاينة حية لمنصاتكم؟');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 shrink-0 transition-colors cursor-pointer"
            >
              معاينة المنصات
            </button>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md shadow-cyan-500/20 shrink-0"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/40 transition-all transform hover:scale-105 cursor-pointer"
        title="تواصل فوري مع المبيعات"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};
