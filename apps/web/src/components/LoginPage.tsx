import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { SaasxLogo } from './SaasxLogo';

interface LoginPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup' | 'app') => void;
  onLoginSuccess?: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('developer@saasx.iq');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess(email);
      onNavigate('app');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-[#38BDF8] selection:text-white dir-rtl" dir="rtl">
      
      {/* Top Simple Header */}
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
        
        {/* Right Side (Visual): Dark aesthetic AI-themed background pattern with 3D glass tech element & glowing SAASX Logo */}
        <div className="hidden lg:flex lg:col-span-6 bg-slate-950 border-l border-slate-800/80 p-12 flex-col justify-between relative overflow-hidden bg-radial-grid">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#38BDF8]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Label */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              منصة الأتمتة الذكية SAASX
            </span>
          </div>

          {/* Center 3D Glass Tech Element with Glowing Logo */}
          <div className="relative z-10 my-auto text-center space-y-8 max-w-md mx-auto">
            <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800 shadow-[0_0_50px_rgba(56,189,248,0.2)] ring-1 ring-white/10 flex flex-col items-center">
              <div className="p-4 rounded-2xl bg-black border border-[#38BDF8]/50 shadow-[0_0_25px_rgba(56,189,248,0.5)] mb-4 animate-pulse">
                <SaasxLogo size="lg" showText={false} glow={true} />
              </div>

              <h2 className="text-2xl font-black text-white">
                أهلاً بك مجدداً في SAASX
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                سجّل الدخول للوصول إلى لوحة التحكم المرئية، إدارة القوالب الذكية، ومتابعة سير عمليات الدفع واستضافة n8n.
              </p>
            </div>

            {/* Feature Checkmarks */}
            <div className="space-y-2 text-xs text-slate-300 text-right">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                حماية البيانات بأعلى معايير الأمان وقواعد RLS
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                تزامن فوري للكانفاس مع سيرفرات Cloud
              </div>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="text-[11px] text-slate-500 font-mono relative z-10">
            SECURE AUTH // SAASX PLATFORM v3.6
          </div>

        </div>

        {/* Left Side (Form): Clean, minimalist input fields with 8pt grid padding */}
        <div className="lg:col-span-6 bg-slate-900 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl mx-auto w-full">
          
          <div className="space-y-8">
            
            {/* Heading */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                تسجيل الدخول إلى حسابك
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                أدخل بيانات حسابك للمتابعة وإدارة مشاريعك.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
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

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">
                    كلمة المرور:
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('يمكنك إعادة تعيين كلمة المرور برابط للتفعيل.')}
                    className="text-xs font-semibold text-[#38BDF8] hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>

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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-black text-sm transition-transform active:scale-95 shadow-[0_4px_20px_rgba(56,189,248,0.3)] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>جاري التحقق من الحساب...</span>
                ) : (
                  <>
                    <span>دخول</span>
                    <ChevronLeft className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-3 text-[11px] text-slate-500 font-medium shrink-0">
                  أو الدخول بواسطة
                </span>
              </div>

              {/* Social Login Button */}
              <button
                type="button"
                onClick={() => {
                  if (onLoginSuccess) onLoginSuccess('google.user@saasx.iq');
                  onNavigate('app');
                }}
                className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>متابعة باستخدام حساب Google</span>
              </button>

            </form>

            {/* Toggle Link to Sign Up */}
            <div className="text-center pt-2 text-xs text-slate-400">
              ليس لديك حساب بعد؟{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-[#38BDF8] font-bold hover:underline mr-1"
              >
                إنشاء حساب جديد
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
