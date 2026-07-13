import { Book, Category, BlogPost, GalleryItem, SiteSettings, Review } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'real-life',
    name: 'Real Life Stories',
    nameFa: 'داستان‌های واقعی زندگی',
    slug: 'real-life',
    description: 'Deep, authentic narratives of real people and their psychological journeys.',
    descriptionFa: 'روایت‌های عمیق و واقعی از زندگی انسان‌ها و فراز و نشیب‌های روانی آنها.',
    iconName: 'BookOpen'
  },
  {
    id: 'psychology',
    name: 'Psychology',
    nameFa: 'روانشناسی کاربردی',
    slug: 'psychology',
    description: 'Practical analysis of human behavior, mental processes, and coping systems.',
    descriptionFa: 'تحلیل‌های کاربردی از رفتارها، فرآیندهای ذهنی و سیستم‌های مقابله‌ای انسان.',
    iconName: 'Brain'
  },
  {
    id: 'self-dev',
    name: 'Self Development',
    nameFa: 'توسعه فردی',
    slug: 'self-dev',
    description: 'Transformative guides to unleash potential and master self-awareness.',
    descriptionFa: 'راهنماهای تحول‌آفرین برای شکوفایی پتانسیل‌ها و خودآگاهی عمیق.',
    iconName: 'Sparkles'
  },
  {
    id: 'relationships',
    name: 'Relationships',
    nameFa: 'روابط بین فردی',
    slug: 'relationships',
    description: 'Understanding boundaries, secure attachments, and empathetic communication.',
    descriptionFa: 'درک مرزها، صمیمیت، دلبستگی ایمن و ارتباطات همدلانه.',
    iconName: 'Heart'
  },
  {
    id: 'trauma-healing',
    name: 'Trauma Healing',
    nameFa: 'التیام تروما',
    slug: 'trauma-healing',
    description: 'Rebuilding safety and reprocessing painful past experiences.',
    descriptionFa: 'بازسازی امنیت درونی و پردازش تجربیات دردناک گذشته.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'personal-growth',
    name: 'Personal Growth',
    nameFa: 'رشد شخصی',
    slug: 'personal-growth',
    description: 'Navigating life crises and finding deeper meaning and alignment.',
    descriptionFa: 'عبور از بحران‌های زندگی و یافتن معنا و جهت‌گیری عمیق درونی.',
    iconName: 'Compass'
  },
  {
    id: 'family',
    name: 'Family',
    nameFa: 'خانواده و فرزندپروری',
    slug: 'family',
    description: 'Healing intergenerational wounds and nurturing secure parenting systems.',
    descriptionFa: 'التیام زخم‌های بین‌نسلی و پرورش سیستم‌های والدگری ایمن.',
    iconName: 'Users'
  },
  {
    id: 'emotional-healing',
    name: 'Emotional Healing',
    nameFa: 'شفای درون',
    slug: 'emotional-healing',
    description: 'Reconnecting with suppressed emotions and cultivating self-compassion.',
    descriptionFa: 'اتصال دوباره با احساسات سرکوب‌شده و پرورش شفقت به خود.',
    iconName: 'Activity'
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'echo-of-silence',
    title: 'Echo of Silence: Healing Intergenerational Trauma',
    titleFa: 'پژواک یک سکوت: التیام زخم‌های بین‌نسلی',
    author: 'Anya Rad',
    authorFa: 'آنیا راد',
    description: 'The real-life journey of a woman reconstructing her psychological world after decades of silence, incorporating modern trauma analysis.',
    descriptionFa: 'روایت واقعی زنی که پس از دهه‌ها سکوت، دنیای روانی خود را بازسازی می‌کند. این کتاب همراه با تحلیل‌های روانشناختی ترومای بین‌نسلی است.',
    fullDescription: 'Based on true events, Echo of Silence follows Sara, a brilliant researcher who is paralyzed by chronic anxiety. Through therapeutic reprocessing and uncovering family secrets, she learns how her grandmother\'s unprocessed grief shaped her own mother\'s emotional unavailability, and ultimately, her own struggles. Each chapter is paired with a deep psychological analysis explaining trauma responses, somatic healing, and attachment styles.',
    fullDescriptionFa: 'بر اساس رویدادهای واقعی، کتاب «پژواک یک سکوت» داستان زندگی «سارا» را روایت می‌کند؛ پژوهشگری برجسته که به دلیل اضطراب مزمن دچار فلج عاطفی شده است. او از طریق بازپردازش درمانی و کشف رازهای خانوادگی، متوجه می‌شود چگونه سوگ پردازش‌نشده مادربزرگش، ناخودآگاه ساختار روانی مادرش و در نهایت چالش‌های امروزی خودش را شکل داده است. هر بخش کتاب با تحلیل‌های روانشناختی عمیق درباره پاسخ‌های تروما، خودآگاهی بدنی و سبک‌های دلبستگی همراه شده است.',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    category: 'trauma-healing',
    rating: 4.9,
    reviewCount: 42,
    price: 12.99,
    priceRial: 129000, // In Tomans (1,290,000 Rials)
    isFeatured: true,
    isPopular: true,
    isNew: false,
    pages: 284,
    readingTime: '7 hours',
    readingTimeFa: '۷ ساعت',
    publicationDate: 'May 2025',
    publicationDateFa: 'اردیبهشت ۱۴۰۴',
    tags: ['Trauma', 'True Story', 'Family Systems', 'Therapy'],
    tagsFa: ['تروما', 'داستان واقعی', 'سیستم‌های خانواده', 'روان‌درمانی'],
    samplePdfUrl: 'sample-echo.pdf',
    fullPdfUrl: 'full-echo.pdf',
    topics: ['Somatic Reprocessing', 'Anxious Attachment', 'Intergenerational Transmission of Grief', 'Inner Child Work'],
    topicsFa: ['بازپردازش بدنی و احساسی', 'سبک دلبستگی اضطرابی', 'انتقال بین‌نسلی سوگ', 'شفای کودک درون']
  },
  {
    id: 'autumn-alley',
    title: 'Autumn Alley: Reclaiming Boundaries after Narcissistic Abuse',
    titleFa: 'کوچه پاییز: بازپس‌گیری مرزها پس از رابطه سمی',
    author: 'Anya Rad',
    authorFa: 'آنیا راد',
    description: 'An intimate, true account of breaking free from trauma bonds and reclaiming agency, containing a deep guide on boundaries.',
    descriptionFa: 'روایتی صمیمی و واقعی از رهایی از پیوندهای ترومایی و بازپس‌گیری هویت مستقل خویش، همراه با راهنمای کاربردی تعیین مرزها.',
    fullDescription: 'Autumn Alley details the complex relationship between Kian and a highly manipulative partner. It reveals how gaslighting slowly erodes self-trust, leaving Kian isolated. The book charts the slow, painful, yet beautiful recovery of boundaries, the psychology of empathy, and how highly empathetic people can protect their energy. Complete with clinical notes on narcissism and codependency.',
    fullDescriptionFa: '«کوچه پاییز» جزئیات یک رابطه پیچیده و سمی را به تصویر می‌کشد. این کتاب نشان می‌دهد چگونه سوءاستفاده روانی به آرامی اعتمادبه‌نفس فرد را از بین می‌برد و او را منزوی می‌سازد. کتاب، مسیر کند، دردناک و در عین حال زیبای بازیابی مرزها، روانشناسی همدلی و نحوه محافظت از انرژی روانی را ترسیم می‌کند. این اثر با یادداشت‌های بالینی درباره خودشیفتگی و وابستگی متقابل همراه است.',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    category: 'relationships',
    rating: 4.8,
    reviewCount: 35,
    price: 14.50,
    priceRial: 145000, // Tomans
    isFeatured: true,
    isPopular: false,
    isNew: true,
    pages: 310,
    readingTime: '8.5 hours',
    readingTimeFa: '۸.۵ ساعت',
    publicationDate: 'November 2025',
    publicationDateFa: 'آبان ۱۴۰۴',
    tags: ['Relationships', 'Boundaries', 'Gaslighting', 'Recovery'],
    tagsFa: ['روابط سمی', 'تعیین مرزها', 'دستکاری روانی', 'بهبودی عاطفی'],
    samplePdfUrl: 'sample-autumn.pdf',
    fullPdfUrl: 'full-autumn.pdf',
    topics: ['Gaslighting Patterns', 'Codependency Dynamics', 'Rebuilding Trust', 'Empathetic Self-Defense'],
    topicsFa: ['الگوهای دستکاری روانی', 'پویایی وابستگی متقابل', 'بازسازی اعتماد به خود', 'دفاع شخصی همدلانه']
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'trauma-somatic',
    title: 'How the Body Keeps the Score: Somatic Approaches to Emotional Healing',
    titleFa: 'چگونه بدن خاطرات را نگه می‌دارد: رویکردهای بدنی به شفای عاطفی',
    excerpt: 'Trauma isn\'t just in our heads; it lives in our muscles and nervous system. Discover why talking isn\'t always enough.',
    excerptFa: 'تروما فقط در ذهن ما نیست؛ در عضلات و سیستم عصبی ما زندگی می‌کند. کشف کنید چرا صحبت کردن همیشه کافی نیست.',
    content: 'Many people spend years in traditional talk therapy only to find that their anxiety or depression remains unchanged. This is because emotional wounds leave deep imprints on our physical bodies. When we experience severe stress, our nervous system enters fight, flight, or freeze. If this energy is not released, it gets stored somatically. Somatic experiencing, deep breathwork, and progressive muscle relaxation are powerful ways to release this trapped energy...',
    contentFa: 'بسیاری از مردم سال‌ها در درمان‌های کلامی سنتی شرکت می‌کنند اما متوجه می‌شوند که اضطراب یا افسردگی آن‌ها بدون تغییر باقی مانده است. دلیل آن این است که زخم‌های عاطفی ردی عمیق در بدن فیزیکی ما به جای می‌گذارند. هنگامی که ما استرس شدیدی را تجربه می‌کنیم، سیستم عصبی ما وارد حالت جنگ، گریز یا انجماد می‌شود. اگر این انرژی آزاد نشود، به صورت بدنی ذخیره می‌شود. درمان‌های بدنی، تنفس عمیق و یوگا ابزارهای فوق‌العاده‌ای برای شفای این زخم‌ها هستند...',
    author: 'Anya Rad',
    authorFa: 'آنیا راد',
    coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    date: 'June 15, 2026',
    dateFa: '۲۵ خرداد ۱۴۰۵',
    category: 'Psychology',
    categoryFa: 'روانشناسی کاربردی',
    readTime: '5 min read',
    readTimeFa: '۵ دقیقه مطالعه'
  },
  {
    id: 'narcissist-gaslighting',
    title: 'Deconstructing Gaslighting: Spotting the Subtle Signs in Daily Life',
    titleFa: 'واکاوی گسلایتینگ: نشانه‌های ظریف دستکاری روانی در زندگی روزمره',
    excerpt: 'Gaslighting isn\'t always loud or obvious. Learn to recognize the quiet comments that slowly erode your confidence.',
    excerptFa: 'دستکاری روانی همیشه با صدای بلند یا بدیهی نیست. یاد بگیرید جملات آرامی را که به تدریج اعتمادبه‌نفس شما را نابود می‌کنند بشناسید.',
    content: 'Gaslighting is a form of psychological manipulation where a person seeks to sow seeds of doubt in a targeted individual or in members of a targeted group, making them question their own memory, perception, and sanity. Common phrases like "You are too sensitive," "That never happened," or "I only did it because I love you" are classic signs. Protecting yourself starts with naming the behavior and keeping a written record of events to anchor your reality.',
    contentFa: 'دستکاری روانی (گسلایتینگ) نوعی دستکاری روانشناختی است که در آن فرد تلاش می‌کند بذر تردید را در دل مخاطب بکارد تا او حافظه، ادراک و سلامت روان خود را زیر سوال ببرد. عبارات متداولی مانند «تو خیلی حساسی»، «هیچ‌وقت چنین اتفاقی نیفتاد» یا «من فقط چون دوستت دارم این کار را کردم» نمونه‌های کلاسیک هستند. محافظت از خود با نام‌گذاری این رفتار و مستند کردن وقایع آغاز می‌شود...',
    author: 'Anya Rad',
    authorFa: 'آنیا راد',
    coverUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600',
    date: 'April 2, 2026',
    dateFa: '۱۴ فروردین ۱۴۰۵',
    category: 'Relationships',
    categoryFa: 'روابط بین فردی',
    readTime: '6 min read',
    readTimeFa: '۶ دقیقه مطالعه'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Echo of Silence Cover Design',
    titleFa: 'طراحی جلد پژواک یک سکوت',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    category: 'covers'
  },
  {
    id: 'g2',
    title: 'Author Anya Rad at Book Launch',
    titleFa: 'نویسنده آنیا راد در مراسم رونمایی کتاب',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    category: 'author'
  },
  {
    id: 'g3',
    title: 'Psychological Analysis Workshop',
    titleFa: 'کارگاه تحلیل روانشناختی تروما',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
    category: 'events'
  },
  {
    id: 'g4',
    title: 'Autumn Alley Book Signing',
    titleFa: 'جلسه امضای کتاب کوچه پاییز',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600',
    category: 'events'
  },
  {
    id: 'g5',
    title: 'Behind the Scenes: Editing Echo of Silence',
    titleFa: 'پشت صحنه: ویراستاری کتاب پژواک یک سکوت',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    category: 'bts'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  heroTitle: 'True Stories Told with Deep Psychological Insight',
  heroTitleFa: 'روایت واقعی زندگی انسان‌ها با واکاوی عمیق روانشناختی',
  heroSubtitle: 'Step into the minds and hearts of real people who navigated traumatic pasts, toxic relationships, and emotional struggles, written to foster healing and self-discovery.',
  heroSubtitleFa: 'قدم بگذارید به دنیای درونی انسان‌هایی که از تروماهای گذشته، روابط سمی و بحران‌های عاطفی عبور کرده‌اند؛ کتاب‌هایی برای شفای درون، شناخت عمیق خویشتن و توسعه فردی.',
  aboutAuthor: 'Anya Rad is an award-winning psychological author, narrative therapist, and human behavior researcher. Having spent over 15 years listening to lived experiences, Anya synthesizes emotional true stories with clinical observations. Her writing helps thousands of readers bridge the gap between their intellect and their emotions, providing practical guidance on setting boundaries, healing childhood wounds, and achieving lasting peace.',
  aboutAuthorFa: 'آنیا راد، نویسنده و پژوهشگر حوزه روانشناسی روایت‌محور و تحلیل‌گر رفتاری است. او با بیش از ۱۵ سال تجربه در بررسی تجربیات زیسته و روایت‌های بالینی، داستان‌های واقعی زندگی را با آموزه‌های روانشناختی ادغام می‌کند. آثار او به هزاران مخاطب کمک کرده تا میان ذهن و قلب خود پیوند برقرار کنند، مرزهای عاطفی سالمی بسازند و بر زخم‌های تروماهای دوران کودکی غلبه کنند.',
  authorName: 'Anya Rad',
  authorNameFa: 'آنیا راد',
  contactEmail: 'contact@anyarad.com',
  contactPhone: '+98 21 8888 7777',
  contactPhoneFa: '۰۲۱-۸۸۸۸۷۷۷۷',
  workingHours: 'Saturday to Thursday, 9 AM - 6 PM',
  workingHoursFa: 'شنبه تا پنجشنبه، ساعت ۹ صبح تا ۶ عصر',
  telegramLink: 'https://t.me/anyarad_books',
  instagramLink: 'https://instagram.com/anyarad.books',
  address: 'No. 42, Yasaman St., Vali-e-Asr Ave., Tehran, Iran',
  addressFa: 'تهران، خیابان ولیعصر، خیابان یاسمن، پلاک ۴۲'
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    bookId: 'echo-of-silence',
    userName: 'Zahra Ahmadi',
    rating: 5,
    comment: 'این کتاب چشمان من را روی گذشته باز کرد. همیشه فکر میکردم اضطرابم به خاطر مسائل کاری است، اما سارا با روایت روانشناختی خانواده‌اش به من فهماند که چگونه زخم‌های مادرم به من منتقل شده است. فصل خودآگاهی بدنی شاهکار بود.',
    likes: 18,
    date: 'July 5, 2026',
    dateFa: '۱۴ تیر ۱۴۰۵',
    verified: true,
    approved: true
  },
  {
    id: 'rev-2',
    bookId: 'echo-of-silence',
    userName: 'Mohammad Rezaei',
    rating: 5,
    comment: 'The clinical notes at the end of each chapter are extremely valuable. It is rare to find a book that is both an emotional page-turner and a highly educational psychology text.',
    likes: 12,
    date: 'June 28, 2026',
    dateFa: '۷ تیر ۱۴۰۵',
    verified: true,
    approved: true
  },
  {
    id: 'rev-3',
    bookId: 'autumn-alley',
    userName: 'Sina Moradi',
    rating: 5,
    comment: 'کوچه پاییز راه نجات من بود. بعد از سال‌ها بودن در یک رابطه سمی با پارتنر خودشیفته، احساس پوچی میکردم. با خواندن فصل مرزها، دوباره هویت مستقل خودم را بازپس گرفتم. خواندن این کتاب را به همه پیشنهاد میکنم.',
    likes: 22,
    date: 'July 1, 2026',
    dateFa: '۱۰ تیر ۱۴۰۵',
    verified: true,
    approved: true
  }
];

