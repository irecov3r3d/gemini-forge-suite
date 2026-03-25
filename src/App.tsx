import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  Terminal, 
  Workflow, 
  Palette, 
  Globe, 
  Settings,
  ChevronRight,
  Sparkles,
  Zap,
  BrainCircuit,
  Image as ImageIcon,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Modules
import MarketingHub from './components/MarketingHub';
import PromptLab from './components/PromptLab';
import WorkflowEngine from './components/WorkflowEngine';
import CreativeStudio from './components/CreativeStudio';
import WebArchitect from './components/WebArchitect';

type ModuleType = 'marketing' | 'prompt' | 'workflow' | 'creative' | 'web';

const navItems = [
  { id: 'marketing', label: 'Marketing Hub', icon: PenTool, color: 'text-orange-500' },
  { id: 'prompt', label: 'Prompt Lab', icon: Terminal, color: 'text-blue-500' },
  { id: 'workflow', label: 'Logic Engine', icon: Workflow, color: 'text-purple-500' },
  { id: 'creative', label: 'Creative Studio', icon: Palette, color: 'text-pink-500' },
  { id: 'web', label: 'Web Architect', icon: Globe, color: 'text-emerald-500' },
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('marketing');

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col bg-[#0a0a0a]">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">OmniCreative</h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleType)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                activeModule === item.id 
                  ? "bg-white/10 text-white" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeModule === item.id ? item.color : "text-white/40 group-hover:text-white/60")} />
              <span className="text-sm font-medium">{item.label}</span>
              {activeModule === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1 h-4 bg-indigo-500 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-4 rounded-2xl border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Pro Access</span>
            </div>
            <p className="text-[10px] text-white/60 leading-relaxed">
              Gemini 3.1 Pro enabled for complex reasoning and multimodal tasks.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto bg-grid-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-8 max-w-6xl mx-auto"
          >
            {activeModule === 'marketing' && <MarketingHub />}
            {activeModule === 'prompt' && <PromptLab />}
            {activeModule === 'workflow' && <WorkflowEngine />}
            {activeModule === 'creative' && <CreativeStudio />}
            {activeModule === 'web' && <WebArchitect />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
