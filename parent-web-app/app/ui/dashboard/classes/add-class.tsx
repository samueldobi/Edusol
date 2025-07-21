"use client";
import { createSchoolClass } from "@/app/src/api/schoolService";
import Image from "next/image";
import Link from "next/link";

export function AddClassButton() {
  const handleAddClass = async () => {
    // Example payload, replace with real form data as needed
    const newClass = {
      id: "temp-id",
      class_name: "New Class",
      class_level: "JSS1",
      class_arm: null,
      form_teacher_id: null,
      capacity: 30,
      created_by: "admin-id",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      school: "school-id"
    };
    try {
      const result = await createSchoolClass(newClass);
      alert("Class added successfully!");
      // Optionally, refresh class list or handle result
    } catch (error) {
      alert("Failed to add class");
    }
  };

  return (
    <>
    <div className="p-2 mt-3">
    
    <Link href="/dashboard/classes/add-class">
            <button
            className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-lg border border-white shadow-sm hover:shadow-md transition-shadow"
            >
            <span className="w-6 sm:w-7 h-6 sm:h-7">
                <Image
                src="/plus.png"
                width={30}
                height={30}
                alt= "plus icon"
                />
            </span>
            <span className="text-[16px] sm:text-[18px] md:text-[20px] text-[#2eb24c] font-semibold tracking-wide">
                Add Class
            </span>
            </button>
    </Link>
    </div>
    </>

  );
}
