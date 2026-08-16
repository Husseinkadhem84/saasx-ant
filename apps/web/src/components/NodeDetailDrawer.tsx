import React from 'react';
import { X, Save, Database, Sparkles, Layout, CreditCard, Workflow, Send, Lock } from 'lucide-react';
import { WorkflowNode, NodeType } from '@saasx/shared';

interface NodeDetailDrawerProps {
  node: WorkflowNode | null;
  onClose: () => void;
  onUpdateNode: (updatedNode: WorkflowNode) => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  node,
  onClose,
  onUpdateNode
}) => {
  if (!node) return null;

  const [label, setLabel] = React.useState(node.data.label);
  const [description, setDescription] = React.useState(node.data.description);
  const [type, setType] = React.useState<NodeType>(node.data.type || 'ui');

  React.useEffect(() => {
    setLabel(node.data.label);
    setDescription(node.data.description);
    setType(node.data.type || 'ui');
  }, [node]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateNode({
      ...node,
      data: {
        ...node.data,
        label,
        description,
        type
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-full sm:w-[360px] bg-[#0F172A]/95 border-r border-slate-800 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wide">خصائص العقدة</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-semibold text-slate-500 tracking-wider">اسم العقدة:</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#38BDF8]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-semibold text-slate-500 tracking-wider">نوع العقدة:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as NodeType)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#38BDF8]"
            >
              <option value="ui">واجهة زبون (UI Form)</option>
              <option value="ai">معالج ذكاء اصطناعي (AI Model)</option>
              <option value="database">قاعدة بيانات Supabase</option>
              <option value="payment">بوابة دفع محلية (ZainCash/FastPay)</option>
              <option value="n8n">محرك أتمتة n8n Core</option>
              <option value="notification">إشعار واتساب/SMS</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-semibold text-slate-500 tracking-wider">الوصف والإجراء:</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#38BDF8]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-[#38BDF8] hover:bg-[#0284C7] text-white font-medium text-xs transition shadow-[0_4px_12px_rgba(56,189,248,0.2)] flex items-center justify-center gap-2 mt-4"
          >
            <Save className="w-4 h-4" />
            حفظ التغييرات
          </button>
        </form>
      </div>

      <div className="text-[10px] text-slate-500 text-center border-t border-slate-800/80 pt-4 font-mono">
        NODE ID: {node.id}
      </div>
    </div>
  );
};
