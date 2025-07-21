"use client"
import { useState } from "react";
import UserStats from "@/app/ui/dashboard/users/user-stats";
import UserTable from "@/app/ui/dashboard/users/user-table";
import UserEntries from "@/app/ui/dashboard/users/user-entries";

// Mock data for demonstration (should be replaced with real API data)
const mockStudents = [
  { id: 1, student_name: "John Doe", parent_name: "Jane Doe", gender: "Male", phone_number: "1234567890", class: "JSS1", image: "/teacher.png" },
  { id: 2, student_name: "Mary Smith", parent_name: "Robert Smith", gender: "Female", phone_number: "2345678901", class: "JSS2", image: "/teacher.png" },
  { id: 3, student_name: "Alice Johnson", parent_name: "Michael Johnson", gender: "Female", phone_number: "3456789012", class: "JSS3", image: "/teacher.png" },
  { id: 4, student_name: "Bob Brown", parent_name: "Linda Brown", gender: "Male", phone_number: "4567890123", class: "SS1", image: "/teacher.png" },
  { id: 5, student_name: "Charlie Green", parent_name: "Nancy Green", gender: "Male", phone_number: "5678901234", class: "SS2", image: "/teacher.png" },
  { id: 6, student_name: "Diana White", parent_name: "Paul White", gender: "Female", phone_number: "6789012345", class: "SS3", image: "/teacher.png" },
  { id: 7, student_name: "Eve Black", parent_name: "George Black", gender: "Female", phone_number: "7890123456", class: "JSS1", image: "/teacher.png" },
  { id: 8, student_name: "Frank Blue", parent_name: "Helen Blue", gender: "Male", phone_number: "8901234567", class: "JSS2", image: "/teacher.png" },
  { id: 9, student_name: "Grace Red", parent_name: "Ian Red", gender: "Female", phone_number: "9012345678", class: "JSS3", image: "/teacher.png" },
  { id: 10, student_name: "Henry Yellow", parent_name: "Olivia Yellow", gender: "Male", phone_number: "0123456789", class: "SS1", image: "/teacher.png" },
];

export default function Page() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  // Filter students based on search
  const filteredStudents = mockStudents.filter(student =>
    student.student_name.toLowerCase().includes(search.toLowerCase()) ||
    student.parent_name.toLowerCase().includes(search.toLowerCase()) ||
    student.class.toLowerCase().includes(search.toLowerCase()) ||
    student.gender.toLowerCase().includes(search.toLowerCase()) ||
    student.phone_number.includes(search)
  );

  return(
    <>
      <UserStats/>
      <UserEntries
        entriesPerPage={rowsPerPage}
        setEntriesPerPage={updateRowsPerPage}
        search={search}
        setSearch={setSearch}
      />
      <UserTable 
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={filteredStudents}
      />
    </>
  );
}
