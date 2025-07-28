"use client";
import React, { useState } from 'react';
import { deleteAssignment } from '@/app/src/api/services/schoolService';

interface DeleteConfirmModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      // Generate a random ID for now
      const randomId = Math.random().toString(36).substr(2, 9);
      
      await deleteAssignment(randomId);
      console.log("Deleted assignment with ID:", randomId);
      
      onDelete();
    } catch (err: any) {
      console.error("Error deleting assignment:", err);
      setError("Failed to delete assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-red-600 text-lg font-bold mb-2">Delete Assignment?</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this assignment? This action cannot be undone.</p>
        
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
