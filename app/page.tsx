'use client';

import Sidebar from '@/components/Sidebar';
import {
    AcademicCapIcon,
    ArrowTrendingUpIcon,
    BookOpenIcon,
    BriefcaseIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Dashboard() {
  const [stats] = useState({
    totalUsers: 15420,
    totalQuestions: 18450,
    totalRevenue: 1257890,
    activeSubscriptions: 5420,
    dailyActiveUsers: 3450,
    totalExams: 256,
    totalJobs: 189,
    avgScore: 68.5
  });

  const statCards = [
    { title: 'মোট ব্যবহারকারী', value: stats.totalUsers.toLocaleString(), icon: UsersIcon, color: 'bg-blue-500' },
    { title: 'মোট প্রশ্ন', value: stats.totalQuestions.toLocaleString(), icon: DocumentTextIcon, color: 'bg-green-500' },
    { title: 'মোট আয় (টাকা)', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: CurrencyDollarIcon, color: 'bg-yellow-500' },
    { title: 'সক্রিয় সাবস্ক্রিপশন', value: stats.activeSubscriptions.toLocaleString(), icon: ArrowTrendingUpIcon, color: 'bg-purple-500' },
    { title: 'দৈনিক সক্রিয় ব্যবহারকারী', value: stats.dailyActiveUsers.toLocaleString(), icon: ChartBarIcon, color: 'bg-pink-500' },
    { title: 'মোট পরীক্ষা', value: stats.totalExams.toLocaleString(), icon: BookOpenIcon, color: 'bg-indigo-500' },
    { title: 'মোট চাকরি', value: stats.totalJobs.toLocaleString(), icon: BriefcaseIcon, color: 'bg-orange-500' },
    { title: 'গড় স্কোর', value: `${stats.avgScore}%`, icon: AcademicCapIcon, color: 'bg-teal-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ড্যাশবোর্ড</h1>
          <p className="text-gray-600 mt-2">Job Prostuti অ্যাডমিন প্যানেলে স্বাগতম</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="card hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}