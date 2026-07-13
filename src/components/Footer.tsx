import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Instagram, Send, Heart, MapPin, Phone, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    language,
    categories,
    siteSettings,
    setActivePage
  } = useApp();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const isRtl = language === 'fa';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300 py-16" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Editorial Vision */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-500 text-stone-950 font-serif text-base font-bold">
                Z
              </div>
              <span className="font-serif text-lg font-bold tracking-widest uppercase">ZENDEGI</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400 max-w-xs">
              {isRtl
                ? 'نشر و تحلیل داستان‌های واقعی زندگی با رویکرد روانشناختی؛ تلاش برای ایجاد آگاهی، ترمیم الگوهای دلبستگی و خودشناسی عمیق.'
                : 'Publishing and analyzing real life stories under a rigorous psychological lens. Helping readers build emotional intelligence, mend relational attachment trauma, and discover lasting self-understanding.'}
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href={siteSettings.instagramLink}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-300 transition-all hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500"
                id="footer-insta"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteSettings.telegramLink}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-300 transition-all hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500"
                id="footer-telegram"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Dynamic Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-5">
              {isRtl ? 'دسته‌بندی موضوعی' : 'Key Categories'}
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-stone-400">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActivePage('books');
                      // Scroll to books after state updates
                    }}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {isRtl ? cat.nameFa : cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Studio Info */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-5">
              {isRtl ? 'تماس و پشتیبانی' : 'Contact & Support'}
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{isRtl ? siteSettings.addressFa : siteSettings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <span dir="ltr">{isRtl ? siteSettings.contactPhoneFa : siteSettings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <span>{siteSettings.contactEmail}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HelpCircle className="h-4 w-4 text-amber-500 shrink-0" />
                <span>{isRtl ? 'پاسخ به سوالات متداول (FAQ)' : 'Frequently Asked Questions'}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-5">
              {isRtl ? 'خبرنامه روانشناسی' : 'Psychology Circular'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {isRtl
                ? 'برای دریافت رایگان یادداشت‌های روانشناختی جدید آنیا راد، به خبرنامه بپیوندید.'
                : 'Join our premium, weekly mailing list and receive narrative healing essays, trauma articles, and exclusive book announcements direct to your inbox.'}
            </p>
            {subscribed ? (
              <div className="rounded bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-400">
                {isRtl
                  ? 'سپاسگزاریم! ایمیل شما با موفقیت در خبرنامه ثبت شد.'
                  : 'Thank you! You have successfully subscribed to the circular.'}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRtl ? 'ایمیل شما...' : 'Your email address...'}
                  className="w-full rounded bg-stone-800 border border-stone-700 px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  required
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="rounded bg-amber-500 text-stone-950 px-3.5 py-2 hover:bg-amber-600 transition-colors flex items-center justify-center"
                  id="newsletter-submit-btn"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Zendegi Publishing. {isRtl ? 'تمامی حقوق مادی و معنوی محفوظ است.' : 'All Rights Reserved.'}
          </p>
          <p className="flex items-center gap-1">
            {isRtl ? 'ساخته شده با' : 'Crafted with'}{' '}
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />{' '}
            {isRtl ? 'برای خوانندگان و دوست‌داران شفای روان' : 'for readers seeking deep personal healing'}
          </p>
        </div>
      </div>
    </footer>
  );
};
