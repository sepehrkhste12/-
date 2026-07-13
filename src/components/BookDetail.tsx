import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBookSchema, generateBreadcrumbSchema } from '../utils/seo';
import { SAMPLES_TEXTS } from '../data';
import { Star, Bookmark, ShoppingCart, HelpCircle, CheckCircle, ThumbsUp, Calendar, BookOpen, Clock, Tag, MessageSquare, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BookDetail: React.FC = () => {
  const {
    language,
    selectedBookId,
    books,
    reviews,
    addReview,
    approveReview,
    currentUser,
    addToCart,
    wishlist,
    toggleWishlist,
    setActivePage
  } = useApp();

  const isRtl = language === 'fa';
  
  // Find current book
  const book = books.find(b => b.id === selectedBookId) || books[0];

  // Selected Cover gallery image
  const [activeImage, setActiveImage] = useState('');
  
  // Virtual book reader state
  const [readerPage, setReaderPage] = useState(0);

  // Review form states
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState(currentUser.name || '');
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  // Reviews filtering & sorting states
  const [reviewSort, setReviewSort] = useState<'helpful' | 'newest'>('helpful');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'verified'>('all');

  useEffect(() => {
    if (book) {
      setActiveImage(book.coverUrl);
      const title = isRtl ? book.titleFa : book.title;
      const desc = isRtl ? book.descriptionFa : book.description;
      updateMetaTags(title, desc, `/books/${book.id}`);

      // Ingest JSON-LD Schemas
      injectStructuredData('book-detail-schema', generateBookSchema({
        title: book.title,
        author: book.author,
        description: book.fullDescription,
        coverUrl: book.coverUrl,
        rating: book.rating,
        reviewCount: book.reviewCount,
        price: book.price
      }));

      injectStructuredData('book-breadcrumbs', generateBreadcrumbSchema([
        { name: isRtl ? 'خانه' : 'Home', url: '/' },
        { name: isRtl ? 'کتاب‌ها' : 'Books', url: '/books' },
        { name: isRtl ? book.titleFa : book.title, url: `/books/${book.id}` }
      ]));
    }
  }, [book, language]);

  if (!book) {
    return <div className="text-center py-20 text-stone-500">Book context loading...</div>;
  }

  // Get active reviews for this book
  const bookReviews = reviews.filter(r => r.bookId === book.id && r.approved);
  
  // Filter and Sort reviews
  const displayReviews = [...bookReviews]
    .filter(r => reviewFilter === 'all' || (reviewFilter === 'verified' && r.verified))
    .sort((a, b) => {
      if (reviewSort === 'helpful') return b.likes - a.likes;
      return b.id.localeCompare(a.id); // Simple fallback ID sort for newest
    });

  // Calculate review percentage bars
  const totalR = bookReviews.length || 1;
  const ratingBars = [5, 4, 3, 2, 1].map(stars => {
    const count = bookReviews.filter(r => r.rating === stars).length;
    return {
      stars,
      pct: Math.round((count / totalR) * 100),
      count
    };
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newName.trim()) return;
    
    addReview(book.id, newName, newComment, newRating);
    setNewComment('');
    setReviewSuccessMsg(
      isRtl 
        ? 'سپاسگزاریم! نظر شما با موفقیت ثبت شد و پس از تایید مدیریت منتشر خواهد شد.' 
        : 'Thank you! Your review has been submitted and is currently in moderation.'
    );
    setTimeout(() => {
      setReviewSuccessMsg('');
    }, 6000);
  };

  const isBookmarked = wishlist.includes(book.id);
  const sampleData = SAMPLES_TEXTS[book.id] || { title: 'Sample Chapter', pages: ['Sample page text goes here...'] };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-16" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* 1. Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Cover Gallery Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/60 bg-white aspect-[3/4] flex items-center justify-center">
            <img src={activeImage} alt={book.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 rounded bg-stone-950/85 px-3 py-1 text-xs font-bold text-amber-400 backdrop-blur-xs flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{isRtl ? 'بخش تحلیل ویژه اعضا' : 'WITH CLINICAL ANALYSES'}</span>
            </div>
          </div>

          {/* Luxury Thumbnails */}
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveImage(book.coverUrl)}
              className={`w-18 h-24 rounded-lg overflow-hidden border-2 ${activeImage === book.coverUrl ? 'border-amber-500' : 'border-stone-200'}`}
              id="detail-thumb-primary"
            >
              <img src={book.coverUrl} alt="Cover Thumbnail" className="h-full w-full object-cover" />
            </button>
            <button 
              onClick={() => setActiveImage('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=200')}
              className={`w-18 h-24 rounded-lg overflow-hidden border-2 ${activeImage.includes('photo-1455390582262-044cdead277a') ? 'border-amber-500' : 'border-stone-200'}`}
              id="detail-thumb-bts"
            >
              <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=200" alt="BTS Thumbnail" className="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        {/* Product Details Info Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                {isRtl ? book.publicationDateFa : book.publicationDate}
              </span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500 font-medium">{book.pages} {isRtl ? 'صفحه' : 'pages'}</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500 font-medium">{isRtl ? book.readingTimeFa : book.readingTime} {isRtl ? 'مدت مطالعه' : 'reading time'}</span>
            </div>

            <button
              onClick={() => toggleWishlist(book.id)}
              className={`rounded-full p-2 border border-stone-200 transition-all hover:bg-stone-50 ${
                isBookmarked ? 'bg-amber-50 border-amber-300 text-amber-600' : 'text-stone-400 hover:text-stone-700'
              }`}
              id="detail-btn-bookmark"
            >
              <Bookmark className={`h-4.5 w-4.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-950 leading-tight">
              {isRtl ? book.titleFa : book.title}
            </h1>
            <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold">{isRtl ? `اثر ${book.authorFa}` : `By ${book.author}`}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" />
              <span className="font-bold text-stone-800 text-sm">{book.rating}</span>
            </div>
            <span className="text-stone-300">|</span>
            <span className="text-xs text-stone-500">{bookReviews.length} {isRtl ? 'دیدگاه تأیید شده خوانندگان' : 'Verified reviews'}</span>
          </div>

          <div className="border-t border-b border-stone-200/60 py-4 flex flex-col gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{isRtl ? 'خلاصه داستان و واکاوی' : 'Story Narrative & Core Analysis'}</span>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {isRtl ? book.fullDescriptionFa : book.fullDescription}
            </p>
          </div>

          {/* Deep Psychological Topics list */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{isRtl ? 'برخی موضوعات و آموزه‌های روانشناختی کتاب:' : 'Core Psychological Milestones Examined:'}</span>
            <div className="flex flex-wrap gap-2">
              {(isRtl ? book.topicsFa : book.topics).map((topic, i) => (
                <span key={i} className="rounded-md border border-amber-200/60 bg-amber-50/50 px-3 py-1.5 text-xs text-stone-700 font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* HIGHLIGHTED FREE SAMPLE PREVIEW READER - DIRECTLY ABOVE ACTIONS */}
          <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-50/20 p-6 flex flex-col gap-5 relative overflow-hidden shadow-luxury">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl select-none pointer-events-none"></div>
            
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-600" />
                <span className="font-serif text-sm font-bold text-stone-900">
                  {isRtl ? `بخش‌های منتخبی از کتاب (نمونه رایگان)` : `Interactive Online Preview (Free Sample)`}
                </span>
              </div>
              <span className="text-[10px] text-stone-400">{isRtl ? `صفحه ${(readerPage + 1).toLocaleString('fa-IR')} از ${sampleData.pages.length.toLocaleString('fa-IR')}` : `Page ${readerPage + 1} of ${sampleData.pages.length}`}</span>
            </div>

            {/* Virtual Book Sheet area with slide animations */}
            <div className="bg-white rounded-lg p-5 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed shadow-inner min-h-[160px] flex flex-col justify-between">
              <p className="whitespace-pre-line select-text font-serif">
                {sampleData.pages[readerPage]}
              </p>

              {/* Reader turn pages navigation */}
              <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-3 mt-4">
                <button
                  disabled={readerPage === 0}
                  onClick={() => setReaderPage(p => p - 1)}
                  className="rounded border border-stone-200 p-1 bg-stone-50 hover:bg-stone-100 disabled:opacity-45 transition-colors"
                  id="reader-btn-prev"
                >
                  {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
                <button
                  disabled={readerPage === sampleData.pages.length - 1}
                  onClick={() => setReaderPage(p => p + 1)}
                  className="rounded border border-stone-200 p-1 bg-stone-50 hover:bg-stone-100 disabled:opacity-45 transition-colors"
                  id="reader-btn-next"
                >
                  {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* CORE ACTIONS BUTTON BAR */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={() => addToCart({
                  bookId: book.id,
                  title: book.title,
                  titleFa: book.titleFa,
                  price: book.price,
                  priceRial: book.priceRial,
                  type: 'book'
                })}
                className="flex-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3.5 text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                id="btn-add-to-cart"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{isRtl ? 'افزودن به سبد خرید' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => {
                  addToCart({
                    bookId: book.id,
                    title: book.title,
                    titleFa: book.titleFa,
                    price: book.price,
                    priceRial: book.priceRial,
                    type: 'book'
                  });
                  setActivePage('cart');
                }}
                className="rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3.5 text-xs uppercase tracking-wider transition-all flex items-center justify-center"
                id="btn-buy-now"
              >
                {isRtl ? 'خرید مستقیم نسخه کامل PDF' : 'Buy Now'}
              </button>

              <button
                onClick={() => setActivePage('membership')}
                className="rounded-lg border border-amber-400 bg-white hover:bg-amber-50 text-amber-700 font-semibold px-5 py-3.5 text-xs uppercase tracking-wider transition-all flex items-center justify-center"
                id="btn-read-with-sub"
              >
                <span>{isRtl ? 'خواندن رایگان با اشتراک ویژه' : 'Read with Membership'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Digikala-Inspired Review System */}
      <div className="border-t border-stone-200 pt-16 flex flex-col gap-12">
        <div className="flex flex-col gap-1.5 border-b border-stone-200 pb-4">
          <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'نظرات و سنجش خوانندگان' : 'DIGIKALA INSPIRED FEEDBACK ENGINE'}</span>
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
            {isRtl ? 'دیدگاه‌ها و رتبه‌بندی کاربران' : 'Reader Ratings & Feedback'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Average Rating and Star breakdown (Col 1) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-luxury flex flex-col gap-4 text-center items-center">
              <span className="text-stone-400 text-xs uppercase font-semibold">{isRtl ? 'امتیاز میانگین این کتاب' : 'Average Rating'}</span>
              <span className="text-5xl font-extrabold text-stone-950">{book.rating}</span>
              <div className="flex gap-0.5 text-amber-500">
                <Star className="h-4.5 w-4.5 fill-amber-500" />
                <Star className="h-4.5 w-4.5 fill-amber-500" />
                <Star className="h-4.5 w-4.5 fill-amber-500" />
                <Star className="h-4.5 w-4.5 fill-amber-500" />
                <Star className="h-4.5 w-4.5 fill-amber-500" />
              </div>
              <span className="text-[11px] text-stone-500">
                {isRtl 
                  ? `بر اساس ${bookReviews.length.toLocaleString('fa-IR')} دیدگاه ثبت‌شده` 
                  : `Based on ${bookReviews.length} authenticated reviews`}
              </span>
            </div>

            {/* Breakdown bars */}
            <div className="flex flex-col gap-3">
              {ratingBars.map((bar, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-stone-600">
                  <span className="w-8 flex items-center justify-end font-semibold">{bar.stars} ★</span>
                  <div className="flex-1 h-2 rounded bg-stone-100 overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${bar.pct}%` }}></div>
                  </div>
                  <span className="w-10 text-stone-400">({bar.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews list & submission form (Col 2) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Submission Form */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
              <h3 className="font-serif text-sm font-bold text-stone-950 mb-4">
                {isRtl ? 'افزودن دیدگاه یا تجربیات شخصی خود از این کتاب' : 'Have you read this book? Leave your review'}
              </h3>
              
              {reviewSuccessMsg && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-4 mb-4 text-xs text-emerald-800">
                  {reviewSuccessMsg}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'نام نمایشی شما:' : 'Display Name:'}</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={isRtl ? 'مثال: زهرا محمدی' : 'e.g. Sara Jones'}
                      className="rounded border border-stone-200 bg-white px-3 py-2 text-xs focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'رتبه‌بندی شما (ستاره):' : 'Star Rating:'}</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="rounded border border-stone-200 bg-white px-3 py-2 text-xs focus:outline-none"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Good)</option>
                      <option value={2}>2 Stars (Average)</option>
                      <option value={1}>1 Star (Poor)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'متن دیدگاه شما:' : 'Your Review Comment:'}</label>
                  <textarea
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={isRtl ? 'نظرات، تجربیات روانشناسی یا احساسات خود از این کتاب را اینجا بنویسید...' : 'Share your raw thoughts, psychological feedback, or emotional reflections...'}
                    className="rounded border border-stone-200 bg-white px-3 py-2 text-xs focus:outline-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="rounded bg-stone-900 hover:bg-amber-600 text-white font-semibold py-2.5 px-6 text-xs uppercase tracking-wider w-fit"
                  id="submit-review-btn"
                >
                  {isRtl ? 'ثبت دیدگاه کاربران' : 'Submit Review'}
                </button>
              </form>
            </div>

            {/* Dynamic filter toolbar */}
            <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-3 gap-4">
              <div className="flex gap-4 text-xs text-stone-600">
                <button 
                  onClick={() => setReviewFilter('all')}
                  className={`font-semibold pb-1 border-b-2 ${reviewFilter === 'all' ? 'border-amber-500 text-stone-950' : 'border-transparent'}`}
                >
                  {isRtl ? 'همه دیدگاه‌ها' : 'All Reviews'} ({bookReviews.length})
                </button>
                <button 
                  onClick={() => setReviewFilter('verified')}
                  className={`font-semibold pb-1 border-b-2 ${reviewFilter === 'verified' ? 'border-amber-500 text-stone-950' : 'border-transparent'}`}
                >
                  {isRtl ? 'خریداران تأیید شده' : 'Verified Purchases'}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>{isRtl ? 'مرتب‌سازی براساس:' : 'Sort by:'}</span>
                <select
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value as any)}
                  className="bg-transparent border-0 font-bold text-stone-800 focus:outline-none cursor-pointer text-xs"
                >
                  <option value="helpful">Most Liked (مفیدترین)</option>
                  <option value="newest">Newest (جدیدترین)</option>
                </select>
              </div>
            </div>

            {/* List items with likes interaction */}
            {displayReviews.length === 0 ? (
              <div className="text-center py-10 text-xs text-stone-400 italic">
                {isRtl ? 'هنوز دیدگاهی در این بخش ثبت نشده است.' : 'No reviews match selected filters.'}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {displayReviews.map((rev) => {
                  return (
                    <div key={rev.id} className="p-5 border-b border-stone-100 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-500">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-stone-900">{rev.userName}</span>
                            {rev.verified && (
                              <span className="text-[9px] text-emerald-600 font-bold uppercase flex items-center gap-0.5">
                                <CheckCircle className="h-3 w-3" />
                                <span>{isRtl ? 'خریدار تأیید شده' : 'Verified Purchase'}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 text-[10px] text-stone-400">
                          <span>{isRtl ? rev.dateFa : rev.date}</span>
                          <div className="flex gap-0.5 text-amber-500">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="h-2.5 w-2.5 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif pl-10">
                        {rev.comment}
                      </p>

                      {/* Author reply nested */}
                      {rev.reply && (
                        <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-200/50 ml-10 flex flex-col gap-1.5">
                          <span className="text-[10px] uppercase font-bold text-amber-700">{isRtl ? 'پاسخ آنیا راد (نویسنده):' : 'Anya Rad Reply:'}</span>
                          <p className="text-xs text-stone-700 leading-relaxed italic">{rev.reply}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-3.5 mt-1 pl-10">
                        <button
                          onClick={() => {
                            // Local helper to like reviews
                            rev.likes += 1;
                            approveReview(rev.id); // Trigger state update
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 hover:text-stone-800 transition-colors"
                          id={`like-btn-${rev.id}`}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{isRtl ? 'آیا این دیدگاه مفید بود؟' : 'Helpful?'} ({rev.likes})</span>
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
    </div>
  );
};
