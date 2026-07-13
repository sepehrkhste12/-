import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Category, Review, BlogPost, UserProfile, CartItem, Order, SiteSettings, GalleryItem } from '../types';
import { INITIAL_BOOKS, INITIAL_CATEGORIES, INITIAL_BLOG_POSTS, INITIAL_GALLERY, INITIAL_SETTINGS, INITIAL_REVIEWS } from '../data';

interface AppContextProps {
  language: 'fa' | 'en';
  setLanguage: (lang: 'fa' | 'en') => void;
  toggleLanguage: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
  selectedBookId: string | null;
  setSelectedBookId: (id: string | null) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'rating' | 'reviewCount'>) => void;
  updateBook: (id: string, updated: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'slug'>) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  reviews: Review[];
  addReview: (bookId: string, userName: string, rating: number, comment: string) => void;
  approveReview: (id: string) => void;
  replyToReview: (id: string, reply: string) => void;
  deleteReview: (id: string) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date' | 'dateFa'>) => void;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  currentUser: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  activateMembership: (plan: 'monthly' | 'yearly') => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; discount: number; message: string; messageFa: string };
  currentDiscount: number;
  currentCoupon: string;
  orders: Order[];
  createOrder: () => Order | null;
  completePayment: (orderId: string, trackingCode: string, success: boolean) => void;
  wishlist: string[];
  toggleWishlist: (bookId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (categorySlug: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const GUEST_USER: UserProfile = {
  id: 'user-default',
  name: 'Sara Razavi',
  email: 'sara.razavi@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  role: 'member',
  membershipType: 'none',
  purchasedBookIds: [],
  bookmarkedBookIds: [],
  favoriteBookIds: []
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Persistent Storage Key States ---
  const [language, setLanguageState] = useState<'fa' | 'en'>('fa');
  const [activePage, setActivePageState] = useState<string>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(GUEST_USER);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentCoupon, setCurrentCoupon] = useState<string>('');
  const [currentDiscount, setCurrentDiscount] = useState<number>(0);
  
  // Search and Category filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load from LocalStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('zendegi_lang');
    if (savedLang === 'en' || savedLang === 'fa') setLanguageState(savedLang);

    const savedBooks = localStorage.getItem('zendegi_books');
    if (savedBooks) setBooks(JSON.parse(savedBooks));
    else setBooks(INITIAL_BOOKS);

    const savedCats = localStorage.getItem('zendegi_categories');
    if (savedCats) setCategories(JSON.parse(savedCats));
    else setCategories(INITIAL_CATEGORIES);

    const savedReviews = localStorage.getItem('zendegi_reviews');
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    else setReviews(INITIAL_REVIEWS);

    const savedBlog = localStorage.getItem('zendegi_blog');
    if (savedBlog) setBlogPosts(JSON.parse(savedBlog));
    else setBlogPosts(INITIAL_BLOG_POSTS);

    const savedGallery = localStorage.getItem('zendegi_gallery');
    if (savedGallery) setGallery(JSON.parse(savedGallery));
    else setGallery(INITIAL_GALLERY);

    const savedSettings = localStorage.getItem('zendegi_settings');
    if (savedSettings) setSiteSettings(JSON.parse(savedSettings));
    else setSiteSettings(INITIAL_SETTINGS);

    const savedUser = localStorage.getItem('zendegi_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    else setCurrentUser(GUEST_USER);

    const savedCart = localStorage.getItem('zendegi_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedOrders = localStorage.getItem('zendegi_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const savedWish = localStorage.getItem('zendegi_wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));
  }, []);

  // Sync state functions with local storage
  const saveBooks = (newBooks: Book[]) => {
    setBooks(newBooks);
    localStorage.setItem('zendegi_books', JSON.stringify(newBooks));
  };

  const saveCategories = (newCats: Category[]) => {
    setCategories(newCats);
    localStorage.setItem('zendegi_categories', JSON.stringify(newCats));
  };

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('zendegi_reviews', JSON.stringify(newReviews));
  };

  const saveBlogPosts = (newBlog: BlogPost[]) => {
    setBlogPosts(newBlog);
    localStorage.setItem('zendegi_blog', JSON.stringify(newBlog));
  };

  const saveGallery = (newGallery: GalleryItem[]) => {
    setGallery(newGallery);
    localStorage.setItem('zendegi_gallery', JSON.stringify(newGallery));
  };

  const saveSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    localStorage.setItem('zendegi_settings', JSON.stringify(newSettings));
  };

  const saveUser = (newUser: UserProfile) => {
    setCurrentUser(newUser);
    localStorage.setItem('zendegi_user', JSON.stringify(newUser));
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('zendegi_cart', JSON.stringify(newCart));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('zendegi_orders', JSON.stringify(newOrders));
  };

  const saveWishlist = (newWish: string[]) => {
    setWishlist(newWish);
    localStorage.setItem('zendegi_wishlist', JSON.stringify(newWish));
  };

  // --- Actions ---

  const setLanguage = (lang: 'fa' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('zendegi_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'fa' ? 'en' : 'fa';
    setLanguage(nextLang);
  };

  const setActivePage = (page: string) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Books CRUD
  const addBook = (bookData: Omit<Book, 'id' | 'rating' | 'reviewCount'>) => {
    const id = bookData.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newBook: Book = {
      ...bookData,
      id,
      rating: 5.0,
      reviewCount: 0
    };
    saveBooks([newBook, ...books]);
  };

  const updateBook = (id: string, updated: Partial<Book>) => {
    const list = books.map(b => b.id === id ? { ...b, ...updated } as Book : b);
    saveBooks(list);
  };

  const deleteBook = (id: string) => {
    const list = books.filter(b => b.id !== id);
    saveBooks(list);
  };

  // Category CRUD
  const addCategory = (catData: Omit<Category, 'id' | 'slug'>) => {
    const id = catData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat: Category = {
      ...catData,
      id,
      slug: id
    };
    saveCategories([...categories, newCat]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    saveCategories(categories.map(c => c.id === id ? { ...c, ...updated } as Category : c));
  };

  const deleteCategory = (id: string) => {
    saveCategories(categories.filter(c => c.id !== id));
  };

  // Reviews Actions
  const addReview = (bookId: string, userName: string, comment: string, rating: number) => {
    const now = new Date();
    const dateFa = now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    const dateEn = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      bookId,
      userName,
      rating,
      comment,
      likes: 0,
      date: dateEn,
      dateFa,
      verified: currentUser.purchasedBookIds.includes(bookId),
      approved: false // Moderation pipeline! Admins approve reviews
    };
    
    // Add to state
    saveReviews([newReview, ...reviews]);

    // Update book ratings
    const bookReviews = reviews.filter(r => r.bookId === bookId && r.approved);
    const totalRating = bookReviews.reduce((sum, r) => sum + r.rating, 0) + rating;
    const newCount = bookReviews.length + 1;
    const avgRating = parseFloat((totalRating / newCount).toFixed(1));

    updateBook(bookId, {
      rating: avgRating,
      reviewCount: newCount
    });
  };

  const approveReview = (id: string) => {
    const reviewToApprove = reviews.find(r => r.id === id);
    if (!reviewToApprove) return;

    const list = reviews.map(r => r.id === id ? { ...r, approved: true } : r);
    saveReviews(list);

    // Re-calculate book reviews once approved
    const bookId = reviewToApprove.bookId;
    const approvedBookReviews = list.filter(r => r.bookId === bookId && r.approved);
    const totalRating = approvedBookReviews.reduce((sum, r) => sum + r.rating, 0);
    const newCount = approvedBookReviews.length;
    const avgRating = newCount > 0 ? parseFloat((totalRating / newCount).toFixed(1)) : 5.0;

    updateBook(bookId, {
      rating: avgRating,
      reviewCount: newCount
    });
  };

  const replyToReview = (id: string, reply: string) => {
    saveReviews(reviews.map(r => r.id === id ? { ...r, reply } : r));
  };

  const deleteReview = (id: string) => {
    saveReviews(reviews.filter(r => r.id !== id));
  };

  // Blog CRUD
  const addBlogPost = (postData: Omit<BlogPost, 'id' | 'date' | 'dateFa'>) => {
    const id = `post-${Date.now()}`;
    const now = new Date();
    const dateFa = now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    const dateEn = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const newPost: BlogPost = {
      ...postData,
      id,
      date: dateEn,
      dateFa
    };
    saveBlogPosts([newPost, ...blogPosts]);
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    saveBlogPosts(blogPosts.map(p => p.id === id ? { ...p, ...updated } as BlogPost : p));
  };

  const deleteBlogPost = (id: string) => {
    saveBlogPosts(blogPosts.filter(p => p.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`
    };
    saveGallery([...gallery, newItem]);
  };

  const deleteGalleryItem = (id: string) => {
    saveGallery(gallery.filter(g => g.id !== id));
  };

  // Site Settings
  const updateSiteSettings = (updated: Partial<SiteSettings>) => {
    saveSiteSettings({ ...siteSettings, ...updated });
  };

  // User Profile
  const updateUserProfile = (updated: Partial<UserProfile>) => {
    saveUser({ ...currentUser, ...updated } as UserProfile);
  };

  const activateMembership = (plan: 'monthly' | 'yearly') => {
    const now = new Date();
    const expiry = new Date();
    if (plan === 'monthly') expiry.setMonth(now.getMonth() + 1);
    else expiry.setFullYear(now.getFullYear() + 1);

    const expiryEn = expiry.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const expiryFa = expiry.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });

    updateUserProfile({
      membershipType: plan,
      membershipExpiry: expiryEn,
      membershipExpiryFa: expiryFa
    });
  };

  // Cart Actions
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    // Check if item already exists in cart
    const existingIndex = cart.findIndex(c => 
      (item.type === 'book' && c.bookId === item.bookId) || 
      (item.type === 'membership' && c.membershipPlanId === item.membershipPlanId)
    );

    if (existingIndex > -1) {
      // Just increase quantity
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
    setActivePage('cart');
  };

  const removeFromCart = (index: number) => {
    saveCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    saveCart([]);
    setCurrentCoupon('');
    setCurrentDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const cleanedCode = code.toUpperCase().trim();
    if (cleanedCode === 'SHIFA50' || cleanedCode === 'ANYA50' || cleanedCode === 'ZENDEGI') {
      setCurrentCoupon(cleanedCode);
      setCurrentDiscount(0.5); // 50% discount
      return {
        success: true,
        discount: 0.5,
        message: 'Promo code applied successfully: 50% discount!',
        messageFa: 'کد تخفیف با موفقیت اعمال شد: ۵۰٪ تخفیف!'
      };
    }
    return {
      success: false,
      discount: 0,
      message: 'Invalid promo code.',
      messageFa: 'کد تخفیف نامعتبر است.'
    };
  };

  // Wishlist / Bookmark Actions
  const toggleWishlist = (bookId: string) => {
    let nextWish: string[];
    if (wishlist.includes(bookId)) {
      nextWish = wishlist.filter(id => id !== bookId);
    } else {
      nextWish = [...wishlist, bookId];
    }
    saveWishlist(nextWish);
    updateUserProfile({ bookmarkedBookIds: nextWish });
  };

  // Orders and simulated Persian Gateway payments
  const createOrder = () => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotalRial = cart.reduce((sum, item) => sum + (item.priceRial * item.quantity), 0);
    
    const discount = subtotal * currentDiscount;
    const discountRial = subtotalRial * currentDiscount;

    const total = subtotal - discount;
    const totalRial = subtotalRial - discountRial;

    const now = new Date();
    const dateFa = now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const dateEn = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: currentUser.id,
      items: [...cart],
      totalAmount: total,
      totalAmountRial: totalRial,
      couponCode: currentCoupon || undefined,
      discountAmount: discount,
      date: dateEn,
      dateFa,
      status: 'pending'
    };

    saveOrders([newOrder, ...orders]);
    return newOrder;
  };

  const completePayment = (orderId: string, trackingCode: string, success: boolean) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const status = success ? 'success' : 'failed';
        if (success) {
          // Grant access based on ordered items!
          const purchasedIds = [...currentUser.purchasedBookIds];
          let updatedMembershipType = currentUser.membershipType;
          let expiryEn = currentUser.membershipExpiry;
          let expiryFa = currentUser.membershipExpiryFa;

          order.items.forEach(item => {
            if (item.type === 'book' && item.bookId && !purchasedIds.includes(item.bookId)) {
              purchasedIds.push(item.bookId);
            }
            if (item.type === 'membership' && item.membershipPlanId) {
              updatedMembershipType = item.membershipPlanId;
              const expiry = new Date();
              if (item.membershipPlanId === 'monthly') expiry.setMonth(expiry.getMonth() + 1);
              else expiry.setFullYear(expiry.getFullYear() + 1);

              expiryEn = expiry.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              expiryFa = expiry.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
            }
          });

          // Save user grants
          saveUser({
            ...currentUser,
            purchasedBookIds: purchasedIds,
            membershipType: updatedMembershipType,
            membershipExpiry: expiryEn,
            membershipExpiryFa: expiryFa
          });
        }
        return { ...order, status, trackingCode } as Order;
      }
      return order;
    });

    saveOrders(updatedOrders);
    clearCart();
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      activePage,
      setActivePage,
      selectedBookId,
      setSelectedBookId,
      selectedPostId,
      setSelectedPostId,
      books,
      addBook,
      updateBook,
      deleteBook,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      reviews,
      addReview,
      approveReview,
      replyToReview,
      deleteReview,
      blogPosts,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      gallery,
      addGalleryItem,
      deleteGalleryItem,
      siteSettings,
      updateSiteSettings,
      currentUser,
      updateUserProfile,
      activateMembership,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      applyCoupon,
      currentDiscount,
      currentCoupon,
      orders,
      createOrder,
      completePayment,
      wishlist,
      toggleWishlist,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
