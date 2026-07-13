import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBreadcrumbSchema } from '../utils/seo';
import { Star, MessageSquare, ThumbsUp, Layers, CheckCircle } from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const { language, reviews, books, approveReview } = useApp();
  const isRtl = language === 'fa';

  const [activeBookFilter, setActiveBookFilter] = useState('all');

  useEffect(() => {
    const title = isRtl ? 'نظرات و دیدگاه‌های خوانندگان | بازخوردها' : 'Customer Reviews & Reflections';
    const desc = isRtl
      ? 'نظرات، نقدها و تجربیات زیسته مراجعین و خوانندگان کتاب‌های روانشناسی آنیا راد.'
      : 'Browse consolidated reviews from our global reader community. Explore emotional stories of self-recovery and boundary reclamation.';
    
    updateMetaTags(title, desc, '/reviews');

    injectStructuredData('reviews-breadcrumbs', generateBreadcrumbSchema([
      { name: isRtl ? 'خانه' : 'Home', url: '/' },
      { name: isRtl ? 'نظرات خوانندگان' : 'Reviews', url: '/reviews' }
    ]));
  }, [language]);

  const approvedReviews = reviews.filter(r => r.approved);
  const filteredReviews = approvedReviews.filter(r => activeBookFilter === 'all' || r.bookId === activeBookFilter);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-12 animate-fade-in" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* 1. Header banner */}
      <div className="border-b border-stone-200 pb-6 flex flex-col gap-3">
        <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'دیدگاه‌ها و تجربیات خوانندگان' : 'COMMUNITY REFLECTIONS'}</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
          {isRtl ? 'بازخوردها و روایت‌های تغییر عاطفی' : 'Verified Reader Reflections'}
        </h1>
        <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
          {isRtl
            ? 'داستان‌هایی واقعی از انسان‌هایی که با خواندن این کتاب‌ها راهی برای بهبود تروماهای دوران کودکی و روابط عاطفی خود یافتند.'
            : 'Read authentic reviews from readers who found healing, boundaries, and self-understanding through Anya Rad\'s clinical books.'}
        </p>
      </div>

      {/* 2. Rating overview stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Book filter bar (Col 1) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="rounded-xl border border-stone-200/60 bg-stone-50/50 p-5 flex flex-col gap-3.5">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-stone-400" />
              <span>{isRtl ? 'تفکیک بر اساس کتاب:' : 'Filter by Book Context:'}</span>
            </span>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveBookFilter('all')}
                className={`w-full text-left px-3 py-2 text-xs rounded font-medium transition-colors ${
                  activeBookFilter === 'all' 
                    ? 'bg-stone-900 text-white font-bold' 
                    : 'hover:bg-stone-100 text-stone-600'
                }`}
                style={{ textAlign: isRtl ? 'right' : 'left' }}
                id="review-filter-all"
              >
                {isRtl ? 'همه کتاب‌ها' : 'All Books'} ({approvedReviews.length})
              </button>
              {books.map(b => (
                <button
                  key={b.id}
                  onClick={() => setActiveBookFilter(b.id)}
                  className={`w-full text-left px-3 py-2 text-xs rounded font-medium transition-colors ${
                    activeBookFilter === b.id 
                      ? 'bg-stone-900 text-white font-bold' 
                      : 'hover:bg-stone-100 text-stone-600'
                  }`}
                  style={{ textAlign: isRtl ? 'right' : 'left' }}
                  id={`review-filter-${b.id}`}
                >
                  {isRtl ? b.titleFa : b.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews list (Col 2) */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 border rounded-xl text-stone-400 text-xs italic">
              {isRtl ? 'هنوز دیدگاهی برای این کتاب ثبت نشده است.' : 'No reviews match selected criteria.'}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredReviews.map((rev) => {
                const associatedBook = books.find(b => b.id === rev.bookId);
                return (
                  <div key={rev.id} className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-luxury flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-800 text-xs">{rev.userName}</span>
                        {rev.verified && (
                          <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <CheckCircle className="h-3 w-3" />
                            <span>{isRtl ? 'خریدار نسخه کامل' : 'Verified Purchase'}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-400">{isRtl ? rev.dateFa : rev.date}</span>
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {associatedBook && (
                      <span className="text-[9px] text-stone-400 font-semibold uppercase">
                        {isRtl ? `کتاب: ${associatedBook.titleFa}` : `Book: ${associatedBook.title}`}
                      </span>
                    )}

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif mt-1">
                      {rev.comment}
                    </p>

                    {rev.reply && (
                      <div className="bg-stone-50 p-4 rounded border border-stone-100 italic flex flex-col gap-1 text-xs text-stone-600">
                        <span className="text-[9px] font-bold text-amber-600 uppercase">{isRtl ? 'پاسخ نویسنده آنیا راد:' : 'Anya Rad reply:'}</span>
                        <p>{rev.reply}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 border-t border-stone-50 pt-3 mt-1">
                      <button
                        onClick={() => {
                          rev.likes += 1;
                          approveReview(rev.id); // Triggers re-renders
                        }}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 hover:text-amber-600"
                        id={`all-reviews-like-${rev.id}`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{isRtl ? 'مفید بود' : 'Helpful'} ({rev.likes})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
