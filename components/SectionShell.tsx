'use client';

import Sidebar from '@/components/Sidebar';

type SectionShellProps = {
  title: string;
  description: string;
};

const quickItems = ['Review pending items', 'Publish new content', 'Check engagement trends'];

export default function SectionShell({ title, description }: SectionShellProps) {
  return (
    <div className="min-h-screen text-slate-50">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18)_0%,_transparent_45%),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.12)_0%,_transparent_38%)]" />

      <div className="relative flex min-h-screen">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-6 py-10 md:px-12">
          {/* Premium Page Header */}
          <section className="mb-8 rounded-[28px] border border-emerald-400/10 bg-gradient-to-r from-emerald-950/70 via-slate-950/60 to-teal-950/60 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-100/70">Admin workspace</p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/85">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-950/40 px-4 py-2.5">
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-100/70">Status</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-200">In progress</p>
                </div>
                <div className="rounded-2xl border border-slate-200/10 bg-slate-950/40 px-4 py-2.5">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-200/60">Updates</p>
                  <p className="mt-1 text-sm font-semibold text-white">Today</p>
                </div>
              </div>
            </div>
          </section>

          {/* Premium Content Grid */}
          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="card">
              <div className="flex items-center justify-between gap-4 border-b border-emerald-400/10 pb-5 px-6 pt-6">
                <div>
                  <p className="text-sm text-emerald-100/70">Workspace overview</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">Operational insights</h2>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-50">
                  Live
                </span>
              </div>

              <div className="px-6 pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ['Updated', 'Today'],
                    ['Visibility', 'Admin-only'],
                    ['Priority', 'High'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-emerald-400/10 bg-slate-950/60 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-400/20"
                    >
                      <p className="text-sm text-slate-300">{label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-300">Notes</p>
                  <p className="mt-2 text-slate-200/85 text-sm leading-relaxed">
                    {`This section is styled to match the rest of the admin panel and can be extended with real data cards, tables, or forms when the backend is ready.`}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="btn-primary inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-bold">
                    Manage {title}
                  </button>
                  <button className="btn-secondary inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-bold border border-emerald-400/10">
                    View details
                  </button>
                </div>
              </div>
            </div>

            <aside className="card">
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-xl font-semibold text-white">Quick actions</h2>
                <p className="mt-2 text-sm text-slate-200/80">Shortcuts for daily admin tasks</p>
              </div>

              <div className="px-6 pt-4 space-y-3 pb-6">
                {quickItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="w-full text-left rounded-2xl border border-emerald-400/10 bg-slate-950/60 px-4 py-3 text-slate-200/85 transition-all hover:border-emerald-400/20 hover:bg-slate-950/75"
                  >
                    <span className="text-sm font-semibold">{item}</span>
                  </button>
                ))}
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

