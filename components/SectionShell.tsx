'use client';

import Sidebar from '@/components/Sidebar';

type SectionShellProps = {
  title: string;
  description: string;
};

const quickItems = ['Review pending items', 'Publish new content', 'Check engagement trends'];

export default function SectionShell({ title, description }: SectionShellProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans antialiased flex relative">
      
      {/* Subtle Editorial Minimalist Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 opacity-40 pointer-events-none" />

      {/* Sidebar Integration */}
      <Sidebar />

      {/* Main Content Terminal */}
      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-10 md:px-12 max-w-7xl mx-auto w-full">
        
        {/* Premium Clean Page Header */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Workspace</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                {description}
              </p>
            </div>

            {/* Badges System */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600/80">Status</p>
                <p className="mt-0.5 text-xs font-semibold text-emerald-700">In progress</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Updates</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-700">Today</p>
              </div>
            </div>
          </div>
        </section>

        {/* Workspace Content Grid */}
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          
          {/* LEFT INTERFACE: INSIGHTS & CONTROLS */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 px-6 pt-6">
              <div>
                <p className="text-xs font-medium text-slate-400">Workspace overview</p>
                <h2 className="mt-0.5 text-lg font-semibold text-slate-900">Operational insights</h2>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                Live
              </span>
            </div>

            <div className="p-6">
              {/* Information Cards Grid */}
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['Updated', 'Today'],
                  ['Visibility', 'Admin-only'],
                  ['Priority', 'High'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-slate-200"
                  >
                    <p className="text-xs font-medium text-slate-400">{label}</p>
                    <p className="mt-1.5 text-base font-semibold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>

              {/* Dynamic Content Area Notes */}
              <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Documentation Note</p>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  This section is styled to match the enterprise admin suite interface. It can be dynamically scaled with unified state data models, real-time tables, or structured analytical forms.
                </p>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="h-10 rounded-lg font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 transition-all px-4 py-2 shadow-sm">
                  Manage {title}
                </button>
                <button className="h-10 rounded-lg font-medium text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-all px-4 py-2">
                  View details
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT INTERFACE: QUICK ACTIONS TERMINAL */}
          <aside className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 h-fit">
            <div className="pb-4">
              <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
              <p className="mt-1 text-xs text-slate-400">Shortcuts for daily operational management</p>
            </div>

            <div className="space-y-2.5 pt-2">
              {quickItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="w-full text-left rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-slate-700 transition-all hover:border-slate-200 hover:bg-slate-50/80 flex items-center justify-between group"
                >
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">{item}</span>
                  <svg 
                    className="w-3.5 h-3.5 text-slate-400 transform transition-transform group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </aside>
          
        </section>
      </main>
    </div>
  );
}