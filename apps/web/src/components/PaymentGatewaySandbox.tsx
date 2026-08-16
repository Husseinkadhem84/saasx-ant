import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  QrCode, 
  Loader2, 
  History, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { processZainCashPayment, processFastPayPayment } from '../services/api';

export const PaymentGatewaySandbox: React.FC = () => {
  const [provider, setProvider] = useState<'zaincash' | 'fastpay'>('zaincash');
  const [amountIqd, setAmountIqd] = useState(25000);
  const [phone, setPhone] = useState('07701234567');
  const [isLoading, setIsLoading] = useState(false);
  const [activePayment, setActivePayment] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleExecutePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setActivePayment(null);

    try {
      let res;
      if (provider === 'zaincash') {
        res = await processZainCashPayment(amountIqd, phone, 'SAASX Test System Payment');
      } else {
        res = await processFastPayPayment(amountIqd, phone);
      }

      setActivePayment(res);
      setHistory((prev) => [res, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 my-6 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-indigo-500/40">
              بوابات الدفع الإلكتروني العراقية
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">بيئة بيئة زين كاش و فاكست باي (Sandbox)</h2>
          <p className="text-xs text-slate-300 mt-1">اختبار استقطاع المبالغ بالدينار العراقي IQD وتفعيل الاشتراكات تلقائياً.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">زين كاش</span>
            <span className="text-xs font-bold text-emerald-400">نشط (Active)</span>
          </div>
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">فاست باي</span>
            <span className="text-xs font-bold text-emerald-400">نشط (Active)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Payment Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-5">
          <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            <span>تنفيذ عملية دفع تجريبية</span>
          </h3>

          <form onSubmit={handleExecutePayment} className="space-y-4">
            
            {/* Provider Switch */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setProvider('zaincash')}
                className={`py-2.5 rounded-lg text-xs font-extrabold transition flex items-center justify-center gap-2 ${
                  provider === 'zaincash'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                زين كاش (ZainCash)
              </button>

              <button
                type="button"
                onClick={() => setProvider('fastpay')}
                className={`py-2.5 rounded-lg text-xs font-extrabold transition flex items-center justify-center gap-2 ${
                  provider === 'fastpay'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                فاست باي (FastPay)
              </button>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                المبلغ بالدينار العراقي (IQD):
              </label>
              <input
                type="number"
                step={5000}
                value={amountIqd}
                onChange={(e) => setAmountIqd(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Customer Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                رقم الموبايل المشترك (MSISDN):
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الاتصال بالسيرفر المحلي للبوابة...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  إنشاء كود دفع {provider === 'zaincash' ? 'زين كاش' : 'فاست باي'}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Payment Simulation Output & QR Code */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <QrCode className="w-5 h-5 text-indigo-400" />
              <span>رمز الاستجابة السريعة (QR Token)</span>
            </h3>

            {activePayment ? (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                {activePayment.qrCodeUrl && (
                  <img
                    src={activePayment.qrCodeUrl}
                    alt="Payment QR"
                    className="w-40 h-40 mx-auto rounded-xl p-1.5 bg-white border-2 border-indigo-500/50 shadow-lg"
                  />
                )}
                
                <div className="space-y-1">
                  <div className="text-xs text-emerald-400 font-extrabold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {activePayment.message}
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    رمز العملية: <span className="text-sky-400 font-bold">{activePayment.transactionId}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    المبلغ: <span className="text-indigo-400 font-bold">{activePayment.amountIqd.toLocaleString()} IQD</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-8 rounded-xl border border-slate-800/80 text-center text-slate-400 space-y-2">
                <ShieldCheck className="w-10 h-10 text-indigo-400 mx-auto opacity-60" />
                <p className="text-xs">اختر البوابة وحدد المبلغ ثم انقر على إنشاء كود الدفع لتجربة العملية.</p>
              </div>
            )}
          </div>

          {/* History Log */}
          {history.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-indigo-400" />
                سجل العمليات التجريبية الأخيرة ({history.length}):
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 text-[11px] font-mono">
                {history.map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="uppercase font-bold text-indigo-400">{tx.provider}</span>
                    <span className="text-slate-300">{tx.transactionId}</span>
                    <span className="text-emerald-400 font-bold">{tx.amountIqd.toLocaleString()} IQD</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
