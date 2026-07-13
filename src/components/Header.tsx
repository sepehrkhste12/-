import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Menu, X, User, ShieldAlert, Globe, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    language,
    toggleLanguage,
    activePage,
    setActivePage,
    cart,
    currentUser
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isRtl = language === 'fa';

  const menuItems = [
    { id: 'home', name: 'Home', nameFa: 'صفحه اصلی' },
    { id: 'about', name: 'About Author', nameFa: 'درباره نویسنده' },
    { id: 'books', name: 'Books', nameFa: 'کتاب‌ها' },
    { id: 'membership', name: 'Membership', nameFa: 'عضویت ویژه' },
    { id: 'gallery', name: 'Gallery', nameFa: 'گالری تصاویر' },
    { id: 'reviews', name: 'Reviews', nameFa: 'نظرات خوانندگان' },
    { id: 'blog', name: 'Blog', nameFa: 'وبلاگ روانشناسی' },
    { id: 'contact', name: 'Contact', nameFa: 'تماس با ما' }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        {/* Brand Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 text-stone-900 group"
          id="btn-logo"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-stone-950 text-white transition-all group-hover:bg-amber-600">
            <span className="font-serif text-lg font-bold tracking-widest">Z</span>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-stone-950 ring-1 ring-white">
              <Sparkles className="h-2 w-2" />
            </span>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-serif text-lg font-bold tracking-wide uppercase">ZENDEGI</span>
            <span className="text-[9px] tracking-widest text-stone-500 uppercase">{isRtl ? 'نشر آثار روانشناختی' : 'Psychological Publishing'}</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-xs tracking-wider uppercase font-medium transition-all py-1 ${
                  isActive ? 'text-amber-600 font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
                id={`nav-${item.id}`}
              >
                {isRtl ? item.nameFa : item.name}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-amber-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all hover:bg-stone-100 hover:text-stone-900"
            title={isRtl ? 'English Website' : 'وبسایت فارسی'}
            id="btn-lang-switcher"
          >
            <Globe className="h-3.5 w-3.5 text-stone-500" />
            <span className="uppercase">{language === 'fa' ? 'EN' : 'FA'}</span>
          </button>

          {/* Shopping Cart Indicator */}
          <button
            onClick={() => setActivePage('cart')}
            className="relative rounded-full border border-stone-200 bg-white p-2 text-stone-700 transition-all hover:bg-stone-50 hover:text-stone-900"
            id="btn-cart-indicator"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-stone-950 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Dashboard Link */}
          <button
            onClick={() => setActivePage('dashboard')}
            className={`flex items-center gap-2 rounded-full border border-stone-200 bg-white p-1.5 px-3 transition-all hover:bg-stone-50 ${
              activePage === 'dashboard' ? 'ring-2 ring-amber-500' : ''
            }`}
            id="btn-dashboard"
          >
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-stone-100">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <User className="h-4 w-4 text-stone-500 m-1" />
              )}
              {currentUser.membershipType !== 'none' && (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-amber-500 ring-1 ring-white" />
              )}
            </div>
            <span className="hidden lg:inline text-xs font-medium text-stone-700">
              {currentUser.membershipType !== 'none' && (
                <Star className="inline h-3 w-3 text-amber-500 fill-amber-500 mr-1 animate-pulse" />
              )}
              {currentUser.name}
            </span>
          </button>

          {/* Admin Dashboard Entry Point */}
          <button
            onClick={() => setActivePage('admin')}
            className={`flex items-center gap-1.5 rounded-full bg-stone-950 text-white p-2 px-3.5 text-xs font-semibold uppercase tracking-wider transition-all hover:bg-amber-600 ${
              activePage === 'admin' ? 'bg-amber-600' : ''
            }`}
            id="btn-admin-portal"
            title={isRtl ? 'پنل مدیریت نویسنده' : 'Author Admin Panel'}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isRtl ? 'پنل ادمین' : 'Admin'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full border border-stone-200 bg-stone-50 p-2 text-stone-700 hover:bg-stone-100 md:hidden"
            id="btn-mobile-menu"
          >
            {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-stone-200 bg-stone-50 md:hidden"
            style={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            <div className="flex flex-col gap-1 p-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.id
                      ? 'bg-amber-100/50 text-amber-600 font-bold'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {isRtl ? item.nameFa : item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
