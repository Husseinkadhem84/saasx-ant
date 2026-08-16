import React, { useState } from 'react';
import { 
  Database, 
  Lock, 
  Key, 
  ShieldCheck, 
  Copy, 
  Check, 
  Table as TableIcon,
  Code
} from 'lucide-react';
import { GeneratedSystem } from '@saasx/shared';

interface SupabaseRlsViewProps {
  system: GeneratedSystem;
}

export const SupabaseRlsView: React.FC<SupabaseRlsViewProps> = ({ system }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopySql = (sql: string, index: number) => {
    navigator.clipboard.writeText(sql);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 my-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/40">
              Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ù„Ø­Ù…Ø§ÙŠØ© Ø§Ù„Ø³ÙŠØ§Ø¯ÙŠØ©
            </span>
            <span className="text-slate-400 text-xs">â€¢ Supabase PostgreSQL</span>
          </div>
          <h2 className="text-2xl font-black text-white">Ø¬Ø¯Ø§ÙˆÙ„ Supabase ÙˆØ³ÙŠØ§Ø³Ø§Øª Ø§Ù„Ø£Ù…Ø§Ù† RLS</h2>
          <p className="text-xs text-slate-300 mt-1">ØªÙˆÙ„ÙŠØ¯ Ø¬Ø¯Ø§ÙˆÙ„ Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ù„Ø¹Ù„Ø§Ù‚Ø§Øª ÙˆØ³ÙŠØ§Ø³Ø§Øª Ø¹Ø²Ù„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹.</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <span>Row Level Security Enabled</span>
        </div>
      </div>

      {/* Database Tables List */}
      <div className="space-y-6">
        {system.databaseTables.map((table, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            
            {/* Table Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <TableIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-sky-400">{table.tableName}</span>
                    <span className="text-xs text-slate-300 font-bold">({table.tableNameAr})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{table.description}</p>
                </div>
              </div>

              <span className="text-[11px] bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 font-bold">
                PostgreSQL Table
              </span>
            </div>

            {/* Fields Table */}
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2 font-bold">Ø§Ø³Ù… Ø§Ù„Ø­Ù‚Ù„</th>
                    <th className="pb-2 font-bold">Ù†ÙˆØ¹ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª</th>
                    <th className="pb-2 font-bold">Ø¥Ø¬Ø¨Ø§Ø±ÙŠ</th>
                    <th className="pb-2 font-bold">Ø§Ù„Ù…ÙØªØ§Ø­</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {table.fields.map((field: any, fIdx: any) => (
                    <tr key={fIdx} className="hover:bg-slate-800/30">
                      <td className="py-2.5 font-bold text-slate-200">{field.name}</td>
                      <td className="py-2.5 text-sky-400">{field.type}</td>
                      <td className="py-2.5">
                        {field.required ? (
                          <span className="text-rose-400 font-semibold">Ù†Ø¹Ù…</span>
                        ) : (
                          <span className="text-slate-500">Ø§Ø®ØªÙŠØ§Ø±ÙŠ</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        {field.isPrimary ? (
                          <span className="flex items-center gap-1 text-amber-400 font-bold text-[10px]">
                            <Key className="w-3 h-3" />
                            PRIMARY KEY
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RLS Policy SQL Section */}
            <div className="p-4 bg-slate-950/90 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-200 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Ø³ÙŠØ§Ø³Ø© Ø£Ù…Ø§Ù† Ø¹Ø²Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª (Row Level Security SQL):
                </span>

                <button
                  onClick={() => handleCopySql(table.rlsPolicySql, idx)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition"
                >
                  {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === idx ? 'ØªÙ… Ø§Ù„Ù†Ø³Ø®' : 'Ù†Ø³Ø® ÙƒÙˆØ¯ SQL'}
                </button>
              </div>

              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                {table.rlsPolicySql}
              </pre>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
