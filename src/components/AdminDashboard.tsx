import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags } from '../utils/seo';
import { Book, Category, BlogPost, Review, SiteSettings } from '../types';
import { BarChart, LineChart, Shield, LayoutGrid, BookOpen, Layers, MessageSquare, Newspaper, Settings, ShoppingBag, Plus, Trash2, Edit2, CheckCircle, Reply } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    language,
    activePage,
    setActivePage,
    books,
    addBook,
    updateBook,
    deleteBook,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    reviews,
    approveReview,
    replyToReview,
    deleteReview,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    siteSettings,
    updateSiteSettings,
    orders
  } = useApp();

  const isRtl = language === 'fa';
  const [activeTab, setActiveTab] = useState<'overview' | 'books' | 'categories' | 'reviews' | 'blog' | 'orders' | 'settings'>('overview');

  useEffect(() => {
    const title = isRtl ? 'پنل مدیریت نویسنده | داشبورد کنترل' : 'Author Admin Portal | Studio Control';
    const desc = isRtl ? 'مدیریت کتاب‌ها، سفارشات، تایید نظرات و مقالات وبلاگ بدون نیاز به کدنویسی.' : 'Control books, categories, blog posts, reviews, orders, and SEO configuration.';
    updateMetaTags(title, desc, '/admin');
  }, [language]);

  // --- LOCAL EDIT STATES ---
  // Books CRUD Forms
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [bTitle, setBTitle] = useState('');
  const [bTitleFa, setBTitleFa] = useState('');
  const [bCategory, setBCategory] = useState('trauma-healing');
  const [bPrice, setBPrice] = useState(12.00);
  const [bPriceRial, setBPriceRial] = useState(120000);
  const [bCoverUrl, setBCoverUrl] = useState('');
  const [bDesc, setBDesc] = useState('');
  const [bDescFa, setBDescFa] = useState('');
  const [bPages, setBPages] = useState(200);

  // Categories CRUD Form
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [cName, setCName] = useState('');
  const [cNameFa, setCNameFa] = useState('');
  const [cDesc, setCDesc] = useState('');
  const [cDescFa, setCDescFa] = useState('');

  // Blog CRUD Form
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [pTitle, setPTitle] = useState('');
  const [pTitleFa, setPTitleFa] = useState('');
  const [pExcerpt, setPExcerpt] = useState('');
  const [pExcerptFa, setPExcerptFa] = useState('');
  const [pContent, setPContent] = useState('');
  const [pContentFa, setPContentFa] = useState('');
  const [pCategory, setPCategory] = useState('Psychology');
  const [pCategoryFa, setPCategoryFa] = useState('روانشناسی کاربردی');

  // Review reply state
  const [activeReplyReviewId, setActiveReplyReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Site Settings Form
  const [sHeroTitle, setSHeroTitle] = useState(siteSettings.heroTitle);
  const [sHeroTitleFa, setSHeroTitleFa] = useState(siteSettings.heroTitleFa);
  const [sHeroSub, setSHeroSub] = useState(siteSettings.heroSubtitle);
  const [sHeroSubFa, setSHeroSubFa] = useState(siteSettings.heroSubtitleFa);
  const [sAbout, setSAbout] = useState(siteSettings.aboutAuthor);
  const [sAboutFa, setSAboutFa] = useState(siteSettings.aboutAuthorFa);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // --- CRUD DISPATCHERS ---
  const handleAddBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bTitle || !bTitleFa) return;

    addBook({
      title: bTitle,
      titleFa: bTitleFa,
      author: 'Anya Rad',
      authorFa: 'آنیا راد',
      description: bDesc,
      descriptionFa: bDescFa,
      fullDescription: bDesc,
      fullDescriptionFa: bDescFa,
      coverUrl: bCoverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200',
      category: bCategory,
      price: Number(bPrice),
      priceRial: Number(bPriceRial),
      isFeatured: true,
      isPopular: false,
      isNew: true,
      pages: Number(bPages),
      readingTime: '6 hours',
      readingTimeFa: '۶ ساعت',
      publicationDate: 'July 2026',
      publicationDateFa: 'تیر ۱۴۰۵',
      tags: ['Psychology'],
      tagsFa: ['روانشناسی'],
      samplePdfUrl: 'sample.pdf',
      fullPdfUrl: 'full.pdf',
      topics: ['Self-Discovery'],
      topicsFa: ['خودشناسی']
    });

    // Reset
    setBTitle('');
    setBTitleFa('');
    setBCoverUrl('');
    setBDesc('');
    setBDescFa('');
    setIsAddingBook(false);
  };

  const handleAddCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cNameFa) return;

    addCategory({
      name: cName,
      nameFa: cNameFa,
      description: cDesc,
      descriptionFa: cDescFa,
      iconName: 'BookOpen'
    });

    setCName('');
    setCNameFa('');
    setCDesc('');
    setCDescFa('');
    setIsAddingCat(false);
  };

  const handleAddPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pTitleFa) return;

    addBlogPost({
      title: pTitle,
      titleFa: pTitleFa,
      excerpt: pExcerpt,
      excerptFa: pExcerptFa,
      content: pContent,
      contentFa: pContentFa,
      author: 'Anya Rad',
      authorFa: 'آنیا راد',
      coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
      category: pCategory,
      categoryFa: pCategoryFa,
      readTime: '5 min read',
      readTimeFa: '۵ دقیقه مطالعه'
    });

    setPTitle('');
    setPTitleFa('');
    setPExcerpt('');
    setPExcerptFa('');
    setPContent('');
    setPContentFa('');
    setIsAddingPost(false);
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      heroTitle: sHeroTitle,
      heroTitleFa: sHeroTitleFa,
      heroSubtitle: sHeroSub,
      heroSubtitleFa: sHeroSubFa,
      aboutAuthor: sAbout,
      aboutAuthorFa: sAboutFa
    });
    setSettingsSuccess(true);
    setTimeout(() => {
      setSettingsSuccess(false);
    }, 4000);
  };

  const handleReplySubmit = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyToReview(reviewId, replyText);
    setReplyText('');
    setActiveReplyReviewId(null);
  };

  // Math stats
  const totalSalesUSD = orders.filter(o => o.status === 'success').reduce((sum, o) => sum + o.totalAmount, 0);
  const totalSalesRial = orders.filter(o => o.status === 'success').reduce((sum, o) => sum + o.totalAmountRial, 0);
  const activeSubscribers = orders.filter(o => o.status === 'success' && o.items.some(i => i.type === 'membership')).length;
  const pendingReviewsCount = reviews.filter(r => !r.approved).length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-10 animate-fade-in" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* Header info banner */}
      <div className="rounded-2xl border border-amber-200 bg-linear-to-r from-stone-900 to-stone-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-amber-500/15 border-2 border-amber-500 flex items-center justify-center text-amber-500 shadow-md">
            <Shield className="h-7 w-7" />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {isRtl ? 'پیشخوان کنترل و مدیریت نویسنده' : 'Author Studio Administration'}
            </h1>
            <span className="text-xs text-stone-400 font-medium">
              {isRtl ? 'کنترل محتوای دیجیتال، مدیریت اعضا، بررسی تراکنش‌ها و تایید نظرات بدون نیاز به برنامه‌نویسی' : 'Seamlessly manage books, pricing models, blog publications, reviews moderation, and live invoices.'}
            </span>
          </div>
        </div>

        <button 
          onClick={() => setActivePage('home')}
          className="rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
          id="admin-btn-view-site"
        >
          {isRtl ? 'مشاهده وبسایت اصلی' : 'View Public Store'}
        </button>
      </div>

      {/* Grid sidebar split layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation Options (Col 1) */}
        <div className="lg:col-span-3 flex flex-col gap-1.5 bg-white border border-stone-200/60 p-4 rounded-xl shadow-luxury">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-2 px-3">{isRtl ? 'بخش‌های مدیریت' : 'Control Modules'}</span>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2.5 w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'overview' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
            }`}
            id="admin-nav-overview"
          >
            <LayoutGrid className="h-4.5 w-4.5" />
            <span>{isRtl ? 'آنالیتیکس و آمار کلی' : 'Analytics & Insights'}</span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-2.5 w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'books' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
            }`}
            id="admin-nav-books"
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span>{isRtl ? 'مدیریت کتاب‌ها' : 'Manage PDF Books'}</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2.5 w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'categories' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
            }`}
            id="admin-nav-categories"
          >
            <Layers className="h-4.5 w-4.5" />
            <span>{isRtl ? 'دسته‌بندی‌های موضوعی' : 'Manage Categories'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2.5 w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'reviews' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
            }`}
            id="admin-nav-reviews"
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span>{isRtl ? 'تایید و پاسخ نظرات' : 'Reviews Moderation'}</span>
            {pendingReviewsCount > 0 && (
              <span className="ml-auto bg-amber-500 text-stone-950 font-bold rounded-full text-[9px] px-1.5 py-0.5">
                {pendingReviewsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2.5 w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'blog' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
            }`}
            id="admin-nav-blog"
          >
            <Newspaper className="h-4.5 w-4.5" />
            <span>{isRtl ? 'انتشار مقالات وبلاگ' : 'Blog Publisher'}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2.5 w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'orders' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
            }`}
            id="admin-nav-orders"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <span>{isRtl ? 'تراکنش‌ها و فاکتورها' : 'Orders & Invoices'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2.5 w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'settings' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
            }`}
            id="admin-nav-settings"
          >
            <Settings className="h-4.5 w-4.5" />
            <span>{isRtl ? 'محتوای خانه و سئو (SEO)' : 'Homepage & SEO'}</span>
          </button>
        </div>

        {/* Tab content panel (Col 2) */}
        <div className="lg:col-span-9 rounded-2xl border border-stone-200/60 bg-white p-6 sm:p-8 shadow-luxury min-h-[450px]">
          
          {/* TAB 1: Business Overview & Charts */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-10">
              <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'شاخص‌های کلیدی عملکرد پلتفرم (KPI)' : 'Platform Business Intelligence'}</h2>
              
              {/* Counter Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="rounded-xl border border-stone-200/60 p-5 flex flex-col gap-1 bg-stone-50">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{isRtl ? 'مجموع درآمدهای حاصله' : 'Total Revenue Accrued'}</span>
                  <span className="text-2xl font-black text-amber-600" dir="ltr">
                    {isRtl ? `${totalSalesRial.toLocaleString('fa-IR')} تومان` : `$${totalSalesUSD.toFixed(2)}`}
                  </span>
                </div>

                <div className="rounded-xl border border-stone-200/60 p-5 flex flex-col gap-1 bg-stone-50">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{isRtl ? 'اعضای طلایی فعال' : 'Active Gold Members'}</span>
                  <span className="text-2xl font-black text-stone-900">{activeSubscribers} {isRtl ? 'مشترک فعال' : 'active'}</span>
                </div>

                <div className="rounded-xl border border-stone-200/60 p-5 flex flex-col gap-1 bg-stone-50">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{isRtl ? 'مجموع کتاب‌های در دسترس' : 'Digital Books catalog'}</span>
                  <span className="text-2xl font-black text-stone-900">{books.length} {isRtl ? 'عنوان کتاب' : 'volumes'}</span>
                </div>
              </div>

              {/* STUNNING CUSTOM SVG line chart for visual analytics */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">{isRtl ? 'نمودار تراکنش‌ها و خریدهای ۶ ماه گذشته:' : 'Accrued Invoicing Trends (Past 6 Months):'}</span>
                <div className="rounded-xl border border-stone-200 p-5 bg-stone-50 flex items-center justify-center relative min-h-[160px]">
                  
                  {/* Decorative chart axes and lines using raw inline SVGs for perfect styling control */}
                  <svg className="w-full h-32 text-amber-500" viewBox="0 0 600 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="600" y2="20" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="4" />
                    <line x1="0" y1="50" x2="600" y2="50" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="4" />
                    <line x1="0" y1="80" x2="600" y2="80" stroke="#e7e5e4" strokeWidth="0.5" strokeDasharray="4" />
                    
                    {/* Trend Line path */}
                    <path d="M 10,80 Q 120,40 240,70 T 480,20 T 590,10" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    
                    {/* Shading fill */}
                    <path d="M 10,80 Q 120,40 240,70 T 480,20 T 590,10 L 590,100 L 10,100 Z" fill="rgba(245, 158, 11, 0.08)" />
                  </svg>
                  
                  {/* Label nodes overlay */}
                  <div className="absolute bottom-1 left-2 text-[8px] text-stone-400 font-bold uppercase tracking-wider">Jan</div>
                  <div className="absolute bottom-1 left-1/5 text-[8px] text-stone-400 font-bold uppercase tracking-wider">Feb</div>
                  <div className="absolute bottom-1 left-2/5 text-[8px] text-stone-400 font-bold uppercase tracking-wider">Mar</div>
                  <div className="absolute bottom-1 left-3/5 text-[8px] text-stone-400 font-bold uppercase tracking-wider">Apr</div>
                  <div className="absolute bottom-1 left-4/5 text-[8px] text-stone-400 font-bold uppercase tracking-wider">May</div>
                  <div className="absolute bottom-1 right-2 text-[8px] text-stone-400 font-bold uppercase tracking-wider">Jun</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Book management & upload */}
          {activeTab === 'books' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h2 className="font-serif text-lg font-bold text-stone-950">{isRtl ? 'کاتالوگ و بارگذاری کتاب‌های صوتی و PDF' : 'Digital Book Catalog Management'}</h2>
                <button
                  onClick={() => setIsAddingBook(!isAddingBook)}
                  className="rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs p-2 px-4 flex items-center gap-1.5"
                  id="admin-btn-add-book"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isRtl ? 'افزودن کتاب جدید' : 'Add New Book'}</span>
                </button>
              </div>

              {/* Add Book form */}
              {isAddingBook && (
                <form onSubmit={handleAddBookSubmit} className="p-6 rounded-xl border border-amber-300 bg-amber-50/10 flex flex-col gap-4 animate-fade-in">
                  <h3 className="font-serif text-sm font-bold text-stone-950">{isRtl ? 'فرم ثبت کتاب جدید' : 'Upload New Volume specifications'}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Book Title (EN):</label>
                      <input type="text" value={bTitle} onChange={(e) => setBTitle(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white" required />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">عنوان کتاب (فارسی):</label>
                      <input type="text" value={bTitleFa} onChange={(e) => setBTitleFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white animate-pulse" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Price (USD):</label>
                      <input type="number" step="0.01" value={bPrice} onChange={(e) => setBPrice(Number(e.target.value))} className="rounded border px-2.5 py-2 text-xs bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">قیمت (تومان):</label>
                      <input type="number" value={bPriceRial} onChange={(e) => setBPriceRial(Number(e.target.value))} className="rounded border px-2.5 py-2 text-xs bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Cover URL:</label>
                      <input type="text" value={bCoverUrl} onChange={(e) => setBCoverUrl(e.target.value)} placeholder="Unsplash URL..." className="rounded border px-2.5 py-2 text-xs bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Category:</label>
                      <select value={bCategory} onChange={(e) => setBCategory(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white">
                        {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Pages Count:</label>
                      <input type="number" value={bPages} onChange={(e) => setBPages(Number(e.target.value))} className="rounded border px-2.5 py-2 text-xs bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Description (EN):</label>
                      <textarea rows={3} value={bDesc} onChange={(e) => setBDesc(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">توضیحات معرفی (فارسی):</label>
                      <textarea rows={3} value={bDescFa} onChange={(e) => setBDescFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                  </div>

                  <button type="submit" className="rounded bg-stone-900 text-white font-bold text-xs py-2.5 px-6 self-start uppercase">
                    {isRtl ? 'ثبت نهایی کتاب' : 'Publish Book'}
                  </button>
                </form>
              )}

              {/* Books List Grid with delete capability */}
              <div className="flex flex-col gap-3">
                {books.map((book) => (
                  <div key={book.id} className="p-4 border border-stone-200 rounded-xl flex items-center justify-between gap-4 bg-stone-50/50">
                    <div className="flex items-center gap-4">
                      <img src={book.coverUrl} alt={book.title} className="h-14 w-10 object-cover rounded shadow" />
                      <div className="flex flex-col gap-1">
                        <span className="font-serif text-xs font-bold text-stone-950">{isRtl ? book.titleFa : book.title}</span>
                        <span className="text-[9px] text-stone-400 font-bold uppercase">{book.category} • {book.pages} {isRtl ? 'صفحه' : 'pages'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-stone-700" dir="ltr">
                        {isRtl ? `${book.priceRial.toLocaleString('fa-IR')} تومان` : `$${book.price.toFixed(2)}`}
                      </span>

                      <button
                        onClick={() => deleteBook(book.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors"
                        id={`btn-admin-delete-${book.id}`}
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Category management */}
          {activeTab === 'categories' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h2 className="font-serif text-lg font-bold text-stone-950">{isRtl ? 'مدیریت و واگذاری دسته‌بندی‌ها' : 'Psychology Category Tags'}</h2>
                <button
                  onClick={() => setIsAddingCat(!isAddingCat)}
                  className="rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs p-2 px-4 flex items-center gap-1.5"
                  id="admin-btn-add-cat"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isRtl ? 'افزودن دسته‌بندی جدید' : 'Add New Category'}</span>
                </button>
              </div>

              {/* Add Category Form */}
              {isAddingCat && (
                <form onSubmit={handleAddCatSubmit} className="p-6 rounded-xl border border-amber-300 bg-amber-50/10 flex flex-col gap-4 animate-fade-in">
                  <h3 className="font-serif text-sm font-bold text-stone-950">{isRtl ? 'ثبت دسته‌بندی روانشناسی جدید' : 'Create New Category Tag'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Category Name (EN):</label>
                      <input type="text" value={cName} onChange={(e) => setCName(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white" required />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">نام دسته‌بندی (فارسی):</label>
                      <input type="text" value={cNameFa} onChange={(e) => setCNameFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Description (EN):</label>
                      <textarea rows={2} value={cDesc} onChange={(e) => setCDesc(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">توضیحات دسته‌بندی (فارسی):</label>
                      <textarea rows={2} value={cDescFa} onChange={(e) => setCDescFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                  </div>

                  <button type="submit" className="rounded bg-stone-900 text-white font-bold text-xs py-2 px-5 self-start uppercase">
                    {isRtl ? 'ثبت دسته‌بندی موضوعی' : 'Create Category'}
                  </button>
                </form>
              )}

              {/* Category lists with delete buttons */}
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 border border-stone-200 rounded-xl flex items-center justify-between gap-4 bg-stone-50/50">
                    <div className="flex flex-col gap-1">
                      <span className="font-serif text-xs font-bold text-stone-950">{isRtl ? cat.nameFa : cat.name}</span>
                      <span className="text-[10px] text-stone-400 line-clamp-1">{isRtl ? cat.descriptionFa : cat.description}</span>
                    </div>

                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                      id={`btn-admin-cat-delete-${cat.id}`}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Reviews moderation approval & reply */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'مدیریت و تعدیل دیدگاه‌های خوانندگان' : 'Moderation Pipeline (Reviews)'}</h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                {isRtl 
                  ? 'تمامی دیدگاه‌های ثبت‌شده در زیر قابل مشاهده هستند. با کلیک بر روی دکمه تایید، دیدگاه منتشر شده و در آمار نهایی کتاب لحاظ خواهد شد. همچنین می‌توانید به عنوان نویسنده پاسخ مستقیم ثبت کنید.' 
                  : 'Approve pending feedback, reply directly as the author, or reject unconstructive reviews to maintain the community tone.'}
              </p>

              <div className="flex flex-col gap-6">
                {reviews.map((rev) => {
                  const isPending = !rev.approved;
                  const isReplying = activeReplyReviewId === rev.id;
                  return (
                    <div key={rev.id} className={`p-5 rounded-xl border flex flex-col gap-3 ${isPending ? 'border-amber-300 bg-amber-50/10' : 'border-stone-200 bg-white'}`}>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">{rev.userName}</span>
                          {rev.verified && <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 rounded">Verified</span>}
                          {isPending && <span className="text-[9px] bg-amber-500 text-stone-950 font-bold px-1.5 rounded uppercase">Pending</span>}
                        </div>
                        <span className="text-stone-400">{isRtl ? rev.dateFa : rev.date}</span>
                      </div>

                      <p className="text-xs text-stone-700 italic">"{rev.comment}"</p>

                      {rev.reply && (
                        <div className="bg-stone-50 p-3 rounded text-[11px] text-stone-600">
                          <span className="font-bold">Anya Rad Reply:</span> {rev.reply}
                        </div>
                      )}

                      <div className="flex gap-2 items-center border-t border-stone-100 pt-3 mt-1 text-xs">
                        {isPending && (
                          <button
                            onClick={() => approveReview(rev.id)}
                            className="rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] p-1.5 px-3 uppercase flex items-center gap-1"
                            id={`admin-btn-approve-${rev.id}`}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span>{isRtl ? 'تأیید و انتشار' : 'Approve & Publish'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setActiveReplyReviewId(isReplying ? null : rev.id);
                            setReplyText(rev.reply || '');
                          }}
                          className="rounded border border-stone-300 bg-white text-stone-700 font-bold text-[10px] p-1.5 px-3 uppercase flex items-center gap-1"
                          id={`admin-btn-reply-${rev.id}`}
                        >
                          <Reply className="h-3.5 w-3.5" />
                          <span>{isRtl ? 'ثبت/ویرایش پاسخ نویسنده' : 'Reply'}</span>
                        </button>

                        <button
                          onClick={() => deleteReview(rev.id)}
                          className="text-stone-400 hover:text-red-600 font-bold text-[10px] uppercase ml-auto"
                          id={`admin-btn-delete-rev-${rev.id}`}
                        >
                          {isRtl ? 'حذف دیدگاه' : 'Delete'}
                        </button>
                      </div>

                      {/* Reply Editor */}
                      {isReplying && (
                        <div className="flex flex-col gap-2 mt-2 border-t border-dashed border-stone-200 pt-4 animate-fade-in">
                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={isRtl ? 'پاسخ صمیمانه خود به عنوان نویسنده را بنویسید...' : 'Type your supportive clinical reply...'}
                            className="rounded border border-stone-300 p-2 text-xs focus:outline-none"
                          ></textarea>
                          <button
                            onClick={() => handleReplySubmit(rev.id)}
                            className="rounded bg-stone-950 text-white text-[10px] font-bold p-1.5 px-4 uppercase w-fit"
                            id={`reply-save-btn-${rev.id}`}
                          >
                            {isRtl ? 'ذخیره پاسخ' : 'Save Reply'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: Blog Article Publisher */}
          {activeTab === 'blog' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h2 className="font-serif text-lg font-bold text-stone-950">{isRtl ? 'بستر تحریریه و مقالات تخصصی' : 'Blog Editorial & Article Publisher'}</h2>
                <button
                  onClick={() => setIsAddingPost(!isAddingPost)}
                  className="rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs p-2 px-4 flex items-center gap-1.5"
                  id="admin-btn-add-post"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isRtl ? 'ثبت و انتشار مقاله' : 'Publish New Article'}</span>
                </button>
              </div>

              {/* Add post Form */}
              {isAddingPost && (
                <form onSubmit={handleAddPostSubmit} className="p-6 rounded-xl border border-amber-300 bg-amber-50/10 flex flex-col gap-4 animate-fade-in">
                  <h3 className="font-serif text-sm font-bold text-stone-950">{isRtl ? 'ثبت مقاله روانشناسی جدید' : 'Draft New Article specifications'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Article Title (EN):</label>
                      <input type="text" value={pTitle} onChange={(e) => setPTitle(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white" required />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">عنوان مقاله (فارسی):</label>
                      <input type="text" value={pTitleFa} onChange={(e) => setPTitleFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Excerpt Summary (EN):</label>
                      <textarea rows={2} value={pExcerpt} onChange={(e) => setPExcerpt(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">خلاصه کوتاه مقاله (فارسی):</label>
                      <textarea rows={2} value={pExcerptFa} onChange={(e) => setPExcerptFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">Content Text (EN):</label>
                      <textarea rows={6} value={pContent} onChange={(e) => setPContent(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-stone-500 uppercase font-bold">متن کامل مقاله (فارسی):</label>
                      <textarea rows={6} value={pContentFa} onChange={(e) => setPContentFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-white"></textarea>
                    </div>
                  </div>

                  <button type="submit" className="rounded bg-stone-900 text-white font-bold text-xs py-2.5 px-6 self-start uppercase">
                    {isRtl ? 'انتشار نهایی مقاله وبلاگ' : 'Publish Article'}
                  </button>
                </form>
              )}

              {/* Articles list with delete */}
              <div className="flex flex-col gap-3">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-4 border border-stone-200 rounded-xl flex items-center justify-between gap-4 bg-stone-50/50">
                    <div className="flex flex-col gap-1">
                      <span className="font-serif text-xs font-bold text-stone-950">{isRtl ? post.titleFa : post.title}</span>
                      <span className="text-[9px] text-stone-400 font-bold uppercase">{post.date} • {post.category}</span>
                    </div>

                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                      id={`btn-admin-post-delete-${post.id}`}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Orders and invoices tracker */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'ثبت سفارشات، فاکتورها و وضعیت درگاه‌ها' : 'Live Transaction Tracking (Invoices)'}</h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                {isRtl 
                  ? 'تمامی خرید‌های آنلاین نسخه‌های کامل کتاب یا اشتراک در درگاه بانکی شاپرک با موفقیت در جدول زیر ذخیره و قابل پیگیری می‌باشند.' 
                  : 'Monitor user purchases, monthly or yearly gold club active plan updates, and verified Shaparak tracking codes.'}
              </p>

              <div className="flex flex-col gap-4">
                {orders.map((order) => {
                  const isSuccess = order.status === 'success';
                  return (
                    <div key={order.id} className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${isSuccess ? 'border-emerald-200 bg-emerald-50/5' : 'border-stone-200 bg-white'}`}>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-950">{order.id}</span>
                          <span className="text-stone-400">({isRtl ? order.dateFa : order.date})</span>
                        </div>
                        <div className="flex flex-col gap-1 text-[11px] text-stone-500 pl-1">
                          {order.items.map((it, i) => <span key={i}>• {isRtl ? it.titleFa : it.title}</span>)}
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1 shrink-0 text-right">
                        <span className="font-extrabold text-stone-950" dir="ltr">
                          {isRtl ? `${order.totalAmountRial.toLocaleString('fa-IR')} تومان` : `$${order.totalAmount.toFixed(2)}`}
                        </span>
                        <span className={`px-2 py-0.5 rounded font-bold text-[9px] w-fit ${isSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {isSuccess ? 'موفق' : 'معلق'}
                        </span>
                        {order.trackingCode && <span className="text-[9px] text-stone-400 font-mono">کد پیگیری: {order.trackingCode}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: Homepage and SEO configs */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSettingsSave} className="flex flex-col gap-6">
              <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'تنظیمات ویترین و سئو (SEO)' : 'Public Landing Page & SEO Controls'}</h2>
              
              {settingsSuccess && (
                <div className="rounded bg-emerald-50 border border-emerald-300 p-4 text-xs text-emerald-800">
                  {isRtl ? 'تنظیمات با موفقیت ذخیره شدند.' : 'Site Settings and Metadata structures updated successfully.'}
                </div>
              )}

              {/* Homepage sections copy management */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-stone-500 uppercase font-bold">Hero Title (EN):</label>
                  <input type="text" value={sHeroTitle} onChange={(e) => setSHeroTitle(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-stone-50 focus:bg-white" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-stone-500 uppercase font-bold">تیتر صفحه اصلی (فارسی):</label>
                  <input type="text" value={sHeroTitleFa} onChange={(e) => setSHeroTitleFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-stone-50 focus:bg-white" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-stone-500 uppercase font-bold">Hero Subtitle (EN):</label>
                  <textarea rows={3} value={sHeroSub} onChange={(e) => setSHeroSub(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-stone-50 focus:bg-white"></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-stone-500 uppercase font-bold">زیرتیتر صفحه اصلی (فارسی):</label>
                  <textarea rows={3} value={sHeroSubFa} onChange={(e) => setSHeroSubFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-stone-50 focus:bg-white"></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-stone-500 uppercase font-bold">Author Bio (EN):</label>
                  <textarea rows={4} value={sAbout} onChange={(e) => setSAbout(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-stone-50 focus:bg-white"></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-stone-500 uppercase font-bold">بیوگرافی نویسنده (فارسی):</label>
                  <textarea rows={4} value={sAboutFa} onChange={(e) => setSAboutFa(e.target.value)} className="rounded border px-2.5 py-2 text-xs bg-stone-50 focus:bg-white"></textarea>
                </div>
              </div>

              {/* Dynamic XML Sitemap and robots.txt visual controls */}
              <div className="border-t border-stone-200 pt-6 flex flex-col gap-4">
                <h3 className="font-serif text-sm font-bold text-stone-950">{isRtl ? 'تنظیمات فایل‌های خزش موتورهای جستجو' : 'Search Crawling Engines & Templates'}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans text-stone-500 uppercase font-bold">Sitemap.xml Template:</label>
                    <textarea
                      rows={5}
                      readOnly
                      className="rounded border p-2.5 bg-stone-900 text-amber-400 select-all"
                      value={`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://anyarad.com/</loc><priority>1.0</priority></url>
  <url><loc>https://anyarad.com/about</loc><priority>0.8</priority></url>
  <url><loc>https://anyarad.com/books</loc><priority>0.9</priority></url>
  <url><loc>https://anyarad.com/membership</loc><priority>0.9</priority></url>
  <url><loc>https://anyarad.com/blog</loc><priority>0.7</priority></url>
</urlset>`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans text-stone-500 uppercase font-bold">Robots.txt Template:</label>
                    <textarea
                      rows={5}
                      readOnly
                      className="rounded border p-2.5 bg-stone-900 text-amber-400 select-all"
                      value={`User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://anyarad.com/sitemap.xml`}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="rounded-lg bg-stone-900 text-white font-bold text-xs py-3 px-6 self-start uppercase">
                {isRtl ? 'ذخیره کل تغییرات تنظیمات' : 'Save Site Settings'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
