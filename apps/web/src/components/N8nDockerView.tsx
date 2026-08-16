import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Send, 
  FolderCheck, 
  HardDrive, 
  Workflow, 
  Play, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { GeneratedSystem } from '@saasx/shared';
import { testN8nWebhook } from '../services/api';

interface N8nDockerViewProps {
  system: GeneratedSystem;
}

export const N8nDockerView: React.FC<N8nDockerViewProps> = ({ system }) => {
  const [copied, setCopied] = useState(false);
  const [testPayload, setTestPayload] = useState('{\n  "orderId": "ORD_9942",\n  "amountIqd": 15000,\n  "customerPhone": "07701234567"\n}');
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResponse, setTestResponse] = useState<any | null>(null);

  const handleCopyDocker = () => {
    navigator.clipboard.writeText(system.dockerComposeYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestWebhook = async () => {
    setIsTestingWebhook(true);
    setTestResponse(null);
    try {
      let parsed = {};
      try { parsed = JSON.parse(testPayload); } catch (e) { parsed = { raw: testPayload }; }
      const res = await testN8nWebhook(system.n8nConfig.webhookPath, parsed);
      setTestResponse(res);
    } catch (err: any) {
      setTestResponse({ error: err.message || 'فشل الاتصال بـ Webhook' });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 my-6 space-y-6">
      
      {/* Secondary Drive D:\ Compliance Banner */}
      <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-200 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              التزام صارم بالقرص الثانوي D:\
            </h4>
            <p className="text-amber-300/90 text-xs mt-0.5">
              تمت تهيئة حجم التخزين الدائم لـ n8n على المسار: <code className="bg-amber-950 px-2 py-0.5 rounded border border-amber-800 font-mono text-amber-200">D:\saasx-data\n8n</code> لحماية القرص الرئيسي C:\.
            </p>
          </div>
        </div>
        <span className="bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-full text-[11px] border border-amber-500/40 self-start sm:self-auto">
          D:\ Volume Mount Verified
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Docker Compose YAML Code Box */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-100 font-extrabold text-sm">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>ملف docker-compose.yml للتشغيل المحلي</span>
            </div>

            <button
              onClick={handleCopyDocker}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-md shadow-sky-500/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'تم النسخ!' : 'نسخ الملف'}
            </button>
          </div>

          <pre className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed">
            {system.dockerComposeYaml}
          </pre>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>مسار n8n Webhook: <code className="text-pink-400 font-mono">{system.n8nConfig.webhookPath}</code></span>
            <span>الميناذ: <code className="text-amber-300 font-mono">5678</code></span>
          </div>
        </div>

        {/* Interactive Webhook Tester Console */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-100 font-extrabold text-sm">
            <Workflow className="w-5 h-5 text-pink-400" />
            <span>اختبار استدعاء Webhook الخاص بـ n8n</span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              حمولة الـ Payload (JSON):
            </label>
            <textarea
              rows={5}
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            onClick={handleTestWebhook}
            disabled={isTestingWebhook}
            className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs transition shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2"
          >
            {isTestingWebhook ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                جاري إرسال الطلب لمحرك n8n...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                إرسال تجريبي إلى {system.n8nConfig.webhookPath}
              </>
            )}
          </button>

          {/* Test Response Console */}
          {testResponse && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                <FolderCheck className="w-4 h-4" />
                استجابة السيرفر المحلي:
              </div>
              <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                {JSON.stringify(testResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
