import React from 'react';
import { MessageCircle, Instagram, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { UniFlowLogo } from './UniFlowLogo';
import { FOUNDER_INFO } from '../data';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-purple-500/20 bg-[#070314] pt-14 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block">
              <UniFlowLogo size="md" />
            </a>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Your digital student command center. Uniting study resources, PYQs, AI models, games, and productivity tools into one seamless flow.
            </p>
            
            {/* Social Icons with Vishnu's Actual URLs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={FOUNDER_INFO.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title={`WhatsApp (${FOUNDER_INFO.phone})`}
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={FOUNDER_INFO.links.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title={`Instagram (${FOUNDER_INFO.instagramHandle})`}
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/40 text-slate-300 hover:text-pink-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={FOUNDER_INFO.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-blue-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={FOUNDER_INFO.links.email}
                aria-label="Email"
                title="Send Email"
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-purple-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#home" className="hover:text-purple-300 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-purple-300 transition-colors">Features</a></li>
              <li><a href="#explore" className="hover:text-purple-300 transition-colors">Ecosystem</a></li>
              <li><a href="#ai-hub" className="hover:text-purple-300 transition-colors">AI Studio</a></li>
              <li><a href="#resources" className="hover:text-purple-300 transition-colors">Resources</a></li>
              <li><a href="#founder" className="hover:text-purple-300 transition-colors">About Founder</a></li>
            </ul>
          </div>

          {/* Ecosystem Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#explore" className="hover:text-purple-300 transition-colors">Study & Notes Vault</a></li>
              <li><a href="#explore" className="hover:text-purple-300 transition-colors">Exam Papers & PYQs</a></li>
              <li><a href="#explore" className="hover:text-purple-300 transition-colors">AI Assistant Suite</a></li>
              <li><a href="#explore" className="hover:text-purple-300 transition-colors">Focus Arcade</a></li>
              <li><a href="#explore" className="hover:text-purple-300 transition-colors">Digital Bookshelf</a></li>
              <li><a href="#explore" className="hover:text-purple-300 transition-colors">CGPA Calculator</a></li>
            </ul>
          </div>

          {/* Legal & Creator */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#home" className="hover:text-purple-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#home" className="hover:text-purple-300 transition-colors">Terms of Service</a></li>
              <li><a href="#home" className="hover:text-purple-300 transition-colors">Cookie Policy</a></li>
              <li><a href="#home" className="hover:text-purple-300 transition-colors">Community Guidelines</a></li>
              <li className="pt-2 text-purple-300 font-semibold">B.Tech First-Year Project</li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 UniFlow. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Designed & Built with passion by</span>
            <a href="#founder" className="font-bold text-white hover:text-purple-300 transition-colors underline decoration-purple-500">
              {FOUNDER_INFO.name}
            </a>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
