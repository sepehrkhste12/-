import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBreadcrumbSchema } from '../utils/seo';
import { Camera, Image, Play, Film, X, Layers, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GalleryView: React.FC = () => {
  const { language, gallery, addGalleryItem, deleteGalleryItem } = useApp();
  const isRtl = language === 'fa';

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    const title = isRtl ? 'گالری تصاویر و رویدادها | آنیا راد' : 'Gallery & Media | Anya Rad';
    const desc = isRtl
      ? 'مشاهده تصاویر رونمایی کتاب‌ها، کارگاه‌های تحلیل روانشناسی، عکس‌های نویسنده و پشت صحنه ویراستاری آثار.'
      : 'Explore high-resolution media highlights. Browse book covers, author portraits, clinical workshops, and behind-the-scenes writing events.';
    
    updateMetaTags(title, desc, '/gallery');

    injectStructuredData('gallery-breadcrumbs', generateBreadcrumbSchema([
      { name: isRtl ? 'خانه' : 'Home', url: '/' },
      { name: isRtl ? 'گالری تصاویر' : 'Gallery', url: '/gallery' }
    ]));
  }, [language]);

  const categories = [
    { slug: 'all', name: 'All Media', nameFa: 'همه تصاویر' },
    { slug: 'covers', name: 'Book Covers', nameFa: 'طراحی جلد' },
    { slug: 'author', name: 'Author Portraits', nameFa: 'تصاویر نویسنده' },
    { slug: 'events', name: 'Clinical Events', nameFa: 'کارگاه‌ها و مراسم' },
    { slug: 'bts', name: 'Behind the Scenes', nameFa: 'پشت صحنه' }
  ];

  const filteredGallery = gallery.filter(item => activeCategory === 'all' || item.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-12 animate-fade-in" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6 flex flex-col gap-3">
        <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'تصاویر و قاب‌های مستند' : 'LITERARY PORTFOLIOS'}</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
          {isRtl ? 'گالری رویدادها و نشست‌های ادبی' : 'Gallery & Studio Highlights'}
        </h1>
        <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
          {isRtl
            ? 'تصاویری مستند از جلسات مشاوره گروهی، همایش‌های تروما، مراحل تولید و ویراستاری کتاب‌ها.'
            : 'Explore visual moments capturing the author\'s lectures, structural workshops, book launch gatherings, and the raw work of editing.'}
        </p>
      </div>

      {/* Categories Toolbar filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-stone-500 flex items-center gap-1.5 mr-2">
          <Layers className="h-4 w-4 text-stone-400" />
          <span>{isRtl ? 'تفکیک گالری براساس:' : 'Filter Gallery:'}</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${
              activeCategory === cat.slug
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900'
            }`}
            id={`gallery-filter-${cat.slug}`}
          >
            {isRtl ? cat.nameFa : cat.name}
          </button>
        ))}
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden border border-stone-200/60 bg-white aspect-[4/3] cursor-pointer shadow-luxury shadow-luxury-hover flex flex-col justify-end"
            onClick={() => setSelectedMediaUrl(item.url)}
          >
            <img
              src={item.url}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Visual overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col text-white">
                  <span className="text-xs font-bold font-serif leading-tight">{isRtl ? item.titleFa : item.title}</span>
                  <span className="text-[9px] text-amber-400 uppercase tracking-widest font-semibold mt-1">
                    {categories.find(c => c.slug === item.category)?.name || item.category}
                  </span>
                </div>
                <div className="rounded-full bg-white/20 backdrop-blur-xs p-1.5 text-white">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Default Category Label */}
            <div className="absolute top-3 left-3 rounded bg-stone-900/80 px-2 py-0.5 text-[8px] font-bold text-amber-400 uppercase tracking-widest backdrop-blur-xs flex items-center gap-1">
              <Camera className="h-3 w-3" />
              <span>{isRtl ? categories.find(c => c.slug === item.category)?.nameFa : categories.find(c => c.slug === item.category)?.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Elegant lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedMediaUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 p-4"
            onClick={() => setSelectedMediaUrl(null)}
          >
            <button
              onClick={() => setSelectedMediaUrl(null)}
              className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              id="close-lightbox-btn"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-lg bg-white/5 shadow-2xl p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMediaUrl}
                alt="Zoomed Media"
                className="max-w-full max-h-[80vh] object-contain rounded"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
