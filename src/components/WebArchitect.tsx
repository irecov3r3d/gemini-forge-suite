import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Loader2, Globe, Layout, ShieldCheck, Rocket, Copy, Check, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function WebArchitect() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    type: '',
    audience: '',
    style: ''
  });

  const handleArchitect = async () => {
    if (!form.type || !form.audience) return;
    setLoading(true);
    try {
      const data = await geminiService.architectWebsite(form);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = () => {
    if (!result?.masterPrompt) return;
    navigator.clipboard.writeText(result.masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-bold tracking-tight mb-2">Web Architect</h2>
        <p className="text-white/60">Analyze requirements and generate complete production-ready master prompts for functional websites.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1 space-y-6 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Site Parameters</span>
            </div>
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Website Type</label>
              <input 
                type="text"
                placeholder="e.g., SaaS Landing Page, Portfolio, Blog..."
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Target Audience</label>
              <input 
                type="text"
                placeholder="e.g., Small business owners, creative designers..."
                value={form.audience}
                onChange={(e) => setForm({...form, audience: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Brand Style</label>
              <input 
                type="text"
                placeholder="e.g., Brutalist, Minimalist, Dark Luxury..."
                value={form.style}
                onChange={(e) => setForm({...form, style: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleArchitect}
            disabled={loading || !form.type}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
            Architect Site
          </button>
        </section>

        <section className="lg:col-span-2 space-y-6">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Structure
                  </h4>
                  <ul className="space-y-2">
                    {result.structure.map((s: string) => (
                      <li key={s} className="text-sm text-white/60 flex items-center gap-2">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> Best Practices
                  </h4>
                  <ul className="space-y-2">
                    {result.features.map((f: string) => (
                      <li key={f} className="text-sm text-white/60 flex items-center gap-2">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Master Prompt</span>
                  </div>
                  <button 
                    onClick={copyPrompt}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="p-6 bg-black/40 font-mono text-xs text-white/50 leading-relaxed max-h-[300px] overflow-y-auto">
                  {result.masterPrompt}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[500px] bg-[#0a0a0a] rounded-3xl border border-white/10 flex flex-col items-center justify-center text-white/20 text-center space-y-4">
              <Globe className="w-16 h-16" />
              <p className="text-sm font-medium">Site architecture will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
