'use client';

import { apiService } from '@/services/api';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/users', label: 'Users' },
  { href: '/questions', label: 'Questions' },
  { href: '/exams', label: 'Exams' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/reports', label: 'Reports' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/faq', label: 'FAQ' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; path=/; max-age=0; samesite=lax';
    apiService.clearToken();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="w-72 shrink-0 border-r border-emerald-400/10 bg-slate-950/95 text-slate-50 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="border-b border-emerald-400/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-700 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-900/30">
            JP
          </div>
          <div>
            <p className="text-lg font-semibold tracking-wide text-white">Job Prostuti</p>
            <p className="text-sm text-emerald-100/70">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="space-y-1 p-4">
        {navigationItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${active ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-900/30' : 'text-slate-200/80 hover:bg-white/8 hover:text-white'}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-emerald-400/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-50 transition-all duration-200 hover:bg-emerald-500/20 hover:text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}