'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Users', href: '/users', icon: '👥' },
    { name: 'Categories', href: '/categories', icon: '📂' },
    { name: 'Courses', href: '/courses', icon: '📚' },
    { name: 'Questions', href: '/admin/questions', icon: '❓' },
    { name: 'PDF Upload', href: '/admin/upload', icon: '📤' },
    { name: 'Exams', href: '/exams', icon: '📝' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      document.cookie = 'isLoggedIn=; path=/; max-age=0';
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex-shrink-0 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h1 className="text-lg font-bold text-emerald-600">Job Prostuti</h1>
        <p className="text-xs text-slate-500">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{user?.name || 'Admin'}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@jobprostuti.com'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <span>🚪</span>
          লগআউট
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
