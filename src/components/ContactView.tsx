import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBreadcrumbSchema } from '../utils/seo';
import { Mail, Phone, Clock, MapPin, Send, MessageSquare, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { language, siteSettings } = useApp();
  const isRtl = language === 'fa';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const title = isRtl ? 'تماس با ما | انتشارات آنیا راد' : 'Contact Us | Anya Rad Publishing';
    const desc = isRtl
      ? 'راه‌های ارتباطی با آنیا راد، آدرس دفتر ولیعصر، شماره تلفن پشتیبانی و فرم تماس مستقیم با نویسنده.'
      : 'Connect with Anya Rad. Submit messages, view clinical workspace hours, get phone support, or locate the Tehran headquarters.';
    
    updateMetaTags(title, desc, '/contact');

    injectStructuredData('contact-breadcrumbs', generateBreadcrumbSchema([
      { name: isRtl ? 'خانه' : 'Home', url: '/' },
      { name: isRtl ? 'تماس با ما' : 'Contact', url: '/contact' }
    ]));
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatusMsg(
      isRtl
        ? 'پیام شما با موفقیت ارسال شد! در اسرع وقت از طریق ایمیل پاسخ داده خواهد شد.'
        : 'Message sent successfully! We will get back to you via email shortly.'
    );

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setStatusMsg('');
    }, 6000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-12 animate-fade-in" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6 flex flex-col gap-3">
        <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'راه‌های ارتباطی مستقیم' : 'CHANNELS OF SUPPORT'}</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
          {isRtl ? 'ارتباط با ما و دفتر نشر' : 'Connect with the Studio'}
        </h1>
        <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
          {isRtl
            ? 'سوالی درباره عضویت دارید؟ یا مایلید بازخورد شخصی خود را با آنیا در میان بگذارید؟ پیام خود را برای ما ارسال کنید.'
            : 'Whether you are seeking custom order support, inquiring about membership benefits, or sharing raw feedback, we are here.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact info grid (Col 1) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl border border-stone-200/60 bg-white p-6 sm:p-8 shadow-luxury flex flex-col gap-6">
            <h3 className="font-serif text-sm font-bold text-stone-950 border-b border-stone-100 pb-3">{isRtl ? 'مشخصات دفتر و پشتیبانی' : 'Office Details'}</h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-start text-xs text-stone-600">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-stone-900">{isRtl ? 'آدرس حضوری:' : 'Office Location:'}</span>
                  <span>{isRtl ? siteSettings.addressFa : siteSettings.address}</span>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs text-stone-600">
                <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-stone-900">{isRtl ? 'تلفن تماس:' : 'Phone Support:'}</span>
                  <span dir="ltr">{isRtl ? siteSettings.contactPhoneFa : siteSettings.contactPhone}</span>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs text-stone-600">
                <Mail className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-stone-900">{isRtl ? 'ایمیل:' : 'Email Channels:'}</span>
                  <span>{siteSettings.contactEmail}</span>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs text-stone-600">
                <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-stone-900">{isRtl ? 'ساعات کاری:' : 'Business Hours:'}</span>
                  <span>{isRtl ? siteSettings.workingHoursFa : siteSettings.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BEAUTIFULLY CUSTOMIZED PERSIA VECTOR MAP (TEHRAN VALI-E-ASR) */}
          <div className="rounded-2xl border border-stone-200/60 bg-white p-4 shadow-luxury flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">{isRtl ? 'موقعیت ما روی نقشه (محدوده ولیعصر)' : 'Clinical Space Location (Tehran Center)'}</span>
            <div className="relative rounded-xl overflow-hidden bg-stone-50 border border-stone-200 aspect-video flex flex-col items-center justify-center p-4">
              
              {/* Abstract Map Grid Lines */}
              <div className="absolute inset-0 border-b border-stone-200/50 scale-y-75 translate-y-2"></div>
              <div className="absolute inset-0 border-r border-stone-200/50 scale-x-75 translate-x-4"></div>
              <div className="absolute inset-0 border-b border-stone-200/50 scale-y-50 -translate-y-10"></div>
              <div className="absolute inset-0 border-r border-stone-200/50 scale-x-50 -translate-x-12"></div>
              
              {/* Street vectors label */}
              <div className="absolute top-1/2 left-4 right-4 h-6 bg-stone-100 border-y border-stone-200/80 -translate-y-1/2 flex items-center px-4">
                <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{isRtl ? 'بلوار ولیعصر' : 'Vali-e-Asr Boulevard'}</span>
              </div>
              <div className="absolute left-1/3 top-0 bottom-0 w-6 bg-stone-100 border-x border-stone-200/80 flex justify-center items-center">
                <span className="text-[8px] text-stone-400 font-bold rotate-90 uppercase tracking-widest whitespace-nowrap">{isRtl ? 'خیابان یاسمن' : 'Yasaman Street'}</span>
              </div>

              {/* Office glowing Gold pin */}
              <div className="relative z-10 flex flex-col items-center gap-1.5 translate-x-2 -translate-y-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-amber-500 scale-225 animate-ping opacity-30"></div>
                  <div className="relative h-4 w-4 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                  </div>
                </div>
                <span className="rounded bg-stone-900 text-white text-[8px] font-bold py-1 px-2 border border-stone-800 shadow">
                  {isRtl ? 'دفتر نشر آثار آنیا راد' : 'Anya Rad Publishing Studio'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Message Form (Col 2) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-stone-200/60 bg-white p-6 sm:p-8 shadow-luxury">
            <h3 className="font-serif text-sm font-bold text-stone-950 border-b border-stone-100 pb-3 mb-6">
              {isRtl ? 'ارسال پیام مستقیم به نویسنده' : 'Submit Private Message'}
            </h3>

            {statusMsg && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-4 mb-6 text-xs text-emerald-800">
                {statusMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'نام و نام خانوادگی:' : 'Your Full Name:'}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRtl ? 'مثال: محمد امینی' : 'e.g. Michael Smith'}
                    className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-950 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'نشانی ایمیل:' : 'Your Email Address:'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-950 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'موضوع پیام:' : 'Message Subject:'}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isRtl ? 'مثال: سوال پیرامون عضویت ویژه' : 'e.g. Question regarding monthly plans'}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-950 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{isRtl ? 'متن پیام شما:' : 'Write Message Details:'}</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isRtl ? 'پیام خود را اینجا بنویسید...' : 'Type your message details here...'}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-950 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="rounded-lg bg-stone-900 hover:bg-amber-600 text-white font-semibold py-3 px-6 text-xs uppercase tracking-wider w-fit flex items-center gap-2 transition-colors"
                id="contact-form-submit"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isRtl ? 'ارسال پیام' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
