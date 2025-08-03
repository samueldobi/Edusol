"use client";
import { useState, useEffect } from 'react';
import { SubjectType, updateSubject, deleteSubject } from '@/app/src/api/services/schoolService';

interface SubjectDetailsModalProps {
  subject: SubjectType | null;
  isOpen: boolean;
  onClose: () => void;
  onSubjectUpdated: () => void;
  onSubjectDeleted: () => void;
}

export default function SubjectDetailsModal({ 
  subject, 
  isOpen, 
  onClose, 
  onSubjectUpdated, 
  onSubjectDeleted 
}: SubjectDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    subject_name: '',
    subject_code: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (subject) {
      setEditForm({
        subject_name: subject.subject_name || '',
        subject_code: subject.subject_code || '',
        description: subject.description || '',
      });
    }
  }, [subject, isEditing]);

  const handleInputChange = (field: keyof typeof editForm, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateSubject = async () => {
    if (!subject?.id) return;

    setLoading(true);
    setError(null);

    try {
      const updatePayload = {
        subject_name: editForm.subject_name.trim(),
        subject_code: editForm.subject_code.trim(),
        description: editForm.description.trim() || null,
      };

      await updateSubject(subject.id, updatePayload);
      setIsEditing(false);
      onSubjectUpdated();
    } catch (err: any) {
      setError(err.message || 'Failed to update subject');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async () => {
    if (!subject?.id) return;

    setLoading(true);
    setError(null);

    try {
      await deleteSubject(subject.id);
      onSubjectDeleted();
    } catch (err: any) {
      setError(err.message || 'Failed to delete subject');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !subject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditing ? 'Edit Subject' : 'Subject Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-2xl">
                    {subject.subject_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{subject.subject_name}</h3>
                  <p className="text-green-600 font-semibold">{subject.subject_code}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Subject Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Subject Name</label>
                      <p className="text-gray-900">{subject.subject_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Subject Code</label>
                      <p className="text-gray-900">{subject.subject_code}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <p className="text-gray-900">{subject.description || 'No description available'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Additional Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Created By</label>
                      <p className="text-gray-900">{subject.created_by || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Created Date</label>
                      <p className="text-gray-900">
                        {new Date(subject.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Updated</label>
                      <p className="text-gray-900">
                        {new Date(subject.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors"
                >
                  Edit Subject
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  Delete Subject
                </button>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.subject_name}
                    onChange={(e) => handleInputChange('subject_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter subject name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Subject Code *
                  </label>
                  <input
                    type="text"
                    value={editForm.subject_code}
                    onChange={(e) => handleInputChange('subject_code', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter subject code"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter subject description"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubject}
                  disabled={loading || !editForm.subject_name.trim() || !editForm.subject_code.trim()}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    'Update Subject'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Subject
                </h3>
                <div className="text-sm text-gray-500 mb-6">
                  <p>Are you sure you want to delete this subject?</p>
                  <div className="mt-2 text-left bg-gray-50 p-3 rounded">
                    <p><strong>Name:</strong> {subject.subject_name}</p>
                    <p><strong>Code:</strong> {subject.subject_code}</p>
                  </div>
                  <p className="mt-2 text-red-600">This action cannot be undone.</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubject}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 