"use client";
import React from "react"
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchSchoolClasses, ClassType } from "@/app/src/api/services/schoolService";

type LevelGroup = {
  level: string;
  classes: ClassType[];
};

export default function ClassGroups() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allLevels, setAllLevels] = useState<LevelGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const groupClassesByLevel = (classes: ClassType[]): LevelGroup[] => {
    const grouped: { [key: string]: ClassType[] } = {};
    
    classes.forEach((classItem) => {
      const level = classItem.class_level.toLowerCase();
      if (!grouped[level]) {
        grouped[level] = [];
      }
      grouped[level].push(classItem);
    });

    return Object.entries(grouped).map(([level, classes]) => ({
      level: level.toUpperCase(),
      classes
    }));
  };

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching classes...");
      console.log("API URL:", process.env.NEXT_PUBLIC_SCHOOL_SERVICE_URL);
      console.log("Full endpoint:", `${process.env.NEXT_PUBLIC_SCHOOL_SERVICE_URL}/api/schools/classes`);
      
      const fetchedClasses = await fetchSchoolClasses();
      const groupedClasses = groupClassesByLevel(fetchedClasses);
      setAllLevels(groupedClasses);
      console.log("Fetched classes:", fetchedClasses);
    } catch (error: any) {
      console.error("Error fetching classes:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error config:", error.config);
      console.error("Request URL:", error.config?.url);
      console.error("Request method:", error.config?.method);
      console.error("Request headers:", error.config?.headers);
      
      if (error.response?.status === 403) {
        setError("Access forbidden. This might be a server configuration issue. Check console for details.");
      } else if (error.response?.status === 404) {
        setError("API endpoint not found. Please check the URL configuration.");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(`Failed to fetch classes: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Check if we should refresh (e.g., when returning from add-class page)
  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh');
    if (shouldRefresh === 'true') {
      fetchClasses();
      // Clean up the URL parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('refresh');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  const handleClassClick = (classItem: ClassType) => {
    router.push(`/dashboard/classes/class-details?classId=${encodeURIComponent(classItem.id)}`);
  };

  if (loading) {
    return <div className="text-center py-4">Loading classes...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <div className="flex gap-2 justify-center">
          <button 
            onClick={fetchClasses}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Check the browser console for more details
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {allLevels.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No classes found. Add your first class to get started.
          </div>
        ) : (
          allLevels.map((group) => (
            <div
              key={group.level}
              className="w-full p-2 md:p-6 flex flex-col space-y-3 border border-[#08CC3347] rounded-[10px]"
            >
              <h2 className="p-2 text-center text-white bg-[#050548] text-[15px] md:text-[22px]">
                {group.level}
              </h2>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4 w-full mt-5 mb-5">
                {group.classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    onClick={() => handleClassClick(classItem)}
                    className="border-2 border-[#00000024] p-2 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#1AA939] transition-colors"
                  >
                    {classItem.class_name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}