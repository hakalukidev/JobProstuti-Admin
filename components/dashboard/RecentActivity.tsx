'use client';

type ActivityItem = {
  id: string;
  user: string;
  action: string;
  exam: string;
  score?: string;
  time: string;
  avatar: string;
  color: 'emerald' | 'violet' | 'blue' | 'amber' | 'cyan';
};

type RecentActivityProps = {
  activities: ActivityItem[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Recent activity</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">সাম্প্রতিক কার্যকলাপ</h2>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white">
              {activity.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">{activity.user}</p>
              <p className="mt-1 text-sm text-slate-500">
                {activity.action} · <span className="font-semibold text-slate-800">{activity.exam}</span>
              </p>
            </div>
            <div className="text-right">
              {activity.score ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">{activity.score}</span>
              ) : null}
              <p className="mt-2 text-xs font-semibold text-slate-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
