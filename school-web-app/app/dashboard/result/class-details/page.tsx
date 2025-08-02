'use client';

import { useSearchParams } from "next/navigation";
import {  useState } from "react";
// import axios from "axios";
// import StudentResult from "@/app/ui/dashboard/result/student-profile/student-result";
import StudentClassDetails from "@/app/ui/dashboard/result/student-profile/student-class-details";

// Individual subject score
// interface SubjectScore {
//   subject: string;
//   ca: number;
//   exam: number;
//   total: number;
//   grade: string; 
// }

// Term-wise scores
// type TermScores = SubjectScore[];

// Attendance per term
// interface Attendance {
//   first_term: number;
//   second_term: number;
//   third_term: number;
// }

// Main student score structure
// interface StudentScoreData {
//   id: string; 
//   attendance: Attendance;
//   first_term: TermScores;
//   second_term: TermScores;
//   third_term: TermScores;
// }

// interface Student {
//   id: string;
//   name: string;
// }

import UserTable from "@/app/ui/dashboard/users/user-table";

const mockStudents = [
  { id: 1, student_name: "John Doe", parent_name: "Jane Doe", gender: "Male", phone_number: "1234567890", class: "SS1A", image: "/teacher.png" },
  { id: 2, student_name: "Mary Smith", parent_name: "Robert Smith", gender: "Female", phone_number: "2345678901", class: "SS1A", image: "/teacher.png" },
  { id: 3, student_name: "Alice Johnson", parent_name: "Michael Johnson", gender: "Female", phone_number: "3456789012", class: "SS1A", image: "/teacher.png" },
  { id: 4, student_name: "Bob Brown", parent_name: "Linda Brown", gender: "Male", phone_number: "4567890123", class: "SS1A", image: "/teacher.png" },
  { id: 5, student_name: "Charlie Green", parent_name: "Nancy Green", gender: "Male", phone_number: "5678901234", class: "SS1A", image: "/teacher.png" },
  { id: 6, student_name: "Diana White", parent_name: "Paul White", gender: "Female", phone_number: "6789012345", class: "SS1A", image: "/teacher.png" },
  { id: 7, student_name: "Eve Black", parent_name: "George Black", gender: "Female", phone_number: "7890123456", class: "SS1A", image: "/teacher.png" },
  { id: 8, student_name: "Frank Blue", parent_name: "Helen Blue", gender: "Male", phone_number: "8901234567", class: "SS1A", image: "/teacher.png" },
  { id: 9, student_name: "Grace Red", parent_name: "Ian Red", gender: "Female", phone_number: "9012345678", class: "SS1A", image: "/teacher.png" },
  { id: 10, student_name: "Henry Yellow", parent_name: "Olivia Yellow", gender: "Male", phone_number: "0123456789", class: "SS1A", image: "/teacher.png" },
  { id: 11, student_name: "Isaac Orange", parent_name: "Pam Orange", gender: "Male", phone_number: "1122334455", class: "SS1A", image: "/teacher.png" },
  { id: 12, student_name: "Julia Purple", parent_name: "Quinn Purple", gender: "Female", phone_number: "2233445566", class: "SS1A", image: "/teacher.png" },
  { id: 13, student_name: "Kevin Silver", parent_name: "Rita Silver", gender: "Male", phone_number: "3344556677", class: "SS1A", image: "/teacher.png" },
  { id: 14, student_name: "Lily Gold", parent_name: "Sam Gold", gender: "Female", phone_number: "4455667788", class: "SS1A", image: "/teacher.png" },
  { id: 15, student_name: "Mike Bronze", parent_name: "Tina Bronze", gender: "Male", phone_number: "5566778899", class: "SS1A", image: "/teacher.png" },
  { id: 16, student_name: "Nina Copper", parent_name: "Uma Copper", gender: "Female", phone_number: "6677889900", class: "SS1A", image: "/teacher.png" },
  { id: 17, student_name: "Oscar Jade", parent_name: "Vera Jade", gender: "Male", phone_number: "7788990011", class: "SS1A", image: "/teacher.png" },
  { id: 18, student_name: "Paula Ruby", parent_name: "Will Ruby", gender: "Female", phone_number: "8899001122", class: "SS1A", image: "/teacher.png" },
  { id: 19, student_name: "Quincy Pearl", parent_name: "Xena Pearl", gender: "Male", phone_number: "9900112233", class: "SS1A", image: "/teacher.png" },
  { id: 20, student_name: "Rita Sapphire", parent_name: "Yuri Sapphire", gender: "Female", phone_number: "1011121314", class: "SS1A", image: "/teacher.png" },
];

export default function ClassDetails() {
  const searchParams = useSearchParams();
  const session = searchParams.get("session");
  const term = searchParams.get("term");
  const classId = searchParams.get("classId") || "SS1A";
  

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Show all students for testing
  const students = mockStudents;
  const className = students.length > 0 ? students[0].class : classId;


  return (
    <div className="p-4 space-y-4">
      <h2 className="p-2 text-center text-white bg-[#1AA939] text-[15px] md:text-[23px]">
        Class Details for {className} - {term} {session}
      </h2>
      <StudentClassDetails studentSize={students.length} />
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="rowsPerPage" className="mr-2">Show</label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={e => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="p-2 border rounded w-24"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>Entries</span>
      </div>
      <UserTable
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={students}
      />
    </div>
  );
}
