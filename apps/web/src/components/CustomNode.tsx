import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Sparkles, 
  Database, 
  Layout, 
  CreditCard, 
  Workflow, 
  Send, 
  Zap, 
  Clock, 
  Lock, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { NodeType } from '@saasx/shared';

const NODE_CONFIG: Record<NodeType, { icon: React.ElementType; color: string; bg: string; border: string; label: string }> = {
  trigger: {
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    label: 'محفز (Trigger)'
  },
  ui: {
    icon: Layout,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/40',
    label: 'واجهة زبون (UI)'
  },
  ai: {
    icon: Sparkles,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/40',
    label: 'ذكاء اصطناعي (AI)'
  },
  database: {
    icon: Database,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    label: 'قاعدة بيانات (Supabase)'
  },
  payment: {
    icon: CreditCard,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/40',
    label: 'بوابة دفع محلي'
  },
  n8n: {
    icon: Workflow,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/40',
    label: 'أتمتة (n8n Core)'
  },
  notification: {
    icon: Send,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    label: 'إشعارات واتساب/SMS'
  }
};

export const CustomNode = ({ data, selected }: { data: any; selected?: boolean }) => {
  const nodeType: NodeType = data.type || 'ui';
  const config = NODE_CONFIG[nodeType] || NODE_CONFIG.ui;
  const IconComponent = config.icon;
  const status = data.status || 'idle';

  return (
    <div 
      className={`min-w-[240px] max-w-[300px] p-4 rounded-xl border ${config.bg} ${config.border} backdrop-blur-md transition-all shadow-xl ${
        selected ? 'ring-2 ring-sky-400 shadow-sky-500/20' : 'hover:border-slate-500'
      }`}
    >
      {/* Handles for connections */}
      <Handle 
        type="target" 
        position={Position.Right} 
        className="w-3.5 h-3.5 bg-sky-400 border-2 border-slate-900 shadow-sm" 
      />
      
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 ${config.color}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm leading-tight">{data.label}</h4>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">{config.label}</span>
          </div>
        </div>

        {/* Execution Status Badge */}
        {status === 'running' && (
          <span className="flex items-center gap-1 text-[11px] text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded-full font-medium animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin" />
            جاري...
          </span>
        )}
        {status === 'success' && (
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
            <CheckCircle2 className="w-3 h-3" />
            تم
          </span>
        )}
      </div>

      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
        {data.description}
      </p>

      {/* RLS Security badge if database */}
      {nodeType === 'database' && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-300/90 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>محمي بسياسات RLS الأمنية</span>
        </div>
      )}

      {/* ZainCash / FastPay Badge if payment */}
      {nodeType === 'payment' && (
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-300 bg-indigo-950/40 px-2 py-1 rounded border border-indigo-800/40">
          <span className="font-semibold text-indigo-300">ZainCash / FastPay</span>
          <span className="text-emerald-400 font-bold">Iraqi IQD Gateway</span>
        </div>
      )}

      <Handle 
        type="source" 
        position={Position.Left} 
        className="w-3.5 h-3.5 bg-sky-400 border-2 border-slate-900 shadow-sm" 
      />
    </div>
  );
};
