'use client';

import { apiService } from '@/services/api';
import { useEffect, useState } from 'react';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    order: 0
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await apiService.get('/faqs/admin/all');
      setFaqs(response.data.faqs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await apiService.put(`/faqs/${editingId}`, formData);
      } else {
        await apiService.post('/faqs', formData);
      }
      
      resetForm();
      fetchFAQs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq._id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      order: faq.order
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    
    try {
      await apiService.delete(`/faqs/${id}`);
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await apiService.put(`/faqs/${id}`, { isActive: !currentStatus });
      fetchFAQs();
    } catch (error) {
      console.error('Error toggling FAQ:', error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      question: '',
      answer: '',
      category: '',
      order: 0
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">FAQ Management</h1>
      
      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Edit FAQ' : 'Add New FAQ'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question (Bengali)</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Answer (Bengali)</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="e.g., Account, Payment"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800"
            >
              {editingId ? 'Update FAQ' : 'Add FAQ'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-6 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* FAQ List */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="font-semibold">All FAQs ({faqs.length})</h2>
        </div>
        
        <div className="divide-y">
          {faqs.map((faq) => (
            <div key={faq._id} className="p-4 hover:bg-slate-50">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">
                    {faq.question}
                    {!faq.isActive && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">Inactive</span>
                    )}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{faq.answer}</p>
                  <div className="flex gap-2 mt-2">
                    {faq.category && (
                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {faq.category}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">Order: {faq.order}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActive(faq._id, faq.isActive)}
                    className={`text-xs px-3 py-1 rounded ${
                      faq.isActive 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {faq.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-xs px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}