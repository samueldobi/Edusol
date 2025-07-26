"use client";
import { createSchoolClass } from "@/app/src/api/services/schoolService";
import Image from "next/image";
import Link from "next/link";

interface AddClassButtonProps {
  onClassAdded?: () => void;
}

export function AddClassButton({ onClassAdded }: AddClassButtonProps) {
  const handleAddClass = async () => {
    //Test  Payload
    const newClass = {
      id: "temp-id",
      class_name: "New Class",
      class_level: "JSS1",
      class_arm: null,
      // form_teacher_id: null,
      capacity: 30,
      created_by: "0ad7e1c2-2056-4aaf-8093-ff01e3ebcb43",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      school: "935d20c4-847f-4f96-8257-a9a9895d29b6"
    };
    try {
      const res = await createSchoolClass(newClass);
      alert("Class added successfully!");
      console.log(res)
      // Call the callback if provided
      if (onClassAdded) {
        onClassAdded();
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
    <div className="p-2 mt-3">
    
    <Link href="/dashboard/classes/add-class">
            <button
            onClick={handleAddClass}
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
