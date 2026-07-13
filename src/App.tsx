import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { About } from './components/About';
import { Books } from './components/Books';
import { BookDetail } from './components/BookDetail';
import { Membership } from './components/Membership';
import { GalleryView } from './components/GalleryView';
import { ReviewsView } from './components/ReviewsView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { CartView } from './components/CartView';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';

function AppContent() {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'books':
        return <Books />;
      case 'book-detail':
        return <BookDetail />;
      case 'membership':
        return <Membership />;
      case 'gallery':
        return <GalleryView />;
      case 'reviews':
        return <ReviewsView />;
      case 'blog':
        return <BlogView />;
      case 'contact':
        return <ContactView />;
      case 'cart':
        return <CartView />;
      case 'dashboard':
        return <UserDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen frosted-stage font-sans selection:bg-amber-500/30 selection:text-white">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
