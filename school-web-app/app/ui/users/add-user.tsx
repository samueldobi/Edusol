"use client";
import { useState } from 'react';
import { createUser } from '../../src/api/services/schoolService';

interface AddUserModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddUserModal({ onClose, onSuccess }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    user_type: 'teacher' as 'admin' | 'teacher' | 'guardian',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive',
    // Additional fields for specific user types
    subject: '',
    qualification: '',
    description: '',
    role: 'Admin',
    permissions: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userTypes = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
    { value: 'guardian', label: 'Guardian' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError('First name and last name are required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    // Validate additional fields based on user type
    if (formData.user_type === 'teacher' && !formData.subject.trim()) {
      setError('Subject is required for teachers');
      return;
    }

    if (formData.user_type === 'admin' && !formData.role.trim()) {
      setError('Role is required for admins');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createUser(formData);
      
      // Reset form
      setFormData({
        user_type: 'teacher',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        status: 'active',
        subject: '',
        qualification: '',
        description: '',
        role: 'Admin',
        permissions: '',
      });
      
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      console.error('Failed to create user:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user. Please try again.';
      setError(errorMessage);
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
          <h2 className="text-xl font-bold text-gray-800">Add New User</h2>
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

          {/* User Type */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              User Type *
            </label>
            <select
              value={formData.user_type}
              onChange={(e) => handleInputChange('user_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {userTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter first name"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Teacher-specific fields */}
          {formData.user_type === 'teacher' && (
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Teacher Information</h3>
              
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter subject"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Qualification
                </label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter qualification"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Admin-specific fields */}
          {formData.user_type === 'admin' && (
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Admin Information</h3>
              
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Role *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter role"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Permissions
                </label>
                <textarea
                  value={formData.permissions}
                  onChange={(e) => handleInputChange('permissions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter permissions"
                  rows={3}
                />
              </div>
            </div>
          )}

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
                'Add User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 