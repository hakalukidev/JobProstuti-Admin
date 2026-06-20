'use client';

import { apiService } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(''); // ✅ খালি
  const [password, setPassword] = useState(''); // ✅ খালি
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAlert(false);

    try {
      console.log('🔐 Logging in with:', email);
      
      // ✅ apiService.login ব্যবহার করুন
      const response = await apiService.login(email, password);
      
      console.log('📥 Login response:', response);
      
      if (response.success && response.token) {
        localStorage.setItem('admin_token', response.token);
        apiService.setToken(response.token);
        console.log('✅ Token saved');
        
        document.cookie = 'isLoggedIn=true; path=/; max-age=86400; SameSite=Strict';
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
        
        return;
      }

      setShowAlert(true);
    } catch {
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 text-slate-900 font-sans antialiased flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden selection:bg-emerald-600 selection:text-white">
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: LOGIN FORM */}
        <div className="w-full sm:max-w-md mx-auto lg:max-w-none lg:col-span-5 flex flex-col justify-center">
          
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200 flex-shrink-0">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Job Prostuti</h1>
              <p className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase mt-0.5">Learn & Grow</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">স্বাগতম</h2>
            <p className="text-sm text-slate-500 mt-2">অ্যাডমিন প্যানেলে প্রবেশ করতে আপনার ক্রেডেনশিয়াল দিন</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-2">
                ইমেইল ঠিকানা
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={isLoading}
                placeholder="আপনার ইমেইল লিখুন" // ✅ পরিবর্তন
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-50 disabled:text-slate-400 shadow-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  পাসওয়ার্ড
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  placeholder="আপনার পাসওয়ার্ড লিখুন" // ✅ পরিবর্তন
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-50 disabled:text-slate-400 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {showAlert && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl p-3.5 flex items-center gap-2.5">
                <svg className="w-4 h-4 text-rose-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>ইমেইল বা পাসওয়ার্ড ভুল হয়েছে</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-200 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:from-none disabled:to-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden lg:flex lg:col-span-7 flex-col gap-6 w-full">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-100 shadow-xl shadow-emerald-100/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 w-full h-[400px]">
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Job Prostuti Admin Dashboard"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-emerald-900/80 to-transparent">
              <p className="text-lg font-bold text-white">Job Prostuti Admin Panel</p>
              <p className="text-sm text-white/80 mt-1">প্ল্যাটফর্ম পরিচালনা করুন আত্মবিশ্বাসের সাথে</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex -space-x-2">
                  {['🎓', '📚', '💼', '📊'].map((emoji, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs">
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-white/80">১৫,৪২০+ সক্রিয় ব্যবহারকারী</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              { title: 'মোট ব্যবহারকারী', value: '১৫,৪২০', icon: '👥', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
              { title: 'সক্রিয় সাবস্ক্রিপশন', value: '৫,৪০১', icon: '📊', color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50' },
              { title: 'মোট পরীক্ষা', value: '২৫৬', icon: '📝', color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
            ].map((metric, idx) => (
              <div key={idx} className={`${metric.bg} rounded-xl p-4 border border-${metric.color.split(' ')[1].replace('from-', '')}/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{metric.icon}</span>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${metric.color} opacity-20`}></div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">{metric.title}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-emerald-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-slate-500">সিস্টেম সচল</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">🔒 SSL সুরক্ষিত</span>
              <span className="text-xs text-slate-400">⚡ রিয়েল-টাইম আপডেট</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}