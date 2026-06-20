'use client';

import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { useEffect, useState } from 'react';

type DashboardOverview = Awaited<ReturnType<typeof apiService.getDashboardOverview>>;

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadOverview = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check token before API call
      const token = apiService.getToken();
      console.log('🔑 Dashboard - Token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        setError('লগইন প্রয়োজন। দয়া করে লগইন করুন।');
        setLoading(false);
        return;
      }
      
      console.log('📡 Calling dashboard API...');
      const response = await apiService.getDashboardOverview();
      console.log('✅ Dashboard response:', response);
      
      if (response && response.stats) {
        setOverview(response);
      } else {
        setError('API থেকে সঠিক ডেটা পাওয়া যায়নি');
      }
    } catch (err: any) {
      console.error('❌ Dashboard error:', err);
      setError(err?.message || 'ড্যাশবোর্ড লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      console.log('🚀 Auth loaded, loading dashboard...');
      loadOverview();
    }
  }, [authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen bg-[#f7faf8]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-4 text-sm font-medium text-slate-600">লোড হচ্ছে...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#f7faf8]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="max-w-md text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">কিছু একটা ভুল হয়েছে</h3>
            <p className="text-sm text-slate-600">{error}</p>
            <button
              onClick={loadOverview}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="flex min-h-screen bg-[#f7faf8]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600">কোনো ডেটা পাওয়া যায়নি</p>
            <button
              onClick={loadOverview}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              লোড করুন
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { stats, recentActivities, users } = overview;

  return (
    <div className="flex min-h-screen bg-[#f7faf8] text-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-6 sm:px-8 py-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                লাইভ ড্যাশবোর্ড
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                প্ল্যাটফর্ম ওভারভিউ
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {user ? `${user.name} হিসেবে স্বাগতম` : 'স্বাগতম'}
              </p>
            </div>
            <button
              onClick={loadOverview}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-300 border-t-emerald-600 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {loading ? 'লোড হচ্ছে...' : 'রিফ্রেশ'}
            </button>
          </div>
        </header>

        <section className="space-y-6 px-6 sm:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">মোট ব্যবহারকারী</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900 mt-1">{stats?.totalUsers || 0}</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">মোট প্রশ্ন</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900 mt-1">{stats?.totalQuestions || 0}</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">মোট আয়</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900 mt-1">{stats?.totalRevenue || '৳০'}</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">সক্রিয় ব্যবহারকারী</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900 mt-1">{users?.length || 0}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">সাম্প্রতিক কার্যক্রম</h3>
            <div className="space-y-3">
              {recentActivities?.map((activity: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">ব্যবহারকারী তালিকা</h3>
            <div className="space-y-3">
              {users?.map((userItem: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-sm font-bold text-emerald-700">
                    {userItem.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{userItem.name}</p>
                    <p className="text-xs text-slate-400">{userItem.email}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${userItem.isActive ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                    <span className={`text-xs font-medium ${userItem.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {userItem.isActive ? 'অনলাইন' : 'অফলাইন'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
