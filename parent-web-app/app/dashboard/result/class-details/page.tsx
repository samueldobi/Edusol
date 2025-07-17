'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import StudentResult from "@/app/ui/dashboard/result/student-profile/student-result";

// Individual subject score
interface SubjectScore {
  subject: string;
  ca: number;
  exam: number;
  total: number;
  grade: string; 
}

// Term-wise scores
type TermScores = SubjectScore[];

// Attendance per term
interface Attendance {
  first_term: number;
  second_term: number;
  third_term: number;
}

// Main student score structure
interface StudentScoreData {
  id: string; 
  attendance: Attendance;
  first_term: TermScores;
  second_term: TermScores;
  third_term: TermScores;
}

interface Student {
  id: string;
  name: string;
}
export default function ClassDetails() {
  const searchParams = useSearchParams();
  const session = searchParams.get("session");
  const term = searchParams.get("term");
  // const classId = searchParams.get("classId");

  const [students, setStudents] = useState<Student[]>([]);
  const [studentScores, setStudentScores] = useState<StudentScoreData[]>([]);
  const [showScores, setShowScores] =  useState(false)
  // const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
    // Fetch Students Results Data 
    const fetchData= async() => {
      try {
        const studentsRes = await axios.get(
          "https://raw.githubusercontent.com/samueldobi/Currency-Converter/refs/heads/main/newstudent.json" 
        );
        const scoresRes = await axios.get(
          "https://raw.githubusercontent.com/samueldobi/Currency-Converter/refs/heads/main/scores.json" 
        );
        setStudents(studentsRes.data)
        setStudentScores(scoresRes.data)
        console.log("main student scores",students)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [session, term]);
  useEffect(() => {
    console.log("Updated student scores:", studentScores);
}, [studentScores]);

const  handleDisplayScores =(studentId: string)=>{
  setShowScores(true);
  // setSelectedStudent(studentId);
}
const handleGoBack = () => {
  setShowScores(false);
  // setSelectedStudent(null);
};

  return (
  <div className="p-4 space-y-4">
    {showScores ? (
      <StudentResult
        onBack={handleGoBack}
        // studentScore={studentScores.find((s) => s.id === selectedStudent)}
        studentSize={students.length}
      />
    ) : (
      <>
        <h2 className="p-2 text-center text-white bg-[#050548] text-[15px] md:text-[23px]">
          Class List for {term}, {session}
        </h2>

        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() =>
                   handleDisplayScores(student.id)}
                className="w-full text-left bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <p className="text-lg font-semibold text-gray-800">{student.name}</p>
              </button>
            ))}
          </ul>

        )}
      </>
    )}
  </div>
);

 
}
