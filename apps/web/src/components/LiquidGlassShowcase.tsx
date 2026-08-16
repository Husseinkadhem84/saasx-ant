import React from 'react';
import { 
  Plus, 
  Mic, 
  Pencil, 
  Search, 
  ChevronDown, 
  X, 
  Sliders, 
  Check, 
  Sparkles,
  Info,
  Smartphone,
  UserPlus,
  Play
} from 'lucide-react';

interface LiquidGlassShowcaseProps {
  onClose?: () => void;
  isLiquidGlassTheme: boolean;
  onToggleTheme: () => void;
}

export const LiquidGlassShowcase: React.FC<LiquidGlassShowcaseProps> = ({
  onClose,
  isLiquidGlassTheme,
  onToggleTheme
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#EBF0F5]/90 border border-white/90 rounded-3xl p-6 sm:p-8 space-y-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] backdrop-blur-2xl text-slate-900 dir-ltr" dir="ltr">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-300/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400/40 via-purple-400/40 to-pink-400/40 border border-white/80 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-slate-800" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                Liquid Glass UI Theme
              </h3>
              <p className="text-xs text-slate-500">
                Hyper-realistic translucent glass elements with specular refraction
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                isLiquidGlassTheme 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-white/80 text-slate-900 border border-white hover:bg-white'
              }`}
            >
              <span>{isLiquidGlassTheme ? '🌙 Dark Mode' : '✨ Glass Mode'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="liquid-glass-circle hover:rotate-90 transition-transform"
                title="Close"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            )}
          </div>
        </div>

        {/* Showcase Grid Matching User's Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Glass Buttons & Pill Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Primary Action Pills
              </span>
              <div className="flex flex-wrap gap-3">
                <button className="liquid-glass-btn-cyan px-6 py-2.5 text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span>Create workspace</span>
                </button>

                <button className="liquid-glass-btn-purple px-6 py-2.5 text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span>Create workspace</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Secondary & Circular Glass Controls
              </span>
              <div className="flex items-center gap-3">
                <button className="liquid-glass-input px-5 py-2 text-sm font-medium text-slate-700 hover:bg-white/80 transition flex items-center gap-2">
                  <Play className="w-4 h-4 text-slate-600 rotate-180" />
                  <span>Secondary button</span>
                </button>

                <div className="flex items-center gap-2">
                  <button className="liquid-glass-circle">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="liquid-glass-circle">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="liquid-glass-circle">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Glass Search & Dropdowns
              </span>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full liquid-glass-input px-5 py-2.5 text-sm placeholder-slate-400"
                    readOnly
                  />
                </div>

                <div className="liquid-glass-input px-4 py-2.5 flex items-center justify-between text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-500" />
                    <span>Select category</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Interactive Glass Toggles & Badges
              </span>
              <div className="flex items-center gap-4">
                <div className="liquid-glass-input p-1 flex items-center gap-2 w-fit rounded-full">
                  <div className="w-6 h-6 rounded-full bg-purple-500 shadow-sm" />
                  <span className="text-xs font-semibold text-slate-700 pr-3">Tabs</span>
                </div>

                <div className="liquid-glass-btn-pink px-6 py-2.5 text-sm font-bold">
                  We daily dreams
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glass Card & Modal Dialog */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Glass Text Fields & Member Panel
              </span>
              <div className="liquid-glass-card p-4 space-y-3 border-white/80">
                <div className="flex items-center justify-between bg-white/40 p-2.5 rounded-2xl border border-white/60">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <Smartphone className="w-4 h-4 text-slate-500" />
                    <span>Text field</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-400/20 text-purple-700 text-xs font-semibold border border-purple-300/40">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Invite member</span>
                  </div>
                </div>

                <div className="bg-white/40 px-4 py-2 rounded-2xl border border-white/60 flex items-center gap-2 text-xs text-slate-600">
                  <Pencil className="w-3.5 h-3.5 text-slate-500" />
                  <span>Search field | suggestions</span>
                </div>

                <div className="bg-white/40 px-4 py-2 rounded-2xl border border-white/60 flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>Select dropdown</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Modal Dialog Plate */}
            <div className="liquid-glass-card p-6 text-center relative overflow-hidden space-y-3 border-white/90 shadow-xl">
              {/* Corner Glass Rivets / Pegs from Reference Image */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] border border-slate-300/50" />
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] border border-slate-300/50" />
              <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] border border-slate-300/50" />
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] border border-slate-300/50" />

              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                Modal Dialog
              </span>

              <h4 className="text-lg font-extrabold text-slate-900">
                Liquid Glass Interface
              </h4>

              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Full-stack workflows with automated Supabase storage and n8n dispatchers.
              </p>

              <button className="text-xs font-bold text-cyan-600 hover:text-cyan-700 underline tracking-wide pt-2 block mx-auto">
                Upgrade plan →
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-300/60 flex items-center justify-between text-xs text-slate-500">
          <span>Liquid Glass Theme Active</span>
          <span className="font-semibold text-slate-700">SAASX Engine v2.5</span>
        </div>

      </div>
    </div>
  );
};
