import React, { useState } from 'react';
import { Star, MessageSquarePlus, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { StudentReview } from '../types';

interface ReviewsSectionProps {
  reviews: StudentReview[];
  onOpenReviewModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onOpenReviewModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-14 sm:py-18 lg:py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 scroll-reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
              <span>Verified Campus Voices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Loved by Students <span className="text-flow-gradient">Like You 💜</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Empowering engineers and creatives across departments to stay organized and excel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReviewModal}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-purple-300 dark:border-purple-500/30 hover:border-purple-400 text-xs font-bold text-purple-700 dark:text-purple-300 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Share Your Experience</span>
            </button>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Review"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Review"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id}
              className={`relative p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-[#0d0722]/90 border border-slate-200/80 dark:border-purple-500/20 backdrop-blur-xl hover:border-purple-400/60 hover:bg-white dark:hover:bg-[#150c33] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_35px_rgba(124,58,237,0.12)] dark:hover:shadow-[0_15px_35px_rgba(168,85,247,0.25)] group hover:-translate-y-1 scroll-reveal stagger-${Math.min(idx + 1, 6)}`}
            >
              {/* Quote icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-7 h-7 text-purple-500 dark:text-purple-400/60 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" />
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
              </div>

              {/* Quote Text */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-normal leading-relaxed italic mb-6">
                &ldquo;{rev.quote}&rdquo;
              </p>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-white/10">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-purple-300 dark:border-purple-500/40 shadow-xs shrink-0 bg-purple-100 dark:bg-purple-950">
                  {rev.avatarUrl ? (
                    <img 
                      src={rev.avatarUrl} 
                      alt={rev.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center font-bold text-white text-sm">
                      {rev.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{rev.college} · <span className="text-purple-700 dark:text-purple-300 font-semibold">{rev.year}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
