'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
const stats = [
  {
    label: 'Total Payments',
    value: 207,
    color: 'bg-[#65F765]',
    bg: 'bg-[#f3c65e]',
    src: '/total-payment-icon.png',
  },
  {
    label: 'Successful Payments',
    value: 112,
    color: 'bg-[#726DCF]',
    bg: 'bg-[#8b88ca]',
    src: '/successful-payment-icon.png',
  },
  {
    label: 'Unsuccessful Payments',
    value: 86,
    color: 'bg-[#1AA939]',
    bg: 'bg-[#79c88a]',
    src: '/unsuccessful-payment-icon.png',
  },
  {
    label: 'Pending Payments',
    value: 40,
    color: 'bg-[#2a2ad180]',
    bg: 'bg-[#b3b3d480]',
    src: '/pending-payment-icon.png',
  },
];

export default function PaymentStats() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get('filter') || 'total'
  );

  const updateFilter = useDebouncedCallback((filter) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filter);
    router.push(`?${params.toString()}`, { scroll: false });
  }, 300);

  const handleStatClick = useCallback(
    (label: string) => {
      const filter = label.toLowerCase().split(' ')[0];
      setActiveFilter(filter);
      updateFilter(filter);
    },
    [updateFilter]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-6 mt-20">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl shadow-md flex flex-col items-center ${
            stat.color
          } py-8  text-white cursor-pointer 
            transition-all duration-300 ${
              activeFilter === stat.label.toLowerCase().split(' ')[0]
                ? 'ring-4 ring-offset-2 ring-blue-500'
                : ''
            }`}
          onClick={() => handleStatClick(stat.label)}
        >
          <div className="flex items-center justify-center w-full p-4 space-x-7">
            <div
              className={`w-16 h-16 ${stat.bg} rounded-full overflow-hidden flex items-center justify-center`}
            >
              <img src={stat.src} className="w-28 h-28 object-cover" />
            </div>

            <h2 className="text-4xl font-normal">{stat.value}</h2>
          </div>

          <p className="text-lg font-normal">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
