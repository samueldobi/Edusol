"use client";
import { useState } from 'react';
import { deleteAssignment, AssignmentType } from '@/app/src/api/services/schoolService';

interface DeleteConfirmModalProps {
  assignment: AssignmentType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteConfirmModal({ assignment, isOpen, onClose, onSuccess }: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!assignment.id) {
      setError('Assignment ID not found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteAssignment(assignment.id);
      onSuccess();
      onClose(); // Close the modal after successful deletion
    } catch (err: any) {
      setError(err.message || 'Failed to delete assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
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
              Delete Assignment
            </h3>
            <div className="text-sm text-gray-500 mb-6">
              <p>Are you sure you want to delete this assignment?</p>
              <div className="mt-2 text-left bg-gray-50 p-3 rounded">
                <p><strong>Title:</strong> {assignment.title}</p>
                <p><strong>Due Date:</strong> {new Date(assignment.due_date).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {assignment.assignment_type}</p>
                <p><strong>Status:</strong> {assignment.status}</p>
              </div>
              <p className="mt-2 text-red-600">This action cannot be undone.</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
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
  );
}
