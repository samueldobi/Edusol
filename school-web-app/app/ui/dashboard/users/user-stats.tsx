"use client";
import Image from "next/image";
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { fetchAllUsers } from '@/app/src/api/services/schoolService';

interface UserCountResponse {
  users_count: number;
  admin_count: number;
  student_count: number;
  teacher_count: number;
  guardian_count: number;
}

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
      const { users, students, teachers, admins } = await fetchAllUsers();
      
      const counts: UserCountResponse = {
        users_count: users.length + students.length + teachers.length + admins.length,
        student_count: students.length,
        teacher_count: teachers.length,
        guardian_count: users.filter(user => user.user_type === 'guardian').length,
        admin_count: admins.length,
      };
      
      setUserCounts(counts);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user counts';
      setError(errorMessage);
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
      color: 'bg-[#65F765]',
      bg: 'bg-[#f3c65e]',
      src: '/images/studentz.png',
      filter: 'students'
    },
    {
      label: 'Teachers',
      value: userCounts?.teacher_count || 0,
      color: 'bg-[#726DCF]',
      bg: 'bg-[#8b88ca]',
      src: '/images/teacher.png',
      filter: 'teachers'
    },
    {
      label: 'Guardians',
      value: userCounts?.guardian_count || 0,
      color: 'bg-[#1AA939]',
      bg: 'bg-[#79c88a]',
      src: '/images/parentz.png',
      filter: 'guardians'
    },
    {
      label: 'Admin',
      value: userCounts?.admin_count || 0,
      color: 'bg-[#2a2ad180]',
      bg: 'bg-[#b3b3d480]',
      src: '/images/admin.png',
      filter: 'admin'
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-6 mt-20">
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
     <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-6 mt-20">
        {userStats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-md flex flex-col items-center ${
              stat.color
            } py-8  text-white cursor-pointer 
              transition-all duration-300 ${
                activeFilter === stat.filter
                  ? 'ring-4 ring-offset-2 ring-blue-500'
                  : ''
              }`}
            onClick={() => handleStatClick(stat.filter)}
          >
            <div className="flex items-center justify-center w-full p-4 space-x-7">
              <div
                className={`w-16 h-16 ${stat.bg} rounded-full overflow-hidden flex items-center justify-center`}
              >
                <Image 
                  src={stat.src} 
                  width={112}
                  height={112}
                  alt={`${stat.label} icon`}
                  className="w-28 h-28 object-cover" 
                />
              </div>

              <h2 className="text-4xl font-normal">{stat.value}</h2>
            </div>

            <p className="text-lg font-normal">{stat.label}</p>
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
                 src="/Images/plus.png"
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