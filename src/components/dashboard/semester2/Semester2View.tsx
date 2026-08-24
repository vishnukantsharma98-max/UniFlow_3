import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  BookOpen, 
  ArrowLeft, 
  Lock, 
  FileText, 
  Code2,
  Table,
  Calculator,
  Network,
  Wrench,
  Briefcase,
  Heart,
  Landmark,
  Download,
  ExternalLink,
  ChevronRight,
  Atom,
  Zap,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../ThemeSystem';
import { 
  SEM2_ASSIGNMENT_SUBJECTS, 
  SEM2_SUBJECT_METAS, 
  SEM2_ASSIGNMENTS, 
  SEM2_EXAM_VAULT, 
  IHVPE_RESOURCE, 
  CONSTITUTION_RESOURCE 
} from './Semester2Data';
import { parseRoute, navigate, goBack, slugify } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const Semester2View: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  // Read current route state
  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'semester-2' && parsed.sem2State) {
      return parsed.sem2State;
    }
    return { mode: 'sem2Home' as const, context: {} };
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
    goBack('/app/semester-2');
  };

  const getBackLabel = () => {
    const { mode } = viewState;
    if (mode === 'assignmentDetail') return 'Assignments';
    if (mode === 'examVaultDetail') return 'Exam Vault';
    return 'Semester 2';
  };

  // Prominent Red Password Banner
  const renderPasswordBanner = () => (
    <div className="mt-2 mb-6 p-3.5 sm:p-4 bg-red-500/10 dark:bg-red-950/60 border-2 border-red-500/40 text-red-600 dark:text-red-400 rounded-2xl font-black text-center text-sm sm:text-base shadow-lg max-w-2xl mx-auto flex items-center justify-center gap-2.5">
      <Lock className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
      <span>IMPORTANT: The password is <span className="font-black text-red-600 dark:text-red-400 uppercase underline decoration-2 underline-offset-4 tracking-wider">vishnu</span></span>
    </div>
  );

  // Subject icon helper
  const renderSubjectIcon = (name: string, className: string = 'w-6 h-6') => {
    switch (name) {
      case 'Advanced Excel':
        return <Table className={className} />;
      case 'C++':
        return <Code2 className={className} />;
      case 'DSA':
        return <Network className={className} />;
      case 'Maths for AI':
        return <Calculator className={className} />;
      case 'Engineering Workshop':
        return <Wrench className={className} />;
      case 'Professional Skills':
        return <Briefcase className={className} />;
      case 'Applied Physics':
        return <Atom className={className} />;
      case 'EM-2':
        return <Calculator className={className} />;
      case 'BEEE':
        return <Zap className={className} />;
      case 'IHVPE':
        return <Heart className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-20 font-sans">
      {/* Top Synchronized In-App Back Button */}
      {viewState.mode !== 'sem2Home' && (
        <div className="mb-6 animate-fade-in">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 rounded-full text-indigo-700 dark:text-indigo-300 font-extrabold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-white/40 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {getBackLabel()}</span>
          </button>
        </div>
      )}

      {/* 1. SEMESTER 2 ROOT VIEW (EXACTLY 4 MAIN FOLDERS) */}
      {viewState.mode === 'sem2Home' && (
        <div className="animate-fade-in space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
              Semester 2 Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* 1. Assignments Card */}
            <div
              onClick={() => navigateTo('/app/semester-2/assignments')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[240px]"
            >
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold mb-2 text-white">Assignments</h2>
                  <p className="text-gray-300 text-sm">6 Core Subjects & Tasks</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-blue-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>Open Assignments</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* 2. Exam Vault Card */}
            <div
              onClick={() => navigateTo('/app/semester-2/exam-vault')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[240px]"
            >
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <ClipboardCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold mb-2 text-white">Exam Vault</h2>
                  <p className="text-gray-300 text-sm">In-Sem 1, 2, 3 & End Sem</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-purple-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>Explore Vault</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* 3. IHVPE Card */}
            <div
              onClick={() => navigateTo('/app/semester-2/ihvpe')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[240px]"
            >
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold mb-2 text-white">IHVPE</h2>
                  <p className="text-gray-300 text-sm">Universal Human Values & Professional Ethics</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-rose-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>Book, Notes & Assignments</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* 4. Indian Constitution Card */}
            <div
              onClick={() => navigateTo('/app/semester-2/indian-constitution')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[240px]"
            >
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <Landmark className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold mb-2 text-white">Indian Constitution</h2>
                  <p className="text-gray-300 text-sm">Study Material & QB</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-orange-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>Access Material & QB</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SEMESTER 2 ASSIGNMENTS - SUBJECTS MENU */}
      {viewState.mode === 'assignmentsMenu' && (
        <div className="animate-fade-in space-y-6">
          <div className="text-center mb-6">
            <div className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full mb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Semester 2 Assignments
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
              Select Subject
            </h2>
            <p className="text-gray-500 text-sm mt-1">Choose a subject to view all assignment question sheets</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SEM2_ASSIGNMENT_SUBJECTS.map((subj) => {
              const meta = SEM2_SUBJECT_METAS[subj];
              const count = SEM2_ASSIGNMENTS.filter((a) => a.subject === subj).length;
              const slug = meta.slug;

              return (
                <div
                  key={subj}
                  onClick={() => navigateTo(`/app/semester-2/assignments/${slug}`)}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all border border-white/20 dark:border-white/10 group flex items-center gap-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                    {renderSubjectIcon(subj, 'w-8 h-8')}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg leading-snug">
                      {subj}
                    </h3>
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold mt-1">
                      {count} {count === 1 ? 'Assignment' : 'Assignments'}
                    </p>
                    <span className="text-[10px] text-red-500 font-bold block mt-1">
                      Password: vishnu
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SEMESTER 2 SPECIFIC SUBJECT ASSIGNMENTS DETAIL */}
      {viewState.mode === 'assignmentDetail' && (
        <div className="animate-fade-in space-y-6">
          {(() => {
            const currentSubj = viewState.context.subject || 'Advanced Excel';
            const assignments = SEM2_ASSIGNMENTS.filter((a) => a.subject === currentSubj);

            return (
              <>
                <div className="text-center mb-4">
                  <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">
                    Sem 2 Assignments
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">
                    {currentSubj}
                  </h2>
                </div>

                {renderPasswordBanner()}

                {assignments.length === 0 ? (
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-12 rounded-3xl text-center border border-white/20 max-w-2xl mx-auto">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      No Assignments Uploaded
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">Check back later or contact admin.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {assignments.map((assign) => (
                      <div
                        key={assign.id}
                        className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border-l-4 border-indigo-500 flex flex-col justify-between h-full border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                            {assign.title}
                          </h3>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => openProtectedResource(assign.questionLink, `${assign.subject} - ${assign.title}`)}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white py-3 rounded-xl font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>Open Question</span>
                          </button>

                          <div className="text-center pt-2">
                            <span className="text-xs text-red-600 dark:text-red-400 font-bold bg-yellow-100 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
                              Password: vishnu
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* 4. SEMESTER 2 EXAM VAULT - 4 FOLDERS */}
      {viewState.mode === 'examVaultMenu' && (
        <div className="animate-fade-in space-y-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full mb-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                Semester 2 Exam Vault
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
              Select Examination
            </h2>
            <p className="text-gray-500 text-sm mt-1">Mid-term and final examination papers</p>
          </div>

          {renderPasswordBanner()}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {SEM2_EXAM_VAULT.map((block) => (
              <div
                key={block.id}
                onClick={() => navigateTo(`/app/semester-2/exam-vault/${block.id}`)}
                className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-7 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[240px]"
              >
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-all pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg text-white">
                      <ClipboardCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1 text-white">{block.title}</h3>
                    <p className="text-gray-300 text-xs">{block.subtitle}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs font-semibold text-purple-300">
                      {block.subjects.length} Subjects
                    </span>
                    <span className="text-[10px] text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                      Pass: vishnu
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SEMESTER 2 EXAM VAULT DETAIL (Specific Test Subject List) */}
      {viewState.mode === 'examVaultDetail' && (
        <div className="animate-fade-in space-y-8">
          {(() => {
            const currentTestId = viewState.context.testId || 'in-sem-1';
            const block = SEM2_EXAM_VAULT.find((b) => b.id === currentTestId) || SEM2_EXAM_VAULT[0];

            return (
              <>
                <div className="text-center mb-4">
                  <div className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full mb-2">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                      Exam Vault &bull; {block.title}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
                    {block.title} Papers
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{block.subtitle}</p>
                </div>

                {renderPasswordBanner()}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {block.subjects.map((subName, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shrink-0">
                          {renderSubjectIcon(subName, 'w-6 h-6')}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-white">{subName}</h4>
                          <span className="text-xs text-gray-400">{block.title} Exam</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="w-full text-center py-3 rounded-xl text-xs font-bold text-gray-400 bg-white/5 border border-white/5">
                          Paper not uploaded yet
                        </div>

                        <div className="text-center pt-2 border-t border-white/5">
                          <span className="text-[10px] text-red-300 font-bold bg-red-950/80 px-2 py-1 rounded border border-red-500/30">
                            Pass: vishnu
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 6. IHVPE VIEW */}
      {viewState.mode === 'ihvpe' && (
        <div className="animate-fade-in space-y-8 max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              Universal Human Values
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">
              {IHVPE_RESOURCE.title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{IHVPE_RESOURCE.subtitle}</p>
          </div>

          {renderPasswordBanner()}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Complete Book Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] flex flex-col justify-between h-full hover:shadow-2xl transition-all border-t-4 border-rose-500 border-x border-b border-white/20 dark:border-white/10 shadow-lg">
              <div>
                <div className="w-16 h-16 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {IHVPE_RESOURCE.completeBook.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  {IHVPE_RESOURCE.completeBook.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProtectedResource(IHVPE_RESOURCE.completeBook.link, IHVPE_RESOURCE.completeBook.title)}
                className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110 text-white py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Book</span>
              </button>
            </div>

            {/* Unit Notes Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] flex flex-col justify-between h-full hover:shadow-2xl transition-all border-t-4 border-amber-500 border-x border-b border-white/20 dark:border-white/10 shadow-lg">
              <div>
                <div className="w-16 h-16 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Unit Notes
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Detailed unit-wise notes:
                </p>
                <div className="flex flex-col gap-2.5 mb-6">
                  {IHVPE_RESOURCE.unitNotes.map((unit) => (
                    <button
                      key={unit.unit}
                      type="button"
                      onClick={() => openProtectedResource(unit.link, `IHVPE - ${unit.unit}`)}
                      className="px-4 py-2.5 bg-amber-500/10 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 rounded-xl hover:bg-amber-500/20 transition-colors font-semibold flex justify-between items-center text-sm border border-amber-500/20 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{unit.unit}</span>
                      </span>
                      <Download className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Assignments Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] flex flex-col justify-between h-full hover:shadow-2xl transition-all border-t-4 border-blue-500 border-x border-b border-white/20 dark:border-white/10 shadow-lg">
              <div>
                <div className="w-16 h-16 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {IHVPE_RESOURCE.assignments.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  {IHVPE_RESOURCE.assignments.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProtectedResource(IHVPE_RESOURCE.assignments.link, IHVPE_RESOURCE.assignments.title)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 text-white py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View Assignments</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. INDIAN CONSTITUTION VIEW */}
      {viewState.mode === 'constitution' && (
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
              Law & Rights
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">
              {CONSTITUTION_RESOURCE.title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{CONSTITUTION_RESOURCE.subtitle}</p>
          </div>

          {renderPasswordBanner()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Study Material Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] text-center hover:shadow-2xl transition-all border-t-4 border-orange-500 border-x border-b border-white/20 dark:border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-20 h-20 mx-auto bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {CONSTITUTION_RESOURCE.studyMaterial.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  {CONSTITUTION_RESOURCE.studyMaterial.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProtectedResource(CONSTITUTION_RESOURCE.studyMaterial.link, CONSTITUTION_RESOURCE.studyMaterial.title)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:brightness-110 text-white py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-md transition-all text-base cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Access Material</span>
              </button>
            </div>

            {/* Question Bank Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] text-center hover:shadow-2xl transition-all border-t-4 border-teal-500 border-x border-b border-white/20 dark:border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-20 h-20 mx-auto bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <Landmark className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {CONSTITUTION_RESOURCE.questionBank.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  {CONSTITUTION_RESOURCE.questionBank.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProtectedResource(CONSTITUTION_RESOURCE.questionBank.link, CONSTITUTION_RESOURCE.questionBank.title)}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:brightness-110 text-white py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-md transition-all text-base cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View QB</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
