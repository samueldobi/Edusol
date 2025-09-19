"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PaymentStats from '@/app/ui/dashboard/payment/payment.stats';
import PaymentTable from '@/app/ui/dashboard/payment/payment-table';
import { useState } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function Page() {
  const todaysDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const [search, setSearch] = useState("");
  return (
     <ProtectedRoute roles={["ADMIN", "SUPER_ADMIN", "GUARDIAN"]}>
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 space-x-6">
        <div className="flex-1 relative">
          <input
            placeholder="Search payments"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className=" shadow-md rounded-full pl-12 py-3 w-full font-normal text-xl text-[#2C2C2C] focus:outline-[#2C2C2C]"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3 w-6 h-6 text-[#AEAEAE]" />
        </div>

        <div className="text-xl flex items-center space-x-4">
          <span className="text-[#1AA939] font-semibold">Today</span>{' '}
          <span className="font-normal text-[#2C2C2C]">{todaysDate} </span>
          <img src="/Images/calendar.png" className="w-11 h-11 opacity-80" />
        </div>
      </div>
      <PaymentStats />
      <PaymentTable search={search} />
    </div>
    </ProtectedRoute>
  );
}
