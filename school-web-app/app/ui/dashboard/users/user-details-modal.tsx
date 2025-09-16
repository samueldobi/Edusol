"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CombinedUserType } from '@/app/dashboard/users/page';
import { updateUserCache, deleteUserCache, updateTeacherCache, deleteTeacherCache, updateAdminCache, deleteAdminCache, updateStudentCache, deleteStudentCache } from '@/app/src/api/services/schoolService';

interface UserDetailsModalProps {
  user: CombinedUserType | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  onUserDeleted: () => void;
}

export default function UserDetailsModal({ 
  user, 
  isOpen, 
  onClose, 
  onUserUpdated, 
  onUserDeleted 
}: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    status: "active" as "active" | "inactive",
    // Additional fields for specific user types
    subject: "",
    qualification: "",
    description: "",
    role: "",
    permissions: "",
    student_code: "",
    gender: "M" as "M" | "F",
    date_of_birth: "",
    medical_conditions: "",
  });

  // Update form when user changes or when entering edit mode
  useEffect(() => {
    if (user) {
      setEditForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        status: user.status || "active",
        subject: user.subject || "",
        qualification: user.qualification || "",
        description: user.description || "",
        role: user.role || "",
        permissions: user.permissions || "",
        student_code: user.student_code || "",
        gender: user.gender || "M",
        date_of_birth: user.date_of_birth || "",
        medical_conditions: user.medical_conditions || "",
      });
    }
  }, [user, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      // Update based on user type
      if (user.user_type === 'guardian') {
        await updateUserCache(user.id, {
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
          phone: editForm.phone,
          status: editForm.status,
        });
      } else if (user.user_type === 'teacher') {
        await updateTeacherCache(user.id, {
          subject: editForm.subject,
          qualification: editForm.qualification,
          description: editForm.description,
        });
      } else if (user.user_type === 'admin') {
        await updateAdminCache(user.id, {
          role: editForm.role,
          permissions: editForm.permissions,
        });
      } else if (user.user_type === 'student') {
        await updateStudentCache(user.id, {
          student_code: editForm.student_code,
          gender: editForm.gender,
          date_of_birth: editForm.date_of_birth,
          medical_conditions: editForm.medical_conditions,
          status: editForm.status,
        });
      }
      
      setSuccess("User updated successfully!");
      setIsEditing(false);
      onUserUpdated();
      
      // Clear success message after 2 seconds
      setTimeout(() => setSuccess(""), 2000);
    } catch (err: unknown) {
      console.error('Error updating user:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to update user';
      setError(errorMessage || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    setError("");
    
    try {
      // Delete based on user type
      if (user.user_type === 'guardian') {
        await deleteUserCache(user.id);
      } else if (user.user_type === 'teacher') {
        await deleteTeacherCache(user.id);
      } else if (user.user_type === 'admin') {
        await deleteAdminCache(user.id);
      } else if (user.user_type === 'student') {
        await deleteStudentCache(user.id);
      }
      
      onUserDeleted();
      onClose();
    } catch (err: unknown) {
      console.error('Error deleting user:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to delete user';
      setError(errorMessage || 'Failed to delete user');
      setIsDeleting(false);
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'STUDENT': return 'bg-blue-100 text-blue-800';
      case 'TEACHER': return 'bg-purple-100 text-purple-800';
      case 'GUARDIAN': return 'bg-orange-100 text-orange-800';
      case 'ADMIN': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'STUDENT': return '🎓';
      case 'TEACHER': return '👨‍🏫';
      case 'GUARDIAN': return '👨‍👩‍👧‍👦';
      case 'ADMIN': return '👨‍💼';
      default: return '👤';
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                {getUserTypeIcon(user.user_type)}
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">User Details</h2>
                <p className="text-white/80 text-sm">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold"
            >
              ×
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

          {/* User Type Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(user.user_type)}`}>
              <span className="mr-2">{getUserTypeIcon(user.user_type)}</span>
              {user.user_type}
            </span>
          </div>

          {/* Profile Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Image
                  src="/images/Person.png"
                  alt={`${user.first_name} ${user.last_name}`}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {user.first_name} {user.last_name}
                </h3>
                {user.middle_name && (
                  <p className="text-gray-600">{user.middle_name}</p>
                )}
                <p className="text-sm text-gray-500">
                  ID: {user.id}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">👤</span>
                Personal Information
              </h4>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={editForm.first_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={editForm.last_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                    <input
                      type="text"
                      name="middle_name"
                      value={editForm.middle_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">First Name:</span>
                    <p className="font-medium">{user.first_name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Last Name:</span>
                    <p className="font-medium">{user.last_name}</p>
                  </div>
                  {user.middle_name && (
                    <div>
                      <span className="text-sm text-gray-600">Middle Name:</span>
                      <p className="font-medium">{user.middle_name}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📧</span>
                Contact Information
              </h4>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium">{user.email || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone:</span>
                    <p className="font-medium">{user.phone || 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Information */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
              <span className="mr-2">⚙️</span>
              System Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-blue-600">Created:</span>
                <p className="font-medium text-blue-800">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
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
                  {new Date(user.updated_at).toLocaleDateString('en-US', {
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <span className="mr-2">✏️</span>
                  Edit User
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}? This action cannot be undone.`)) {
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
                      Delete User
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