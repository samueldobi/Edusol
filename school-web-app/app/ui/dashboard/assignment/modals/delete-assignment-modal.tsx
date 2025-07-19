import React from 'react';

interface DeleteConfirmModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-red-600 text-lg font-bold mb-2">Delete Assignment?</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this assignment? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
