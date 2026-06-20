'use client';

import { apiService } from '@/services/api';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

const categories = [
  { value: 'bcs', label: 'বিসিএস' },
  { value: 'bank', label: 'ব্যাংক' },
  { value: 'primary', label: 'প্রাইমারি' },
  { value: 'job-solution', label: 'জব সল্যুশন' }
];

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [formData, setFormData] = useState({
    text: '',
    options: { A: '', B: '', C: '', D: '' },
    correctOption: 'A',
    explanation: '',
    marks: 1,
    difficulty: 'medium',
    category: 'bcs'
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin/questions');
      setQuestions(response.data || []);
    } catch (err: any) {
      console.error('Error fetching questions:', err);
      setError('প্রশ্ন লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const resetForm = () => {
    setFormData({
      text: '',
      options: { A: '', B: '', C: '', D: '' },
      correctOption: 'A',
      explanation: '',
      marks: 1,
      difficulty: 'medium',
      category: 'bcs'
    });
    setEditing(false);
    setEditId('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const dataToSend = {
        ...formData,
        marks: Number(formData.marks)
      };

      let response;
      if (editing && editId) {
        response = await apiService.put(`/admin/questions/${editId}`, dataToSend);
      } else {
        response = await apiService.post('/admin/content/questions', dataToSend);
      }

      if (response.success) {
        setSuccess(editing ? '✅ প্রশ্ন আপডেট হয়েছে!' : '✅ নতুন প্রশ্ন যোগ হয়েছে!');
        resetForm();
        fetchQuestions();
      } else {
        setError(response.message || 'Failed to save');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    }
  };

  const editQuestion = (q: any) => {
    setFormData({
      text: q.text,
      options: q.options,
      correctOption: q.correctOption,
      explanation: q.explanation || '',
      marks: q.marks || 1,
      difficulty: q.difficulty || 'medium',
      category: q.category
    });
    setEditing(true);
    setEditId(q._id);
  };

  const deleteQuestion = async (id: string) => {
    if (!confirm('আপনি কি এই প্রশ্নটি ডিলিট করতে চান?')) return;
    
    try {
      const response = await apiService.delete(`/admin/questions/${id}`);
      if (response.success) {
        setSuccess('✅ প্রশ্ন ডিলিট হয়েছে!');
        fetchQuestions();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    }
  };

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter((q: any) => q.category === selectedCategory);

  return (
    <div className="flex min-h-screen bg-[#f7faf8]">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">প্রশ্ন ব্যবস্থাপনা</h1>
              <p className="text-sm text-slate-500">BCS, Bank, Primary, Job Solution এর প্রশ্ন যোগ/সম্পাদনা করুন</p>
            </div>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
            >
              + নতুন প্রশ্ন
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              সব ({questions.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === cat.value 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label} ({questions.filter((q: any) => q.category === cat.value).length})
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              {editing ? '✏️ প্রশ্ন সম্পাদনা করুন' : '➕ নতুন প্রশ্ন যোগ করুন'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    ক্যাটাগরি <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="easy">সহজ</option>
                    <option value="medium">মাঝারি</option>
                    <option value="hard">কঠিন</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  প্রশ্ন <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="প্রশ্ন লিখুন..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D'].map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      অপশন {key} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.options[key as keyof typeof formData.options]}
                      onChange={(e) => setFormData({
                        ...formData,
                        options: { ...formData.options, [key]: e.target.value }
                      })}
                      required
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder={`অপশন ${key}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    সঠিক উত্তর <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.correctOption}
                    onChange={(e) => setFormData({ ...formData, correctOption: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    নম্বর
                  </label>
                  <input
                    type="number"
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: Number(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    ব্যাখ্যা
                  </label>
                  <input
                    type="text"
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="ব্যাখ্যা (ঐচ্ছিক)"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
                  ❌ {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">
                  {success}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                  {editing ? '💾 আপডেট করুন' : '📝 সংরক্ষণ করুন'}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-medium"
                  >
                    বাতিল করুন
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Questions List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">
                প্রশ্ন তালিকা ({filteredQuestions.length})
              </h3>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
                <p className="mt-2 text-sm text-slate-500">লোড হচ্ছে...</p>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p className="text-lg">📭 কোন প্রশ্ন নেই</p>
                <p className="text-sm mt-1">উপরে ফর্ম ব্যবহার করে নতুন প্রশ্ন যোগ করুন</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                {filteredQuestions.map((q: any, idx: number) => (
                  <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            {categories.find(c => c.value === q.category)?.label || q.category}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {q.difficulty === 'easy' ? 'সহজ' : q.difficulty === 'medium' ? 'মাঝারি' : 'কঠিন'}
                          </span>
                          <span className="text-xs text-slate-400">#{idx + 1}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900">{q.text}</p>
                        <div className="mt-1 text-xs text-slate-500 space-x-2">
                          <span>A: {q.options.A}</span>
                          <span>B: {q.options.B}</span>
                          <span>C: {q.options.C}</span>
                          <span>D: {q.options.D}</span>
                          <span className="font-semibold text-emerald-600">
                            ✓ {q.correctOption}
                          </span>
                        </div>
                        {q.explanation && (
                          <p className="mt-1 text-xs text-slate-400">📝 {q.explanation}</p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4 flex-shrink-0">
                        <button
                          onClick={() => editQuestion(q)}
                          className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          ✏️ সম্পাদনা
                        </button>
                        <button
                          onClick={() => deleteQuestion(q._id)}
                          className="px-3 py-1 text-xs font-medium bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                        >
                          🗑️ ডিলিট
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
