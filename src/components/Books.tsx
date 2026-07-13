import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBreadcrumbSchema } from '../utils/seo';
import { Search, Grid, List, Star, BookOpen, Layers, ShieldCheck, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Book } from '../types';

export const Books: React.FC = () => {
  const {
    language,
    books,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    setSelectedBookId,
    setActivePage,
    wishlist,
    toggleWishlist
  } = useApp();

  const isRtl = language === 'fa';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Dynamic pagination boundary

  useEffect(() => {
    const title = isRtl ? 'کتابخانه دیجیتال | کتاب‌ها و رمان‌های روانشناسی' : 'Book Library | Psychological Stories & Books';
    const desc = isRtl
      ? 'مشاهده و مطالعه کتاب‌های تخصصی آنیا راد درباره روابط، تروما، خودآگاهی و توسعه فردی همراه با دریافت فصل نمونه رایگان.'
      : 'Browse premium digital publishing releases by Anya Rad. Explore narratives on family systems, codependency, trauma healing, and self development.';
    
    updateMetaTags(title, desc, '/books');

    // Breadcrumbs Schema
    injectStructuredData('books-breadcrumbs', generateBreadcrumbSchema([
      { name: isRtl ? 'خانه' : 'Home', url: '/' },
      { name: isRtl ? 'کتابخانه' : 'Library', url: '/books' }
    ]));
  }, [language]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Filtering Logic
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.titleFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.descriptionFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      book.topicsFa.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination bounds
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  const handleBookClick = (id: string) => {
    setSelectedBookId(id);
    setActivePage('book-detail');
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-12" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* 1. Header Banner */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'قفسه دیجیتال کتابخانه' : 'THE PUBLISHING ARCHIVE'}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
            {isRtl ? 'کتابخانه روانشناسی روایت‌محور' : 'Psychology Book Library'}
          </h1>
          <p className="text-xs text-stone-500 max-w-lg leading-relaxed">
            {isRtl 
              ? 'داستان‌های واقعی زندگی را به همراه تحلیل‌های عمیق عاطفی، مرزبندی، کودک درون و التیام تروما ورق بزنید.' 
              : 'Immerse yourself in deeply clinical stories based on real events. Read samples, download full PDFs, or access online with membership.'}
          </p>
        </div>

        {/* Unified Search Input bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isRtl ? 'جستجوی کتاب، مبحث، برچسب...' : 'Search books, topics, tags...'}
            className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 pl-10 pr-4 text-xs text-stone-950 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            id="book-search-input"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* 2. Categorization Rail & Dashboard Filters */}
      <div className="flex flex-col gap-4">
        <span className="text-xs font-bold text-stone-500 tracking-wide flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-stone-400" />
          <span>{isRtl ? 'فیلتر بر اساس دسته‌بندی موضوعی:' : 'Filter by Psychological Dimension:'}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900'
            }`}
            id="cat-filter-all"
          >
            {isRtl ? 'همه موضوعات' : 'All Dimensions'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border ${
                selectedCategory === cat.slug
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900'
              }`}
              id={`cat-filter-${cat.id}`}
            >
              {isRtl ? cat.nameFa : cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Book Grid Result */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-24 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col items-center gap-4">
          <BookOpen className="h-12 w-12 text-stone-400" />
          <h3 className="font-serif text-lg font-bold text-stone-800">
            {isRtl ? 'کتابی یافت نشد' : 'No Books Found'}
          </h3>
          <p className="text-xs text-stone-500">
            {isRtl ? 'لطفاً عبارت دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.' : 'Try widening your search terms or clearing selected filters.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="rounded bg-stone-900 text-white font-medium px-5 py-2 text-xs uppercase"
            id="btn-clear-filters"
          >
            {isRtl ? 'پاک کردن فیلترها' : 'Clear Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {paginatedBooks.map((book) => {
            const isBookmarked = wishlist.includes(book.id);
            return (
              <div
                key={book.id}
                className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white border border-stone-200/60 shadow-luxury shadow-luxury-hover transition-all duration-500"
              >
                {/* Book Cover Container */}
                <div 
                  className="relative shrink-0 w-full sm:w-44 h-60 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 shadow-md cursor-pointer"
                  onClick={() => handleBookClick(book.id)}
                >
                  <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  {/* Membership badge */}
                  <div className="absolute top-2.5 right-2.5 rounded bg-stone-950/80 px-2 py-0.5 text-[9px] font-bold text-amber-400 backdrop-blur-xs flex items-center gap-1 shadow">
                    <ShieldCheck className="h-3 w-3 text-amber-400" />
                    <span>{isRtl ? 'اشتراک رایگان' : 'GOLD CLUB'}</span>
                  </div>
                </div>

                {/* Information Column */}
                <div className="flex flex-col justify-between py-1 gap-4 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      {/* Category Slug Display */}
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                        {isRtl 
                          ? categories.find(c => c.slug === book.category)?.nameFa || book.category
                          : categories.find(c => c.slug === book.category)?.name || book.category}
                      </span>

                      {/* Rating details */}
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="flex gap-0.5 text-amber-500">
                          <Star className="h-3 w-3 fill-amber-500" />
                        </div>
                        <span className="font-bold text-stone-700">{book.rating}</span>
                        <span className="text-[10px] text-stone-400">({book.reviewCount})</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => handleBookClick(book.id)}
                      className="font-serif text-lg font-bold text-stone-950 leading-tight group-hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      {isRtl ? book.titleFa : book.title}
                    </h3>

                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                      {isRtl ? book.descriptionFa : book.description}
                    </p>
                  </div>

                  {/* Pricing and Action buttons */}
                  <div className="flex flex-col gap-3.5 border-t border-stone-100 pt-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-stone-400 uppercase tracking-wider">{isRtl ? 'خرید نسخه اختصاصی' : 'Single PDF Price'}</span>
                        <span className="text-sm font-bold text-stone-900" dir="ltr">
                          {isRtl ? `${book.priceRial.toLocaleString('fa-IR')} تومان` : `$${book.price.toFixed(2)}`}
                        </span>
                      </div>

                      {/* Quick Bookmark Toggle */}
                      <button 
                        onClick={() => toggleWishlist(book.id)}
                        className={`rounded-full p-2 border border-stone-200 transition-all hover:bg-stone-50 ${
                          isBookmarked ? 'bg-amber-50 border-amber-300 text-amber-600' : 'text-stone-400 hover:text-stone-700'
                        }`}
                        id={`btn-bookmark-${book.id}`}
                        title={isRtl ? 'افزودن به نشان‌شده‌ها' : 'Bookmark book'}
                      >
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleBookClick(book.id)}
                        className="rounded bg-stone-900 hover:bg-amber-600 text-white font-medium py-2 text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                        id={`books-view-details-${book.id}`}
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{isRtl ? 'جزئیات و پیش‌نمایش' : 'View Details'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedBookId(book.id);
                          setActivePage('book-detail');
                          // Directly triggers the Free Sample preview scroll in Details!
                        }}
                        className="rounded border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium py-2 text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
                        id={`books-read-sample-${book.id}`}
                      >
                        <span>{isRtl ? 'مطالعه نمونه' : 'Read Sample'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Professional Pagination Controller */}
      {filteredBooks.length > itemsPerPage && (
        <div className="border-t border-stone-200 pt-8 mt-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            id="pagination-prev"
          >
            {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span>{isRtl ? 'صفحه قبل' : 'Previous'}</span>
          </button>

          <span className="text-xs text-stone-500">
            {isRtl 
              ? `صفحه ${currentPage.toLocaleString('fa-IR')} از ${totalPages.toLocaleString('fa-IR')}` 
              : `Page ${currentPage} of ${totalPages}`}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            id="pagination-next"
          >
            <span>{isRtl ? 'صفحه بعد' : 'Next'}</span>
            {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
};
