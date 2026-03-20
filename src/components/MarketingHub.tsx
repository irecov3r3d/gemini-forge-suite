import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Loader2, Send, Copy, Check, Sparkles, Target, Volume2, PenTool } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

const CATEGORIES = [
  "Branding", "Crisis Management", "Customer Segmentation", "SEO Strategy", 
  "Email Marketing", "Lead Generation", "Social Media", "Content Strategy",
  "Product Launch", "Sales Funnel", "Influencer Marketing", "Affiliate Marketing",
  "PPC Campaigns", "Market Research", "Public Relations", "Brand Identity",
  "Copywriting", "Video Marketing", "Podcast Strategy", "Community Building",
  "Customer Retention", "Referral Programs", "Event Marketing", "B2B Strategy",
  "E-commerce Growth", "Direct Mail", "Guerrilla Marketing", "Analytics & Reporting",
  "Competitor Analysis", "Loyalty Programs"
];

export default function MarketingHub() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    category: CATEGORIES[0],
    brandVoice: '',
    targetAudience: '',
    goal: ''
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const content = await geminiService.generateMarketingContent(form);
      setResult(content || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-bold tracking-tight mb-2">Marketing Hub</h2>
        <p className="text-white/60">Generate high-converting content across 30+ categories with perfect brand voice consistency.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Category</label>
              <select 
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Brand Voice</label>
              <div className="relative">
                <Volume2 className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                <input 
                  type="text"
                  placeholder="e.g., Professional yet witty, minimalist, luxury..."
                  value={form.brandVoice}
                  onChange={(e) => setForm({...form, brandVoice: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Target Audience</label>
              <div className="relative">
                <Target className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                <input 
                  type="text"
                  placeholder="e.g., Tech-savvy Gen Z, C-level executives..."
                  value={form.targetAudience}
                  onChange={(e) => setForm({...form, targetAudience: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Specific Goal</label>
              <textarea 
                placeholder="What exactly do you want to achieve?"
                value={form.goal}
                onChange={(e) => setForm({...form, goal: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !form.goal}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Campaign
          </button>
        </section>

        <section className="relative min-h-[500px] bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Generated Output</span>
            {result && (
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-strong:text-orange-400">
            {result ? (
              <ReactMarkdown>{result}</ReactMarkdown>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-white/20 text-center space-y-4">
                <PenTool className="w-12 h-12" />
                <p className="text-sm font-medium">Your marketing content will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
