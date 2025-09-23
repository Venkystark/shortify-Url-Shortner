import { Link, ExternalLink, BarChart3, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "./AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();

  const handleProtectedNavigation = (page: string) => {
    if (!user && (page === 'dashboard' || page === 'analytics')) {
      onNavigate('login');
      return;
    }
    onNavigate(page);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Link className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold">Shortify</h1>
        </button>
        
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-primary transition-colors ${
              currentPage === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleProtectedNavigation('dashboard')}
            className={`hover:text-primary transition-colors flex items-center gap-2 ${
              currentPage === 'dashboard' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => handleProtectedNavigation('analytics')}
            className={`hover:text-primary transition-colors ${
              currentPage === 'analytics' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Analytics
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('dashboard')} className="cursor-pointer">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('analytics')} className="cursor-pointer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('login')}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => onNavigate('signup')}
              >
                Sign Up
              </Button>
            </div>
          )}

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleProtectedNavigation(currentPage === 'home' ? 'dashboard' : 'home')}
            >
              {currentPage === 'home' ? <BarChart3 className="w-4 h-4" /> : <Link className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}