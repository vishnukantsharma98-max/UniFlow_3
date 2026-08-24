import React, { useState } from 'react';
import { X, Star, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { StudentReview } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: StudentReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitReview }) => {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('JECRC Foundation');
  const [year, setYear] = useState('3rd Year CSE');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    const newReview: StudentReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      college: college.trim() || 'JECRC Foundation',
      year: year.trim() || 'Engineering Student',
      quote: quote.trim(),
      rating,
      avatarSeed: name.trim()
    };

    onSubmitReview(newReview);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setQuote('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#0e091b] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-10px_rgba(168,85,247,0.3)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wider uppercase">Student Feedback</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white tracking-tight">
              Share Your UniFlow Experience
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Your feedback helps Vishnu and the team continuously elevate student life.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">College / Campus</label>
                  <input
                    type="text"
                    placeholder="e.g., JECRC Foundation"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Year / Branch</label>
                  <input
                    type="text"
                    placeholder="e.g., 3rd Year CSE"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-slate-600 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-amber-400 font-semibold ml-2">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Review / Experience</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How did UniFlow help your notes, exams, coding, or daily productivity?"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/60 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold hover:opacity-95 shadow-lg shadow-purple-500/25 transition-all mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Experience</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-10">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h4 className="text-xl font-bold text-white">Thank You for Your Feedback!</h4>
            <p className="text-xs text-slate-400 mt-1">Your review is now live in the student community showcase.</p>
          </div>
        )}
      </div>
    </div>
  );
};
