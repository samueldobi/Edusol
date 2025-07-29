"use client";
import { useState } from 'react';
import Image from 'next/image';

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  image: string;
}

interface AdminTableProps {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: Admin[];
}

// Mock admin data
const mockAdmins: Admin[] = [
  {
    id: 1,
    name: "John Admin",
    email: "john.admin@school.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-01-15 10:30 AM",
    image: "/Person.png"
  },
  {
    id: 2,
    name: "Sarah Manager",
    email: "sarah.manager@school.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-14 09:15 AM",
    image: "/Person.png"
  },
  {
    id: 3,
    name: "Mike Coordinator",
    email: "mike.coordinator@school.com",
    role: "Admin",
    status: "Inactive",
    lastLogin: "2024-01-10 02:45 PM",
    image: "/Person.png"
  }
];

export default function AdminTable({ rowsPerPage, currentPage, setCurrentPage, data = mockAdmins }: AdminTableProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, admin: Admin) => {
    e.stopPropagation();
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const handleEditClick = (e: React.MouseEvent, admin: Admin) => {
    e.stopPropagation();
    // Handle edit functionality
    console.log('Edit admin:', admin);
  };

  const handleViewClick = (e: React.MouseEvent, admin: Admin) => {
    e.stopPropagation();
    // Handle view functionality
    console.log('View admin:', admin);
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
                Admin
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={admin.image} 
                      alt={admin.name} 
                      width={40} 
                      height={40} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <span className="text-[#4A4C51] font-semibold">{admin.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {admin.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {admin.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    admin.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {admin.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button 
                      className="p-2"
                      onClick={(e) => handleViewClick(e, admin)}
                    >
                      <Image src="/userview.png" width={32} height={32} alt="view" />
                    </button>
                    <button 
                      className="p-2"
                      onClick={(e) => handleEditClick(e, admin)}
                    >
                      <Image src="/useredit.png" width={32} height={32} alt="edit" />
                    </button>
                    <button 
                      className="p-2"
                      onClick={(e) => handleDeleteClick(e, admin)}
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
        {currentData.map((admin) => (
          <div key={admin.id} className="bg-white shadow rounded-lg p-4 border border-gray-100 w-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image 
                src={admin.image} 
                alt={admin.name} 
                width={56} 
                height={56} 
                className="rounded-full object-cover" 
              />
              <div className="text-base font-semibold text-[#1AA939]">{admin.name}</div>
            </div>
            <div className="mt-3 text-sm flex flex-col items-center justify-center">
              <p><span className="font-medium p-2">Email:</span> {admin.email}</p>
              <p><span className="font-medium p-2">Role:</span> {admin.role}</p>
              <p><span className="font-medium p-2">Status:</span> 
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  admin.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {admin.status}
                </span>
              </p>
              <p><span className="font-medium p-2">Last Login:</span> {admin.lastLogin}</p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={(e) => handleViewClick(e, admin)}>
                <Image src="/userview.png" width={32} height={32} alt="view" />
              </button>
              <button onClick={(e) => handleEditClick(e, admin)}>
                <Image src="/useredit.png" width={32} height={32} alt="edit" />
              </button>
              <button onClick={(e) => handleDeleteClick(e, admin)}>
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