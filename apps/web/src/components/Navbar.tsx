import React from 'react';
import { 
  Sparkles, 
  Workflow, 
  Eye, 
  Database, 
  CreditCard, 
  Terminal, 
  Plus, 
  Play,
  Home,
  LogOut,
  Droplets
} from 'lucide-react';
import { SaasxLogo } from './SaasxLogo';

interface NavbarProps {
  activeTab: 'canvas' | 'preview' | 'n8n' | 'payments' | 'supabase';
  setActiveTab: (tab: 'canvas' | 'preview' | 'n8n' | 'payments' | 'supabase') => void;
  onNewSystemClick: () => void;
  onSimulateRun: () => void;
  isSimulating: boolean;
  systemTitleAr: string;
  onNavigateLanding?: () => void;
  userEmail?: string | null;
  isLiquidGlassTheme?: boolean;
  onToggleLiquidGlassTheme?: () => void;
  onOpenShowcase?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewSystemClick,
  onSimulateRun,
  isSimulating,
  systemTitleAr,
  onNavigateLanding,
  userEmail,
  isLiquidGlassTheme,
  onToggleLiquidGlassTheme,
  onOpenShowcase
}) => {
  return (
    <header className={`border-b sticky top-0 z-40 px-4 sm:px-6 py-3 transition-colors ${
      isLiquidGlassTheme 
        ? 'border-white/80 bg-white/60 backdrop-blur-xl shadow-sm text-slate-900' 
        : 'border-slate-800 bg-[#0F172A]/90 backdrop-blur-md text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & System Title */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div 
              className="cursor-pointer" 
              onClick={() => onNavigateLanding && onNavigateLanding()}
              title="العودة للصفحة الرئيسية"
            >
              <SaasxLogo size="sm" showText={true} glow={!isLiquidGlassTheme} />
            </div>

            <div className={`hidden sm:block h-6 w-px ${isLiquidGlassTheme ? 'bg-slate-300' : 'bg-slate-800'}`} />

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${isLiquidGlassTheme ? 'text-slate-900' : 'text-slate-200'}`}>
                  {systemTitleAr || 'بناء الأنظمة والأتمتة باللغة العربية'}
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 text-[10px] font-medium">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  نشط
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {onOpenShowcase && (
              <button
                onClick={onOpenShowcase}
                className="liquid-glass-btn-purple px-2.5 py-1 text-[11px] font-bold"
              >
                Liquid Glass
              </button>
            )}

            <button
              onClick={onNewSystemClick}
              className="px-3 py-1.5 rounded-full bg-[#38BDF8] text-white hover:bg-[#0284C7] transition text-xs font-medium shadow-[0_4px_12px_rgba(56,189,248,0.2)] flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              نظام جديد
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className={`flex items-center gap-1 p-1 rounded-2xl border w-full md:w-auto overflow-x-auto ${
          isLiquidGlassTheme 
            ? 'bg-white/50 border-white/80 shadow-inner' 
            : 'bg-slate-950/80 border-slate-800/80'
        }`}>
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'canvas'
                ? isLiquidGlassTheme
                  ? 'bg-white text-[#0369A1] shadow-md border border-white'
                  : 'bg-slate-800 text-[#38BDF8] shadow-sm'
                : isLiquidGlassTheme
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${activeTab === 'canvas' ? 'bg-[#38BDF8]' : 'border border-slate-400'}`} />
            الكانفاس المرئي
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'preview'
                ? isLiquidGlassTheme
                  ? 'bg-white text-[#0369A1] shadow-md border border-white'
                  : 'bg-slate-800 text-[#38BDF8] shadow-sm'
                : isLiquidGlassTheme
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            معاينة النظام
          </button>

          <button
            onClick={() => setActiveTab('n8n')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'n8n'
                ? isLiquidGlassTheme
                  ? 'bg-white text-[#0369A1] shadow-md border border-white'
                  : 'bg-slate-800 text-[#38BDF8] shadow-sm'
                : isLiquidGlassTheme
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            أتمتة n8n (D:\)
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'payments'
                ? isLiquidGlassTheme
                  ? 'bg-white text-[#0369A1] shadow-md border border-white'
                  : 'bg-slate-800 text-[#38BDF8] shadow-sm'
                : isLiquidGlassTheme
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            بوابات الدفع
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === 'supabase'
                ? isLiquidGlassTheme
                  ? 'bg-white text-[#0369A1] shadow-md border border-white'
                  : 'bg-slate-800 text-[#38BDF8] shadow-sm'
                : isLiquidGlassTheme
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            قواعد Supabase
          </button>
        </nav>

        {/* Action Controls & Navigation Back */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Liquid Glass Showcase trigger button */}
          {onOpenShowcase && (
            <button
              onClick={onOpenShowcase}
              className="liquid-glass-btn-purple px-3 py-1.5 text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
              title="عرض عناصر ثيم Liquid Glass UI"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Liquid Glass UI</span>
            </button>
          )}

          {/* Theme Toggle */}
          {onToggleLiquidGlassTheme && (
            <button
              onClick={onToggleLiquidGlassTheme}
              className={`px-3 py-1.5 text-xs rounded-full border transition flex items-center gap-1.5 font-bold ${
                isLiquidGlassTheme
                  ? 'bg-white/80 border-white text-slate-900 shadow-sm'
                  : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
              }`}
              title="تبديل إلى ثيم Liquid Glass الزجاجي السائل"
            >
              <Droplets className={`w-3.5 h-3.5 ${isLiquidGlassTheme ? 'text-cyan-500' : 'text-[#38BDF8]'}`} />
              <span>{isLiquidGlassTheme ? 'زجاجي سائل' : 'ثيم داكن'}</span>
            </button>
          )}

          {onNavigateLanding && (
            <button
              onClick={onNavigateLanding}
              className={`px-3 py-1.5 text-xs border rounded-full transition flex items-center gap-1.5 ${
                isLiquidGlassTheme
                  ? 'border-slate-300 text-slate-700 hover:bg-white'
                  : 'border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title="العودة إلى الصفحة الرئيسية"
            >
              <Home className="w-3.5 h-3.5" />
              <span>الرئيسية</span>
            </button>
          )}

          <button
            onClick={onSimulateRun}
            disabled={isSimulating}
            className={`px-3.5 py-1.5 text-xs border rounded-full transition flex items-center gap-1.5 font-semibold ${
              isSimulating 
                ? 'text-amber-600 border-amber-400/40 bg-amber-500/10' 
                : isLiquidGlassTheme
                  ? 'border-slate-300 text-slate-800 hover:bg-white'
                  : 'border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin text-amber-500' : 'text-[#38BDF8]'}`} />
            {isSimulating ? 'جاري المحاكاة...' : 'محاكاة التشغيل'}
          </button>

          <button
            onClick={onNewSystemClick}
            className="liquid-glass-btn-cyan px-4 py-1.5 text-xs font-bold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            نظام جديد
          </button>
        </div>

      </div>
    </header>
  );
};


