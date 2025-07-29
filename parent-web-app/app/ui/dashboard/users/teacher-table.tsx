"use client";
import { useState } from 'react';
import Image from 'next/image';
import { teachersTable } from '@/app/lib/placeholder-data';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  class: string;
  arm: string;
  photo: string;
}

interface TeacherTableProps {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: Teacher[];
}

export default function TeacherTable({ rowsPerPage, currentPage, setCurrentPage, data }: TeacherTableProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, teacher: Teacher) => {
    e.stopPropagation();
    setSelectedTeacher(teacher);
    setShowDeleteModal(true);
  };

  const handleEditClick = (e: React.MouseEvent, teacher: Teacher) => {
    e.stopPropagation();
    // Handle edit functionality
    console.log('Edit teacher:', teacher);
  };

  const handleViewClick = (e: React.MouseEvent, teacher: Teacher) => {
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
                Name
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Arm
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((teacher, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      width={40} 
                      height={40} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <span className="text-[#4A4C51] font-semibold">{teacher.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.class}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.arm}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button 
                      className="p-2"
                      onClick={(e) => handleViewClick(e, teacher)}
                    >
                      <Image src="/userview.png" width={32} height={32} alt="view" />
                    </button>
                    <button 
                      className="p-2"
                      onClick={(e) => handleEditClick(e, teacher)}
                    >
                      <Image src="/useredit.png" width={32} height={32} alt="edit" />
                    </button>
                    <button 
                      className="p-2"
                      onClick={(e) => handleDeleteClick(e, teacher)}
                    >
                      <Image src="/userdelete.png" width={32} height={32} alt="delete" />
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
        {currentData.map((teacher, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 border border-gray-100 w-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image 
                src={teacher.photo} 
                alt={teacher.name} 
                width={56} 
                height={56} 
                className="rounded-full object-cover" 
              />
              <div className="text-base font-semibold text-[#1AA939]">{teacher.name}</div>
            </div>
            <div className="mt-3 text-sm flex flex-col items-center justify-center">
              <p><span className="font-medium p-2">Subject:</span> {teacher.subject}</p>
              <p><span className="font-medium p-2">Class:</span> {teacher.class}</p>
              <p><span className="font-medium p-2">Arm:</span> {teacher.arm}</p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={(e) => handleViewClick(e, teacher)}>
                <Image src="/userview.png" width={32} height={32} alt="view" />
              </button>
              <button onClick={(e) => handleEditClick(e, teacher)}>
                <Image src="/useredit.png" width={32} height={32} alt="edit" />
              </button>
              <button onClick={(e) => handleDeleteClick(e, teacher)}>
                <Image src="/userdelete.png" width={32} height={32} alt="delete" />
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
  );
} 