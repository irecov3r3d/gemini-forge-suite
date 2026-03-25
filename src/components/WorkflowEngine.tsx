import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Loader2, BrainCircuit, Play, Layers, History, Search, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

export default function WorkflowEngine() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleThink = async () => {
    if (!topic) return;
    setError(null);
    setLoading(true);
    try {
      const content = await geminiService.deepThink(topic);
      setResult(content || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-bold tracking-tight mb-2">Logic Engine</h2>
        <p className="text-white/60">Execute multi-step workflows and recursive "Deep Thinking" logic loops for complex strategy.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Deep Thinking Mode</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Analyzes topics through recursive logic, debunking myths and synthesizing strategic conclusions using Gemini 3.1 Pro.
            </p>
            <textarea 
              placeholder="Enter a complex topic or strategy to analyze..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
            />
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                {error}
              </div>
            )}
            <button
              onClick={handleThink}
              disabled={loading || !topic}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              Start Analysis
            </button>
          </div>

          <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-white/40" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Workflow Templates</span>
            </div>
            <div className="space-y-2">
              {['Market Analysis', 'Content Multiplier', 'Learning Path', 'Strategy Synthesis'].map(t => (
                <button key={t} className="w-full text-left px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-2 bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Analysis Output</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
              <Info className="w-3 h-3" />
              Recursive Logic Active
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-strong:text-purple-400">
            {result ? (
              <ReactMarkdown>{result}</ReactMarkdown>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-white/20 text-center space-y-4">
                <BrainCircuit className="w-12 h-12" />
                <p className="text-sm font-medium">Strategic analysis will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
