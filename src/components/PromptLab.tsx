import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Loader2, Terminal, ShieldAlert, Zap, Copy, Check, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

export default function PromptLab() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!prompt) return;
    setError(null);
    setLoading(true);
    try {
      const result = await geminiService.analyzePrompt(prompt);
      setAnalysis(result || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-bold tracking-tight mb-2">Prompt Lab</h2>
        <p className="text-white/60">Dissect weak prompts, eliminate hallucinations, and engineer world-class AI command structures.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Input Prompt</span>
          </div>
          <textarea 
            placeholder="Paste a prompt you want to improve or dissect..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-mono"
          />
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
              {error}
            </div>
          )}
          <button
            onClick={handleAnalyze}
            disabled={loading || !prompt}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            Analyze & Rebuild
          </button>
        </section>

        {analysis && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">Analysis & Optimized Prompt</span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-8 prose prose-invert max-w-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
