'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Table from '@/app/ui/dashboard/table';
import { fetchSchoolFeesList, FeeType } from '@/app/src/api/services/schoolService';

interface PaymentTableProps {
  search: string;
}

export default function PaymentTable({ search }: PaymentTableProps) {
  const searchParams = useSearchParams();
  const [payments, setPayments] = useState<FeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination and rows per page states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  // Filter state
  const [filteredData, setFilteredData] = useState<FeeType[]>([]);

  // Extract filter from query params
  const filter = searchParams.get('filter') || 'total';

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const fetchedPayments = await fetchSchoolFeesList();
      setPayments(fetchedPayments);
      console.log("Fetched payments:", fetchedPayments);
    } catch (error: any) {
      console.error("Error fetching payments:", error);
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Update filter function
  useEffect(() => {
    let newData = payments;

    if (filter === 'successful') {
      newData = payments.filter((item) => item.status === 'active');
    } else if (filter === 'unsuccessful') {
      newData = payments.filter((item) => item.status === 'inactive');
    } else if (filter === 'pending') {
      newData = payments.filter((item) => item.status === 'active'); // Assuming active means pending
    }

    // Apply search filter
    if (search.trim() !== "") {
      newData = newData.filter(item =>
        (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
        (item.amount && item.amount.toString().includes(search))
      );
    }

    setFilteredData(newData);
    setCurrentPage(1); 
  }, [filter, search, payments]);

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

  if (loading) {
    return <div className="text-center py-8">Loading payments...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={fetchPayments}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No payments found.
      </div>
    );
  }

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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 px-6 gap-2 my-2 text-center md:text-left">
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
