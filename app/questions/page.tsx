'use client';

import Sidebar from '@/components/Sidebar';

export default function Questions() {
  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto p-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Questions</h1>
        <p className='text-gray-600 mt-2'>এই পেজটি তৈরি করা হচ্ছে...</p>
      </main>
    </div>
  );
}
