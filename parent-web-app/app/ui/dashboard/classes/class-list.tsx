"use client";
import React from "react"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchSchoolClasses, ClassType } from "@/app/src/api/services/schoolService";

type LevelGroup = {
  level: string;
  classes: string[];
};

export default function ClassGroups() {
  const searchParams = useSearchParams();
  const [allLevels, setAllLevels] = useState<LevelGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const groupClassesByLevel = (classes: ClassType[]): LevelGroup[] => {
    const grouped: { [key: string]: string[] } = {};
    
    classes.forEach((classItem) => {
      const level = classItem.class_level.toLowerCase();
      if (!grouped[level]) {
        grouped[level] = [];
      }
      grouped[level].push(classItem.class_name);
    });

    return Object.entries(grouped).map(([level, classes]) => ({
      level: level.toUpperCase(),
      classes
    }));
  };

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const classes = await fetchSchoolClasses();
      console.log("Fetched classes:", classes);
      const groupedClasses = groupClassesByLevel(classes);
      setAllLevels(groupedClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setError("Failed to fetch classes");
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

  if (loading) {
    return <div className="text-center py-4">Loading classes...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
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
                {group.classes.map((className) => (
                  <div
                    key={className}
                    className="border-2 border-[#00000024] p-2 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    {className.toUpperCase()}
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