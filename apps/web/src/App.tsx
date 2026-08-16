import React, { useState, useEffect } from 'react';
import { SYSTEM_TEMPLATES } from './data/templates';
import { GeneratedSystem, WorkflowNode, NodeType } from '@saasx/shared';
import { generateSystemWithAI } from './services/api';
import { Navbar } from './components/Navbar';
import { ChatPanel } from './components/ChatPanel';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { GeneratedUiView } from './components/GeneratedUiView';
import { N8nDockerView } from './components/N8nDockerView';
import { PaymentGatewaySandbox } from './components/PaymentGatewaySandbox';
import { SupabaseRlsView } from './components/SupabaseRlsView';
import { NodeDetailDrawer } from './components/NodeDetailDrawer';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { LiquidGlassShowcase } from './components/LiquidGlassShowcase';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup' | 'app'>('landing');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentSystem, setCurrentSystem] = useState<GeneratedSystem>(SYSTEM_TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState<'canvas' | 'preview' | 'n8n' | 'payments' | 'supabase'>('canvas');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isLiquidGlassTheme, setIsLiquidGlassTheme] = useState(true);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  // Apply liquid glass body class
  useEffect(() => {
    if (isLiquidGlassTheme) {
      document.body.classList.add('liquid-glass-mode');
    } else {
      document.body.classList.remove('liquid-glass-mode');
    }
  }, [isLiquidGlassTheme]);

  // AI Generation Handler
  const handleGenerate = async (promptAr: string) => {
    setIsLoading(true);
    try {
      const generated = await generateSystemWithAI(promptAr);
      setCurrentSystem(generated);
      setActiveTab('canvas');
    } catch (err: any) {
      console.error('Generation Error:', err);
      alert(err.message || 'حدث خطأ أثناء توليد النظام بالذكاء الاصطناعي');
    } finally {
      setIsLoading(false);
    }
  };

  // Select Ready Template
  const handleSelectTemplate = (template: GeneratedSystem) => {
    setCurrentSystem(template);
    setActiveTab('canvas');
  };

  // Simulate Execution Run Animation
  const handleSimulateRun = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const nodesCopy = JSON.parse(JSON.stringify(currentSystem.nodes));
    
    // Step through each node to set status running then success
    nodesCopy.forEach((n: any, idx: number) => {
      setTimeout(() => {
        setCurrentSystem((prev) => ({
          ...prev,
          nodes: prev.nodes.map((node) => 
            node.id === n.id ? { ...node, data: { ...node.data, status: 'running' } } : node
          )
        }));
      }, idx * 800);

      setTimeout(() => {
        setCurrentSystem((prev) => ({
          ...prev,
          nodes: prev.nodes.map((node) => 
            node.id === n.id ? { ...node, data: { ...node.data, status: 'success' } } : node
          )
        }));
      }, (idx + 1) * 800);
    });

    setTimeout(() => {
      setIsSimulating(false);
    }, (nodesCopy.length + 1) * 800);
  };

  // Add Custom Node to Canvas
  const handleAddNode = (nodeType: NodeType) => {
    const newNodeId = 'node-' + Math.random().toString(36).substring(2, 7);
    const labels: Record<NodeType, string> = {
      trigger: 'محفز جديد (Trigger)',
      ui: 'واجهة مدخلات (UI Form)',
      ai: 'نموذج ذكاء اصطناعي (AI)',
      database: 'جدول Supabase DB',
      payment: 'بوابة دفع محلية',
      n8n: 'سير عمل n8n Core',
      notification: 'إشعار واتساب / SMS'
    };

    const newNode: WorkflowNode = {
      id: newNodeId,
      type: 'customNode',
      position: { x: 200 + currentSystem.nodes.length * 40, y: 180 },
      data: {
        label: labels[nodeType],
        type: nodeType,
        description: 'عقدة جديدة مضافة يدوياً إلى المخطط'
      }
    };

    setCurrentSystem((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  };

  // Export System JSON Schema
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentSystem, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `saasx-${currentSystem.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset Layout
  const handleResetLayout = () => {
    if (SYSTEM_TEMPLATES[0]) {
      setCurrentSystem(SYSTEM_TEMPLATES[0]);
    }
  };

  const handleUpdateNode = (updatedNode: WorkflowNode) => {
    setCurrentSystem((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    }));
  };

  // Render Page Based on State
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onNavigate={setCurrentPage} 
        onSelectTemplate={(template) => {
          setCurrentSystem(template);
          setCurrentPage('app');
        }}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage 
        onNavigate={setCurrentPage}
        onLoginSuccess={(email) => setUserEmail(email)}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignUpPage 
        onNavigate={setCurrentPage}
        onSignUpSuccess={(_, email) => setUserEmail(email)}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-['Cairo',sans-serif] selection:bg-[#38BDF8] selection:text-white dir-rtl transition-colors ${
      isLiquidGlassTheme ? 'text-slate-900' : 'bg-slate-950 text-slate-100'
    }`} dir="rtl">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewSystemClick={() => setIsChatOpen(true)}
        onSimulateRun={handleSimulateRun}
        isSimulating={isSimulating}
        systemTitleAr={currentSystem.titleAr}
        onNavigateLanding={() => setCurrentPage('landing')}
        userEmail={userEmail}
        isLiquidGlassTheme={isLiquidGlassTheme}
        onToggleLiquidGlassTheme={() => setIsLiquidGlassTheme(!isLiquidGlassTheme)}
        onOpenShowcase={() => setIsShowcaseOpen(true)}
      />

      {/* Main Content Area based on Active Tab */}
      <main className="flex-1 relative overflow-hidden">
        {activeTab === 'canvas' && (
          <WorkflowCanvas
            nodes={currentSystem.nodes}
            edges={currentSystem.edges}
            onNodeClick={(node) => setSelectedNode(node)}
            onAddNode={handleAddNode}
            onExportJson={handleExportJson}
            onResetLayout={handleResetLayout}
          />
        )}

        {activeTab === 'preview' && (
          <GeneratedUiView system={currentSystem} />
        )}

        {activeTab === 'n8n' && (
          <N8nDockerView system={currentSystem} />
        )}

        {activeTab === 'payments' && (
          <PaymentGatewaySandbox />
        )}

        {activeTab === 'supabase' && (
          <SupabaseRlsView system={currentSystem} />
        )}
      </main>

      {/* AI Assistant Drawer Panel */}
      <ChatPanel
        onGenerate={handleGenerate}
        onSelectTemplate={handleSelectTemplate}
        isLoading={isLoading}
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
      />

      {/* Node Editing Drawer */}
      <NodeDetailDrawer
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdateNode={handleUpdateNode}
      />

      {/* Liquid Glass UI Kit Showcase Modal */}
      {isShowcaseOpen && (
        <LiquidGlassShowcase
          onClose={() => setIsShowcaseOpen(false)}
          isLiquidGlassTheme={isLiquidGlassTheme}
          onToggleTheme={() => setIsLiquidGlassTheme(!isLiquidGlassTheme)}
        />
      )}

    </div>
  );
}
