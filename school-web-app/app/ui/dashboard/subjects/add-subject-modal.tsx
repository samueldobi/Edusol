"use client";
import { useState } from 'react';
import { createSubject, CreateSubjectPayload } from '@/app/src/api/services/schoolService';

interface AddSubjectModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSubjectModal({ onClose, onSuccess }: AddSubjectModalProps) {
  const [form, setForm] = useState({
    subject_name: '',
    subject_code: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.subject_name.trim() || !form.subject_code.trim()) {
      setError('Subject name and code are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload: CreateSubjectPayload = {
        subject_name: form.subject_name.trim(),
        subject_code: form.subject_code.trim(),
        description: form.description.trim() || null,
        created_by: "cdddc611-1fd3-4730-a819-9206c69b39d7",
        created_at: new Date().toISOString(),
        school: "cdddc611-1fd3-4730-a819-9206c69b39d7",
      };

      await createSubject(payload);
      
      setForm({
        subject_name: '',
        subject_code: '',
        description: '',
      });
      
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to create subject. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Add New Subject</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Subject Name *
            </label>
            <input
              type="text"
              value={form.subject_name}
              onChange={(e) => handleInputChange('subject_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter subject name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Subject Code *
            </label>
            <input
              type="text"
              value={form.subject_code}
              onChange={(e) => handleInputChange('subject_code', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter subject code"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter subject description"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                'Create Subject'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 