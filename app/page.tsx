'use client';

import Sidebar from '@/components/Sidebar';
import {
  AcademicCapIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  BellIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

// ── Ultra-Sleek Neon Sparkline ─────────────────────────────────
function Sparkline({ data, color = '#059669' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 130, h = 42, pts = data.length;
  const points = data
    .map((v, i) => `${(i / (pts - 1)) * w},${h - ((v - min) / range) * (h - 6) - 3}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className="overflow-visible">
      <polyline points={points} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M 0 ${h} L ${points} L ${w} ${h} Z`} fill={`url(#gradient-${color.replace('#', '')})`} opacity="0.08" />
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Glassmorphic Premium Stat Card ──────────────────────────────
function StatCard({
  title, value, icon: Icon, change, up, sparkData, accent,
}: {
  title: string; value: string; icon: React.ElementType;
  change: string; up: boolean; sparkData: number[]; accent: string;
}) {
  const accentMap: Record<string, { spark: string; iconBg: string; tint: string }> = {
    emerald: { spark: '#10b981', iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100', tint: 'group-hover:bg-emerald-50/50' },
    blue:    { spark: '#3b82f6', iconBg: 'bg-blue-50 text-blue-600 border-blue-100', tint: 'group-hover:bg-blue-50/50' },
    violet:  { spark: '#8b5cf6', iconBg: 'bg-violet-50 text-violet-600 border-violet-100', tint: 'group-hover:bg-violet-50/50' },
    amber:   { spark: '#f59e0b', iconBg: 'bg-amber-50 text-amber-600 border-amber-100', tint: 'group-hover:bg-amber-50/50' },
    rose:    { spark: '#f43f5e', iconBg: 'bg-rose-50 text-rose-600 border-rose-100', tint: 'group-hover:bg-rose-50/50' },
    cyan:    { spark: '#06b6d4', iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100', tint: 'group-hover:bg-cyan-50/50' },
    teal:    { spark: '#14b8a6', iconBg: 'bg-teal-50 text-teal-600 border-teal-100', tint: 'group-hover:bg-teal-50/50' },
    indigo:  { spark: '#6366f1', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100', tint: 'group-hover:bg-indigo-50/50' },
  };
  const a = accentMap[accent] ?? accentMap.emerald;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/90 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all duration-300 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div className={`rounded-2xl p-3 border ${a.iconBg} transition-colors duration-300`}>
          <Icon className="h-6 w-6 stroke-[2]" />
        </div>
        <span className={`text-[11px] font-black tracking-wide px-3 py-1 rounded-full border flex items-center gap-1 ${up ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
          {up ? <ArrowUpIcon className="w-3 h-3 stroke-[3.5]" /> : <ArrowDownIcon className="w-3 h-3 stroke-[3.5]" />}
          {change}
        </span>
      </div>

      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{title}</p>
      <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100/80">
        <p className="text-xs font-bold text-slate-400">ট্রেন্ডিং গ্রাফ</p>
        <div className="transform group-hover:scale-105 transition-transform duration-300">
          <Sparkline data={sparkData} color={a.spark} />
        </div>
      </div>
    </div>
  );
}

// ── Avatar Component (ADDED BACK) ───────────────────────────────────
function Avatar({ initials, color = 'emerald' }: { initials: string; color?: string }) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    violet: 'bg-violet-100 text-violet-700 border-violet-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    rose: 'bg-rose-100 text-rose-700 border-rose-200',
    teal: 'bg-teal-100 text-teal-700 border-teal-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };
  return (
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold border ${colors[color] ?? colors.emerald}`}>
      {initials}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'year'>('month');

  const statCards = [
    { title: 'মোট ব্যবহারকারী',    value: '15,420', icon: UsersIcon,          change: '12%', up: true,  accent: 'emerald', sparkData: [40,55,48,62,58,72,68,80,75,88,82,95] },
    { title: 'মোট প্রশ্ন',          value: '18,450', icon: DocumentTextIcon,    change: '8%',  up: true,  accent: 'blue',    sparkData: [30,38,34,45,42,50,48,55,52,60,58,66] },
    { title: 'মোট আয়',             value: '৳12,57,890', icon: CurrencyDollarIcon, change: '23%', up: true,  accent: 'violet',  sparkData: [60,55,70,65,80,75,90,85,95,88,100,97] },
    { title: 'সক্রিয় সাবস্ক্রিপশন', value: '5,420',  icon: ArrowTrendingUpIcon, change: '5%',  up: true,  accent: 'amber',   sparkData: [20,28,24,32,30,38,36,42,40,46,44,50] },
    { title: 'দৈনিক সক্রিয়',        value: '3,450',  icon: ChartBarIcon,        change: '2%',  up: false, accent: 'rose',    sparkData: [50,46,52,48,44,50,46,42,48,44,40,46] },
    { title: 'মোট পরীক্ষা',         value: '256',    icon: BookOpenIcon,        change: '15%', up: true,  accent: 'cyan',    sparkData: [10,14,12,18,16,22,20,26,24,30,28,34] },
    { title: 'মোট চাকরি',           value: '189',    icon: BriefcaseIcon,       change: '18%', up: true,  accent: 'teal',    sparkData: [8,10,12,10,14,16,14,18,20,18,22,24] },
    { title: 'গড় স্কোর',            value: '68.5%',  icon: AcademicCapIcon,     change: '3%',  up: true,  accent: 'indigo',  sparkData: [60,62,61,64,63,66,65,67,66,68,67,69] },
  ];

  const recentActivities = [
    { user: 'Rakib Hasan',   action: 'নতুন পরীক্ষা সম্পন্ন করেছে', exam: 'BCS Preliminary', score: '85%', time: '৫ মি. আগে',   avatar: 'RH', color: 'emerald' },
    { user: 'Sumaiya Akter', action: 'সাবস্ক্রিপশন আপগ্রেড করেছে',  exam: 'প্রিমিয়াম প্ল্যান', score: '',    time: '১৫ মি. আগে',  avatar: 'SA', color: 'violet' },
    { user: 'Tanvir Ahmed',  action: 'প্রশ্ন সমাধান করেছে',          exam: 'Bank Job Prep',  score: '72%', time: '১ ঘ. আগে',    avatar: 'TA', color: 'blue' },
    { user: 'Nusrat Jahan',  action: 'রিভিউ দিয়েছে',                exam: 'Govt. Job',      score: '4.8★', time: '২ ঘ. আগে',   avatar: 'NJ', color: 'amber' },
    { user: 'Fahim Uddin',   action: 'লাইভ ক্লাসে যোগ দিয়েছে',      exam: 'Math Special',   score: '',    time: '৩ ঘ. আগে',    avatar: 'FU', color: 'cyan' },
  ];

  const topExams = [
    { name: 'BCS Preliminary',  participants: 3240, completion: 78, tag: 'ট্রেন্ডিং', tagColor: 'emerald', rank: 1 },
    { name: 'Bank Job Written',  participants: 2850, completion: 65, tag: 'ট্রেন্ডিং', tagColor: 'blue',    rank: 2 },
    { name: 'Govt. Job Prep',    participants: 2100, completion: 91, tag: 'হট 🔥',      tagColor: 'rose',    rank: 3 },
  ];

  const quickActions = [
    { label: 'ব্যবহারকারী', icon: UsersIcon },
    { label: 'প্রশ্ন প্রকাশ', icon: DocumentTextIcon },
    { label: 'রিপোর্ট', icon: ChartBarIcon },
  ];

  return (
    // forced light class এবং ব্যাকগ্রাউন্ড ডট প্যাটার্ন মোটিফ যা ইমেজ ১ এর ডিজাইন নিশ্চিত করে
    <div className="light flex w-full min-h-screen bg-[#fafbfc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] text-slate-800 font-sans antialiased selection:bg-emerald-500/10">
      
      {/* বাম পাশের আইসোলেটেড প্রিমিয়াম সাইডবার রেপ */}
      <div className="w-64 flex-shrink-0 min-h-screen sticky top-0 border-r border-slate-200/80 bg-white z-30">
        <Sidebar />
      </div>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">

        {/* ── Topbar (Clean Isolated Glass Element) ──────────────── */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-10 py-5">
          
          {/* রিফাইন্ড সার্চবার */}
          <div className="relative hidden md:block w-full max-w-sm">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="গ্লোবাল সার্চ..."
              className="w-full h-11 rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
            />
          </div>

          <div className="flex items-center gap-5 ml-auto">
            {/* ডেট চিপ */}
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 h-11 text-xs text-slate-600 font-black tracking-wide uppercase">
              <CalendarDaysIcon className="h-4 w-4 text-slate-400" />
              ১৩ জুন ২০২৬
            </div>

            {/* নোটিফিকেশন বাটন */}
            <button className="relative h-11 w-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
              <BellIcon className="h-5 w-5 stroke-[2]" />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            <div className="h-5 w-[1px] bg-slate-200/80" />

            {/* প্রোফাইল প্যানেল */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm cursor-pointer hover:border-slate-300 transition-all">
              <div className="h-7 w-7 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-emerald-600/20">A</div>
              <p className="text-sm font-black text-slate-800 hidden sm:block">Admin</p>
              <ChevronDownIcon className="h-3.5 w-3.5 text-slate-400 stroke-[2.5]" />
            </div>
          </div>
        </header>

        {/* ── ড্যাশবোর্ড বডি ──────────────────────────── */}
        <div className="max-w-[1500px] mx-auto px-10 py-10 space-y-10">

          {/* ── আর্কিটেকচারাল হেডার ─────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">সিস্টেম কনসোল</p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">প্ল্যাটফর্ম ওভারভিউ</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">সবগুলো কোর অ্যানালিটিক্স এবং রিয়েল-টাইম মেট্রিক্স ট্র্যাক করুন।</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* স্লাইডিং ট্যাব কন্ট্রোল */}
              <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1.5 border border-slate-200/60">
                {(['week', 'month', 'year'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-5 py-2 rounded-xl text-xs font-black tracking-wide transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-sm border border-slate-200/30' : 'text-slate-400 hover:text-slate-700'}`}
                  >
                    {t === 'week' ? 'সাপ্তাহিক' : t === 'month' ? 'মাসিক' : 'বার্ষিক'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-emerald-700 tracking-wide">১,২৪০ লাইভ ইউজার</span>
              </div>
            </div>
          </div>

          {/* ── স্ট্যাটস ৮-কার্ড ম্যাট্রিক্স ──────────────────────── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((c, i) => <StatCard key={i} {...c} />)}
          </div>

          {/* ── টু-কলাম ডাটা মডিউল ────────────────────── */}
          <div className="grid gap-8 lg:grid-cols-5">

            {/* বাম কলাম: ট্র্যাকিং ডাটা লিস্টিং */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">সাম্প্রতিক কার্যকলাপ</h3>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">রিয়েল-টাইম অ্যাকশন স্ট্রিম</p>
                  </div>
                  <button className="text-xs font-black text-emerald-700 border border-emerald-200 hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition-all">
                    সব দেখুন
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {recentActivities.map((a, i) => (
                    <div key={i} className="flex items-center gap-5 px-8 py-5 hover:bg-slate-50/40 transition-colors">
                      <Avatar initials={a.avatar} color={a.color} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900">{a.user}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-2">
                          {a.action} · <span className="text-slate-800 font-extrabold bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md text-[11px]">{a.exam}</span>
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right space-y-2.5">
                        {a.score ? (
                          <span className="inline-block text-xs font-black px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {a.score}
                          </span>
                        ) : (
                          <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-400 border border-slate-200/40">
                            N/A
                          </span>
                        )}
                        <p className="text-[11px] font-bold text-slate-400">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ডান কলাম: রেংকিং প্যানেল এবং কুইক ম্যাক্রোস */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* জনপ্রিয় এক্সাম প্যানেল */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden">
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">জনপ্রিয় পরীক্ষা</h3>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">পার্টিসিপেশন রেট ইনডেক্স</p>
                  </div>
                  <EllipsisHorizontalIcon className="h-6 w-6 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
                </div>

                <div className="p-6 space-y-4">
                  {topExams.map((exam, i) => {
                    const barColors: Record<string, string> = {
                      emerald: 'bg-emerald-500',
                      blue:    'bg-blue-500',
                      rose:    'bg-rose-500',
                    };
                    return (
                      <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-black text-slate-400">0{exam.rank}</span>
                              <p className="text-sm font-bold text-slate-900">{exam.name}</p>
                            </div>
                            <p className="text-xs font-bold text-slate-500">{exam.participants.toLocaleString()} জন পরীক্ষার্থী</p>
                          </div>
                          <span className="text-[10px] font-black tracking-wide px-2.5 py-0.5 rounded-full border bg-white text-slate-700 shadow-sm">
                            {exam.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${barColors[exam.tagColor]}`}
                              style={{ width: `${exam.completion}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-slate-700 w-10 text-right">{exam.completion}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* কুইক অ্যাকশন ম্যাক্রোস */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.01)] p-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 pl-2">দ্রুত অ্যাকশন প্যানেল</p>
                <div className="grid grid-cols-3 gap-3">
                  {quickActions.map(({ label, icon: Icon }, i) => (
                    <button
                      key={i}
                      className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-emerald-200 hover:bg-emerald-50/30 group transition-all active:scale-[0.97]"
                    >
                      <div className="h-12 w-12 rounded-xl bg-white border border-slate-200/60 group-hover:border-emerald-200 group-hover:bg-white flex items-center justify-center transition-all shadow-sm">
                        <Icon className="h-5 w-5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-800 transition-colors text-center leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}