import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateFAQSchema } from '../utils/seo';
import { BookOpen, Brain, Compass, Sparkles, Star, ChevronDown, MessageSquare, ArrowRight, ArrowLeft, Mail, Heart, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const {
    language,
    books,
    categories,
    blogPosts,
    siteSettings,
    reviews,
    setActivePage,
    setSelectedBookId,
    setSelectedPostId
  } = useApp();

  const isRtl = language === 'fa';
  
  // FAQs
  const faqs = [
    {
      question: 'Are these books based on actual people and true stories?',
      questionFa: 'آیا این کتاب‌ها بر اساس داستان‌های واقعی افراد نوشته شده‌اند؟',
      answer: 'Yes. All stories are based on true events and real-life clients or interviews. Names and identifying details are changed to protect confidentiality, but the emotional truth and therapeutic insights are 100% genuine.',
      answerFa: 'بله. تمامی داستان‌ها بر اساس رویدادهای کاملاً واقعی، مراجعین بالینی یا مصاحبه‌های عمیق نگارش شده‌اند. اسامی و جزئیات شناسایی برای حفظ رازداری تغییر یافته‌اند، اما حقیقت عاطفی و آموزه‌های روانشناختی ۱۰۰٪ واقعی هستند.'
    },
    {
      question: 'What is the role of psychological analysis in these books?',
      questionFa: 'نقش تحلیل‌های روانشناسی در این کتاب‌ها چیست؟',
      answer: 'Unlike generic dramatic stories, each chapter is accompanied by clinical and psychological analysis. The author breaks down defense mechanisms, attachment styles, coping systems, and somatic trauma responses to provide a deeply educational reading experience.',
      answerFa: 'برخلاف داستان‌های دراماتیک معمول، هر بخش با تحلیل‌های بالینی و روانشناختی همراه است. نویسنده مکانیسم‌های دفاعی، سبک‌های دلبستگی، پاسخ‌های ترومایی بدن و الگوهای وابستگی متقابل را واکاوی می‌کند تا علاوه بر کشش داستانی، تجربه آموزشی عمیقی برای خودشناسی ارائه دهد.'
    },
    {
      question: 'How does the online subscription work?',
      questionFa: 'عضویت ویژه و اشتراک خواندن آنلاین چگونه کار می‌کند؟',
      answer: 'With our premium Monthly or Yearly membership, you unlock full access to read all books online through our premium virtual reader, as well as unlimited PDF downloads and exclusive members-only articles.',
      answerFa: 'با خرید عضویت ویژه (ماهانه یا سالانه)، دسترسی کامل شما به تمامی کتاب‌ها برای مطالعه آنلاین از طریق کتابخوان مجازی سایت باز می‌شود. همچنین امکان دانلود نامحدود نسخه‌های کامل PDF و مقالات تخصصی اعضا برای شما فعال خواهد شد.'
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const title = isRtl ? 'روایت واقعی زندگی و شفای روان' : 'True Psychological Real-Life Stories';
    const desc = isRtl 
      ? 'پلتفرم اختصاصی انتشار کتاب‌ها و مقالات روانشناسی آنیا راد. التیام تروما، روابط سمی، مرزهای عاطفی و خودشناسی از طریق روایت‌های واقعی.' 
      : 'Explore real-life stories analyzed through advanced narrative therapy. Discover books on trauma healing, relationships, and emotional growth by Anya Rad.';
    
    updateMetaTags(title, desc, '/');

    // Schema FAQ Markup
    const faqSchemaData = faqs.map(f => ({
      question: isRtl ? f.questionFa : f.question,
      answer: isRtl ? f.answerFa : f.answer
    }));
    injectStructuredData('faq-schema', generateFAQSchema(faqSchemaData));
  }, [language]);

  const featuredBooks = books.filter(b => b.isFeatured);
  const newestBooks = books.filter(b => b.isNew);
  const popularBooks = books.filter(b => b.isPopular);

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-radial from-stone-50 via-stone-50 to-amber-50/20 pt-10">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Hero Context */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>{isRtl ? 'بستر تخصصی روایت روانشناختی' : 'A Platform for Narrative Healing'}</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.15]">
              {isRtl ? siteSettings.heroTitleFa : siteSettings.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              {isRtl ? siteSettings.heroSubtitleFa : siteSettings.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  const defaultBook = books[0];
                  if (defaultBook) {
                    setSelectedBookId(defaultBook.id);
                    setActivePage('book-detail');
                  }
                }}
                className="rounded-lg bg-stone-900 text-white hover:bg-amber-600 font-medium px-6 py-3.5 text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/10 flex items-center gap-2 justify-center"
                id="hero-read-sample"
              >
                <BookOpen className="h-4 w-4" />
                <span>{isRtl ? 'خواندن نمونه رایگان' : 'Read Free Sample'}</span>
              </button>

              <button
                onClick={() => setActivePage('books')}
                className="rounded-lg border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 font-medium px-6 py-3.5 text-xs uppercase tracking-wider transition-all flex items-center gap-2 justify-center"
                id="hero-explore"
              >
                <span>{isRtl ? 'مشاهده کتابخانه' : 'Explore Books'}</span>
                {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setActivePage('membership')}
                className="rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold px-6 py-3.5 text-xs uppercase tracking-wider transition-all flex items-center gap-2 justify-center"
                id="hero-membership"
              >
                <span>{isRtl ? 'خرید اشتراک ویژه' : 'Get Membership'}</span>
              </button>
            </div>
          </div>

          {/* Hero Luxury Illustration */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] sm:h-[450px]">
            {/* Elegant glowing background orbits */}
            <div className="absolute w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute w-60 h-60 bg-stone-200 rounded-full blur-3xl opacity-40 bottom-10 right-10"></div>
            
            {/* Floating Glassmorphic Book Graphic */}
            <div className="relative z-10 glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/60 flex flex-col gap-6 max-w-[340px] w-full transform hover:rotate-2 transition-all duration-700">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">{isRtl ? 'پرطرفدارترین کتاب سال' : 'Bestselling Release'}</span>
                <div className="flex gap-0.5 text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                  <Star className="h-3 w-3 fill-amber-500" />
                </div>
              </div>

              {/* Stack of books illusion */}
              <div className="relative h-48 w-full bg-stone-100 rounded-lg overflow-hidden group shadow-md border border-stone-200">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600" 
                  alt="Echo of Silence Cover" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-serif font-semibold">{isRtl ? 'پژواک یک سکوت' : 'Echo of Silence'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-stone-800">
                <span className="font-serif text-sm font-bold">{isRtl ? 'کتاب صوتی و متنی کامل' : 'Full Virtual Book & PDF'}</span>
                <span className="text-xs text-stone-500">{isRtl ? 'روایت واقعی سارا و شفای ترومای خانوادگی' : 'A stunning true narrative on intergenerational healing.'}</span>
              </div>

              <button 
                onClick={() => {
                  setSelectedBookId('echo-of-silence');
                  setActivePage('book-detail');
                }}
                className="w-full rounded bg-stone-900 py-2.5 text-xs font-medium text-white hover:bg-amber-600 transition-colors"
                id="hero-quick-read"
              >
                {isRtl ? 'شروع مطالعه آنلاین' : 'Start Reading Online'}
              </button>
            </div>

            {/* Subtle orbital ring vectors for luxury framing */}
            <div className="absolute inset-0 border border-stone-200/40 rounded-full scale-90 animate-[spin_40s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-dashed border-stone-200/60 rounded-full scale-100 animate-[spin_60s_linear_infinite]"></div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC BOOK SHELVES (Featured, Newest, Popular) */}
      <section className="mx-auto max-w-7xl px-6 w-full flex flex-col gap-16">
        {/* Featured Section */}
        <div>
          <div className="flex justify-between items-end border-b border-stone-200 pb-4 mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                {isRtl ? 'کتاب‌های برجسته و تازه' : 'Featured Masterpieces'}
              </h2>
              <span className="text-xs text-stone-500">{isRtl ? 'تحلیل‌های عمیق عاطفی و روانشناختی' : 'Deep narrative analysis curated by Anya Rad'}</span>
            </div>
            <button
              onClick={() => setActivePage('books')}
              className="text-xs font-semibold uppercase tracking-wider text-amber-600 hover:text-stone-900 flex items-center gap-1.5 transition-colors"
              id="home-view-all-books"
            >
              <span>{isRtl ? 'مشاهده همه آثار' : 'View All Books'}</span>
              {isRtl ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBooks.map((book) => (
              <div 
                key={book.id} 
                className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-stone-200/60 bg-white hover:shadow-2xl hover:border-amber-200 transition-all duration-500 cursor-pointer shadow-luxury shadow-luxury-hover"
                onClick={() => {
                  setSelectedBookId(book.id);
                  setActivePage('book-detail');
                }}
              >
                {/* Book Cover */}
                <div className="relative shrink-0 w-full sm:w-40 h-56 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 shadow-md">
                  <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 right-2 rounded bg-stone-950/80 px-2 py-0.5 text-[9px] font-bold text-amber-400 backdrop-blur-xs">
                    {isRtl ? 'پرمیوم' : 'MEMBERSHIP'}
                  </div>
                </div>

                {/* Content details */}
                <div className="flex flex-col justify-between py-1 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {isRtl ? book.publicationDateFa : book.publicationDate}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                        <span className="font-semibold text-stone-700">{book.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-950 leading-tight group-hover:text-amber-600 transition-colors">
                      {isRtl ? book.titleFa : book.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                      {isRtl ? book.descriptionFa : book.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                    <span className="text-sm font-semibold text-stone-900" dir="ltr">
                      {isRtl ? `${book.priceRial.toLocaleString('fa-IR')} تومان` : `$${book.price.toFixed(2)}`}
                    </span>
                    <button 
                      className="text-xs font-semibold text-amber-600 group-hover:text-amber-700 flex items-center gap-1"
                      id={`btn-read-sample-${book.id}`}
                    >
                      <span>{isRtl ? 'بیشتر بخوانید و نمونه' : 'Read Sample'}</span>
                      {isRtl ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Carousel / Grid */}
        <div>
          <div className="flex flex-col gap-2 items-center text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              {isRtl ? 'دسته‌بندی مباحث روانشناختی' : 'Explore by Psychological Dimension'}
            </h2>
            <p className="text-xs text-stone-500 max-w-xl">
              {isRtl 
                ? 'با انتخاب هر حوزه، روایت‌های مستند و کتاب‌های تحلیل‌محور آن بخش را بیابید.' 
                : 'Browse books based on key emotional milestones, relationship recovery, and mental wellness.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActivePage('books');
                }}
                className="flex flex-col items-center justify-center p-6 bg-white border border-stone-200/60 rounded-xl shadow-luxury hover:border-amber-400 hover:shadow-2xl transition-all duration-300 text-center gap-4 group"
                id={`cat-card-${cat.id}`}
              >
                <div className="h-10 w-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                  <Brain className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-sm font-bold text-stone-900">{isRtl ? cat.nameFa : cat.name}</span>
                  <span className="text-[10px] text-stone-400 line-clamp-1">{isRtl ? cat.descriptionFa : cat.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY READ THESE BOOKS (Premium values) */}
      <section className="bg-stone-900 text-white py-20 relative">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">{isRtl ? 'وجه تمایز ما' : 'THE EDITORIAL DIFFERENCE'}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight">
              {isRtl ? 'چرا خواندن این داستان‌ها جهان شما را دگرگون می‌کند؟' : 'Why These Psychological Stories Matter'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {isRtl
                ? 'کتاب‌های آنیا راد داستان‌های دراماتیک زرد نیستند؛ آن‌ها تلفیقی از مستندنگاری زندگی واقعی و یادداشت‌های بالینی دقیق روان‌درمانی هستند که نقشه راهی برای التیام درونی شما ارائه می‌دهند.'
                : 'Most stories exist only for entertainment. These books are crafted at the intersection of narrative therapy and mental science, turning complex human tragedy into deep personal revelations and healing roadmaps.'}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-stone-800 bg-stone-950/40 flex flex-col gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Brain className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">{isRtl ? 'یادداشت‌های بالینی و روانشناسی' : 'Embedded Clinical Insights'}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {isRtl
                  ? 'هر داستان شامل صفحات اختصاصی روانشناسی است که در آن‌ها مکانیسم‌های دفاعی، تروماها و ریشه‌های عاطفی رفتارها تبیین شده‌اند.'
                  : 'Every single chapter ends with rich, rigorous psycho-education notes explaining trauma dynamics, relationship patterns, and emotional systems.'}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-stone-800 bg-stone-950/40 flex flex-col gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Compass className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">{isRtl ? 'رویکرد علمی به شفای تروما' : 'Grounded in Trauma Science'}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {isRtl
                  ? 'آموزه‌ها بر اساس آخرین رویکردهای درمانی از جمله زوج‌درمانی، شفای کودک درون و تکنیک‌های رهاسازی بدنی نوشته شده‌اند.'
                  : 'Incorporating modern somatic therapies, trauma-informed attachment therapy, family systems models, and clinical boundaries coaching.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUTHOR INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-amber-200/50 rounded-2xl transform rotate-3 scale-95 select-none pointer-events-none"></div>
          <div className="relative z-10 h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-white">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
              alt="Author Anya Rad" 
              className="h-full w-full object-cover" 
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'با نویسنده آشنا شوید' : 'MEET THE AUTHOR'}</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
            {isRtl ? `درباره ${siteSettings.authorNameFa}` : `About ${siteSettings.authorName}`}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {isRtl ? siteSettings.aboutAuthorFa : siteSettings.aboutAuthor}
          </p>
          <button
            onClick={() => setActivePage('about')}
            className="rounded-lg border border-stone-950 text-stone-950 px-6 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-stone-950 hover:text-white transition-all flex items-center gap-2"
            id="home-view-about"
          >
            <span>{isRtl ? 'مطالعه کامل بیوگرافی' : 'Read Full Bio'}</span>
            {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </section>

      {/* 5. MEMBERSHIP BENEFITS */}
      <section className="bg-amber-500/10 border-y border-amber-500/20 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center flex flex-col items-center gap-12">
          <div className="flex flex-col gap-2 items-center max-w-xl">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">{isRtl ? 'عضویت ویژه کلوب خوانندگان' : 'EXCLUSIVE SUBSCRIPTION'}</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              {isRtl ? 'مزایای کم‌نظیر اشتراک طلایی ما' : 'Unlock Unlimited Psychological Wisdom'}
            </h2>
            <p className="text-xs text-stone-500">
              {isRtl 
                ? 'با پیوستن به جمع مشترکین ویژه ما، قفل تمام کتاب‌ها و دانلودهای صوتی و پی‌دی‌اف به صورت کامل برایتان باز خواهد شد.' 
                : 'Subscribers gain ultimate access to virtual reading, PDF copies, exclusive release updates, and direct support.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
            <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-luxury flex flex-col items-center text-center gap-3">
              <BookOpen className="h-6 w-6 text-amber-600" />
              <h3 className="font-serif text-sm font-bold text-stone-900">{isRtl ? 'کتابخوان آنلاین پیشرفته' : 'Unlimited Virtual Reading'}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {isRtl ? 'مطالعه نامحدود نسخه‌های کامل کتاب‌ها در سیستم کتابخوان مدرن و جذاب سایت.' : 'Read full volumes immediately in our custom virtual web book reader.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-luxury flex flex-col items-center text-center gap-3">
              <Brain className="h-6 w-6 text-amber-600" />
              <h3 className="font-serif text-sm font-bold text-stone-900">{isRtl ? 'دانلود مستقیم نسخه‌های کامل PDF' : 'Direct Full PDF Downloads'}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {isRtl ? 'دریافت نسخه‌های نهایی پی‌دی‌اف برای مطالعه آفلاین روی تلفن همراه یا کامپیوتر.' : 'Download pristine, full-text high resolution PDF books on any device.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-luxury flex flex-col items-center text-center gap-3">
              <Sparkles className="h-6 w-6 text-amber-600" />
              <h3 className="font-serif text-sm font-bold text-stone-900">{isRtl ? 'محتوای کاملاً اختصاصی و تحلیل‌ها' : 'Exclusive Author Content'}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {isRtl ? 'یادداشت‌های صوتی بالینی و تحلیل‌های ثانویه که هرگز عمومی منتشر نخواهند شد.' : 'Gain exclusive access to narrative case studies, worksheets, and clinical guides.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('membership')}
            className="rounded-lg bg-stone-900 text-white hover:bg-amber-600 font-semibold px-8 py-4 text-xs uppercase tracking-wider transition-all"
            id="home-btn-explore-membership"
          >
            {isRtl ? 'بررسی طرح‌های اشتراک و ثبت‌نام' : 'View Subscription Plans'}
          </button>
        </div>
      </section>

      {/* 6. REVIEWS & TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 w-full flex flex-col gap-10">
        <div className="text-center flex flex-col gap-2 items-center">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{isRtl ? 'نظرات تأیید شده' : 'VERIFIED READER REFLECTIONS'}</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
            {isRtl ? 'تجربه خوانندگان از سفر خودشناسی با این آثار' : 'Stories of Transformation'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-luxury flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-[10px] text-stone-400">
                <span className="font-semibold text-stone-800">{rev.userName}</span>
                <span>{isRtl ? rev.dateFa : rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LATEST ARTICLES (Blog) */}
      <section className="mx-auto max-w-7xl px-6 w-full flex flex-col gap-10">
        <div className="flex justify-between items-end border-b border-stone-200 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              {isRtl ? 'آخرین مقالات و آموخته‌های روانشناسی' : 'Psychology Essays & Insights'}
            </h2>
            <span className="text-xs text-stone-500">{isRtl ? 'یادداشت‌های هفتگی آنیا راد درباره الگوهای رفتاری' : 'Weekly narrative therapy articles by Anya Rad'}</span>
          </div>
          <button
            onClick={() => setActivePage('blog')}
            className="text-xs font-semibold uppercase tracking-wider text-amber-600 hover:text-stone-900 flex items-center gap-1 transition-colors"
            id="home-view-all-posts"
          >
            <span>{isRtl ? 'مطالعه همه مقالات' : 'Read All Articles'}</span>
            {isRtl ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.slice(0, 2).map((post) => (
            <div 
              key={post.id} 
              className="group flex flex-col sm:flex-row gap-6 cursor-pointer"
              onClick={() => {
                setSelectedPostId(post.id);
                setActivePage('blog');
              }}
            >
              <div className="shrink-0 w-full sm:w-44 h-36 bg-stone-100 rounded-lg overflow-hidden border border-stone-200/60 shadow">
                <img src={post.coverUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              <div className="flex flex-col justify-between py-1 gap-2">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                    {isRtl ? post.categoryFa : post.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-stone-900 leading-snug group-hover:text-amber-600 transition-colors">
                    {isRtl ? post.titleFa : post.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {isRtl ? post.excerptFa : post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-stone-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {isRtl ? post.dateFa : post.date}</span>
                  <span>•</span>
                  <span>{isRtl ? post.readTimeFa : post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQS */}
      <section className="mx-auto max-w-3xl px-6 w-full flex flex-col gap-10">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{isRtl ? 'پاسخ به سوالات شما' : 'HAVE QUESTIONS?'}</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">{isRtl ? 'سوالات متداول خوانندگان' : 'Frequently Asked Questions'}</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-stone-200 bg-white rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-sm font-bold text-stone-900 hover:bg-stone-50/50"
                  style={{ textAlign: isRtl ? 'right' : 'left' }}
                  id={`faq-btn-${index}`}
                >
                  <span>{isRtl ? faq.questionFa : faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-stone-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-stone-100 text-xs text-stone-500 leading-relaxed bg-stone-50/20">
                    {isRtl ? faq.answerFa : faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. NEWSLETTER / FOOTER CONTACT PREVIEW */}
      <section className="mx-auto max-w-5xl px-6 w-full">
        <div className="relative rounded-2xl bg-stone-950 text-white p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 border border-stone-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-start gap-4 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white leading-tight">
              {isRtl ? 'برای یک سفر خودشناسی آماده‌اید؟' : 'Ready to Transform Your Self-Awareness?'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {isRtl 
                ? 'کتاب‌های آنیا راد به شما این امکان را می‌دهند که الگوهای ناخودآگاه گذشته خود را تغییر دهید و کیفیت روابط خود را بازسازی کنید. همین امروز با ثبت‌نام در سایت یا خرید کتاب شروع کنید.' 
                : 'Subscribe to our mailing list or read the first few free sample chapters. Take the first step to understand your emotional triggers, secure your boundaries, and heal old grief.'}
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto flex flex-col gap-3">
            <button
              onClick={() => setActivePage('books')}
              className="rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-600 font-bold px-8 py-4 text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/20"
              id="home-contact-explore-btn"
            >
              {isRtl ? 'شروع گشت و گذار در کتابخانه' : 'Explore the Bookstore'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
