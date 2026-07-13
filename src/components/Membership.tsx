import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBreadcrumbSchema } from '../utils/seo';
import { Check, Star, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export const Membership: React.FC = () => {
  const {
    language,
    addToCart,
    currentUser,
    setActivePage
  } = useApp();

  const isRtl = language === 'fa';

  useEffect(() => {
    const title = isRtl ? 'عضویت ویژه کلوب خوانندگان | اشتراک طلایی' : 'Gold Club Membership | Premium Subscription';
    const desc = isRtl
      ? 'خرید اشتراک ویژه ماهانه یا سالانه برای مطالعه آنلاین تمام کتاب‌ها، دریافت پی‌دی‌اف رایگان، و دسترسی به تحلیل‌های تخصصی روانشناسی.'
      : 'Unlock the ultimate psychological narrative experience. Subscribe to Monthly or Yearly plans to download all PDFs and read books online.';
    
    updateMetaTags(title, desc, '/membership');

    injectStructuredData('membership-breadcrumbs', generateBreadcrumbSchema([
      { name: isRtl ? 'خانه' : 'Home', url: '/' },
      { name: isRtl ? 'اشتراک ویژه' : 'Membership', url: '/membership' }
    ]));
  }, [language]);

  const plans = [
    {
      id: 'monthly' as const,
      name: 'Monthly Gold Club',
      nameFa: 'اشتراک طلایی ماهانه',
      price: 15.00,
      priceRial: 150000, // Tomans (1,500,000 Rials)
      duration: 'month',
      durationFa: 'ماه',
      description: 'Ideal for reading Anya\'s current work and studying core analyses.',
      descriptionFa: 'مناسب برای خوانندگانی که مایل به مطالعه موقت و دریافت فصل‌های جاری هستند.',
      isPopular: false
    },
    {
      id: 'yearly' as const,
      name: 'Yearly Gold Club',
      nameFa: 'اشتراک طلایی سالانه',
      price: 99.00,
      priceRial: 990000, // Tomans (9,900,000 Rials)
      duration: 'year',
      durationFa: 'سال',
      description: 'The ultimate literary journey. Best value for serious self-growth practitioners.',
      descriptionFa: 'کامل‌ترین و ارزنده‌ترین انتخاب برای دوستداران همیشگی خودشناسی و التیام تروما.',
      isPopular: true
    }
  ];

  const benefits = [
    {
      title: 'Unlimited Online Reading',
      titleFa: 'مطالعه نامحدود کتابخوان مجازی',
      desc: 'Access our advanced virtual reading app across all devices with responsive state synchronization.',
      descFa: 'دسترسی نامحدود و همیشگی به تمام کتاب‌های حال حاضر و آینده در سیستم کتابخوان پیشرفته سایت.'
    },
    {
      title: 'Unlimited PDF Downloads',
      titleFa: 'دانلود پی‌دی‌اف نسخه‌های کامل کتاب‌ها',
      desc: 'Download pristine high-resolution full text PDFs to store on your local computer or mobile device.',
      descFa: 'دریافت مستقیم و رایگان فایل پی‌دی‌اف کامل هر کتاب بلافاصله پس از انتشار، بدون پرداخت هزینه جداگانه.'
    },
    {
      title: 'Exclusive Case Studies',
      titleFa: 'دسترسی به مقالات و فایل‌های صوتی اعضا',
      desc: 'Unlock raw narrative transcripts, somatic exercises, workbooks, and voice clinical guides.',
      descFa: 'دسترسی کامل به وبینارهای ثبت‌شده، مقالات تخصصی اعضا و تحلیل‌های روانشناختی صوتی نویسنده.'
    },
    {
      title: 'Priority releases',
      titleFa: 'رونمایی‌های اولویت‌دار',
      desc: 'Get full book previews 14 days before public release, including members-only virtual launches.',
      descFa: 'امکان پیش‌خوانی و مطالعه آثار جدید آنیا راد دو هفته پیش از انتشار عمومی برای سایر کاربران.'
    }
  ];

  const handlePurchase = (plan: typeof plans[number]) => {
    addToCart({
      membershipPlanId: plan.id,
      title: plan.name,
      titleFa: plan.nameFa,
      price: plan.price,
      priceRial: plan.priceRial,
      type: 'membership'
    });
    setActivePage('cart');
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-16 animate-fade-in" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* 1. Header Hero */}
      <div className="text-center flex flex-col gap-3 max-w-3xl mx-auto border-b border-stone-200 pb-10 w-full">
        <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'کلوب طلایی خودشناسی آنیا راد' : 'THE GOLD MEMBERSHIP CLUB'}</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-900 leading-tight">
          {isRtl ? 'سفر عمیق خودآگاهی را آغاز کنید' : 'Step Into Complete Self-Discovery'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {isRtl
            ? 'اشتراک ویژه طلایی، پنجره‌ای نو به سوی واکاوی الگوهای تکرارشونده زندگی، مهار اضطراب و شفای روابط عاطفی است.'
            : 'Join our exclusive readers circle. Gain unlimited access to the entire digital book catalog, professional analyses, worksheets, and future releases.'}
        </p>
      </div>

      {/* 2. Interactive Plans Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
        {plans.map((plan) => {
          const isActiveUserPlan = currentUser.membershipType === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 bg-white border flex flex-col justify-between gap-8 transition-all duration-500 shadow-luxury hover:shadow-2xl ${
                plan.isPopular 
                  ? 'border-amber-400/80 bg-linear-to-b from-white via-white to-amber-50/10 ring-2 ring-amber-400/40' 
                  : 'border-stone-200'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-[10px] font-bold text-stone-950 uppercase tracking-widest shadow">
                  {isRtl ? 'بهترین ارزش خرید' : 'BEST VALUE'}
                </span>
              )}

              {/* Package Header */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-stone-950">
                    {isRtl ? plan.nameFa : plan.name}
                  </h3>
                  <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    {plan.id === 'yearly' ? <Sparkles className="h-4.5 w-4.5" /> : <Star className="h-4.5 w-4.5" />}
                  </div>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {isRtl ? plan.descriptionFa : plan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-3xl font-extrabold text-stone-900" dir="ltr">
                    {isRtl ? `${plan.priceRial.toLocaleString('fa-IR')}` : `$${plan.price.toFixed(2)}`}
                  </span>
                  <span className="text-xs text-stone-400 font-semibold uppercase">
                    {isRtl ? `تومان / ${plan.durationFa}` : `/ ${plan.duration}`}
                  </span>
                </div>
              </div>

              {/* Core value bullet items */}
              <ul className="flex flex-col gap-3 border-t border-stone-100 pt-6">
                <li className="flex items-start gap-2 text-xs text-stone-600">
                  <Check className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{isRtl ? 'دسترسی کامل به مطالعه آنلاین کل آثار' : 'Unlimited Virtual Book Reading'}</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-stone-600">
                  <Check className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{isRtl ? 'دانلود نامحدود نسخه‌های PDF کامل' : 'Direct Full PDF Downloads'}</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-stone-600">
                  <Check className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{isRtl ? 'قفل‌گشایی مقالات و تحلیل‌های تخصصی اعضا' : 'Exclusive somatic worksheets & guides'}</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-stone-600">
                  <Check className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{isRtl ? 'بدون کارمزد در تراکنش‌ها و لغو عضویت آسان' : 'No transactional fees, cancel anytime'}</span>
                </li>
              </ul>

              {/* CTAs */}
              <button
                onClick={() => handlePurchase(plan)}
                disabled={isActiveUserPlan}
                className={`w-full rounded-lg py-3.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  isActiveUserPlan
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold cursor-default'
                    : plan.isPopular
                    ? 'bg-stone-900 text-white hover:bg-amber-600'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
                id={`btn-select-plan-${plan.id}`}
              >
                {isActiveUserPlan 
                  ? (isRtl ? 'عضویت فعلی شما' : 'Your Active Plan') 
                  : (isRtl ? 'خرید اشتراک و ثبت‌نام' : 'Subscribe Now')}
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. Deep Benefits List */}
      <div className="border-t border-stone-200 pt-16 flex flex-col gap-10">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 text-center">
          {isRtl ? 'توضیحات تکمیلی پیرامون عضویت ویژه طلایی' : 'Comprehensive Member Benefits'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-stone-100 bg-stone-50/50">
              <div className="h-9 w-9 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif text-sm font-bold text-stone-950">{isRtl ? b.titleFa : b.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{isRtl ? b.descFa : b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
