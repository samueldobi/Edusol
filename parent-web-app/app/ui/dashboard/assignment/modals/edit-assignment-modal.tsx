"use client";
import { useState, useEffect } from 'react';
import { partialUpdateAssignment, AssignmentType } from '@/app/src/api/services/schoolService';

interface EditAssignmentModalProps {
  assignment: AssignmentType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditAssignmentModal({ assignment, isOpen, onClose, onSuccess }: EditAssignmentModalProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    assignment_type: 'homework' as 'homework' | 'classwork' | 'test' | 'project',
    status: 'submitted' as const,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (assignment) {
      setForm({
        title: assignment.title || '',
        description: assignment.description || '',
        due_date: assignment.due_date ? new Date(assignment.due_date).toISOString().split('T')[0] : '',
        assignment_type: assignment.assignment_type || 'homework',
        status: assignment.status || 'submitted',
      });
    }
  }, [assignment]);

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: field === 'assignment_type' ? (value as 'homework' | 'classwork' | 'test' | 'project') : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignment.id || !form.title || !form.due_date) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatePayload = {
        title: form.title.trim(),
        description: form.description.trim(),
        due_date: new Date(form.due_date).toISOString().split('T')[0],
        assignment_type: form.assignment_type,
        status: form.status,
      };

      await partialUpdateAssignment(assignment.id, updatePayload);
      onSuccess();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update assignment. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Edit Assignment</h2>
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
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter assignment title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter assignment description"
              rows={3}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Due Date *
            </label>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => handleInputChange('due_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Assignment Type
            </label>
            <select
              value={form.assignment_type}
              onChange={(e) => handleInputChange('assignment_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="homework">Homework</option>
              <option value="classwork">Classwork</option>
              <option value="test">Test</option>
              <option value="project">Project</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="submitted">Submitted</option>
            </select>
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
                  Updating...
                </>
              ) : (
                'Update Assignment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
