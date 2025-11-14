import { useState,useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { NotFound } from './components/NotFound';
import { Toaster } from './components/ui/sonner';

type Page = 'landing' | 'dashboard' | 'analytics' | 'login' | 'signup' | 'notfound';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    navigate('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigate} onLogout={handleLogout} />;
      case 'analytics':
        return <Analytics onNavigate={navigate} onLogout={handleLogout} />;
      case 'login':
        return <Login onNavigate={navigate} onLogin={handleLogin} />;
      case 'signup':
        return <Signup onNavigate={navigate} onLogin={handleLogin} />;
      case 'notfound':
        return <NotFound onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
  <><Toaster /><div className="min-h-screen">{renderPage()}</div></>);
}
