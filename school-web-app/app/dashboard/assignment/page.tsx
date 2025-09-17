"use client";
import { useState, useEffect, useRef } from "react";
import SearchClass from "@/app/ui/dashboard/assignment/search"
import CreateAssignmnent from "@/app/ui/dashboard/assignment/create-assignment";
import StudendInput from "@/app/ui/dashboard/assignment/student-input";
import AssignmentCards from "@/app/ui/dashboard/assignment/assignment-cards";
import { fetchAssignmentsList, AssignmentType, fetchAssignmentById } from "@/app/src/api/services/schoolService";
// import { useAuth } from "@/app/contexts/AuthContext";

export default function Page() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [, setLoading] = useState(true);
  const assignmentCardsRef = useRef<{ refresh: () => void }>(null);
  // const {user} = useAuth();

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const fetchedAssignments = await fetchAssignmentsList();
      setAssignments(fetchedAssignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentCreated = () => {
    fetchAssignments();
    assignmentCardsRef.current?.refresh();
  };

  useEffect(() => {
    fetchAssignments();
    // console.log(user?.schoolId);
    // console.log(user?.role); 
  }, []);

  return(
    <>
      <p className="text-[#1AA939] font-extrabold text-3xl">ASSIGNMENT</p>
        <SearchClass/>
        <CreateAssignmnent assignments={assignments} onRefresh={handleAssignmentCreated}/>
        <StudendInput/>
        <AssignmentCards ref={assignmentCardsRef}/>
    </>
  )
}
