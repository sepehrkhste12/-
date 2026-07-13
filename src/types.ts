export interface Book {
  id: string;
  title: string;
  titleFa: string;
  author: string;
  authorFa: string;
  description: string;
  descriptionFa: string;
  fullDescription: string;
  fullDescriptionFa: string;
  coverUrl: string;
  category: string; // category slug
  rating: number;
  reviewCount: number;
  price: number; // in USD
  priceRial: number; // in Iranian Rial (Toman/Rial)
  isFeatured: boolean;
  isPopular: boolean;
  isNew: boolean;
  pages: number;
  readingTime: string;
  readingTimeFa: string;
  publicationDate: string;
  publicationDateFa: string;
  tags: string[];
  tagsFa: string[];
  samplePdfUrl: string;
  fullPdfUrl: string;
  topics: string[];
  topicsFa: string[];
}

export interface Category {
  id: string;
  name: string;
  nameFa: string;
  slug: string;
  description: string;
  descriptionFa: string;
  iconName: string; // Lucide icon name
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  likes: number;
  date: string;
  dateFa: string;
  verified: boolean;
  approved: boolean;
  reply?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleFa: string;
  excerpt: string;
  excerptFa: string;
  content: string;
  contentFa: string;
  author: string;
  authorFa: string;
  coverUrl: string;
  date: string;
  dateFa: string;
  category: string;
  categoryFa: string;
  readTime: string;
  readTimeFa: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member' | 'guest';
  membershipType: 'none' | 'monthly' | 'yearly';
  membershipExpiry?: string;
  membershipExpiryFa?: string;
  purchasedBookIds: string[];
  bookmarkedBookIds: string[];
  favoriteBookIds: string[];
}

export interface CartItem {
  bookId?: string; // If it's a book
  membershipPlanId?: 'monthly' | 'yearly'; // If it's membership
  title: string;
  titleFa: string;
  price: number;
  priceRial: number;
  quantity: number;
  type: 'book' | 'membership';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalAmountRial: number;
  couponCode?: string;
  discountAmount: number;
  date: string;
  dateFa: string;
  status: 'pending' | 'success' | 'failed';
  trackingCode?: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroTitleFa: string;
  heroSubtitle: string;
  heroSubtitleFa: string;
  aboutAuthor: string;
  aboutAuthorFa: string;
  authorName: string;
  authorNameFa: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneFa: string;
  workingHours: string;
  workingHoursFa: string;
  telegramLink: string;
  instagramLink: string;
  address: string;
  addressFa: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleFa: string;
  type: 'image' | 'video';
  url: string;
  category: string; // e.g. 'covers' | 'author' | 'events' | 'bts'
}
