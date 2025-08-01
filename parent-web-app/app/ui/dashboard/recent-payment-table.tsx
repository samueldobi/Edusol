import Table from '@/app/ui/dashboard/table';
import Link from 'next/link';

export default function RecentPaymentsTable() {
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
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <p className="font-medium p-4 uppercase">Recent Payments</p>
      {/* Added shadow and overflow-x-auto for horizontal scrolling */}
      <Table data={data} />
      <div className="px-6 py-3 flex justify-end">
        <Link href="/dashboard/payment">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View All Payments
          </button>
        </Link>
      </div>
    </div>
  );
}
