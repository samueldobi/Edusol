import React from 'react';
import Table from '@/app/ui/dashboard/table';

export default function PaymentTable() {
  const data = [
    {
      profile: 'Anabella George',
      class: 'SS3A',
      date: '07-06-2024',
      time: '6:30',
      paymentDetails: '(3)',
      amount: 'NGN 122,000',
      status: 'SUCCESSFUL',
    },
    {
      profile: 'Amaka Chukwuka',
      class: 'SS2B',
      date: '07-06-2024',
      time: '6:30',
      paymentDetails: '(2)',
      amount: 'NGN 120,000',
      status: 'UNSUCCESSFUL',
    },
    {
      profile: 'Daniel Gabriel',
      class: 'SS3A',
      date: '07-06-2024',
      time: '6:30',
      paymentDetails: '(3)',
      amount: 'NGN 122,000',
      status: 'Pending',
    },
    {
      profile: 'Harrison Benji',
      class: 'SS1A',
      date: '07-06-2024',
      time: '6:30',
      paymentDetails: '(1)',
      amount: 'NGN 100,000',
      status: 'SUCCESSFUL',
    },
    {
      profile: 'Daniel Gabriel',
      class: 'SS3A',
      date: '07-06-2024',
      time: '6:30',
      paymentDetails: '(3)',
      amount: 'NGN 122,000',
      status: 'Pending',
    },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-green-600 mb-4">All Payments</h2>
      {/* Table */}
      <Table data={data} />
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Previous
        </button>
        {/* Add logic for pagination numbers */}
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
}
