'use client';

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import UserTable from "@/app/ui/dashboard/users/user-table";
import ClassDetailsInfo from "@/app/ui/dashboard/classes/class-details-info";

// Mock students data for the class
const mockStudents = [
  { id: 1, student_name: "John Doe", parent_name: "Jane Doe", gender: "Male", phone_number: "1234567890", class: "SS1A", image: "/teacher.png" },
  { id: 2, student_name: "Mary Smith", parent_name: "Robert Smith", gender: "Female", phone_number: "2345678901", class: "SS1A", image: "/teacher.png" },
  { id: 3, student_name: "Alice Johnson", parent_name: "Michael Johnson", gender: "Female", phone_number: "3456789012", class: "SS1A", image: "/teacher.png" },
  { id: 4, student_name: "Bob Brown", parent_name: "Linda Brown", gender: "Male", phone_number: "4567890123", class: "SS1A", image: "/teacher.png" },
  { id: 5, student_name: "Charlie Green", parent_name: "Nancy Green", gender: "Male", phone_number: "5678901234", class: "SS1A", image: "/teacher.png" },
  { id: 6, student_name: "Diana White", parent_name: "Paul White", gender: "Female", phone_number: "6789012345", class: "SS1A", image: "/teacher.png" },
  { id: 7, student_name: "Eve Black", parent_name: "George Black", gender: "Female", phone_number: "7890123456", class: "SS1A", image: "/teacher.png" },
  { id: 8, student_name: "Frank Blue", parent_name: "Helen Blue", gender: "Male", phone_number: "8901234567", class: "SS1A", image: "/teacher.png" },
  { id: 9, student_name: "Grace Red", parent_name: "Ian Red", gender: "Female", phone_number: "9012345678", class: "SS1A", image: "/teacher.png" },
  { id: 10, student_name: "Henry Yellow", parent_name: "Olivia Yellow", gender: "Male", phone_number: "0123456789", class: "SS1A", image: "/teacher.png" },
  { id: 11, student_name: "Isaac Orange", parent_name: "Pam Orange", gender: "Male", phone_number: "1122334455", class: "SS1A", image: "/teacher.png" },
  { id: 12, student_name: "Julia Purple", parent_name: "Quinn Purple", gender: "Female", phone_number: "2233445566", class: "SS1A", image: "/teacher.png" },
  { id: 13, student_name: "Kevin Silver", parent_name: "Rita Silver", gender: "Male", phone_number: "3344556677", class: "SS1A", image: "/teacher.png" },
  { id: 14, student_name: "Lily Gold", parent_name: "Sam Gold", gender: "Female", phone_number: "4455667788", class: "SS1A", image: "/teacher.png" },
  { id: 15, student_name: "Mike Bronze", parent_name: "Tina Bronze", gender: "Male", phone_number: "5566778899", class: "SS1A", image: "/teacher.png" },
  { id: 16, student_name: "Nina Copper", parent_name: "Uma Copper", gender: "Female", phone_number: "6677889900", class: "SS1A", image: "/teacher.png" },
  { id: 17, student_name: "Oscar Jade", parent_name: "Vera Jade", gender: "Male", phone_number: "7788990011", class: "SS1A", image: "/teacher.png" },
  { id: 18, student_name: "Paula Ruby", parent_name: "Will Ruby", gender: "Female", phone_number: "8899001122", class: "SS1A", image: "/teacher.png" },
  { id: 19, student_name: "Quincy Pearl", parent_name: "Xena Pearl", gender: "Male", phone_number: "9900112233", class: "SS1A", image: "/teacher.png" },
  { id: 20, student_name: "Rita Sapphire", parent_name: "Yuri Sapphire", gender: "Female", phone_number: "1011121314", class: "SS1A", image: "/teacher.png" },
];

export default function ClassDetails() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId") || "SS1A";
  
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Filter students based on search
  const filteredStudents = mockStudents.filter(student =>
    student.student_name.toLowerCase().includes(search.toLowerCase()) ||
    student.parent_name.toLowerCase().includes(search.toLowerCase()) ||
    student.phone_number.includes(search)
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="p-4 space-y-4">
      <h2 className="p-2 text-center text-white bg-[#1AA939] text-[15px] md:text-[23px]">
        Class Details for {classId}
      </h2>
      
      <ClassDetailsInfo studentSize={filteredStudents.length} />
      
      {/* Search and Entries */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="rowsPerPage" className="mr-2">Show</label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={e => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border rounded w-24"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span>Entries</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-sm font-medium">Search:</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search students..."
            className="p-2 border rounded w-48"
          />
        </div>
      </div>
      
      <UserTable
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={paginatedStudents}
      />
      
      {/* Pagination Info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(filteredStudents.length / rowsPerPage)}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= filteredStudents.length}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}