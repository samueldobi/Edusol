"use client";
import { useState } from 'react';
import Image from "next/image";
import { teachersTable } from '@/app/lib/placeholder-data';
import AddTeacherModal from "./add-teacher";

export default function TeacherUI() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddTeacher, setShowAddTeacher] = useState(false);

  // Filtered data
  const filteredData = teachersTable.filter(item =>
    (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
    (item.subject && item.subject.toLowerCase().includes(search.toLowerCase())) ||
    (item.class && item.class.toLowerCase().includes(search.toLowerCase())) ||
    (item.arm && item.arm.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const updateRowsPerPage = (newRowsPerPage: number) => {
    setEntriesPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Search and entries */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
        <div className="flex-1 relative">
          <input
            placeholder="Search teachers"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="shadow-md rounded-full pl-12 py-3 w-full font-normal text-xl text-[#2C2C2C] focus:outline-[#2C2C2C]"
          />
          <span className="absolute left-3 top-3 w-6 h-6 text-[#AEAEAE]">
            <Image src="/images/file.svg" alt="search" width={24} height={24} />
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="rowsPerPage" className="mr-2">Show</label>
          <select
            id="rowsPerPage"
            value={entriesPerPage}
            onChange={e => updateRowsPerPage(Number(e.target.value))}
            className="p-2 border rounded w-24"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span>Entries</span>
          <button
            type="button"
            onClick={() => setShowAddTeacher(true)}
            className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-lg border border-white shadow-sm hover:shadow-md transition-shadow ml-4"
          >
            <span className="w-6 sm:w-7 h-6 sm:h-7">
              <Image src="/images/plus.png" width={30} height={30} alt="plus icon" />
            </span>
            <span className="text-[16px] sm:text-[18px] md:text-[20px] text-[#2eb24c] font-semibold tracking-wide">
              Add Teacher
            </span>
          </button>
        </div>
      </div>
      {showAddTeacher && (
        <AddTeacherModal onClose={() => setShowAddTeacher(false)} />
      )}

      {/* Table display on larger screens */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#D1DFFF] shadow-md">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">Name</th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">Subject</th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">Class</th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">Arm</th>
              <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Image src={item.photo} alt={item.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                    <span className="text-[#4A4C51] font-semibold">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.class}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.arm}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="p-2"><Image src="/images/userview.png" width={32} height={32} alt="view" /></button>
                    <button className="p-2"><Image src="/images/useredit.png" width={32} height={32} alt="edit" /></button>
                    <button className="p-2"><Image src="/images/userdelete.png" width={32} height={32} alt="delete" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card display on smaller screens */}
      <div className="block md:hidden space-y-4 ">
        {paginatedData.map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 border border-gray-100 w-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src={item.photo} alt={item.name} width={56} height={56} className="rounded-full object-cover" />
              <div className="text-base font-semibold text-[#1AA939]">{item.name}</div>
            </div>
            <div className="mt-3 text-sm flex flex-col items-center justify-center ">
              <p><span className="font-medium p-2">Subject:</span> {item.subject}</p>
              <p><span className="font-medium p-2">Class:</span> {item.class}</p>
              <p><span className="font-medium p-2">Arm:</span> {item.arm}</p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button><Image src="/images/userview.png" width={32} height={32} alt="view" /></button>
              <button><Image src="/images/useredit.png" width={32} height={32} alt="edit" /></button>
              <button><Image src="/images/userdelete.png" width={32} height={32} alt="delete" /></button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 px-6 gap-2">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
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
            disabled={endIndex >= filteredData.length}
            className="px-4 py-2 bg-[#1AA939] text-white font-bold rounded border border-[#1AA939] hover:bg-transparent hover:text-[#1AA939] disabled cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
