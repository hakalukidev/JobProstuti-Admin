'use client';

import RecentActivity from '@/components/dashboard/RecentActivity';
import Stats from '@/components/dashboard/Stats';
import UsersList from '@/components/dashboard/UsersList';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { useEffect, useState } from 'react';

type DashboardOverview = Awaited<ReturnType<typeof apiService.getDashboardOverview>>;

export default function DashboardPage() {
  const { user } = useAuth();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOverview = async () => {
    try {
      setError('');
      const response = await apiService.getDashboardOverview();
      setOverview(response);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-600 shadow-sm">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm font-semibold text-rose-700 shadow-sm">
          {error || 'Dashboard data not available'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7faf8] text-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="border-b border-slate-200 bg-white/90 px-8 py-6 backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">Dashboard</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">প্ল্যাটফর্ম ওভারভিউ</h1>
              <p className="mt-1 text-sm text-slate-500">
                {user ? `${user.name} হিসেবে প্রবেশ করেছেন` : 'লাইভ অ্যাডমিন ডাটা দেখুন'}
              </p>
            </div>
            <button
              type="button"
              onClick={loadOverview}
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              Refresh data
            </button>
          </div>
        </header>

        <section className="space-y-6 px-8 py-8">
          <Stats stats={overview.stats} />

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <RecentActivity activities={overview.recentActivities} />
            <UsersList users={overview.users} onRefresh={loadOverview} />
          </div>
        </section>
      </main>
    </div>
  );
}