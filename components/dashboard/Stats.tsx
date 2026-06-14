'use client';

type DashboardStats = {
  totalUsers: number;
  totalQuestions: number;
  totalRevenue: string;
  activeSubscriptions: number;
  dailyActive: number;
  totalExams: number;
  totalJobs: number;
  averageScore: string;
};

type StatsProps = {
  stats: DashboardStats;
};

const statCards = [
  { key: 'totalUsers', label: 'মোট ব্যবহারকারী', tone: 'emerald' },
  { key: 'totalQuestions', label: 'মোট প্রশ্ন', tone: 'blue' },
  { key: 'totalRevenue', label: 'মোট আয়', tone: 'violet' },
  { key: 'activeSubscriptions', label: 'সক্রিয় সাবস্ক্রিপশন', tone: 'amber' },
  { key: 'dailyActive', label: 'দৈনিক সক্রিয়', tone: 'rose' },
  { key: 'totalExams', label: 'মোট পরীক্ষা', tone: 'cyan' },
  { key: 'totalJobs', label: 'মোট চাকরি', tone: 'teal' },
  { key: 'averageScore', label: 'গড় স্কোর', tone: 'indigo' },
] as const;

const toneClasses: Record<(typeof statCards)[number]['tone'], string> = {
  emerald: 'bg-emerald-100',
  blue: 'bg-blue-100',
  violet: 'bg-violet-100',
  amber: 'bg-amber-100',
  rose: 'bg-rose-100',
  cyan: 'bg-cyan-100',
  teal: 'bg-teal-100',
  indigo: 'bg-indigo-100',
};

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => (
        <article key={card.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{card.label}</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{String(stats[card.key])}</p>
          <div className={`mt-4 h-1.5 rounded-full ${toneClasses[card.tone]}`} />
        </article>
      ))}
    </div>
  );
}
