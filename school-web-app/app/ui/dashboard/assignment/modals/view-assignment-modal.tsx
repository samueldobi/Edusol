"use client";
import { AssignmentType } from "@/app/src/api/services/schoolService";

interface ViewAssignmentModalProps {
  assignment: AssignmentType;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ViewAssignmentModal({ 
  assignment, 
  onClose, 
  onEdit, 
  onDelete 
}: ViewAssignmentModalProps) {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    if (status === 'submitted') {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[#1AA939] font-bold text-xl uppercase">Assignment Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Assignment Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Assignment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Title</label>
                <p className="text-lg font-semibold text-gray-900">{assignment.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(assignment.status || '')}`}>
                  {assignment.status === 'submitted' ? 'SUBMITTED' : 'NOT SUBMITTED'}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Description</label>
              <p className="text-sm text-gray-700 mt-1">{assignment.description}</p>
            </div>
          </div>

          {/* Date Information */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Date Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Due Date</label>
                <p className="text-sm text-gray-700">{formatDate(assignment.due_date)}</p>
                <p className="text-xs text-gray-500">{formatTime(assignment.due_date)}</p>
              </div>
              {assignment.start_date && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">Start Date</label>
                  <p className="text-sm text-gray-700">{formatDate(assignment.start_date)}</p>
                  <p className="text-xs text-gray-500">{formatTime(assignment.start_date)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assignment Type */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Assignment Type</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Type</label>
                <p className="text-sm text-gray-700 capitalize">{assignment.assignment_type}</p>
              </div>
              {assignment.created_at && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">Created</label>
                  <p className="text-sm text-gray-700">{formatDate(assignment.created_at)}</p>
                  <p className="text-xs text-gray-500">{formatTime(assignment.created_at)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          {assignment.updated_at && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Additional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="text-sm text-gray-700">{formatDate(assignment.updated_at)}</p>
                  <p className="text-xs text-gray-500">{formatTime(assignment.updated_at)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button 
            onClick={onDelete} 
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
          >
            Delete Assignment
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={onEdit} 
              className="px-6 py-2 bg-[#1AA939] text-white font-bold rounded hover:bg-[#1d5329] transition-colors"
            >
              Edit Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 