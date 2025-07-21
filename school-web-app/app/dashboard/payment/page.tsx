import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PaymentStats from '../../ui/dashboard/payment/payment.stats';
import PaymentTable from '../../ui/dashboard/payment/payment-table';
export default function Page() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 space-x-6">
        <div className="flex-1 relative">
          <input
            placeholder="Search payments"
            className=" shadow-md rounded-full pl-12 py-3 w-full font-normal text-xl text-[#2C2C2C] focus:outline-[#2C2C2C]"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3 w-6 h-6 text-[#AEAEAE]" />
        </div>

        <div className="text-xl flex items-center space-x-4">
          <span className="text-[#1AA939] font-semibold">Today</span>{' '}
          <span className="font-normal text-[#2C2C2C]">5th June 2023</span>
          <img src="/calendar.png" className="w-11 h-11 opacity-80" />
        </div>
      </div>
      <PaymentStats />
      <PaymentTable />
    </div>
  );
}
