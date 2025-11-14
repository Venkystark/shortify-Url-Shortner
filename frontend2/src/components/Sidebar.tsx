import { Home, PlusCircle, BarChart3, Settings, Link2, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', emoji: '🏠' },
    { id: 'create', icon: PlusCircle, label: 'Create New', emoji: '➕' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', emoji: '📊' },
    { id: 'settings', icon: Settings, label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-white/10">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
          <Link2 className="w-6 h-6" />
        </div>
        <span className="text-2xl tracking-tight">Shortify</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            variant="ghost"
            className={`w-full justify-start gap-3 h-12 rounded-xl text-white hover:bg-white/10 transition-all ${
              currentPage === item.id ? 'bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-purple-500/30' : ''
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            <span className="ml-auto text-lg">{item.emoji}</span>
          </Button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start gap-3 h-12 rounded-xl text-white hover:bg-red-500/20 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}