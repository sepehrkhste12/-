/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Production SEO & Schema.org Structured Data Utilities

export function updateMetaTags(title: string, description: string, path: string = '') {
  const fullTitle = `${title} | Zendegi Publishing`;
  document.title = fullTitle;

  // Helper to set or create meta
  const setMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      if (isProperty) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMeta('description', description);
  setMeta('og:title', fullTitle, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:url', `https://anyarad.com${path}`, true);
  setMeta('og:image', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', fullTitle);
  setMeta('twitter:description', description);

  // Set canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `https://anyarad.com${path}`);
}

export function injectStructuredData(id: string, schema: object) {
  let script = document.getElementById(id) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema, null, 2);
}

export function generateBookSchema(book: {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  rating: number;
  reviewCount: number;
  price: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    'name': book.title,
    'author': {
      '@type': 'Person',
      'name': book.author
    },
    'description': book.description,
    'image': book.coverUrl,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': book.rating.toString(),
      'reviewCount': book.reviewCount.toString() || '1',
      'bestRating': '5',
      'worstRating': '1'
    },
    'offers': {
      '@type': 'Offer',
      'price': book.price.toString(),
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    }
  };
}

export function generateAuthorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Anya Rad',
    'jobTitle': 'Author & Psychological Therapist',
    'description': 'Anya Rad is an award-winning psychological author, narrative therapist, and human behavior researcher specializing in real-life stories and emotional healing.',
    'url': 'https://anyarad.com',
    'sameAs': [
      'https://instagram.com/anyarad.books',
      'https://t.me/anyarad_books'
    ]
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://anyarad.com${item.url}`
    }))
  };
}
