import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { UniFlowLogo } from './UniFlowLogo';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  isSigningIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenSearch, isSigningIn = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'features', 'explore', 'ai-hub', 'resources', 'founder'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Explore', href: '#explore', id: 'explore' },
    { label: 'AI Hub', href: '#ai-hub', id: 'ai-hub' },
    { label: 'Resources', href: '#resources', id: 'resources' },
    { label: 'About', href: '#founder', id: 'founder' }
  ];

  return (
    <>
      <header
        style={{
          backgroundColor: isScrolled ? 'rgba(10, 9, 15, 0.95)' : 'rgba(10, 9, 15, 0.88)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderColor: isScrolled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)'
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b shadow-[0_4px_30px_rgba(0,0,0,0.5)] ${
          isScrolled ? 'py-2.5' : 'py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* LEFT: UniFlow Logo + Wordmark */}
          <a 
            href="#home" 
            aria-label="UniFlow Home" 
            className="flex items-center group transition-transform hover:scale-105 shrink-0"
          >
            <UniFlowLogo size="md" />
          </a>

          {/* CENTER: Desktop Navigation Links (Visible on 1200px+ / xl) */}
          <nav className="hidden xl:flex items-center gap-1 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 shadow-lg backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeSection === link.id
                    ? 'text-purple-300 bg-purple-500/20 border border-purple-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* RIGHT: Action Buttons (Responsive for Desktop, Tablet, and Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search Spotlight Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search resources"
              className="px-2.5 sm:px-3 py-1.5 rounded-full text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 shadow-sm transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden lg:inline text-slate-300 font-medium">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 bg-black/40 text-[10px] text-slate-400 rounded border border-white/10">⌘K</kbd>
            </button>

            {/* Login Link (Visible on Tablets and Desktops: 768px+) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log('[UniFlow] Navbar Login button clicked');
                onOpenAuth();
              }}
              className="hidden md:inline-flex px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white rounded-full hover:bg-white/[0.08] transition-all cursor-pointer pointer-events-auto"
            >
              Login
            </button>

            {/* Google Continue CTA (Never clipped, adaptive text for Tablet / Mobile) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log('[UniFlow] Navbar Google button clicked');
                onOpenAuth();
              }}
              aria-label="Continue with Google"
              className="relative z-30 group overflow-hidden px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 shadow-[0_4px_20px_rgba(217,70,239,0.35)] transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer shrink-0 pointer-events-auto"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />

              {/* Google Icon */}
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm shrink-0 pointer-events-none">
                <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <span className="hidden sm:inline whitespace-nowrap pointer-events-none">
                {isSigningIn ? 'Signing in...' : 'Continue with Google'}
              </span>
              <span className="sm:hidden whitespace-nowrap pointer-events-none">
                {isSigningIn ? 'Signing in...' : 'Sign in'}
              </span>
            </button>

            {/* Menu Toggle (Visible for Mobile and Tablet: <1200px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors cursor-pointer pointer-events-auto"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 pointer-events-none" /> : <Menu className="w-5 h-5 pointer-events-none" />}
            </button>
          </div>
        </div>

        {/* Adaptive Drawer for Mobile & Tablet */}
        {mobileMenuOpen && (
          <div 
            style={{
              backgroundColor: 'rgba(12, 7, 29, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
            className="xl:hidden px-4 pt-3 pb-6 border-b border-purple-500/20 shadow-2xl animate-in slide-in-from-top duration-200 pointer-events-auto"
          >
            <div className="flex flex-col space-y-1 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? 'bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  console.log('[UniFlow] Navbar Login button clicked');
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-white/[0.06] text-slate-200 text-sm font-semibold hover:bg-white/[0.1] transition-colors cursor-pointer pointer-events-auto"
              >
                Login
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  console.log('[UniFlow] Navbar Google button clicked');
                  onOpenAuth();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-sm font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
              >
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm shrink-0 pointer-events-none">
                  <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <span className="pointer-events-none">
                  {isSigningIn ? 'Signing in...' : 'Continue with Google'}
                </span>
                <ArrowRight className="w-4 h-4 pointer-events-none" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
