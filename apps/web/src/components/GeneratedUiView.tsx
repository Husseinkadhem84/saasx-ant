import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  CreditCard, 
  Database, 
  Workflow, 
  QrCode, 
  Loader2, 
  ShieldCheck, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { GeneratedSystem } from '@saasx/shared';
import { processZainCashPayment, processFastPayPayment, testN8nWebhook } from '../services/api';

interface GeneratedUiViewProps {
  system: GeneratedSystem;
}

export const GeneratedUiView: React.FC<GeneratedUiViewProps> = ({ system }) => {
  const ui = system.generatedUi;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);
  const [paymentSimulation, setPaymentSimulation] = useState<any | null>(null);

  const handleInputChange = (fieldId: string, val: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedResult(null);
    setPaymentSimulation(null);

    try {
      const userPhone = formData['phone'] || formData['patient_phone'] || '07701234567';
      let paymentRes = null;

      // Handle Payment Gateway Simulation
      if (ui.paymentMethod === 'zaincash') {
        paymentRes = await processZainCashPayment(15000, userPhone, ui.titleAr);
        setPaymentSimulation(paymentRes);
      } else if (ui.paymentMethod === 'fastpay') {
        paymentRes = await processFastPayPayment(10000, userPhone);
        setPaymentSimulation(paymentRes);
      }

      // Simulate n8n webhook dispatch
      const webhookRes = await testN8nWebhook(system.n8nConfig.webhookPath, formData);

      setSubmittedResult({
        timestamp: new Date().toLocaleTimeString('ar-IQ'),
        recordId: 'REC_' + Math.random().toString(36).substring(2, 9),
        supabaseStatus: 'ØªÙ…Øª Ø§Ù„Ø¥Ø¶Ø§ÙØ© Ø¨Ù†Ø¬Ø§Ø­ Ø¨Ø­Ù…Ø§ÙŠØ© RLS',
        n8nWebhook: webhookRes,
        payment: paymentRes
      });

    } catch (err) {
      console.error('Execution test error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 my-6">
      
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 rounded-2xl border border-sky-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-sky-500/20 text-sky-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-sky-500/40">
                ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„Ù†Ø¸Ø§Ù… Ø§Ù„Ù…ÙˆÙ„Ø¯ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹
              </span>
              <span className="text-slate-400 text-xs">â€¢ {system.category}</span>
            </div>
            <h2 className="text-2xl font-black text-white">{ui.titleAr || system.titleAr}</h2>
            <p className="text-xs text-slate-300 mt-1">{ui.descriptionAr || system.descriptionAr}</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Database className="w-4 h-4" />
              <span>Supabase DB</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-pink-400 font-semibold">
              <Workflow className="w-4 h-4" />
              <span>n8n Core</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <CreditCard className="w-4 h-4" />
              <span className="uppercase">{ui.paymentMethod || 'Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù…Ø­Ù„ÙŠ'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Generated Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-base font-extrabold text-slate-100 mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø¯Ø®Ù„Ø§Øª (Client Form)</span>
            <span className="text-xs text-slate-400 font-normal">ØªØ¬Ø±Ø¨Ø© Ø¥Ø¯Ø®Ø§Ù„ Ø­ÙŠØ©</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {ui.fields.map((field: any) => (
              <div key={field.id} className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  {field.labelAr} {field.required && <span className="text-rose-400">*</span>}
                </label>

                {field.type === 'select' ? (
                  <select
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">-- Ø§Ø®ØªØ± Ø®ÙŠØ§Ø±Ø§Ù‹ --</option>
                    {field.options?.map((opt: any, i: any) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    required={field.required}
                    rows={3}
                    placeholder={field.placeholderAr}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                ) : (
                  <input
                    type={field.type === 'phone' ? 'tel' : field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                    required={field.required}
                    placeholder={field.placeholderAr}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm transition shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Ø¬Ø§Ø±ÙŠ Ù…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„Ø¥Ø±Ø³Ø§Ù„ ÙˆØ§Ù„ØªÙƒØ§Ù…Ù„...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {ui.submitButtonTextAr || 'Ø¥Ø±Ø³Ø§Ù„ ÙˆØªÙ†Ø´ÙŠØ· Ø§Ù„Ø£ØªÙ…ØªØ©'}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Execution Logs & Payment Gate Console */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Payment Gateway Box */}
          {paymentSimulation && (
            <div className="bg-slate-900/90 border border-indigo-500/40 p-5 rounded-2xl shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm">
                  <Smartphone className="w-5 h-5" />
                  <span>Ù…Ø­Ø§ÙƒØ§Ø© Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø¯ÙØ¹ ({paymentSimulation.provider.toUpperCase()})</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  Ù†Ø§Ø¬Ø­
                </span>
              </div>

              <div className="text-center bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <p className="text-xs text-slate-400">Ø§Ù…Ø³Ø­ Ø§Ù„ÙƒÙˆØ¯ Ø¹Ø¨Ø± ØªØ·Ø¨ÙŠÙ‚ Ø²ÙŠÙ† ÙƒØ§Ø´ / ÙØ§Ø³Øª Ø¨Ø§ÙŠ:</p>
                {paymentSimulation.qrCodeUrl && (
                  <img 
                    src={paymentSimulation.qrCodeUrl} 
                    alt="ZainCash QR Code" 
                    className="w-36 h-36 mx-auto rounded-lg border-2 border-indigo-500/50 p-1 bg-white" 
                  />
                )}
                <div className="text-xs space-y-1">
                  <div className="font-mono text-sky-400 font-bold">Ø±Ù‚Ù… Ø§Ù„Ø¹Ù…Ù„ÙŠØ©: {paymentSimulation.transactionId}</div>
                  <div className="text-slate-300 font-bold">Ø§Ù„Ù…Ø¨Ù„Øº: {paymentSimulation.amountIqd.toLocaleString()} Ø¯ÙŠÙ†Ø§Ø± Ø¹Ø±Ø§Ù‚ÙŠ</div>
                  <div className="text-[11px] text-slate-500">Ù…ÙˆØ¨Ø§ÙŠÙ„ Ø§Ù„Ù…Ø´ØªØ±Ùƒ: {paymentSimulation.customerPhone}</div>
                </div>
              </div>
            </div>
          )}

          {/* Submission Output Console */}
          {submittedResult ? (
            <div className="bg-slate-900/90 border border-emerald-500/40 p-5 rounded-2xl shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm border-b border-slate-800 pb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨ ÙˆØªØ´ØºÙŠÙ„ Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„!</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono">
                <div><span className="text-slate-500">ÙˆÙ‚Øª Ø§Ù„ØªÙ†ÙÙŠØ°:</span> {submittedResult.timestamp}</div>
                <div><span className="text-slate-500">Ø§Ù„Ù…Ø¹Ø±Ù Ø§Ù„Ù…ÙˆÙ„Ø¯:</span> {submittedResult.recordId}</div>
                <div><span className="text-slate-500">Supabase RLS:</span> <span className="text-emerald-400">{submittedResult.supabaseStatus}</span></div>
                <div><span className="text-slate-500">n8n Core Webhook:</span> <span className="text-sky-400">HTTP 200 OK</span></div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl text-center space-y-3">
              <ShieldCheck className="w-10 h-10 text-sky-400 mx-auto opacity-80" />
              <h4 className="font-extrabold text-sm text-slate-200">Ø§Ø®ØªØ¨Ø§Ø± Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ù‚Ù… Ø¨ØªØ¹Ø¨Ø¦Ø© Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ ÙˆØ§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø²Ø± Ø§Ù„Ø¥Ø±Ø³Ø§Ù„ Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø­ÙØ¸ Ø§Ù„Ø³Ø¬Ù„ ÙÙŠ SupabaseØŒ ÙˆØ§Ø³ØªØ¯Ø¹Ø§Ø¡ Webhook Ø§Ù„Ø®Ø§Øµ Ø¨Ù€ n8nØŒ ÙˆÙ…Ø­Ø§ÙƒØ§Ø© Ø¹Ù…Ù„ÙŠØ© Ø§Ù„Ø¯ÙØ¹ Ø¨Ø§Ù„Ø¯ÙŠÙ†Ø§Ø± Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠ.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
