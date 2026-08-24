import React, { useState } from 'react';
import { Sparkles, Wand2, Download, Copy, RefreshCw, Check, Image as ImageIcon } from 'lucide-react';

interface AIImageLabProps {
  onShowToast: (msg: string) => void;
}

export const AIImageLab: React.FC<AIImageLabProps> = ({ onShowToast }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    'A futuristic cybernetic university campus in Jaipur with glowing neon domes and student drones, 8k render, octane style',
    'A cyberpunk student programmer coding neural networks with holographic matrices floating in ambient violet light',
    'Hyper-realistic golden hour portrait of an AI researcher working in a glass high-rise library surrounded by glowing data visualizers',
    'Vibrant anime style tech hackathon with students collaborating on neon mechanical robots in a sleek lab'
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      onShowToast('Please enter an image prompt first!');
      return;
    }

    setIsLoading(true);
    const seed = Math.floor(Math.random() * 100000);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt.trim())}?width=1024&height=1024&nologo=true&seed=${seed}`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setGeneratedImageUrl(url);
      setIsLoading(false);
      onShowToast('Image synthesized successfully!');
    };
    img.onerror = () => {
      // Fallback
      setGeneratedImageUrl(url);
      setIsLoading(false);
    };
  };

  const handleCopyLink = () => {
    if (!generatedImageUrl) return;
    navigator.clipboard.writeText(generatedImageUrl);
    setCopied(true);
    onShowToast('Image URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Input Glass Card */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Generative AI Visual Lab</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-3">
          AI Image Generator
        </h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto mb-6">
          Turn any idea, concept, or project diagram vision into high-definition digital artwork instantly.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cyberpunk student programmer coding neural networks with holographic violet light..."
              className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-100 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-slate-800 text-sm shadow-inner transition-all resize-none placeholder-slate-400"
            />
          </div>

          {/* Quick Sample Prompts */}
          <div className="flex flex-wrap gap-2 justify-center">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(p)}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 font-medium transition-all text-left max-w-xs truncate cursor-pointer border border-indigo-100/60"
              >
                ✨ {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Invoking AI Engine...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate High-Def Art</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Display Box */}
      <div className="aspect-square w-full max-w-lg mx-auto bg-white/70 backdrop-blur-xl rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-indigo-200 shadow-2xl relative p-4 group">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-indigo-600 font-bold animate-pulse text-base">Synthesizing Visual Pixels...</p>
            <p className="text-xs text-slate-400">Rendering through distributed neural cluster</p>
          </div>
        ) : generatedImageUrl ? (
          <div className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col items-center justify-center">
            <img
              src={generatedImageUrl}
              alt={prompt || 'AI generated result'}
              className="w-full h-full object-cover rounded-2xl shadow-inner animate-in fade-in zoom-in-95 duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-2 p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white">
              <span className="text-xs font-semibold truncate flex-1">{prompt}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={generatedImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="uniflow-ai-art.jpg"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-700 mb-1">Canvas is Ready</h4>
            <p className="text-slate-400 text-xs max-w-xs">
              Type your vision above and click Generate to see the neural masterpiece appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
