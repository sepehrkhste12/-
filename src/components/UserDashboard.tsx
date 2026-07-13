import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBreadcrumbSchema } from '../utils/seo';
import { SAMPLES_TEXTS } from '../data';
import { User, Star, BookOpen, Download, Bookmark, CreditCard, Save, CheckCircle, ShieldCheck, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    language,
    currentUser,
    updateUserProfile,
    books,
    orders,
    wishlist,
    toggleWishlist,
    setActivePage
  } = useApp();

  const isRtl = language === 'fa';
  const [activeTab, setActiveTab] = useState<'profile' | 'reading' | 'downloads' | 'payments'>('profile');

  // Profile Edit states
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Download simulation states
  const [downloadingBookId, setDownloadingBookId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Digital Reading Room active book
  const [activeReadingBookId, setActiveReadingBookId] = useState<string | null>(null);
  const [readingPage, setReadingPage] = useState(0);

  useEffect(() => {
    const title = isRtl ? 'پنل کاربری خوانندگان | داشبورد شخصی' : 'Reader Portal | Personal Dashboard';
    const desc = isRtl
      ? 'مدیریت حساب کاربری، دانلود پی‌دی‌اف کتاب‌ها، کتابخوان آنلاین شخصی و بررسی جزئیات اشتراک طلایی.'
      : 'Access your personal reading room, manage your premium membership, view receipts, and download full-text PDF files.';
    
    updateMetaTags(title, desc, '/dashboard');

    injectStructuredData('dashboard-breadcrumbs', generateBreadcrumbSchema([
      { name: isRtl ? 'خانه' : 'Home', url: '/' },
      { name: isRtl ? 'پنل کاربری' : 'Dashboard', url: '/dashboard' }
    ]));
  }, [language]);

  // Sync state if currentUser updates
  useEffect(() => {
    setEditName(currentUser.name);
    setEditEmail(currentUser.email);
  }, [currentUser]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: editName, email: editEmail });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleDownloadTrigger = (bookId: string) => {
    setDownloadingBookId(bookId);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingBookId(null);
            alert(isRtl ? 'فایل پی‌دی‌اف کامل کتاب با موفقیت دانلود و بر روی دستگاه شما ذخیره شد.' : 'Full PDF file packaged securely and downloaded successfully to your local machine.');
          }, 800);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  // Check if user has access to read/download a book
  const hasAccess = (bookId: string) => {
    if (currentUser.membershipType !== 'none') return true;
    return currentUser.purchasedBookIds.includes(bookId);
  };

  const bookmarkBooksList = books.filter(b => wishlist.includes(b.id));
  const purchasedBooksList = books.filter(b => currentUser.purchasedBookIds.includes(b.id));
  const accessibleBooksList = currentUser.membershipType !== 'none' ? books : purchasedBooksList;

  // Reading room pages fallback (we'll reuse the sample texts but treat them as complete volumes for the reading room simulation!)
  const getBookReadingData = (bookId: string) => {
    return SAMPLES_TEXTS[bookId] || { title: 'Book Volume', pages: ['Chapter 1 page text', 'Chapter 2 page text'] };
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-10 animate-fade-in" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* 1. Header welcome banner */}
      <div className="rounded-2xl border border-stone-200/60 bg-white p-6 sm:p-8 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-stone-400 m-4" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-950">
              {isRtl ? `خوش آمدید، ${currentUser.name}` : `Welcome back, ${currentUser.name}`}
            </h1>
            <span className="text-xs text-stone-500 font-medium">{currentUser.email}</span>
          </div>
        </div>

        {/* Membership Details snapshot */}
        <div className="rounded-xl border border-amber-200/60 bg-amber-50/40 p-4.5 px-6 flex flex-col gap-1.5 min-w-[200px]">
          <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold">{isRtl ? 'وضعیت عضویت ویژه' : 'Membership Status'}</span>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="font-serif text-sm font-extrabold text-stone-900">
              {currentUser.membershipType === 'none' && (isRtl ? 'عضو معمولی (فاقد اشتراک)' : 'Free Tier Reader')}
              {currentUser.membershipType === 'monthly' && (isRtl ? 'اشتراک طلایی ماهانه' : 'Monthly Gold Club')}
              {currentUser.membershipType === 'yearly' && (isRtl ? 'اشتراک طلایی سالانه' : 'Yearly Gold Club')}
            </span>
          </div>
          {currentUser.membershipType !== 'none' && (
            <span className="text-[10px] text-amber-700">
              {isRtl ? `اعتبار تا: ${currentUser.membershipExpiryFa}` : `Valid until: ${currentUser.membershipExpiry}`}
            </span>
          )}
        </div>
      </div>

      {/* 2. Horizontal layout: Sidebar & Tabs content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Tab Selector buttons (Col 1) */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <button
            onClick={() => { setActiveTab('profile'); setActiveReadingBookId(null); }}
            className={`w-full py-3.5 px-5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border ${
              activeTab === 'profile' && !activeReadingBookId
                ? 'bg-stone-900 text-white border-stone-900 font-bold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
            style={{ textAlign: isRtl ? 'right' : 'left' }}
            id="dash-tab-profile"
          >
            {isRtl ? 'ویرایش اطلاعات حساب' : 'Profile Settings'}
          </button>

          <button
            onClick={() => { setActiveTab('reading'); setActiveReadingBookId(null); }}
            className={`w-full py-3.5 px-5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border ${
              activeTab === 'reading' || activeReadingBookId
                ? 'bg-stone-900 text-white border-stone-900 font-bold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
            style={{ textAlign: isRtl ? 'right' : 'left' }}
            id="dash-tab-reading"
          >
            {isRtl ? 'کتابخوان و تالار مطالعه' : 'Virtual Reading Room'}
          </button>

          <button
            onClick={() => { setActiveTab('downloads'); setActiveReadingBookId(null); }}
            className={`w-full py-3.5 px-5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border ${
              activeTab === 'downloads' && !activeReadingBookId
                ? 'bg-stone-900 text-white border-stone-900 font-bold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
            style={{ textAlign: isRtl ? 'right' : 'left' }}
            id="dash-tab-downloads"
          >
            {isRtl ? 'دریافت فایل‌ها و نشان‌شده‌ها' : 'PDFs & Bookmarks'}
          </button>

          <button
            onClick={() => { setActiveTab('payments'); setActiveReadingBookId(null); }}
            className={`w-full py-3.5 px-5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border ${
              activeTab === 'payments' && !activeReadingBookId
                ? 'bg-stone-900 text-white border-stone-900 font-bold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
            style={{ textAlign: isRtl ? 'right' : 'left' }}
            id="dash-tab-payments"
          >
            {isRtl ? 'سوابق سفارشات و فاکتورها' : 'Invoices & Receipts'}
          </button>
        </div>

        {/* Tab Contents (Col 2) */}
        <div className="lg:col-span-9 rounded-2xl border border-stone-200/60 bg-white p-6 sm:p-8 shadow-luxury min-h-[400px]">
          
          {/* TAB 1: Profile Settings */}
          {activeTab === 'profile' && !activeReadingBookId && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'تنظیمات حساب کاربری' : 'Account Profile'}</h2>
              
              {saveSuccess && (
                <div className="rounded bg-emerald-50 border border-emerald-300 p-4 text-xs text-emerald-800">
                  {isRtl ? 'تغییرات پروفایل با موفقیت ذخیره شد.' : 'Profile settings updated successfully.'}
                </div>
              )}

              <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'نام و نام خانوادگی:' : 'Your Name:'}</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="rounded border border-stone-200 bg-stone-50 px-3 py-2 text-xs focus:outline-none focus:bg-white"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'نشانی ایمیل:' : 'Your Email:'}</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="rounded border border-stone-200 bg-stone-50 px-3 py-2 text-xs focus:outline-none focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2 px-5 text-xs uppercase tracking-wider w-fit flex items-center gap-2 mt-2"
                  id="dash-save-profile"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{isRtl ? 'ذخیره تغییرات حساب' : 'Save Changes'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Reading Room List */}
          {activeTab === 'reading' && !activeReadingBookId && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'کتابخانه اختصاصی مطالعه آنلاین' : 'Your Digital Library'}</h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                {isRtl 
                  ? 'تمامی کتاب‌هایی که به عنوان خریدار یا به واسطه دلبستگی به کلوب مشترکین طلایی به آن‌ها دسترسی دارید در زیر فهرست شده‌اند. روی هر کتاب کلیک کنید تا وارد محیط کتابخوان مجازی شوید.' 
                  : 'Below are the volumes currently accessible via your purchase history or active Gold tier subscription. Select any book to open in the virtual reading app.'}
              </p>

              {accessibleBooksList.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs italic">
                  {isRtl ? 'شما در حال حاضر دسترسی به مطالعه آنلاین هیچ کتابی ندارید.' : 'You do not have active access to any complete books.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {accessibleBooksList.map((book) => (
                    <div 
                      key={book.id} 
                      className="p-4 border border-stone-200/60 rounded-xl flex items-center gap-4 hover:border-amber-400 cursor-pointer"
                      onClick={() => {
                        setActiveReadingBookId(book.id);
                        setReadingPage(0);
                      }}
                    >
                      <img src={book.coverUrl} alt={book.title} className="h-16 w-12 object-cover rounded shadow" />
                      <div className="flex flex-col gap-1">
                        <h4 className="font-serif text-xs font-bold text-stone-900 leading-tight">
                          {isRtl ? book.titleFa : book.title}
                        </h4>
                        <span className="text-[9px] uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded w-fit">
                          {isRtl ? 'دسترسی کامل' : 'READ VOLUME'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2 DETAIL: Active Virtual Book Reader */}
          {activeReadingBookId && (
            <div className="flex flex-col gap-6">
              {/* Reader Header */}
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <button
                  onClick={() => setActiveReadingBookId(null)}
                  className="text-xs font-semibold text-stone-500 hover:text-amber-600 flex items-center gap-1"
                  id="reader-back-to-room"
                >
                  {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                  <span>{isRtl ? 'خروج از کتابخوان' : 'Exit Reader'}</span>
                </button>

                <span className="text-xs font-serif font-bold text-stone-900">
                  {isRtl ? books.find(b => b.id === activeReadingBookId)?.titleFa : books.find(b => b.id === activeReadingBookId)?.title}
                </span>

                <span className="text-[10px] text-stone-400">
                  {isRtl 
                    ? `صفحه ${(readingPage + 1).toLocaleString('fa-IR')} از ${getBookReadingData(activeReadingBookId).pages.length.toLocaleString('fa-IR')}` 
                    : `Page ${readingPage + 1} of ${getBookReadingData(activeReadingBookId).pages.length}`}
                </span>
              </div>

              {/* Reader Book Page area */}
              <div className="bg-amber-50/10 rounded-xl border border-stone-200 p-6 sm:p-10 text-xs sm:text-base text-stone-800 leading-relaxed font-serif shadow-inner min-h-[250px] flex flex-col justify-between">
                <p className="whitespace-pre-line leading-[1.85] font-serif select-text">
                  {getBookReadingData(activeReadingBookId).pages[readingPage]}
                </p>

                {/* Reader Turn Page controls */}
                <div className="flex items-center justify-between border-t border-stone-200/60 pt-4 mt-6">
                  <button
                    disabled={readingPage === 0}
                    onClick={() => setReadingPage(p => p - 1)}
                    className="flex items-center gap-1 rounded border border-stone-300 bg-white p-1.5 px-3.5 text-xs font-bold disabled:opacity-40"
                    id="dash-reader-prev"
                  >
                    {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                    <span>{isRtl ? 'صفحه قبل' : 'Prev'}</span>
                  </button>

                  <span className="text-xs text-stone-400 font-semibold uppercase">{isRtl ? 'Zendegi کتابخوان طلایی' : 'Zendegi Gold Reader'}</span>

                  <button
                    disabled={readingPage === getBookReadingData(activeReadingBookId).pages.length - 1}
                    onClick={() => setReadingPage(p => p + 1)}
                    className="flex items-center gap-1 rounded border border-stone-300 bg-white p-1.5 px-3.5 text-xs font-bold disabled:opacity-40"
                    id="dash-reader-next"
                  >
                    <span>{isRtl ? 'صفحه بعد' : 'Next'}</span>
                    {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PDFs & Bookmarks */}
          {activeTab === 'downloads' && !activeReadingBookId && (
            <div className="flex flex-col gap-8">
              {/* PDF Downloads Subsection */}
              <div className="flex flex-col gap-4">
                <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'دانلود مستقیم نسخه‌های چاپی و PDF' : 'Download Complete PDF Volumes'}</h2>
                
                {accessibleBooksList.length === 0 ? (
                  <div className="text-center py-6 text-stone-400 text-xs italic">
                    {isRtl ? 'کتابی جهت دانلود در آرشیو کاربری یافت نشد.' : 'No book PDFs available for download.'}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {accessibleBooksList.map((book) => {
                      const isLoaderActive = downloadingBookId === book.id;
                      return (
                        <div key={book.id} className="p-4 border border-stone-200/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img src={book.coverUrl} alt={book.title} className="h-12 w-9 object-cover rounded shadow" />
                            <div className="flex flex-col gap-1">
                              <h4 className="font-serif text-xs font-bold text-stone-900 leading-tight">
                                {isRtl ? book.titleFa : book.title}
                              </h4>
                              <span className="text-[9px] text-stone-400">{book.pages} {isRtl ? 'صفحه • نسخه کامل' : 'Pages • Full Release'}</span>
                            </div>
                          </div>

                          {isLoaderActive ? (
                            <div className="flex flex-col items-end gap-1 shrink-0 w-full sm:w-40">
                              <div className="w-full bg-stone-100 h-2 rounded overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: `${downloadProgress}%` }}></div>
                              </div>
                              <span className="text-[9px] text-stone-400 font-bold">{downloadProgress}% {isRtl ? 'درحال بسته‌بندی فایل...' : 'Packaging files...'}</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDownloadTrigger(book.id)}
                              className="rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs p-2 px-4 shrink-0 flex items-center gap-1.5"
                              id={`dash-download-btn-${book.id}`}
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>{isRtl ? 'دانلود مستقیم PDF' : 'Download PDF'}</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bookmarked Items Subsection */}
              <div className="flex flex-col gap-4 border-t border-stone-100 pt-6">
                <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'نشان‌شده‌ها و لیست علاقه‌مندی‌ها' : 'Bookmarked & Favorite Books'}</h2>
                
                {bookmarkBooksList.length === 0 ? (
                  <div className="text-center py-6 text-stone-400 text-xs italic">
                    {isRtl ? 'لیست علاقه‌مندی‌های شما خالی است.' : 'Your favorite books list is empty.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bookmarkBooksList.map((book) => (
                      <div key={book.id} className="p-4 border border-stone-200/60 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img src={book.coverUrl} alt={book.title} className="h-12 w-9 object-cover rounded shadow" />
                          <div className="flex flex-col gap-1">
                            <h4 className="font-serif text-xs font-bold text-stone-900 leading-tight">
                              {isRtl ? book.titleFa : book.title}
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleWishlist(book.id)}
                          className="text-xs font-semibold text-stone-400 hover:text-red-500 transition-colors"
                          id={`dash-bookmark-remove-${book.id}`}
                        >
                          {isRtl ? 'حذف' : 'Remove'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Invoices & Receipts */}
          {activeTab === 'payments' && !activeReadingBookId && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'سوابق مالی و تراکنش‌ها' : 'Payments & Invoices'}</h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                {isRtl 
                  ? 'تمامی سوابق سفارشات و مبالغ پرداخت‌شده از طریق درگاه الکترونیک شاپرک در زیر ثبت و به عنوان فاکتورهای رسمی در دسترس می‌باشند.' 
                  : 'A transparent record of all digital purchases, plan registrations, bank tracking numbers, and transactional invoices.'}
              </p>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs italic">
                  {isRtl ? 'هیچ فاکتور پرداختی برای حساب کاربری شما صادر نشده است.' : 'No invoices are associated with your profile.'}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => {
                    const isSuccess = order.status === 'success';
                    return (
                      <div 
                        key={order.id}
                        className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
                          isSuccess ? 'border-emerald-200 bg-emerald-50/10' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-950">{order.id}</span>
                            <span className="text-[10px] text-stone-400">({isRtl ? order.dateFa : order.date})</span>
                          </div>
                          
                          <div className="flex flex-col gap-1 text-[11px] text-stone-500 pl-1">
                            {order.items.map((item, idx) => (
                              <span key={idx}>• {isRtl ? item.titleFa : item.title} ({item.quantity}x)</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                          <span className="font-bold text-stone-900" dir="ltr">
                            {isRtl ? `${order.totalAmountRial.toLocaleString('fa-IR')} تومان` : `$${order.totalAmount.toFixed(2)}`}
                          </span>
                          
                          <div className="flex items-center gap-1.5 text-[10px] font-bold">
                            <span className={`px-2 py-0.5 rounded ${isSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {isSuccess ? (isRtl ? 'پرداخت موفق' : 'Success') : (isRtl ? 'پرداخت ناموفق / معلق' : 'Pending')}
                            </span>
                          </div>
                          {order.trackingCode && (
                            <span className="text-[9px] text-stone-400 font-semibold font-mono">
                              {isRtl ? `کد رهگیری: ${order.trackingCode}` : `Ref No: ${order.trackingCode}`}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
