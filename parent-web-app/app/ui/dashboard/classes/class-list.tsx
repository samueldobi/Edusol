"use client";
import React from "react"
import { useEffect } from "react";
import { schoolStructure } from "@/app/lib/placeholder-data";
import { fetchSchoolClasses, createSchoolClass } from "@/app/src/api/services/schoolService";
type SchoolLevel = {
  [key: string]: string[] | undefined;
};
type LevelGroup = {
  level: string;
  classes: string[];
};
export default function ClassGroups() {
     const transformClasses = (groups: SchoolLevel[]): LevelGroup[] => 
    groups.map(item => {
      // I  am filtering out undefined values and getting the first defined entry
      const entries = Object.entries(item).filter(([, value]) => value !== undefined);
      const [level, classList] = entries[0];
      return { level, classes: classList as string[] };
    });
      const allLevels: LevelGroup[] = [
    ...transformClasses(schoolStructure.junior),
    ...transformClasses(schoolStructure.senior)
  ];
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classes = await fetchSchoolClasses();
        console.log("Fetched classes:", classes);
      }
      catch (error) {
        console.error("Error fetching classes:", error);
      }
    }
    fetchClasses();
  }, []);
  const addClass = async () => {
    try {
      const newClass = await createSchoolClass({
        id: "1",
        class_name: "JSS3M",
        class_level: "JSS3",
        class_arm: null,
        capacity: 30,
        created_by: "0ad7e1c2-2056-4aaf-8093-ff01e3ebcb43",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        school: "935d20c4-847f-4f96-8257-a9a9895d29b6"
      });
      console.log("New class:", newClass);
    }
    catch (error) {
      console.error("Error fetching classes:", error);
    }
  }
  return (
    <>
        <div className="space-y-8">
        {allLevels.map((group) => (
            <div
            key={group.level}
            className="w-full p-2 md:p-6 flex flex-col space-y-3 border border-[#08CC3347] rounded-[10px]"
            >
            <h2 className="p-2 text-center text-white bg-[#050548] text-[15px] md:text-[22px]">
                {group.level.toUpperCase()}
            </h2>

            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4 w-full mt-5 mb-5">
                {group.classes.map((className) => (
                <div
                    key={className}
                    className="border-2 border-[#00000024] p-2 flex items-center justify-center cursor-pointer"
                >
                    {className.toUpperCase()}
                </div>
                ))}
            </div>
            </div>
        ))}
        <div className="flex justify-center">
          <button
          onClick={addClass}
          >
            add classes
          </button>
        </div>
        </div>

    </>
    
  );
}