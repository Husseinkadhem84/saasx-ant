import React, { useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection
} from '@xyflow/react';
import { CustomNode } from './CustomNode';
import { ElectricEdge } from './ElectricEdge';
import { 
  Plus, 
  Sparkles, 
  Database, 
  Layout, 
  CreditCard, 
  Workflow, 
  Send, 
  Zap, 
  Download,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { WorkflowNode, WorkflowEdge, NodeType } from '@saasx/shared';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  onNodeClick: (node: WorkflowNode) => void;
  onAddNode: (type: NodeType) => void;
  onExportJson: () => void;
  onResetLayout: () => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodeClick,
  onAddNode,
  onExportJson,
  onResetLayout
}) => {
  // Register custom node type and electric edge type
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ 
    electricEdge: ElectricEdge,
    default: ElectricEdge,
    customEdge: ElectricEdge 
  }), []);

  // Format initial edges to use electricEdge type
  const formattedInitialEdges = useMemo(() => {
    return initialEdges.map((edge) => ({
      ...edge,
      type: 'electricEdge',
      animated: true,
    }));
  }, [initialEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(formattedInitialEdges as any);

  // Sync props to state when generated system changes
  React.useEffect(() => {
    setNodes(initialNodes as any);
    setEdges(formattedInitialEdges as any);
  }, [initialNodes, formattedInitialEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'electricEdge', animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="relative w-full h-[calc(100vh-65px)] bg-[#0F172A] bg-radial-grid overflow-hidden">
      
      {/* Canvas Top Action Bar */}
      <div className="absolute top-4 right-4 z-10 flex flex-wrap items-center gap-2 bg-[#0F172A]/90 p-2 rounded-xl border border-slate-800 backdrop-blur-md shadow-xl">
        <span className="text-xs font-semibold text-slate-400 px-2 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#38BDF8]" />
          إضافة عنصر:
        </span>

        <button
          onClick={() => onAddNode('ui')}
          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[#38BDF8] border border-slate-700/60 text-xs font-medium flex items-center gap-1 transition"
        >
          <Layout className="w-3.5 h-3.5" />
          واجهة
        </button>

        <button
          onClick={() => onAddNode('ai')}
          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-purple-400 border border-slate-700/60 text-xs font-medium flex items-center gap-1 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          ذكاء اصطناعي
        </button>

        <button
          onClick={() => onAddNode('database')}
          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700/60 text-xs font-medium flex items-center gap-1 transition"
        >
          <Database className="w-3.5 h-3.5" />
          Supabase
        </button>

        <button
          onClick={() => onAddNode('payment')}
          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700/60 text-xs font-medium flex items-center gap-1 transition"
        >
          <CreditCard className="w-3.5 h-3.5" />
          دفع إلكتروني
        </button>

        <button
          onClick={() => onAddNode('n8n')}
          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-pink-400 border border-slate-700/60 text-xs font-medium flex items-center gap-1 transition"
        >
          <Workflow className="w-3.5 h-3.5" />
          n8n Core
        </button>

        <div className="h-4 w-px bg-slate-800 my-auto mx-1" />

        {/* Electric Charges Live Status Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-400">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse fill-amber-400 shrink-0" />
          <span>شحنات كهربائية سارية</span>
        </div>

        <button
          onClick={onExportJson}
          className="px-3 py-1.5 rounded bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-bold text-xs flex items-center gap-1 transition shadow-[0_4px_12px_rgba(56,189,248,0.25)]"
          title="تصدير مخطط النظام لتنسيق JSON"
        >
          <Download className="w-3.5 h-3.5" />
          تصدير JSON
        </button>

        <button
          onClick={onResetLayout}
          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          title="إعادة ضبط العرض"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'electricEdge', animated: true }}
        onNodeClick={(_, node) => onNodeClick(node as any)}
        fitView
        className="bg-[#0F172A]"
      >
        <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="#1e293b" />
        <Controls position="bottom-right" className="m-4" />
        <MiniMap 
          nodeColor="#38bdf8" 
          maskColor="rgba(15, 23, 42, 0.85)" 
          className="rounded-xl border border-slate-800 overflow-hidden" 
        />
      </ReactFlow>

    </div>
  );
};
