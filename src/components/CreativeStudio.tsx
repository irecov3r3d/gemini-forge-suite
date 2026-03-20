import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Loader2, Palette, ImageIcon, BookOpen, GitBranch, Wand2, Download, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function CreativeStudio() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'story'>('visual');

  const handleGenerateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const img = await geminiService.generateImage(prompt);
      setImage(img);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Creative Studio</h2>
          <p className="text-white/60">Generate cinematic assets, manage story bibles, and visualize narrative branching.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('visual')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === 'visual' ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20" : "text-white/40 hover:text-white/60"
            )}
          >
            Visual Arts
          </button>
          <button 
            onClick={() => setActiveTab('story')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === 'story' ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20" : "text-white/40 hover:text-white/60"
            )}
          >
            Story Bible
          </button>
        </div>
      </header>

      {activeTab === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-6 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Asset Generator</span>
              </div>
              <textarea 
                placeholder="Describe the cinematic asset you want to generate (e.g., A minimalist silhouette of a futuristic city at sunset, cinematic lighting, 8k)..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm min-h-[200px] focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">Style</span>
                  <span className="text-xs font-bold">Cinematic</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">Ratio</span>
                  <span className="text-xs font-bold">1:1</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={loading || !prompt}
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
              Generate Asset
            </button>
          </section>

          <section className="relative aspect-square bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group">
            {image ? (
              <>
                <img src={image} alt="Generated" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                    <Download className="w-6 h-6" />
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-white/20 text-center space-y-4">
                <Palette className="w-16 h-16" />
                <p className="text-sm font-medium">Your cinematic asset will appear here.</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="space-y-6">
            <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Story Bible</span>
              </div>
              <div className="space-y-3">
                {['Characters', 'World Building', 'Plot Points', 'Timeline'].map(item => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <span className="text-white/60">{item}</span>
                    <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <section className="lg:col-span-2 bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 min-h-[500px] flex flex-col items-center justify-center text-center space-y-6">
            <GitBranch className="w-16 h-16 text-white/10" />
            <div className="max-w-md">
              <h3 className="text-xl font-bold mb-2">Narrative Branching Engine</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Visualize parallel narrative universes and plot probability trees using XML state tracking. (Coming soon in the next iteration)
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