// Rich interactive sample content for virtual reader preview!
export const SAMPLES_TEXTS: Record<string, { title: string; pages: string[] }> = {
  'echo-of-silence': {
    title: 'Echo of Silence (Sample Pages)',
    pages: [
      `فصل اول: هیاهوی پنهان

خانه پدری همیشه بوی نم و باغچه قدیمی می‌داد، اما زیر این ظاهر آرام، سنگینی سکوتی مرموز آزاردهنده بود. سارا روی مبل مخمل زرشکی نشسته بود و به دستان لرزان مادرش خیره شده بود. مادر هیچ‌گاه درباره گذشته صحبت نمی‌کرد. گویی هر خاطره‌ای، جعبه پاندورایی بود که باز شدنش طوفان به پا می‌کرد.

سارا پرسید: «مادر، چرا مامان‌بزرگ هیچ‌وقت مرا در آغوش نمی‌گرفت؟ چرا همیشه چشمانش پر از غم بود؟»
مادر سرش را برگرداند، به پنجره خیره شد و گفت: «بعضی چیزها باید زیر خاک بمانند، سارا. دستکاری گذشته فقط درد جدید می‌آفریند.»

[یادداشت روانشناختی نویسنده]:
سکوت در خانواده‌های تروماتیزه شده، صرفاً یک عدم گفتگو نیست؛ بلکه یک ساختار دفاعی فعال است. این سکوت برای محافظت از اعضا در برابر دردهای غیرقابل تحمل ایجاد می‌شود، اما متاسفانه همین سکوت، خود به عاملی برای انتقال ناخودآگاه اضطراب به نسل بعدی تبدیل می‌گردد. کودکان عدم ارتباط عاطفی را حس می‌کنند و آن را به عنوان "ناامنی دنیا" تعبیر می‌نمایند.`,
      `صفحه ۲: فاش شدن رازها

سالیان سال، سارا با یک صدای همیشگی در سرش زندگی می‌کرد: «تو به اندازه کافی خوب نیستی. تو باید کامل باشی تا دوستت داشته باشند.» این کمال‌گرایی افراطی او را تا مرز فرسودگی شغلی کشانده بود.

در جریان یکی از جلسات روان‌درمانی بدنی (Somatic Experiencing)، وقتی درمانگر از او خواست تا انقباض شدید گلویش را حس کند، ناگهان تصویری از کودکی‌اش زنده شد. روزی که گریه می‌کرد و مادرش با وحشت دستش را روی دهان او گذاشت و گفت: «هیس! اگر گریه کنی بابا عصبانی می‌شود.» 
این انقباض عضلانی، همان سکوت سرکوب‌شده‌ای بود که سارا ۳۰ سال با خود حمل می‌کرد.

[تحلیل روانشناسی]:
هنگامی که احساسات شدید مانند ترس و سوگ نتوانند تخلیه شوند، در سیستم عضلانی و عصبی بدن منقبض می‌شوند. بدن این خاطرات را به عنوان الگوهای تنش فیزیکی حفظ می‌کند. بهبودی واقعی زمانی رخ می‌دهد که بتوانیم با شفقت و بدون قضاوت، این پاسخ‌های انجماد بدنی را احساس کرده و با تکنیک‌های تنفسی رها سازیم.`,
      `صفحه ۳: التیام زخم‌های بین‌نسلی

برای شکستن چرخه انتقال تروما، سارا باید ابتدا خشم خود را به رسمیت می‌شناخت. خشم نسبت به مادری که حضور عاطفی نداشت و مادری که خود قربانی مادری غم‌زده بود. 
او آموخت که شفقت به معنای تایید رفتارهای آسیب‌رسان نیست، بلکه درک این نکته است که انسان‌ها از ظرفیت روانی خود فراتر نمی‌روند.

او در دفترچه‌اش نوشت: «من سکوت نسل‌های قبل را به عنوان هویت خودم نمی‌پذیرم. من حق دارم صحبت کنم، گریه کنم و به طور کامل حس کنم.»

[آموزه کاربردی]:
شکستن چرخه ترومای خانوادگی سه مرحله دارد:
۱. نام‌گذاری و شناسایی الگوهای تکرارشونده (مانند کمال‌گرایی، اضطراب دلبستگی)
۲. پذیرش و رهاسازی احساسات سرکوب‌شده از طریق بدن و روایت‌نویسی
۳. تعیین مرزهای عاطفی جدید با اطرافیان، حتی اگر با مقاومت شدید سیستم خانواده مواجه شوید.`
    ]
  },
  'autumn-alley': {
    title: 'Autumn Alley (Sample Pages)',
    pages: [
      `فصل اول: غبار در آینه

رابطه با کیوان مانند راه رفتن روی شیشه‌های شکسته بود؛ تو با پاهای برهنه حرکت می‌کردی و هر لحظه منتظر خونریزی بودی، اما او با لبخند می‌گفت: «چرا اینقدر حساسی؟ این شیشه‌ها فقط در ذهن تو هستند.»

اوایل، همه‌چیز رویایی بود. کیوان عشق بی‌حدوحصری نثار می‌کرد، اما به تدریج، تغییرات آغاز شد. او ابتدا دوستان صمیمی‌ام را به عنوان "تاثیرات منفی" حذف کرد. سپس انتخاب لباس‌هایم، لحن صحبت کردنم و حتی رشته تحصیلی‌ام را زیر سوال برد. من به آرامی در حال محو شدن بودم و تصویرم در آینه غبارآلودتر می‌شد.

[تحلیل روانشناختی]:
مرحله اول روابط سمی اغلب با "بمباران عشق" (Love Bombing) آغاز می‌شود؛ ابراز عشق افراطی برای ایجاد دلبستگی سریع. سپس فاز "بی‌ارزش‌سازی" (Devaluation) به صورت کاملاً تدریجی و نامحسوس شکل می‌گیرد. هدف از این کار، سلب اعتمادبه‌نفس قربانی و ایجاد وابستگی کامل روانی و عاطفی به فرد کنترل‌گر است.`,
      `صفحه ۲: بیداری و بازیابی واقعیت

روز بیداری من زمانی بود که ضبط‌صوت کوچکم را در کیفم روشن کردم. کیوان شب گذشته به من گفته بود: «تو یک روانی بی‌عرضه هستی که هیچ‌کس جز من تحملت نمی‌کند.» اما فردا صبح وقتی موضوع را یادآوری کردم، با چشمانی حق‌به‌جانب گفت: «من؟ هرگز چنین چیزی نگفتم! تو باز هم داری توهم می‌زنی!»

وقتی دکمه پخش صدای ضبط‌شده را زدم و چشمان هراسان او را دیدم، لرزیدم. نه از صدای او، بلکه از این حقیقت که من چگونه اجازه داده بودم ذهن خودم حقیقت آشکار زندگی‌ام را تکذیب کند تا رابطه حفظ شود.

[تحلیل روانشناسی - گسلایتینگ]:
گسلایتینگ (Gaslighting) یعنی دستکاری اطلاعات به نحوی که قربانی به حافظه، ادراک و عقل خود شک کند. پادزهر گسلایتینگ، اثبات بیرونی است. نوشتن وقایع روزانه، ضبط کردن مکالمات حساس (برای خودتان) و صحبت با یک ناظر بیرونی یا مشاور ایمن، به شما کمک می‌کند واقعیت شخصی خود را حفظ کرده و از بازی‌های روانی رها شوید.`,
      `صفحه ۳: مرزهای جدید، زندگی نو

ترک کردن آن رابطه تازه شروع کار بود. چالش واقعی، بازسازی ویرانه‌ای بود که از باورهایم به جا مانده بود. بزرگ‌ترین درسی که آموختم این بود: «نه» گفتن یک جمله کامل است و نیازی به توجیه، توضیح یا عذرخواهی ندارد.

امروز وقتی پاییز می‌آید، دیگر بوی دلتنگی و انزوا نمی‌دهد. پاییز برای من فصل برگریزان باورهای غلط و رویش مرزهای مقدسی است که هیچ‌کس اجازه عبور غیرمحترمانه از آن‌ها را ندارد.

[راهنمای تعیین مرزها]:
۱. حق مسلم خود را برای محافظت از انرژی روانشناختی‌تان بپذیرید.
۲. عواقب عبور از مرزهایتان را به روشنی (و بدون خشم) بیان کنید.
۳. از فداکاری‌های افراطی و تلاش برای "نجات دادن" افراد آسیب‌رسان دست بردارید. شما مسئول التیام روانی دیگران نیستید.`
    ]
  }
};
