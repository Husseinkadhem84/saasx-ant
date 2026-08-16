import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Layout, 
  Workflow, 
  ArrowLeft, 
  CheckCircle2, 
  ChevronLeft, 
  Send, 
  Database, 
  CreditCard, 
  Cpu, 
  Play,
  Globe,
  Lock,
  Layers,
  Utensils,
  Calendar,
  GraduationCap,
  ShoppingBag,
  Warehouse,
  Building2,
  Scale,
  Home,
  Users,
  Briefcase
} from 'lucide-react';
import { SaasxLogo } from './SaasxLogo';
import { SYSTEM_TEMPLATES } from '../data/templates';
import { GeneratedSystem } from '@saasx/shared';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup' | 'app') => void;
  onLaunchTemplate?: (templateId: string) => void;
  onSelectTemplate?: (template: GeneratedSystem) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectTemplate }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'pricing' | 'templates'>('home');
  const [heroPrompt, setHeroPrompt] = useState('بناء نظام إدارة مطاعم أوتوماتيكي مع دفع زين كاش وإشعارات واتساب');
  const [isGeneratingMock, setIsGeneratingMock] = useState(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingMock(true);
    setTimeout(() => {
      setIsGeneratingMock(false);
      onNavigate('app');
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-[#38BDF8] selection:text-white dir-rtl" dir="rtl">
      
      {/* Navbar (Top) */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-xl px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo on the far right */}
          <div className="cursor-pointer" onClick={() => onNavigate('landing')}>
            <SaasxLogo size="md" showText={true} glow={true} />
          </div>

          {/* Navigation links in center */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`transition hover:text-[#38BDF8] ${activeTab === 'home' ? 'text-[#38BDF8] font-bold' : ''}`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => { setActiveTab('features'); scrollToSection('features-section'); }}
              className={`transition hover:text-[#38BDF8] ${activeTab === 'features' ? 'text-[#38BDF8] font-bold' : ''}`}
            >
              المميزات
            </button>
            <button
              onClick={() => { setActiveTab('templates'); scrollToSection('templates-section'); }}
              className={`transition hover:text-[#38BDF8] ${activeTab === 'templates' ? 'text-[#38BDF8] font-bold' : ''}`}
            >
              القوالب الجاهزة
            </button>
            <button
              onClick={() => { setActiveTab('pricing'); scrollToSection('pricing-section'); }}
              className={`transition hover:text-[#38BDF8] ${activeTab === 'pricing' ? 'text-[#38BDF8] font-bold' : ''}`}
            >
              الأسعار
            </button>
          </nav>

          {/* On far left: Login (Ghost) & Sign Up (Solid Blue) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition rounded-lg hover:bg-slate-800"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-5 py-2 text-xs sm:text-sm font-bold bg-[#38BDF8] text-slate-950 hover:bg-[#0284C7] hover:text-white rounded-lg transition shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-1.5"
            >
              ابدأ مجاناً
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-8 border-b border-slate-800/80 bg-radial-grid">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-semibold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Sparkles className="w-4 h-4 animate-pulse text-[#38BDF8]" />
            <span>الجيل الجديد من منصات بناء وأتمتة الأنظمة بالذكاء الاصطناعي</span>
          </div>

          {/* Bold Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            المستقبل لا يُنتظر.. <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#38BDF8] via-sky-300 to-indigo-300">بل يُبنى</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            ابنِ وربط وأتمت أنظمتك المعقدة بالكامل عبر الأوامر الصوتية والنصية باللغة العربية.
            من نماذج البيانات وقواعد Supabase، إلى محرك n8n وبوابات الدفع المحلية في العراق.
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('app')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 hover:text-white font-extrabold text-sm sm:text-base transition-transform active:scale-95 shadow-[0_0_30px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2 group"
            >
              <span>ابدأ بناء نظامك الآن</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('features-section')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-sm sm:text-base transition hover:bg-slate-800"
            >
              استكشف قدرات SAASX
            </button>
          </div>

          {/* Instant Prompt Simulator Bar */}
          <form 
            onSubmit={handleHeroSubmit}
            className="mt-8 max-w-2xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-2.5 shadow-2xl ring-1 ring-white/10 text-right"
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                placeholder="صف النظام الذي تريد بناءه باللغة العربية..."
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 px-3 py-1"
              />
              <button
                type="submit"
                disabled={isGeneratingMock}
                className="px-5 py-3 bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-[0_4px_15px_rgba(56,189,248,0.3)] flex items-center gap-2 shrink-0"
              >
                {isGeneratingMock ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>جاري التوليد...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>توليد تلقائي</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* Hero Graphic: Sleek 3D UI Mockup Transforming Chat into Node Canvas */}
        <div className="mt-12 sm:mt-16 max-w-6xl mx-auto relative">
          
          {/* Glass Card Container */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-2xl p-4 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.8)] overflow-hidden ring-1 ring-white/10">
            
            {/* Top Bar Decorative Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono mr-2">saasx-engine-v3.6 // node-canvas</span>
              </div>
              <span className="text-[10px] bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 px-2.5 py-0.5 rounded-full font-bold">
                Live Interactive Canvas
              </span>
            </div>

            {/* Simulated Canvas Layout with Floating Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[320px] relative">
              
              {/* Chat Input Prompt Mockup Node */}
              <div className="md:col-span-4 bg-slate-950 p-5 rounded-xl border border-[#38BDF8]/50 shadow-[0_0_20px_rgba(56,189,248,0.2)] space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#38BDF8] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    المدخلات (Arabic AI Prompt)
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
                </div>
                <div className="text-xs font-semibold text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  "بناء حجز عيادات مع إشعار واتساب ودفع زين كاش"
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>الحالة:</span>
                  <span className="text-emerald-400 font-bold">تم تحويل النص إلى كائنات JSON</span>
                </div>
              </div>

              {/* Connecting Pulse Path */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-l from-purple-500 via-[#38BDF8] to-slate-800 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8] animate-pulse" />
                </div>
              </div>

              {/* Node Visual Output Mockup */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Node 1: Supabase DB */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-[#38BDF8]/60 transition shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <Database className="w-3.5 h-3.5" />
                      جدول المواعيد
                    </span>
                    <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Supabase</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-slate-400">
                    <div>• patient_name (text)</div>
                    <div>• appointment_date (timestamp)</div>
                    <div>• RLS Policy: <span className="text-emerald-400">Active</span></div>
                  </div>
                </div>

                {/* Node 2: Payment Gateway */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/60 transition shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      ZainCash API
                    </span>
                    <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded">IQD</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-slate-400">
                    <div>• amount_iqd: 25,000 IQD</div>
                    <div>• status: <span className="text-amber-400">Pending QR Token</span></div>
                  </div>
                </div>

                {/* Node 3: n8n Core */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-pink-500/60 transition shadow-lg space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-pink-400 flex items-center gap-1">
                      <Workflow className="w-3.5 h-3.5" />
                      سير عمل n8n (D:\saasx-data\n8n)
                    </span>
                    <span className="text-[9px] bg-pink-950 text-pink-300 border border-pink-800 px-1.5 py-0.5 rounded">Webhook</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">
                    توليد رسالة واتساب تلقائية فور نجاح عملية استقطاع المبلغ من المحفظة.
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features Section (Grid of 4 minimalist cards) */}
      <section id="features-section" className="py-20 px-4 sm:px-8 bg-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              قدرات ومميزات المنصة
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              كل ما تحتاجه لإطلاق مشروعك الذكي بمرونة عالية
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              صُممت SAASX لتلبي متطلبات الأعمال في المنطقة مع التكامل التام للأنظمة المحلية والدولية.
            </p>
          </div>

          {/* 4 Minimalist Tech Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Speed */}
            <div className="bg-slate-900 border border-slate-800 hover:border-[#38BDF8]/50 p-6 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">السرعة الفائقة</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                توليد مخططات سير العمل والواجهات وهياكل قواعد البيانات بثوانٍ معدودة عبر معالجات الذكاء الاصطناعي السريعة.
              </p>
            </div>

            {/* Card 2: AI Automation */}
            <div className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-6 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">أتمتة بالذكاء الاصطناعي</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ربط نماذج Gemini ومحركات n8n تلقائياً لمعالجة البيانات المعقدة واتخاذ القرارات الذكية في الوقت الفعلي.
              </p>
            </div>

            {/* Card 3: Security */}
            <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">الأمان والسيادة</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                تطبيق سياسات RLS المتقدمة لحماية بيانات الزبائن، مع خيار تخزين الحجم الدائم لـ n8n على القرص الثانوي D:\.
              </p>
            </div>

            {/* Card 4: Custom UI */}
            <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">واجهات مخصصة</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                إنشاء واجهات تفاعلية جذابة للزبائن تدعم اللغة العربية والاتجاه RTL مع إمكانية ربط بوابات الدفع زين كاش وفكاست باي.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Pre-built Templates Showcase Section */}
      <section id="templates-section" className="py-20 px-4 sm:px-8 bg-[#0F172A] border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                القوالب الجاهزة (10 أنظمة متكاملة)
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                اختر نظامك الجاهز وابدأ التشغيل فوراً
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                أنظمة مهيكلة ومربوطة مسبقاً بقواعد بيانات Supabase وسير عمل n8n وبوابات الدفع المحلية.
              </p>
            </div>
            <button
              onClick={() => onNavigate('app')}
              className="text-xs font-bold text-[#38BDF8] hover:underline flex items-center gap-1 shrink-0"
            >
              عرض كافة القوالب في الكانفاس ←
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {SYSTEM_TEMPLATES.map((tmpl) => {
              const getIcon = () => {
                switch (tmpl.id) {
                  case 'restaurant-pos': return <Utensils className="w-4 h-4 text-amber-400" />;
                  case 'clinic-booking': return <Calendar className="w-4 h-4 text-[#38BDF8]" />;
                  case 'school-management': return <GraduationCap className="w-4 h-4 text-emerald-400" />;
                  case 'store-ecommerce': return <ShoppingBag className="w-4 h-4 text-purple-400" />;
                  case 'warehouse-inventory': return <Warehouse className="w-4 h-4 text-orange-400" />;
                  case 'company-erp': return <Building2 className="w-4 h-4 text-blue-400" />;
                  case 'law-firm': return <Scale className="w-4 h-4 text-yellow-500" />;
                  case 'salon-booking': return <Sparkles className="w-4 h-4 text-pink-400" />;
                  case 'real-estate': return <Home className="w-4 h-4 text-teal-400" />;
                  case 'employee-hr': return <Users className="w-4 h-4 text-indigo-400" />;
                  default: return <Workflow className="w-4 h-4 text-[#38BDF8]" />;
                }
              };

              return (
                <div 
                  key={tmpl.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-[#38BDF8]/60 transition flex flex-col justify-between group hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700/80 flex items-center gap-1.5">
                        {getIcon()}
                        <span>{tmpl.category}</span>
                      </span>
                      <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                        جاهز
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-white group-hover:text-[#38BDF8] transition leading-snug">
                      {tmpl.titleAr}
                    </h3>

                    <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                      {tmpl.descriptionAr}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectTemplate) {
                        onSelectTemplate(tmpl);
                      } else {
                        onNavigate('app');
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-[#38BDF8] hover:text-slate-950 text-white font-bold text-xs transition flex items-center justify-center gap-2 mt-2"
                  >
                    <span>تشغيل القالب</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 px-4 sm:px-8 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              خطط الاشتراك الشفافة
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              خطط تناسب جميع أحجام المشاريع والأعمال
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              اختر الخطة المناسبة لاحتياجاتك وابدأ في أتمتة أنظمتك بالذكاء الاصطناعي بكل سهولة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* Plan 1: Free / مجاني */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between hover:border-slate-700 transition">
              <div>
                <h3 className="text-xl font-black text-white">مجاني</h3>
                <div className="mt-3 font-mono">
                  <span className="text-3xl font-black text-white">0</span>
                  <span className="text-xs font-sans text-slate-400 mr-1">دينار / شهرياً</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">بداية خفيفة لتجربة المنصة وبناء مشروعك الأول.</p>

                <div className="my-5 border-t border-slate-800/80" />

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span><strong>مشروع واحد</strong> (1 Project)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span><strong>100 عملية</strong> / شهرياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>الوصول للكانفاس التجريبي</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition mt-4"
              >
                ابدأ مجاناً
              </button>
            </div>

            {/* Plan 2: Pro / برو */}
            <div className="bg-slate-900 border border-slate-700 hover:border-[#38BDF8]/60 p-6 rounded-2xl space-y-6 flex flex-col justify-between transition">
              <div>
                <h3 className="text-xl font-black text-white">برو</h3>
                <div className="mt-3 font-mono">
                  <span className="text-3xl font-black text-white">22,000</span>
                  <span className="text-xs font-sans text-slate-400 mr-1">دينار / شهرياً</span>
                  <span className="block text-[10px] text-[#38BDF8] font-sans mt-0.5">(~$15 / شهر)</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">مناسبة للمطورين وأصحاب الأعمال المتوسطة.</p>

                <div className="my-5 border-t border-slate-800/80" />

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span><strong>5 مشاريع</strong> أتمتة (5 Projects)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span><strong>5,000 عملية</strong> / شهرياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>تكامل قواعد البيانات وتفعيل n8n</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition mt-4"
              >
                اشترك في برو
              </button>
            </div>

            {/* Plan 3: Max / ماكس (Featured / Popular) */}
            <div className="bg-slate-900 border-2 border-[#38BDF8] p-6 rounded-2xl space-y-6 flex flex-col justify-between shadow-[0_0_30px_rgba(56,189,248,0.2)] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                الأكثر شعبية
              </div>

              <div>
                <h3 className="text-xl font-black text-white">ماكس</h3>
                <div className="mt-3 font-mono">
                  <span className="text-3xl font-black text-[#38BDF8]">51,000</span>
                  <span className="text-xs font-sans text-slate-400 mr-1">دينار / شهرياً</span>
                  <span className="block text-[10px] text-[#38BDF8] font-sans mt-0.5">(~$35 / شهر)</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">إمكانات فائقة ومشاريع غير محدودة للأعمال النامية.</p>

                <div className="my-5 border-t border-slate-800/80" />

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span><strong>مشاريع غير محدودة</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span><strong>50,000 عملية</strong> / شهرياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>ربط بوابات زين كاش وفاست باي Live</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className="w-full py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-bold text-xs transition shadow-lg mt-4"
              >
                اشترك في ماكس
              </button>
            </div>

            {/* Plan 4: Enterprise / مؤسسات */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between hover:border-purple-500/50 transition">
              <div>
                <h3 className="text-xl font-black text-white">مؤسسات</h3>
                <div className="mt-3 font-mono">
                  <span className="text-3xl font-black text-purple-400">144,000</span>
                  <span className="text-xs font-sans text-slate-400 mr-1">دينار / شهرياً</span>
                  <span className="block text-[10px] text-purple-400 font-sans mt-0.5">(~$99 / شهر)</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">حلول متكاملة مخصصة للشركات والمؤسسات الكبرى.</p>

                <div className="my-5 border-t border-slate-800/80" />

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span><strong>تخصيص كامل</strong> للأنظمة والسيرفرات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span><strong>دعم مباشر 24/7</strong> وفريق خاص</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>SLA عالي وسيرفرات حصرية</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition mt-4"
              >
                تواصل معنا
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-8 border-t border-slate-800 bg-[#0F172A] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <SaasxLogo size="sm" showText={true} glow={false} />
          <p>© 2026 SAASX Engine. جميع الحقوق محفوظة لمنصة أتمتة الأنظمة بالذكاء الاصطناعي.</p>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('app')} className="hover:text-white transition">الكانفاس</button>
            <button onClick={() => onNavigate('login')} className="hover:text-white transition">تسجيل الدخول</button>
            <button onClick={() => onNavigate('signup')} className="hover:text-white transition">إنشاء حساب</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
