import React, { useState, useEffect } from 'react';
import { 
  ListOrdered, 
  ArrowLeft, 
  Lock, 
  ChevronRight,
  Network, 
  Binary, 
  Cpu, 
  FlaskConical, 
  Terminal, 
  Code2, 
  Laptop, 
  BookOpen
} from 'lucide-react';
import { SEM3_SUBJECTS, Sem3Subject } from './Semester3Data';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const Semester3View: React.FC = () => {
  const { openProtectedResource } = usePasswordGate();

  // Read current route state
  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'semester-3' && parsed.sem3State) {
      return parsed.sem3State;
    }
    return { mode: 'sem3Home' as const, context: {} };
  };

  const [viewState, setViewState] = useState(getCurrentState);

  // Synchronize on popstate (browser back/forward or programmatic navigation)
  useEffect(() => {
    const handlePopState = () => {
      setViewState(getCurrentState());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    navigate(path);
    setViewState(getCurrentState());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    goBack('/app/semester-3');
  };

  // Helper for rendering subject icons
  const renderSubjectIcon = (iconName: Sem3Subject['icon'], className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Network':
        return <Network className={className} />;
      case 'Binary':
        return <Binary className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  // Prominent Red Password Banner matching reference screenshot
  const renderPasswordBanner = () => (
    <div className="mt-2 mb-8 p-3.5 sm:p-4 bg-red-500/10 dark:bg-red-950/60 border-2 border-red-500/40 text-red-600 dark:text-red-400 rounded-2xl font-black text-center text-sm sm:text-base shadow-lg max-w-2xl mx-auto flex items-center justify-center gap-2.5">
      <Lock className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
      <span>
        IMPORTANT: The password is{' '}
        <span className="font-black text-red-600 dark:text-red-400 uppercase underline decoration-2 underline-offset-4 tracking-wider">
          VISHNU
        </span>
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-20 font-sans">
      {/* Top Back Button when inside Syllabus Subjects view */}
      {viewState.mode !== 'sem3Home' && (
        <div className="mb-6 animate-fade-in">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 rounded-full text-indigo-700 dark:text-indigo-300 font-extrabold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-white/40 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Semester 3</span>
          </button>
        </div>
      )}

      {/* 1. SEMESTER 3 ROOT VIEW - ONLY SYLLABUS CARD */}
      {viewState.mode === 'sem3Home' && (
        <div className="animate-fade-in space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
              Semester 3 Archive
            </h2>
          </div>

          {renderPasswordBanner()}

          <div className="max-w-xl mx-auto">
            {/* Syllabus Card */}
            <div
              id="sem3-syllabus-root-card"
              onClick={() => navigateTo('/app/semester-3/syllabus')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigateTo('/app/semester-3/syllabus');
                }
              }}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 sm:p-10 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-teal-500/20 rounded-full blur-2xl group-hover:bg-teal-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white group-hover:scale-105 transition-transform">
                    <ListOrdered className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Syllabus</h2>
                  <p className="text-gray-300 text-sm">Curriculum for Sem 3</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-teal-300 group-hover:translate-x-1 transition-transform">
                  <span>View Curriculum</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SYLLABUS SUBJECTS VIEW - MATCHING FIRST SCREENSHOT CARD FORMAT */}
      {viewState.mode === 'syllabusSubjects' && (
        <div className="animate-fade-in space-y-6">
          <div className="text-center mb-4">
            <div className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full mb-2">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                Semester 3 &bull; Syllabus
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
              Semester 3 Curriculum
            </h2>
            <p className="text-gray-500 text-sm mt-1">Official course syllabus subjects and laboratories</p>
          </div>

          {renderPasswordBanner()}

          {/* Large Premium Cards arranged in a 2-column responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SEM3_SUBJECTS.map((sub) => {
              const hasLink = Boolean(sub.link && sub.link.trim() !== '');

              return (
                <div
                  key={sub.id}
                  id={`sem3-card-${sub.id}`}
                  className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-6 sm:p-7 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] flex flex-col justify-between"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {/* Top: Icon + Title & Subtitle */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${sub.gradient} text-white flex items-center justify-center shadow-lg shrink-0`}>
                      {renderSubjectIcon(sub.icon, 'w-6 h-6')}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                        {sub.name}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {sub.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Content / Action Area + Password chip */}
                  <div className="flex flex-col gap-3.5">
                    {hasLink ? (
                      <button
                        type="button"
                        onClick={() => openProtectedResource(sub.link, `${sub.name} Syllabus`)}
                        className="w-full text-center py-3 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                      >
                        <span>Open Syllabus</span>
                      </button>
                    ) : (
                      <div className="w-full text-center py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-400 bg-white/5 border border-white/5 select-none">
                        Syllabus not uploaded yet
                      </div>
                    )}

                    <div className="text-center pt-2.5 border-t border-white/5">
                      <span className="text-[11px] text-red-400 font-bold bg-red-950/80 px-3 py-1 rounded-lg border border-red-500/30 inline-block">
                        Password: vishnu
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
