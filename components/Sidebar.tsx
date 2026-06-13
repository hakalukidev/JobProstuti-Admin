'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { href: '/', label: 'Dashboard' },
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

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-slate-950 text-white">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-lg font-semibold">Job Prostuti</p>
        <p className="text-sm text-slate-400">Admin Panel</p>
      </div>
      <nav className="space-y-1 p-4">
        {navigationItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-2 text-sm transition-colors ${active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}