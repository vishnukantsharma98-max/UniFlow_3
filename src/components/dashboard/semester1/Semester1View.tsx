import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  ListOrdered, 
  BookOpen, 
  GraduationCap, 
  ArrowLeft, 
  Lock, 
  Calculator, 
  Atom, 
  FlaskConical, 
  Terminal, 
  Laptop, 
  Brain, 
  MessageSquare, 
  Presentation, 
  FileText, 
  Download, 
  Youtube,
  Leaf,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '../ThemeSystem';
import { 
  SEM1_SUBJECTS, 
  SUBJECT_METAS, 
  SEM1_ASSIGNMENTS, 
  SEM1_TEST_DATA, 
  SEM1_SYLLABUS_DATA, 
  EVS_RESOURCE,
} from './Semester1Data';
import { parseRoute, navigate, goBack, slugify } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const Semester1View: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  // Read current route state
  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'semester-1' && parsed.sem1State) {
      return parsed.sem1State;
    }
    return { mode: 'sem1Home' as const, context: {} };
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
    goBack('/app/semester-1');
  };

  const getBackLabel = () => {
    const { mode } = viewState;
    if (mode === 'assignments') {
      return 'Assignments';
    }
    if (mode === 'testDetail') {
      return 'Exam Vault';
    }
    return 'Semester 1';
  };

  // Subject icon helper
  const renderSubjectIcon = (name: string, className: string = 'w-6 h-6') => {
    switch (name) {
      case 'EM-I':
      case 'Mathematics':
        return <Calculator className={className} />;
      case 'Applied Physics':
        return <Atom className={className} />;
      case 'Applied Physics Lab':
        return <FlaskConical className={className} />;
      case 'CPLT':
        return <Terminal className={className} />;
      case 'CPLT Lab':
        return <Laptop className={className} />;
      case 'AI':
      case 'Artificial Intelligence':
        return <Brain className={className} />;
      case 'Communication Skills':
        return <MessageSquare className={className} />;
      case 'Communication Skills Lab':
        return <Presentation className={className} />;
      case 'EVS':
        return <Leaf className={className} />;
      case 'Engineering Chemistry':
        return <FlaskConical className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  // Prominent Red Password Banner
  const renderPasswordBanner = () => (
    <div className="mt-2 mb-6 p-3.5 sm:p-4 bg-red-500/10 dark:bg-red-950/60 border-2 border-red-500/40 text-red-600 dark:text-red-400 rounded-2xl font-black text-center text-sm sm:text-base shadow-lg max-w-2xl mx-auto flex items-center justify-center gap-2.5">
      <Lock className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
      <span>IMPORTANT: The password is <span className="font-black text-red-600 dark:text-red-400 uppercase underline decoration-2 underline-offset-4 tracking-wider">vishnu</span></span>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-20 font-sans">
      {/* Top Synchronized In-App Back Button */}
      {viewState.mode !== 'sem1Home' && (
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

      {/* 1. SEMESTER 1 ROOT VIEW (4 Premium Cards) */}
      {viewState.mode === 'sem1Home' && (
        <div className="animate-fade-in space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
              Semester 1 Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Exam Vault (Tests) */}
            <div
              onClick={() => navigateTo('/app/semester-1/exam-vault')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <ClipboardCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Exam Vault</h2>
                  <p className="text-gray-300 text-sm">In-Sem 1, In-Sem 2 & End Sem</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-purple-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>Explore Tests</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Syllabus */}
            <div
              onClick={() => navigateTo('/app/semester-1/syllabus')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl group-hover:bg-teal-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <ListOrdered className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Syllabus</h2>
                  <p className="text-gray-300 text-sm">Curriculum for Sem 1</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-teal-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>View Curriculum</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Assignments */}
            <div
              onClick={() => navigateTo('/app/semester-1/assignments')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Assignments</h2>
                  <p className="text-gray-300 text-sm">Subject-wise task library</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-blue-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>View Subjects</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* (EVS) Swayam */}
            <div
              onClick={() => navigateTo('/app/semester-1/evs-swayam')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-1 text-white">(EVS) Swayam</h2>
                  <p className="text-gray-300 text-sm">Environmental Studies</p>
                </div>
                <div className="flex items-center text-xs font-semibold text-orange-300 group-hover:translate-x-1 transition-transform mt-4">
                  <span>Access Notes & Videos</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXAM VAULT / TESTS SELECTION (3 Cards: In-Sem 1, In-Sem 2, End Sem) */}
      {viewState.mode === 'testsMenu' && (
        <div className="animate-fade-in space-y-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full mb-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Semester 1 Exam Vault
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
              Select Examination
            </h2>
            <p className="text-gray-500 text-sm mt-1">Choose between mid-terms or final semester papers</p>
          </div>

          {renderPasswordBanner()}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* In-Sem 1 Card */}
            <div
              onClick={() => navigateTo('/app/semester-1/exam-vault/in-sem-1')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <ClipboardCheck className="w-8 h-8" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
                    Mid-Term 1
                  </span>
                  <h3 className="text-3xl font-bold mb-2 text-white">In-Sem 1</h3>
                  <p className="text-gray-300 text-sm">First mid-term question papers & solutions</p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs font-semibold text-indigo-300">5 Subjects Available</span>
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                    Pass: vishnu
                  </span>
                </div>
              </div>
            </div>

            {/* In-Sem 2 Card */}
            <div
              onClick={() => navigateTo('/app/semester-1/exam-vault/in-sem-2')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <ClipboardCheck className="w-8 h-8" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-2">
                    Mid-Term 2
                  </span>
                  <h3 className="text-3xl font-bold mb-2 text-white">In-Sem 2</h3>
                  <p className="text-gray-300 text-sm">Second mid-term question papers & solutions</p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs font-semibold text-purple-300">5 Subjects Available</span>
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                    Pass: vishnu
                  </span>
                </div>
              </div>
            </div>

            {/* End Sem Card */}
            <div
              onClick={() => navigateTo('/app/semester-1/exam-vault/end-sem')}
              className="group bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                    Final Exams
                  </span>
                  <h3 className="text-3xl font-bold mb-2 text-white">End Sem</h3>
                  <p className="text-gray-300 text-sm">Final semester examination papers</p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs font-semibold text-emerald-300">4 Subjects</span>
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                    Pass: vishnu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TEST DETAIL VIEW (Subject Cards for chosen Test) */}
      {viewState.mode === 'testDetail' && (
        <div className="animate-fade-in space-y-8">
          {(() => {
            const currentSemData = SEM1_TEST_DATA['2025']?.['Semester - I'] || [];
            const block = currentSemData.find((b) => b.title === viewState.context.testTitle) || currentSemData[0];
            const isEndSem = viewState.context.testTitle === 'End Sem';

            return (
              <>
                <div className="text-center mb-4">
                  <div className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full mb-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      Exam Vault &bull; {block.title}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
                    {block.title} Question Papers
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {isEndSem ? 'Semester 1 End-Semester subjects' : 'Access questions and verified solutions'}
                  </p>
                </div>

                {renderPasswordBanner()}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {block.subjects.map((sub, idx) => {
                    const hasQuestion = Boolean(sub.questionLink && sub.questionLink.trim() !== '');
                    const hasAnswer = Boolean(sub.answerLink && sub.answerLink.trim() !== '');
                    const displayName = sub.name === 'Mathematics' ? 'EM-I' : sub.name;

                    return (
                      <div
                        key={idx}
                        className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-4 mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
                            {renderSubjectIcon(sub.name, 'w-6 h-6')}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white">{displayName}</h4>
                            <span className="text-xs text-gray-400">{block.title} Exam</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {isEndSem ? (
                            // End Sem: Strictly No Answer buttons, No fake links
                            hasQuestion ? (
                              <button
                                type="button"
                                onClick={() => openProtectedResource(sub.questionLink!, `${sub.name} - End Sem Paper`)}
                                className="w-full text-center py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <span>Question Paper</span>
                              </button>
                            ) : (
                              <div className="w-full text-center py-3 rounded-xl text-xs font-bold text-gray-400 bg-white/5 border border-white/5">
                                Paper not uploaded yet
                              </div>
                            )
                          ) : (
                            // In-Sem 1 & 2: Real Question & Answer buttons
                            <div className="flex gap-3">
                              {hasQuestion ? (
                                <button
                                  type="button"
                                  onClick={() => openProtectedResource(sub.questionLink!, `${sub.name} - ${block.title} Question`)}
                                  className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <span>Question</span>
                                </button>
                              ) : (
                                <span className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold text-gray-500 bg-white/5 cursor-not-allowed border border-white/5">
                                  Question
                                </span>
                              )}

                              {hasAnswer ? (
                                <button
                                  type="button"
                                  onClick={() => openProtectedResource(sub.answerLink!, `${sub.name} - ${block.title} Solution`)}
                                  className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <span>Solution</span>
                                </button>
                              ) : (
                                <span className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold text-gray-500 bg-white/5 cursor-not-allowed border border-white/5">
                                  Soon
                                </span>
                              )}
                            </div>
                          )}

                          <div className="text-center pt-2 border-t border-white/5">
                            <span className="text-[10px] text-red-300 font-bold bg-red-950/80 px-2 py-1 rounded border border-red-500/30">
                              Password: vishnu
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 4. SYLLABUS DIRECTORY VIEW */}
      {viewState.mode === 'syllabusSubjects' && (
        <div className="animate-fade-in space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Semester 1 Curriculum
            </h2>
            <p className="text-gray-500 text-sm mt-1">Official course syllabus documents</p>
          </div>

          {renderPasswordBanner()}

          <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {(SEM1_SYLLABUS_DATA['2025']?.['1st Semester'] || []).map((sub, idx) => {
              const displayName = sub.name === 'Mathematics' ? 'EM-I' : sub.name;
              return (
                <div
                  key={idx}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl shadow-md flex items-center justify-between border border-white/20 dark:border-white/10 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-lg">
                      {renderSubjectIcon(sub.name, 'w-6 h-6')}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base sm:text-lg">
                        {displayName}
                      </h4>
                      <span className="text-xs text-gray-400">Complete Syllabus</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-xs text-red-600 dark:text-red-400 font-bold bg-yellow-100 dark:bg-red-950/60 px-2 py-1 rounded border border-red-200 dark:border-red-800">
                      Password: vishnu
                    </span>
                    <button
                      type="button"
                      onClick={() => openProtectedResource(sub.link, `${displayName} Syllabus`)}
                      className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 transition-colors shadow-md cursor-pointer"
                      title="Download Syllabus"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. ASSIGNMENT SUBJECTS LIST VIEW */}
      {viewState.mode === 'subjects' && (
        <div className="animate-fade-in space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
              Semester 1 Assignments
            </h2>
            <p className="text-gray-500 text-sm mt-1">Select a subject to access all assignments</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SEM1_SUBJECTS.map((subj) => {
              const meta = SUBJECT_METAS[subj] || {
                name: subj,
                icon: 'FileText',
                color: 'indigo-500',
                bg: 'bg-indigo-100',
                textCol: 'text-indigo-600',
              };
              const count = SEM1_ASSIGNMENTS.filter((a) => a.subject === subj || (subj === 'EM-I' && a.subject === 'Mathematics')).length;
              const slug = slugify(subj);

              return (
                <div
                  key={subj}
                  onClick={() => navigateTo(`/app/semester-1/assignments/${slug}`)}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl text-center cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-white/20 dark:border-white/10 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      {renderSubjectIcon(subj, 'w-8 h-8')}
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 leading-tight">
                      {subj}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold">
                      {count} {count === 1 ? 'Assignment' : 'Assignments'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. SPECIFIC SUBJECT ASSIGNMENTS VIEW */}
      {viewState.mode === 'assignments' && (
        <div className="animate-fade-in space-y-6">
          {(() => {
            const currentSubj = viewState.context.subject || 'EM-I';
            const assignments = SEM1_ASSIGNMENTS.filter(
              (a) => a.subject === currentSubj || (currentSubj === 'EM-I' && a.subject === 'Mathematics')
            );

            return (
              <>
                <div className="text-center mb-4">
                  <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">
                    Assignments Library
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">
                    {currentSubj}
                  </h2>
                </div>

                {renderPasswordBanner()}

                {assignments.length === 0 ? (
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-12 rounded-3xl text-center border border-white/20">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      No Assignments Yet
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">Check back later for updates.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {assignments.map((assign) => (
                      <div
                        key={assign.id}
                        className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border-l-4 border-indigo-500 flex flex-col justify-between h-full border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all"
                      >
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                          {assign.title.replace('Maths', 'EM-I')}
                        </h3>
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex gap-3">
                            {assign.questionLink ? (
                              <button
                                type="button"
                                onClick={() => openProtectedResource(assign.questionLink, `${assign.title} - Question`)}
                                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-xl font-semibold text-center text-sm shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Download className="w-4 h-4" />
                                <span>Question</span>
                              </button>
                            ) : (
                              <span className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-400 py-2.5 rounded-xl font-semibold text-center text-sm">
                                No Question Link
                              </span>
                            )}

                            {assign.answerLink && (
                              <button
                                type="button"
                                onClick={() => openProtectedResource(assign.answerLink, `${assign.title} - Solution`)}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-semibold text-center text-sm shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <ShieldCheck className="w-4 h-4" />
                                <span>Solution</span>
                              </button>
                            )}
                          </div>
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

      {/* 7. EVS SWAYAM NOTES & PLAYLIST VIEW */}
      {viewState.mode === 'swayamNotes' && (
        <div className="animate-fade-in max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-8 sm:p-10 rounded-[3rem] text-center border-t-8 border-orange-500 shadow-2xl relative overflow-hidden border border-white/20">
            <div className="relative z-10 space-y-4">
              <Leaf className="w-16 h-16 text-orange-500 mx-auto" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                {EVS_RESOURCE.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                {EVS_RESOURCE.subtitle}
              </p>

              {renderPasswordBanner()}

              <div className="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/50 dark:border-white/10 shadow-sm mt-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {EVS_RESOURCE.chapter}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {EVS_RESOURCE.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => openProtectedResource(EVS_RESOURCE.notesLink, 'EVS Chapter 1 Notes')}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>View Notes</span>
                  </button>
                  <span className="text-xs text-red-600 dark:text-red-400 font-bold bg-yellow-100 dark:bg-red-950/60 px-2 py-1 rounded border border-red-200 dark:border-red-800">
                    Password: {EVS_RESOURCE.password}
                  </span>
                  <button
                    type="button"
                    onClick={() => openProtectedResource(EVS_RESOURCE.playlistLink, 'EVS Video Lectures Playlist')}
                    className="bg-white dark:bg-slate-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-600 transition-all shadow-sm cursor-pointer"
                  >
                    <Youtube className="w-5 h-5 text-red-600" />
                    <span>Playlist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
