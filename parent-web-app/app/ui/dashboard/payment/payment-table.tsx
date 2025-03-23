'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { paymentData } from '../../../lib/placeholder-data';
import Table from '@/app/ui/dashboard/table';

export default function PaymentTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Pagination and rows per page states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  // Filter state
  const [filteredData, setFilteredData] = useState(paymentData);

  // Extract filter from query params
  const filter = searchParams.get('filter') || 'total';

  // Update filter function
  useEffect(() => {
    let newData = paymentData;

    if (filter === 'successful') {
      newData = paymentData.filter((item) => item.status === 'SUCCESSFUL');
    } else if (filter === 'unsuccessful') {
      newData = paymentData.filter((item) => item.status === 'UNSUCCESSFUL');
    } else if (filter === 'pending') {
      newData = paymentData.filter((item) => item.status === 'PENDING');
    }

    setFilteredData(newData);
    setCurrentPage(1); // Reset page on filter change
  }, [filter]);

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Change page function
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Update rows per page function
  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset page on rows per page change
  };

  // Total number of pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="bg-white py-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-[#1AA939] mb-4 uppercase pl-6">
          {filter === 'total' ? 'all payments' : filter}
        </h2>
        {/* Rows per page selector */}
        <div className=" p-6 flex items-center space-x-4">
          <label htmlFor="rowsPerPage" className="mr-2">
            Show
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => updateRowsPerPage(Number(e.target.value))}
            className="p-2 border rounded w-44"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <p>Entries</p>
        </div>
      </div>

      <Table data={paginatedData} />
      {/* Table */}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-6">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)}{' '}
          of {filteredData.length} entries
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 font-bold bg-transparent rounded text-[#1AA939]  border border-[#1AA939] hover:bg-[#1AA939] hover:text-white disabled cursor-pointer disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Number Display */}
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#1AA939] text-white font-bold rounded border border-[#1AA939] hover:bg-transparent hover:text-[#1AA939] disabled cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
