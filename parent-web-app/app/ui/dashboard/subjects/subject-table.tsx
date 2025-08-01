"use client";
import Image from "next/image";
// import { useEffect, useState } from "react";

export interface Subject {
  id: string;
  subject_name: string;
  subject_code: string;
  description?: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  school: string;
}

interface Props {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: Subject[];
}

export default function SubjectTable({ rowsPerPage, currentPage, setCurrentPage, data }: Props) {
  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(data.length / rowsPerPage);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* Table display on larger screen sizes */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#D1DFFF] shadow-md">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Subject Name
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Subject Code
              </th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                Actions (View, Edit, Delete)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#4A4C51] font-semibold">
                    {item.subject_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.subject_code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-between">
                    <button className="p-2">
                      <Image src="/userview.png" width={40} height={40} alt="view button" />
                    </button>
                    <button className="p-2">
                      <Image src="/useredit.png" width={40} height={40} alt="edit button" />
                    </button>
                    <button className="p-2">
                      <Image src="/userdelete.png" width={40} height={40} alt="delete button" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card display on smaller screen sizes */}
      <div className="block md:hidden space-y-4 ">
        {paginatedData.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4 border border-gray-100 w-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full bg-[#1AA939] w-14 h-14 flex items-center justify-center">
                <span className="text-white text-xl font-bold">{item.subject_name.charAt(0)}</span>
              </div>
              <div className="text-base font-semibold text-[#1AA939]">{item.subject_name}</div>
            </div>
            <div className="mt-3 text-sm flex flex-col items-center justify-center ">
              <p><span className="font-medium p-2">Code:</span> {item.subject_code}</p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button>
                <Image src="/userview.png" width={32} height={32} alt="view" />
              </button>
              <button>
                <Image src="/useredit.png" width={32} height={32} alt="edit" />
              </button>
              <button>
                <Image src="/userdelete.png" width={32} height={32} alt="delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 px-6 gap-2">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 font-bold bg-transparent rounded text-[#1AA939]  border border-[#1AA939] hover:bg-[#1AA939] hover:text-white disabled cursor-pointer disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page</span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={endIndex >= data.length}
            className="px-4 py-2 bg-[#1AA939] text-white font-bold rounded border border-[#1AA939] hover:bg-transparent hover:text-[#1AA939] disabled cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
} 