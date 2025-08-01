"use client";
import { useState } from 'react';
import Image from 'next/image';
import { UserType } from '@/app/src/api/services/userService';
import UserDetailsModal from './user-details-modal';

interface TeacherTableProps {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: UserType[];
  onUserUpdated?: () => void;
  onUserDeleted?: () => void;
}

export default function TeacherTable({ 
  rowsPerPage, 
  currentPage, 
  setCurrentPage, 
  data,
  onUserUpdated,
  onUserDeleted
}: TeacherTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleManageClick = (e: React.MouseEvent, teacher: UserType) => {
    e.stopPropagation();
    setSelectedUser(teacher);
    setShowModal(true);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleUserUpdated = () => {
    onUserUpdated?.();
  };

  const handleUserDeleted = () => {
    onUserDeleted?.();
    setShowModal(false);
  };

  return (
    <>
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
                    <button
                      onClick={(e) => handleManageClick(e, teacher)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Manage
                    </button>
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
              <div className="mt-4 flex justify-center">
                <button
                  onClick={(e) => handleManageClick(e, teacher)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Manage
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
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUserUpdated={handleUserUpdated}
        onUserDeleted={handleUserDeleted}
      />
    </>
  );
} 