import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';
import { SaasxLogo } from './SaasxLogo';

interface SignUpPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup' | 'app') => void;
  onSignUpSuccess?: (name: string, email: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate, onSignUpSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('كلمتا المرور غير متطابقتين!');
      return;
    }
    if (!agreeTerms) {
      alert('يرجى الموافقة على الشروط والأحكام للاستمرار.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSignUpSuccess) onSignUpSuccess(fullName, email);
      onNavigate('app');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-[#38BDF8] selection:text-white dir-rtl" dir="rtl">
      
      {/* Header */}
      <header className="p-4 sm:p-6 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => onNavigate('landing')}>
          <SaasxLogo size="md" showText={true} glow={true} />
        </div>
        <button
          onClick={() => onNavigate('landing')}
          className="text-xs font-semibold text-slate-400 hover:text-white transition flex items-center gap-1.5"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
      </header>

      {/* Split-Screen Desktop Layout (50/50) */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
        
        {/* Right Side (Visual): Tech Aesthetic "Join the Future" / "انضم إلى المستقبل" Graphic */}
        <div className="hidden lg:flex lg:col-span-6 bg-slate-950 border-l border-slate-800/80 p-12 flex-col justify-between relative overflow-hidden bg-radial-grid">
          
          <div className="absolute top-1/3 right-1/2 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#38BDF8]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Top Label */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles className="w-4 h-4" />
              انضم إلى مستقبل أتمتة الأنظمة بالذكاء الاصطناعي
            </span>
          </div>

          {/* Center Graphic */}
          <div className="relative z-10 my-auto space-y-6 max-w-md mx-auto text-center">
            <div className="p-8 rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-slate-800 shadow-[0_0_50px_rgba(56,189,248,0.2)] ring-1 ring-white/10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-black border border-[#38BDF8]/50 shadow-[0_0_30px_rgba(56,189,248,0.4)] flex items-center justify-center mx-auto text-[#38BDF8]">
                <SaasxLogo size="md" showText={false} glow={true} />
              </div>

              <h2 className="text-2xl font-black text-white">
                ابدأ رحلتك مجاناً اليوم
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                احصل على إمكانية الوصول الفوري للكانفاس والمرئي، محرك n8n المدمج، وبيئة الاختبار لبوابات الدفع زين كاش وفاست باي.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-3 text-right">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">بدون بطاقة أئتمان</span>
                  <span className="text-xs font-bold text-emerald-400">تجربة مجانية</span>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">الدعم اللغوي</span>
                  <span className="text-xs font-bold text-[#38BDF8]">عربي كامل RTL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-[11px] text-slate-500 font-mono relative z-10">
            JOIN SAASX // CREATE DEVELOPER ACCOUNT
          </div>

        </div>

        {/* Left Side (Form): Clean, minimalist fields following 8pt grid */}
        <div className="lg:col-span-6 bg-slate-900 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl mx-auto w-full">
          
          <div className="space-y-6">
            
            {/* Heading & Subheading */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                إنشاء حساب جديد
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                انضم إلى SAASX وابدأ أتمتة أعمالك بالذكاء الاصطناعي.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  الاسم الكامل:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: أحمد علي المحمد"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#38BDF8] rounded-xl py-3 pr-10 pl-4 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#38BDF8] transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  البريد الإلكتروني:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#38BDF8] rounded-xl py-3 pr-10 pl-4 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#38BDF8] transition font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  كلمة المرور:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#38BDF8] rounded-xl py-3 pr-10 pl-10 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#38BDF8] transition font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  تأكيد كلمة المرور:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#38BDF8] rounded-xl py-3 pr-10 pl-4 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#38BDF8] transition font-mono"
                  />
                </div>
              </div>

              {/* Checkbox: Terms & Conditions */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-[#38BDF8] focus:ring-[#38BDF8]"
                  />
                  <span>أوافق على الشروط والأحكام وسياسة الخصوصية</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-black text-sm transition-transform active:scale-95 shadow-[0_4px_20px_rgba(56,189,248,0.3)] flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <span>جاري إنشاء الحساب...</span>
                ) : (
                  <>
                    <span>إنشاء حساب</span>
                    <ChevronLeft className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Footer Text */}
            <div className="text-center pt-2 text-xs text-slate-400">
              لديك حساب بالفعل؟{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[#38BDF8] font-bold hover:underline mr-1"
              >
                تسجيل الدخول
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
