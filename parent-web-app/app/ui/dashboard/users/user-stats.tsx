"use client";
import Image from "next/image";
import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const userStats = [
  {
    label: 'Students',
    value: 164,
    color: 'bg-[#FFB400]',
    bg: 'bg-[#f3c65e]',
    src: '/student-card.png',
    filter: 'students'
  },
  {
    label: 'Teachers',
    value: 46,
    color: 'bg-[#726DCF]',
    bg: 'bg-[#1D81CE]',
    src: '/teacher-card.png',
    filter: 'teachers'
  },
  {
    label: 'Guardians',
    value: 89,
    color: 'bg-[#FF6B6B]',
    bg: 'bg-[#ff8a8a]',
    src: '/Person.png',
    filter: 'guardians'
  },
  {
    label: 'Admin',
    value: 3,
    color: 'bg-[#1AA939]',
    bg: 'bg-[#79c88a]',
    src: '/geolocation.png',
    filter: 'admin'
  },
];

export default function UserStats(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get('filter') || 'students'
  );

  const updateFilter = useDebouncedCallback((filter) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filter);
    router.push(`?${params.toString()}`, { scroll: false });
  }, 300);

  const handleStatClick = useCallback(
    (filter: string) => {
      setActiveFilter(filter);
      updateFilter(filter);
    },
    [updateFilter]
  );

  const handleAddNew = () => {
    router.push('/dashboard/users/add-user');
  };

  return(
    <>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-6 mt-2">
        {userStats.map((item, idx) => (
          <div 
            key={idx}
            className={`p-4 rounded-xl shadow-md flex flex-col items-center cursor-pointer transition-all duration-300
                      ${item.color} ${
                        activeFilter === item.filter
                          ? 'ring-4 ring-offset-2 ring-blue-500'
                          : ''
                      }`}
            onClick={() => handleStatClick(item.filter)}
          >
            <div>
              <Image
                src={item.src}
                width={60}
                height={60}
                alt="students"
              />
            </div>
            <div className="text-white text-3xl">
              {item.label}
            </div>
            <div className="text-white text-2xl">
              {item.value}
            </div>
          </div>
        ))}
     </div>
     <div className="bg-white py-6 rounded-lg border-b">
       <div className="flex justify-between items-center">
         <div>
           {/* <p className=" text-[16px] sm:text-[18px] md:text-[20px] font-bold text-[#1AA939]">Students</p> */}
         </div>
         <div>
           <button
             type="submit"
             onClick={handleAddNew}
             className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-lg border border-white shadow-sm hover:shadow-md transition-shadow"
           >
             <span className="w-6 sm:w-7 h-6 sm:h-7">
               <Image
                 src="/plus.png"
                 width={30}
                 height={30}
                 alt="plus icon"
               />
             </span>
             <span className="text-[16px] sm:text-[18px] md:text-[20px] text-[#2eb24c] font-semibold tracking-wide">
               Add New
             </span>
           </button>
         </div>
       </div>
     </div>
    </>
  );
}