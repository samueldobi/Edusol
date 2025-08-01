"use client";
import Image from "next/image";
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { fetchUserCounts, UserCountResponse } from '@/app/src/api/services/userService';

export default function UserStats(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get('filter') || 'students'
  );
  const [userCounts, setUserCounts] = useState<UserCountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user counts from API
  const fetchCounts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Using the school ID that we've been using throughout the app
      const schoolId = "cdddc611-1fd3-4730-a819-9206c69b39d7";
      const counts = await fetchUserCounts(schoolId);
      setUserCounts(counts);
    } catch (err: any) {
      console.error('Failed to fetch user counts:', err);
      setError(err.message || 'Failed to fetch user counts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

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

  // Create user stats with real data
  const userStats = [
    {
      label: 'Students',
      value: userCounts?.student_count || 0,
      color: 'bg-[#FFB400]',
      bg: 'bg-[#f3c65e]',
      src: '/student-card.png',
      filter: 'students'
    },
    {
      label: 'Teachers',
      value: userCounts?.teacher_count || 0,
      color: 'bg-[#726DCF]',
      bg: 'bg-[#1D81CE]',
      src: '/teacher-card.png',
      filter: 'teachers'
    },
    {
      label: 'Guardians',
      value: userCounts?.guardian_count || 0,
      color: 'bg-[#FF6B6B]',
      bg: 'bg-[#ff8a8a]',
      src: '/Person.png',
      filter: 'guardians'
    },
    {
      label: 'Admin',
      value: userCounts?.admin_count || 0,
      color: 'bg-[#1AA939]',
      bg: 'bg-[#79c88a]',
      src: '/geolocation.png',
      filter: 'admin'
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-6 mt-2">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="p-4 rounded-xl shadow-md flex flex-col items-center animate-pulse">
            <div className="w-15 h-15 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-8"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
        {error}
        <button 
          onClick={fetchCounts}
          className="ml-2 underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    );
  }

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
                alt={item.label.toLowerCase()}
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