"use client";
import { useState, useEffect } from 'react';
import { FeeType, updateFee, deleteFee } from '@/app/src/api/services/schoolService';
import Image from 'next/image';

interface FeeDetailsModalProps {
  fee: FeeType | null;
  isOpen: boolean;
  onClose: () => void;
  onFeeUpdated: () => void;
  onFeeDeleted: () => void;
}

export default function FeeDetailsModal({ 
  fee, 
  isOpen, 
  onClose, 
  onFeeUpdated, 
  onFeeDeleted 
}: FeeDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [editForm, setEditForm] = useState({
    fee_type: "",
    fee_amount: 0,
  });

  // Update form when fee changes or when entering edit mode
  useEffect(() => {
    if (fee) {
      setEditForm({
        fee_type: fee.fee_type || "",
        fee_amount: fee.fee_amount || 0,
      });
    }
  }, [fee, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ 
      ...prev, 
      [name]: name === 'fee_amount' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSave = async () => {
    if (!fee) return;
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await updateFee(fee.id, editForm);
      setSuccess("Fee updated successfully!");
      setIsEditing(false);
      onFeeUpdated();
      
      // Clear success message after 2 seconds
      setTimeout(() => setSuccess(""), 2000);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        const errorMessage = response?.data?.message || 'Failed to update fee. Please try again.';
        setError(errorMessage);
      } else {
        setError('Failed to update fee. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!fee) return;
    
    setIsDeleting(true);
    setError("");
    
    try {
      await deleteFee(fee.id);
      onFeeDeleted();
      onClose();
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        const errorMessage = response?.data?.message || 'Failed to delete fee. Please try again.';
        setError(errorMessage);
      } else {
        setError('Failed to delete fee. Please try again.');
      }
      setIsDeleting(false);
    }
  };

  if (!isOpen || !fee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#1AA939] px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                <Image src="/Images/fees.png" alt="fee-icon" width={24} height={24} />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">Fee Details</h2>
                <p className="text-white/80 text-sm">
                  {fee.fee_type}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold"
            >
              x
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Fee Information */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {fee.fee_type}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: {fee.id}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Fee Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">💵</span>
                Fee Information
              </h4>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                    <input
                      type="text"
                      name="fee_type"
                      value={editForm.fee_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Tuition Fee, Library Fee"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Amount (₦)</label>
                    <input
                      type="number"
                      name="fee_amount"
                      value={editForm.fee_amount}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Fee Type:</span>
                    <p className="font-medium">{fee.fee_type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Fee Amount:</span>
                    <p className="font-medium text-green-600 text-lg">
                      ₦{fee.fee_amount?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* System Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">⚙️</span>
                System Information
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-blue-600">Created:</span>
                  <p className="font-medium text-blue-800">
                    {new Date(fee.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-blue-600">Last Updated:</span>
                  <p className="font-medium text-blue-800">
                    {new Date(fee.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <span className="mr-2">✏️</span>
                  Edit Fee
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete the "${fee.fee_type}" fee? This action cannot be undone.`)) {
                      handleDelete();
                    }
                  }}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🗑️</span>
                      Delete Fee
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 