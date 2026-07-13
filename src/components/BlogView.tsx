import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { updateMetaTags, injectStructuredData, generateBreadcrumbSchema } from '../utils/seo';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Layers, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogView: React.FC = () => {
  const {
    language,
    blogPosts,
    selectedPostId,
    setSelectedPostId
  } = useApp();

  const isRtl = language === 'fa';
  
  // Selected Article context
  const activePost = blogPosts.find(p => p.id === selectedPostId);

  useEffect(() => {
    if (activePost) {
      const title = isRtl ? activePost.titleFa : activePost.title;
      const desc = isRtl ? activePost.excerptFa : activePost.excerpt;
      updateMetaTags(title, desc, `/blog/${activePost.id}`);
    } else {
      const title = isRtl ? 'وبلاگ روانشناسی و توسعه فردی | مقالات' : 'Psychology Blog & Narrative Essays';
      const desc = isRtl
        ? 'مطالعه آخرین مقالات تخصصی آنیا راد درباره الگوهای رفتاری، درمان تروما، خودشیفتگی و روابط عاطفی.'
        : 'Explore advanced psycho-education articles on intergenerational trauma, narcissistic abuse, and somatic emotional healing.';
      updateMetaTags(title, desc, '/blog');
    }

    injectStructuredData('blog-breadcrumbs', generateBreadcrumbSchema([
      { name: isRtl ? 'خانه' : 'Home', url: '/' },
      { name: isRtl ? 'وبلاگ روانشناسی' : 'Blog', url: '/blog' }
    ]));
  }, [selectedPostId, language]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-12" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* Back button or detailed header */}
      {activePost ? (
        <div className="flex flex-col gap-8 animate-fade-in">
          <div>
            <button
              onClick={() => setSelectedPostId(null)}
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-amber-600 transition-colors"
              id="blog-btn-back-to-archive"
            >
              {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              <span>{isRtl ? 'بازگشت به آرشیو مقالات' : 'Back to Article Archive'}</span>
            </button>
          </div>

          {/* Article Detailed view */}
          <article className="max-w-3xl mx-auto flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
              <span className="font-bold text-amber-600 uppercase tracking-widest">{isRtl ? activePost.categoryFa : activePost.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {isRtl ? activePost.dateFa : activePost.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {isRtl ? activePost.readTimeFa : activePost.readTime}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 leading-tight">
              {isRtl ? activePost.titleFa : activePost.title}
            </h1>

            <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
              {isRtl ? `توسط ${activePost.authorFa}` : `By ${activePost.author}`}
            </p>

            <div className="rounded-xl overflow-hidden shadow-lg h-[300px] sm:h-[400px] border border-stone-200 bg-stone-50 my-2">
              <img src={activePost.coverUrl} alt={activePost.title} className="h-full w-full object-cover" />
            </div>

            {/* Typography content body */}
            <div className="font-serif text-stone-800 text-sm sm:text-base leading-relaxed flex flex-col gap-6 border-t border-stone-100 pt-6">
              <p className="whitespace-pre-line leading-[1.85]">
                {isRtl ? activePost.contentFa : activePost.content}
              </p>
            </div>
          </article>
        </div>
      ) : (
        <div className="flex flex-col gap-10 animate-fade-in">
          {/* Header Banner */}
          <div className="border-b border-stone-200 pb-6 flex flex-col gap-3">
            <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">{isRtl ? 'دانستنی‌ها و یادداشت‌های بالینی' : 'PSYCHO-EDUCATION FEED'}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
              {isRtl ? 'وبلاگ و یادداشت‌های روانشناسی' : 'The Psychology & Healing Blog'}
            </h1>
            <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
              {isRtl
                ? 'آخرین یادداشت‌های درمانی آنیا راد پیرامون غلبه بر اضطراب، بهبود روابط، صمیمیت عاطفی و التیام تروما.'
                : 'Stay grounded. Browse professional, weekly essays by Anya Rad detailing boundary-setting frameworks, narcissism recovery, and somatic mind-body integration.'}
            </p>
          </div>

          {/* Grid Archive lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="group flex flex-col sm:flex-row gap-6 p-5 rounded-2xl bg-white border border-stone-200/60 shadow-luxury shadow-luxury-hover transition-all duration-300 cursor-pointer"
              >
                <div className="shrink-0 w-full sm:w-44 h-36 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                  <img src={post.coverUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>

                <div className="flex flex-col justify-between py-1 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                      {isRtl ? post.categoryFa : post.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-stone-950 leading-snug group-hover:text-amber-600 transition-colors">
                      {isRtl ? post.titleFa : post.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {isRtl ? post.excerptFa : post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-stone-400 mt-auto">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {isRtl ? post.dateFa : post.date}</span>
                    <span>•</span>
                    <span>{isRtl ? post.readTimeFa : post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
