'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = () => {
    if (email === 'admin@jobprostuti.com' && password === 'admin123') {
      setShowAlert(false);
      setIsSuccess(true);
    } else {
      setShowAlert(true);
      setIsSuccess(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="font-sans min-h-screen bg-[#f0f2f1] flex items-center justify-center overflow-hidden relative select-none">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8eae9] via-[#f5f5f3] to-[#edf4f0] z-0"></div>

      {/* Concrete-like texture lines top-left */}
      <div className="absolute top-0 left-0 w-[260px] h-[260px] opacity-22 z-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, #d4d6d5 1px, transparent 1px),
            linear-gradient(45deg, #d4d6d5 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px'
        }}>
      </div>

      {/* Top-right texture */}
      <div className="absolute top-0 right-0 w-[220px] h-[220px] opacity-22 z-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, #d4d6d5 1px, transparent 1px),
            linear-gradient(45deg, #d4d6d5 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px'
        }}>
      </div>

      {/* Geometric accent corners */}
      <div className="absolute -top-5 -left-5 w-[180px] h-[180px] border-[28px] border-[#c8cac9] opacity-18 rotate-12 z-0"></div>
      <div className="absolute -bottom-[30px] -right-[30px] w-[150px] h-[150px] border-[22px] border-[#c8cac9] opacity-14 -rotate-8 z-0"></div>

      {/* Main wrapper */}
      <div className="relative z-10 flex items-center justify-center gap-7 w-full max-w-[1200px] px-5 py-8">

       {/* LOGIN CARD - with green glow hover effect */}
<div className="bg-white rounded-[26px] py-10 px-9 shadow-[0_20px_60px_rgba(0,0,0,0.07)] border border-[rgba(240,240,240,0.9)] w-full max-w-[420px] flex-shrink-0 transition-all duration-300 ease-in-out hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] hover:border-[#10b981] hover:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]">
  <div className="flex flex-col items-center mb-8">
    <div className="text-[#059669] mb-2 transition-transform duration-300 group-hover:scale-110">
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    </div>
    <div className="text-[22px] font-bold text-[#1e293b] tracking-tight">Job Prostuti</div>
    <div className="text-[11px] font-semibold tracking-wide text-[#059669] mt-1">Learn &amp; Grow</div>
  </div>

  <div className="mb-[18px]">
    <label className="block text-[13px] font-semibold text-[#374151] mb-[7px] ml-[10px]">Email</label>
    <input
      type="email"
      placeholder="admin@jobprostuti.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full max-w-[390px] ml-[10px] h-11 rounded-xl border border-[#e2e4e3] bg-[#f9fafb] px-4 text-sm text-[#1e293b] outline-none transition-all duration-200 focus:border-[#10b981] focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] placeholder:text-[#9ca3af] hover:border-[#10b981]"
    />
  </div>

  <div className="mb-[18px]">
    <label className="block text-[13px] font-semibold text-[#374151] mb-[7px] ml-[10px]">Password</label>
    <input
      type="password"
      placeholder="••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full max-w-[390px] ml-[10px] h-11 rounded-xl border border-[#e2e4e3] bg-[#f9fafb] px-4 text-sm text-[#1e293b] outline-none transition-all duration-200 focus:border-[#10b981] focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] placeholder:text-[#9ca3af] hover:border-[#10b981]"
    />
  </div>

  <button
    onClick={handleLogin}
    className={`w-full h-11 rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(5,150,105,0.18)] transition-all duration-200 active:scale-[0.99] ${
      isSuccess 
        ? 'bg-[#047857] text-white hover:bg-[#065f46]' 
        : 'bg-[#059669] text-white hover:bg-[#047857] hover:shadow-[0_6px_20px_rgba(5,150,105,0.25)] hover:-translate-y-0.5'
    }`}
  >
    {isSuccess ? '✓ Login Successful' : 'Login'}
  </button>

  <div className={`mt-3.5 bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-xs font-semibold rounded-xl py-2.5 px-3.5 text-center transition-all duration-200 ${showAlert ? 'block' : 'hidden'}`}>
    ইমেইল বা পাসওয়ার্ড ভুল
  </div>
</div>

      </div>
    </div>
  );
}