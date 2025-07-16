"use client";
import { useState } from 'react';
import TeacherNav from "./teacher-nav";
import TeacherDepartmentTab from "./teacher-tab";
import TeacherEntries from "./teacher-entries";
import TeacherTable from "./teacher-table";
import PaginationControls from './pagination-controls';
import { teachersTable } from '@/app/lib/placeholder-data';
export default function TeacherUI() {
    const [entriesPerPage, setEntriesPerPage] = useState(10)
      const [currentPage, setCurrentPage] = useState(1);
      // Pagination logic
  const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
 const paginatedData = teachersTable.slice(startIndex, startIndex + entriesPerPage);

  // Change page function
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };
  // Update rows per page function
  const updateRowsPerPage = (newRowsPerPage: number) => {
    setEntriesPerPage(newRowsPerPage);
    setCurrentPage(1);
  };
    // Total number of pages
  const totalPages = Math.ceil(teachersTable.length / entriesPerPage);
  return(
    <>
      <TeacherNav />
      <TeacherDepartmentTab/>
      <TeacherEntries 
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={updateRowsPerPage}
      />
      <TeacherTable
        data={paginatedData} 
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />
    </>
  );
}
