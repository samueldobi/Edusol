"use client";
import React, { useState } from 'react';
import { deleteAssignment, AssignmentType } from '@/app/src/api/services/schoolService';

interface DeleteConfirmModalProps {
  assignment: AssignmentType;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ assignment, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Attempting to delete assignment with ID:", assignment.id);
      console.log("Delete URL will be:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/schools/assignments/${assignment.id}/`);
      
      await deleteAssignment(assignment.id);
      console.log("Successfully deleted assignment with ID:", assignment.id);
      
      onDelete();
    } catch (err: any) {
      console.error("Error deleting assignment:", err);
      console.error("Delete error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config,
        url: err.config?.url,
        method: err.config?.method,
        headers: err.config?.headers
      });
      
      if (err.response?.data) {
        console.error("Full delete error response:", JSON.stringify(err.response.data, null, 2));
      }
      
      setError(`Failed to delete assignment: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-red-600 text-lg font-bold mb-2">Delete Assignment?</h2>
        <p className="text-gray-600 mb-4">Are you sure you want to delete this assignment?</p>
        
        <div className="bg-gray-50 p-3 rounded mb-4 text-left">
          <p className="text-sm font-medium text-gray-800">Assignment Details:</p>
          <p className="text-sm text-gray-600">Title: {assignment.title}</p>
          <p className="text-sm text-gray-600">Due Date: {new Date(assignment.due_date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">Type: {assignment.assignment_type}</p>
          <p className="text-sm text-gray-600">Status: {assignment.status || 'active'}</p>
        </div>
        
        <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
        
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
