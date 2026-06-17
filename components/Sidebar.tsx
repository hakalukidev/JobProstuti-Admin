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
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between min-h-screen sticky top-0 z-20">
      
      {/* Top Brand Block */}
      <div>
        <div className="border-b border-slate-100 px-6 py-6 mb-4">
          <div className="flex items-center gap-3">
            {/* Unified Brand Logo from Login Page */}
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div>
              <p className="text-base font-bold tracking-tight text-slate-900">Job Prostuti</p>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Management Suite</p>
            </div>
          </div>
        </div>

        {/* Navigation Link Items */}
        <nav className="space-y-1 px-3">
          {navigationItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-150 ${
                  active 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Area */}
      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all duration-150 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 active:bg-rose-100"
        >
          Logout Terminal
        </button>
      </div>

    </aside>
  );
}