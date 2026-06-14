'use client';

import Sidebar from '@/components/Sidebar';
import type { ReactNode } from 'react';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#040806] text-slate-50">
      <Sidebar />
      <main className="relative flex-1 overflow-y-auto">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-28 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-lime-500/5 blur-3xl" />
        </div>
        <div className="relative min-h-screen">{children}</div>
      </main>
    </div>
  );
}