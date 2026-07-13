import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateAuthorSchema } from '../utils/seo';
import { MapPin, Mail, Award, BookOpen, Star, Sparkles, MessageSquare, Instagram, Send } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { language, siteSettings } = useApp();
  const isRtl = language === 'fa';

  useEffect(() => {
    const title = isRtl ? 'درباره آنیا راد | روانشناس و نویسنده' : 'About Anya Rad | Psychological Author';
    const desc = isRtl
      ? 'بیوگرافی و سوابق آنیا راد، نویسنده و روانشناس روایت‌محور. ۱۵ سال سابقه پژوهش و مستندنگاری روایت‌های واقعی زندگی و التیام تروما.'
      : 'Explore the journey and professional credentials of Anya Rad, award-winning author and researcher of somatic trauma healing and relationship dynamics.';
    
    updateMetaTags(title, desc, '/about');
    injectStructuredData('author-schema', generateAuthorSchema());
  }, [language]);

  const milestones = [
    {
      year: '2010',
      title: 'Therapeutic Practice',
      titleFa: 'آغاز فعالیت تخصصی درمانگری',
      desc: 'Started narrative therapy counseling, specializing in childhood trauma reprocessing.',
      descFa: 'آغاز جلسات روان‌درمانی روایت‌محور و کمک به مراجعین برای بازپردازش آسیب‌های دوران کودکی.'
    },
    {
      year: '2018',
      title: 'Lived-Experience Archive',
      titleFa: 'تاسیس آرشیو تجربیات زیسته',
      desc: 'Began systematically documenting real-life human narratives for psychological research.',
      descFa: 'شروع مستندسازی سیستماتیک روایت‌های واقعی مراجعین جهت تحلیل روانشناختی رفتارها.'
    },
    {
      year: '2025',
      title: 'Echo of Silence Launch',
      titleFa: 'انتشار کتاب پژواک یک سکوت',
      desc: 'Released her first major biographical psychological book to critical acclaim.',
      descFa: 'انتشار اولین کتاب عمده تحلیلی-داستانی که با استقبال گسترده خوانندگان مواجه شد.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-16" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Editorial Title Header */}
      <div className="border-b border-stone-200 pb-8 flex flex-col gap-3">
        <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'شناسنامه ادبی و تخصصی' : 'EDITORIAL BIOGRAPHY'}</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-900 leading-tight">
          {isRtl ? 'درباره آنیا راد' : 'Anya Rad'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl leading-relaxed">
          {isRtl
            ? 'نویسنده، پژوهشگر حوزه روانشناسی روایت‌محور و متخصص تحلیل تروماهای بین‌نسلی.'
            : 'Author, trauma researcher, narrative therapist, and surveyor of authentic human emotional struggles.'}
        </p>
      </div>

      {/* Main Grid: Portrait and Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Portait & Quick Bio Box */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] border border-white">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
              alt="Anya Rad Portrait" 
              className="h-full w-full object-cover" 
            />
          </div>

          <div className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-luxury flex flex-col gap-4">
            <h3 className="font-serif text-sm font-bold text-stone-950">{isRtl ? 'اطلاعات تماس و شبکه‌ها' : 'Channels & Connections'}</h3>
            <div className="flex flex-col gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>{isRtl ? siteSettings.addressFa : siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>{siteSettings.contactEmail}</span>
              </div>
              <div className="flex gap-4 border-t border-stone-100 pt-4 mt-1">
                <a 
                  href={siteSettings.instagramLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-stone-500 hover:text-amber-600 font-semibold"
                  id="about-insta"
                >
                  <Instagram className="h-4 w-4 text-amber-500" />
                  <span>Instagram</span>
                </a>
                <a 
                  href={siteSettings.telegramLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 text-stone-500 hover:text-amber-600 font-semibold"
                  id="about-telegram"
                >
                  <Send className="h-4 w-4 text-amber-500" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Detailed Bio & Quotes */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="relative p-8 rounded-2xl bg-amber-500/5 border border-amber-500/10 italic text-stone-700 text-sm sm:text-base leading-relaxed font-serif">
            <span className="absolute -top-3 left-6 text-5xl text-amber-500 leading-none select-none">“</span>
            <p className="relative z-10 font-medium">
              {isRtl
                ? 'کتاب‌های من برای سرگرمی نیستند؛ آن‌ها آینه‌ای هستند برای روبه‌رو شدن با آن بخش‌هایی از روان شما که سال‌ها در تاریکی نگه داشته‌اید. شفای درون زمانی آغاز می‌شود که جرأت کنیم داستان خود را بشنویم و آن را بنویسیم.'
                : 'My books do not exist to offer easy escapism. They are mirrors designed to help you confront the parts of your psychology you kept in the dark for decades. Real, lasting healing begins when we gain the courage to tell ourselves the raw truth.'}
            </p>
          </div>

          <div className="flex flex-col gap-6 text-stone-600 text-xs sm:text-sm leading-relaxed">
            <p>
              {isRtl ? siteSettings.aboutAuthorFa : siteSettings.aboutAuthor}
            </p>
            <p>
              {isRtl
                ? 'تحصیلات بالینی آنیا در حوزه روان‌شناسی بالینی و خانواده‌درمانی ساختاری به او کمک کرده تا تروماهای جدی مراجعین را به جای زبان پیچیده دانشگاهی، در قالب داستان‌های لمس‌شدنی و روان برای مخاطب عام بنویسد. هر کتاب او علاوه بر لذت کشف رمان‌گونه زندگی شخصیت‌ها، کارگاهی عملی برای ارتقای سلامت روان است.'
                : 'Anya\'s academic grounding in clinical psychotherapy and structural family dynamics enables her to translate heavy, complex clinical diagnoses into fluid, empathetic, and profoundly human stories. In doing so, she makes high-level psycho-education accessible to anyone searching for deeper self-awareness and emotional recovery.'}
            </p>
          </div>

          {/* Credentials / Awards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-200 pt-8 mt-4">
            <div className="flex gap-3 items-start">
              <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-serif text-xs font-bold text-stone-900">{isRtl ? '۱۵+ سال سابقه بالینی' : '15+ Years Clinical Practice'}</span>
                <span className="text-[10px] text-stone-500">{isRtl ? 'حوزه روان‌درمانی روایت‌محور' : 'Narrative therapy research'}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <BookOpen className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-serif text-xs font-bold text-stone-900">{isRtl ? 'آثار تحلیلی موفق' : 'Award-Winning Releases'}</span>
                <span className="text-[10px] text-stone-500">{isRtl ? 'استقبال در ایران و اروپا' : 'Highly acclaimed storytelling'}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Star className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-serif text-xs font-bold text-stone-900">{isRtl ? 'جامعه خوانندگان فعال' : 'Active Global Reader-Base'}</span>
                <span className="text-[10px] text-stone-500">{isRtl ? 'بیش از ۱۰ هزار خواننده' : 'Over 10,000 active readers'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="flex flex-col gap-8 border-t border-stone-200 pt-16">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'سفر حرفه‌ای' : 'CHRONOLOGY OF WORK'}</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">{isRtl ? 'مسیر پژوهشی و نویسندگی آنیا' : 'Professional Timeline'}</h2>
        </div>

        <div className="relative max-w-4xl mx-auto w-full flex flex-col gap-8 mt-6">
          {/* Vertical central bar */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 -translate-x-1/2"></div>

          {milestones.map((ms, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex flex-col sm:flex-row items-start ${isEven ? 'sm:flex-row-reverse' : ''} gap-6 sm:gap-12 w-full`}>
                {/* Central Circle marker */}
                <div className="absolute left-4 sm:left-1/2 top-1 h-3.5 w-3.5 rounded-full bg-amber-500 border-2 border-white -translate-x-1/2 z-10 shadow-sm"></div>

                {/* Left/Right Container */}
                <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:px-6">
                  <div className="bg-white p-5 rounded-xl border border-stone-200/60 shadow-luxury flex flex-col gap-2">
                    <span className="font-serif text-sm font-bold text-amber-600">{ms.year}</span>
                    <h3 className="font-serif text-sm font-bold text-stone-950">{isRtl ? ms.titleFa : ms.title}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">{isRtl ? ms.descFa : ms.desc}</p>
                  </div>
                </div>

                {/* Empty Spacer */}
                <div className="hidden sm:block w-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
