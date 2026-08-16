import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  Wand2, 
  Lightbulb, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { SYSTEM_TEMPLATES } from '../data/templates';
import { GeneratedSystem } from '@saasx/shared';

interface ChatPanelProps {
  onGenerate: (prompt: string) => Promise<void>;
  onSelectTemplate: (template: GeneratedSystem) => void;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SAMPLE_PROMPTS = [
  'أريد نظام إدارة مطعم متكامل مع جدول وجبات وجدول طلبات وقاعدة بيانات Supabase ودفع زين كاش مع تنبيه المطبخ عبر n8n.',
  'نظام حجز عيادة طبية مع دفع عربون 10,000 دينار بآمان عبر فاست باي وتذكير واتساب أوتوماتيكي.',
  'نظام إعارات الموارد البشرية والرواتب الشهرية وتوزيع المستحقات برقم الموبايل.',
  'متجر أونلاين للألبسة مع حساب كلفة التوصيل أوتوماتيكياً وقاعدة بيانات الطلبات مع حماية RLS.'
];

export const ChatPanel: React.FC<ChatPanelProps> = ({
  onGenerate,
  onSelectTemplate,
  isLoading,
  isOpen,
  setIsOpen
}) => {
  const [prompt, setPrompt] = useState('');
  const [step, setStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    // Simulate multi-step progress for high responsiveness
    setStep(1);
    const interval = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 900);

    try {
      await onGenerate(prompt);
      setPrompt('');
    } finally {
      clearInterval(interval);
      setStep(0);
    }
  };

  return (
    <aside
      className={`fixed top-16 right-0 bottom-0 z-30 w-full sm:w-[400px] bg-[#0F172A]/95 border-l border-slate-800 backdrop-blur-xl transition-transform duration-300 flex flex-col shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Toggle Drawer Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-10 top-6 bg-[#38BDF8] text-white p-2 rounded-l-xl shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:bg-[#0284C7] transition flex items-center justify-center"
        title={isOpen ? 'إغلاق اللوحة' : 'فتح لوحة الذكاء الاصطناعي'}
      >
        {isOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-100">مساعد SAASX الذكي</h3>
            <span className="text-[11px] text-slate-400">بناء وتصميم الأنظمة بلغة عربية طبيعية</span>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
          AI Engine
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        
        {/* Quick Instructions */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <p className="font-bold text-[#38BDF8] mb-1 flex items-center gap-1">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            كيف تعمل أتمتة SAASX؟
          </p>
          ادخل وصف نظامك بالعربية (مثال: "أريد نظام مبيعات عيادة مع فاست باي وقاعدة بيانات"). سيقوم النظام فوراً ببناء المخطط الهيكلي، وجداول Supabase وسياسات الأمان RLS، وسير عمل n8n الملتزم بمسار البيانات <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">D:\saasx-data\n8n</code>.
        </div>

        {/* Ready Presets / Templates */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 mb-2.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            نماذج أنظمة جاهزة للاختبار المباشر:
          </h4>
          <div className="space-y-2">
            {SYSTEM_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl)}
                className="w-full text-right p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-[#38BDF8]/50 transition group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-200 group-hover:text-[#38BDF8] transition">
                    {tmpl.titleAr}
                  </span>
                  <span className="text-[10px] bg-sky-950 text-[#38BDF8] border border-sky-800 px-1.5 py-0.5 rounded">
                    {tmpl.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {tmpl.descriptionAr}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 mb-2">أفكار سريعة للاقتراح:</h4>
          <div className="space-y-1.5">
            {SAMPLE_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(p)}
                className="w-full text-right text-[11px] text-slate-300 bg-slate-900/40 hover:bg-slate-800/60 p-2 rounded-lg border border-slate-800 hover:border-slate-700 transition line-clamp-2"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Live Loading Step Indicator */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-[#0284C7]/10 border border-[#38BDF8]/40 space-y-3">
            <div className="flex items-center gap-2 text-[#38BDF8] text-xs font-bold">
              <Loader2 className="w-4 h-4 animate-spin text-[#38BDF8]" />
              جاري هندسة النظام وتوليد الهيكلية...
            </div>
            
            <div className="space-y-2 text-[11px]">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                1. تحليل النص العربي وبناء شجرة العقد
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                2. إنشاء جداول Supabase وسياسات RLS
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                3. ربط أتمتة n8n وبوابات زين كاش / فاست باي
              </div>
              <div className={`flex items-center gap-2 ${step >= 4 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                4. توليد ملف Docker الملتزم بمجلد D:\saasx-data\n8n
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Input Form Footer - Styled like Professional Polish prompt bar */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          صف النظام الذي تريد بناءه باللغة العربية:
        </label>
        <div className="relative flex items-center bg-slate-950 border border-slate-700/80 rounded-2xl p-2 shadow-2xl ring-1 ring-white/10">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="مثال: أريد نظام إدارة صيدلية مع تتبع الدواء واستلام المبالغ عبر زين كاش وتذكير المريض..."
            rows={2}
            disabled={isLoading}
            className="w-full bg-transparent border-none outline-none text-xs text-slate-100 placeholder:text-slate-500 resize-none px-2"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-10 h-10 bg-[#38BDF8] rounded-xl flex items-center justify-center text-white hover:bg-[#0284C7] disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-[0_4px_12px_rgba(56,189,248,0.2)] shrink-0 mr-1"
            title="توليد النظام"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </aside>
  );
};
