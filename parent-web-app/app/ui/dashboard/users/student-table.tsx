"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Student {
  id: number;
  student_name: string;
  parent_name: string;
  gender: string;
  phone_number: string;
  class: string;
  image: string;
}

interface StudentTableProps {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: Student[];
}

export default function StudentTable({ rowsPerPage, currentPage, setCurrentPage, data }: StudentTableProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleStudentClick = (student: Student) => {
    const params = new URLSearchParams({
      studentId: student.id.toString(),
      studentName: student.student_name,
      parentName: student.parent_name,
      gender: student.gender,
      phoneNumber: student.phone_number,
      class: student.class,
      context: 'student'
    });
    router.push(`/dashboard/result/student-result?${params.toString()}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, student: Student) => {
    e.stopPropagation();
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleEditClick = (e: React.MouseEvent, student: Student) => {
    e.stopPropagation();
    // Handle edit functionality
    console.log('Edit student:', student);
  };

  const handleViewClick = (e: React.MouseEvent, student: Student) => {
    e.stopPropagation();
    // Handle view functionality
    console.log('View student:', student);
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((student) => (
              <tr 
                key={student.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleStudentClick(student)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={student.image}
                        alt={student.student_name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.student_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.parent_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.class}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleViewClick(e, student)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Image src="/userview.png" width={20} height={20} alt="view" />
                    </button>
                    <button
                      onClick={(e) => handleEditClick(e, student)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Image src="/useredit.png" width={20} height={20} alt="edit" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, student)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Image src="/userdelete.png" width={20} height={20} alt="delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {currentData.map((student) => (
          <div
            key={student.id}
            className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleStudentClick(student)}
          >
            <div className="flex items-center space-x-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={student.image}
                alt={student.student_name}
                width={48}
                height={48}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {student.student_name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Parent: {student.parent_name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {student.gender} • {student.class} • {student.phone_number}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => handleViewClick(e, student)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Image src="/userview.png" width={20} height={20} alt="view" />
                </button>
                <button
                  onClick={(e) => handleEditClick(e, student)}
                  className="text-green-600 hover:text-green-900"
                >
                  <Image src="/useredit.png" width={20} height={20} alt="edit" />
                </button>
                <button
                  onClick={(e) => handleDeleteClick(e, student)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Image src="/userdelete.png" width={20} height={20} alt="delete" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
                <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 