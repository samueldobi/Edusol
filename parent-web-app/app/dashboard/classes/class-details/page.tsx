'use client';

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ClassDetailsInfo from "@/app/ui/dashboard/classes/class-details-info";
import { fetchSchoolClassById, ClassType } from "@/app/src/api/services/schoolService";
import { fetchUserById, UserType } from "@/app/src/api/services/userService";

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
      console.log("Fetching class details for classId:", classId);
      
      // Fetch the actual class data from the backend
      const classResponse = await fetchSchoolClassById(classId);
      setClassData(classResponse);
      console.log("Fetched class data:", classResponse);
      
      // Fetch teacher information if we have a form_teacher_id
      if (classResponse.form_teacher_id) {
        try {
          console.log("Fetching teacher information for ID:", classResponse.form_teacher_id);
          const teacher = await fetchUserById(classResponse.form_teacher_id);
          setTeacherData(teacher);
          console.log("Fetched teacher data:", teacher);
        } catch (teacherError: any) {
          console.error("Error fetching teacher data:", teacherError);
          // Don't fail the entire request if teacher fetch fails
          setTeacherData(null);
        }
      }
      
      console.log("Class details fetched successfully");
    } catch (error: any) {
      console.error("Error fetching class details:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      
      if (error.response?.status === 404) {
        setError("Class not found. Please check the class ID.");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(`Failed to fetch class details: ${error.message || 'Unknown error'}`);
      }
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
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={fetchClassDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
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