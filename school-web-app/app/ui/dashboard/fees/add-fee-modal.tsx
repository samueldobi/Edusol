"use client";
import { useState } from 'react';
import { createFee } from '@/app/src/api/services/schoolService';

interface AddFeeModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddFeeModal({ onClose, onSuccess }: AddFeeModalProps) {
  const [formData, setFormData] = useState({
    fee_type: '',
    fee_amount: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'fee_amount' ? (typeof value === 'string' ? parseFloat(value) || 0 : value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fee_type.trim()) {
      setError('Fee type is required');
      return;
    }

    if (formData.fee_amount <= 0) {
      setError('Fee amount must be greater than 0');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createFee(formData);
      
      // Reset form
      setFormData({
        fee_type: '',
        fee_amount: 0,
      });
      
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('Failed to create fee:', err);
      setError(err.message || 'Failed to create fee. Please try again.');
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
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Add New Fee</h2>
              <p className="text-sm text-gray-600">Create a new fee for the school</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Fee Type */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Fee Type *
            </label>
            <input
              type="text"
              value={formData.fee_type}
              onChange={(e) => handleInputChange('fee_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Tuition Fee, Library Fee, Sports Fee"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter a descriptive name for the fee
            </p>
          </div>

          {/* Fee Amount */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Fee Amount (₦) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">₦</span>
              <input
                type="number"
                value={formData.fee_amount}
                onChange={(e) => handleInputChange('fee_amount', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder=""
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Enter the amount in Nigerian Naira
            </p>
          </div>

          {/* Fee Examples */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Common Fee Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
              <div>• Tuition Fee</div>
              <div>• Library Fee</div>
              <div>• Sports Fee</div>
              <div>• Laboratory Fee</div>
              <div>• Examination Fee</div>
              <div>• Transportation Fee</div>
            </div>
          </div>

          {/* Action Buttons */}
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
                  Adding...
                </>
              ) : (
                <>
                  <span>💰</span>
                  Add Fee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 