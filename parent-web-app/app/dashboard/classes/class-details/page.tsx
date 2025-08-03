'use client';

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ClassDetailsInfo from "@/app/ui/dashboard/classes/class-details-info";
import { fetchSchoolClassById, ClassType } from "@/app/src/api/services/schoolService";
import { fetchUserById, UserType } from "@/app/src/api/services/userService";
import { getErrorMessage } from "@/app/src/utils/errorHandling";

export default function ClassDetails() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId") || "SS1A";
  
  const [classData, setClassData] = useState<ClassType | null>(null);
  const [teacherData, setTeacherData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch class details and teacher information
  const fetchClassDetails = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch the actual class data from the backend
      const classResponse = await fetchSchoolClassById(classId);
      setClassData(classResponse);
      
      // Fetch teacher information if we have a form_teacher_id
      if (classResponse.form_teacher_id) {
        try {
          const teacher = await fetchUserById(classResponse.form_teacher_id);
          setTeacherData(teacher);
        } catch (teacherError: unknown) {
          console.error("Error fetching teacher data:", teacherError);
          // Don't fail the entire request if teacher fetch fails
          setTeacherData(null);
        }
      }
      
    
    } catch (error: unknown) {
      console.error("Error fetching class details:", error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassDetails();
  }, [classId]);

  if (loading) {
    return <div className="text-center py-8">Loading class details...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchClassDetails}
              className="text-red-800 underline hover:no-underline text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      
      <ClassDetailsInfo 
        studentSize={classData?.capacity || 0} 
        classData={classData}
        teacherData={teacherData}
      />
    </div>
  );
}