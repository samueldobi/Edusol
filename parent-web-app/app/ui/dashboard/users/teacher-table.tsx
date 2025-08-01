"use client";
import { useState } from 'react';
import Image from 'next/image';
import { UserType } from '@/app/src/api/services/userService';

interface TeacherTableProps {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: UserType[];
}

export default function TeacherTable({ rowsPerPage, currentPage, setCurrentPage, data }: TeacherTableProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<UserType | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, teacher: UserType) => {
    e.stopPropagation();
    setSelectedTeacher(teacher);
    setShowDeleteModal(true);
  };

  const handleEditClick = (e: React.MouseEvent, teacher: UserType) => {
    e.stopPropagation();
    // Handle edit functionality
    console.log('Edit teacher:', teacher);
  };

  const handleViewClick = (e: React.MouseEvent, teacher: UserType) => {
    e.stopPropagation();
    // Handle view functionality
    console.log('View teacher:', teacher);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#D1DFFF] shadow-md">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/Person.png" 
                      alt={`${teacher.first_name} ${teacher.last_name} profile picture`}
                      width={40} 
                      height={40} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div>
                      <span className="text-[#4A4C51] font-semibold">
                        {teacher.first_name} {teacher.last_name}
                      </span>
                      {teacher.middle_name && (
                        <div className="text-sm text-gray-500">{teacher.middle_name}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{teacher.email || 'N/A'}</div>
                  <div className="text-sm text-gray-500">{teacher.phone || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(teacher.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 text-indigo-600 hover:text-indigo-900"
                      onClick={(e) => handleViewClick(e, teacher)}
                      aria-label={`View ${teacher.first_name} ${teacher.last_name}`}
                    >
                      View
                    </button>
                    <button 
                      className="p-2 text-green-600 hover:text-green-900"
                      onClick={(e) => handleEditClick(e, teacher)}
                      aria-label={`Edit ${teacher.first_name} ${teacher.last_name}`}
                    >
                      Edit
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:text-red-900"
                      onClick={(e) => handleDeleteClick(e, teacher)}
                      aria-label={`Delete ${teacher.first_name} ${teacher.last_name}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {currentData.map((teacher) => (
          <div key={teacher.id} className="bg-white shadow rounded-lg p-4 border border-gray-100 w-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image 
                src="/Person.png" 
                alt={`${teacher.first_name} ${teacher.last_name} profile picture`}
                width={56} 
                height={56} 
                className="rounded-full object-cover" 
              />
              <div className="text-base font-semibold text-[#1AA939]">
                {teacher.first_name} {teacher.last_name}
              </div>
            </div>
            <div className="mt-3 text-sm flex flex-col items-center justify-center">
              <p><span className="font-medium p-2">Email:</span> {teacher.email || 'N/A'}</p>
              <p><span className="font-medium p-2">Phone:</span> {teacher.phone || 'N/A'}</p>
              <p><span className="font-medium p-2">Created:</span> {new Date(teacher.created_at).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={(e) => handleViewClick(e, teacher)}
                className="text-indigo-600 hover:text-indigo-900"
                aria-label={`View ${teacher.first_name} ${teacher.last_name}`}
              >
                View
              </button>
              <button 
                onClick={(e) => handleEditClick(e, teacher)}
                className="text-green-600 hover:text-green-900"
                aria-label={`Edit ${teacher.first_name} ${teacher.last_name}`}
              >
                Edit
              </button>
              <button 
                onClick={(e) => handleDeleteClick(e, teacher)}
                className="text-red-600 hover:text-red-900"
                aria-label={`Delete ${teacher.first_name} ${teacher.last_name}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 px-6 gap-2">
          <div>
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 font-bold bg-transparent rounded text-[#1AA939] border border-[#1AA939] hover:bg-[#1AA939] hover:text-white disabled cursor-pointer disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= data.length}
              className="px-4 py-2 bg-[#1AA939] text-white font-bold rounded border border-[#1AA939] hover:bg-transparent hover:text-[#1AA939] disabled cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedTeacher.first_name} {selectedTeacher.last_name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle delete
                  console.log('Delete teacher:', selectedTeacher);
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 