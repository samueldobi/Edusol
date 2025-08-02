"use client";
import Image from "next/image"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: Student[];
}
  type Student = {
        id: number;
        student_name: string;
        parent_name: string;
        gender: string;
        phone_number: string;
        class: string;
        image: string;
        };
type ApiStudent = Student & { status: string };
export default function UserTable({
  rowsPerPage,
  currentPage,
  setCurrentPage,
  data
}: Props){
  
// States for student data and student size
const [studentData, setStudentData] = useState<Student[]>([]);
const[studentSize, setStudentSize] =  useState(0);
const router = useRouter();
const searchParams = useSearchParams();

    useEffect(()=>{
        const fetchStudents =async()=>{
            try{
                const res = await axios.get("https://raw.githubusercontent.com/samueldobi/Currency-Converter/refs/heads/main/edusol_data.json")
                // Filter for only students
                const studentEntries = res.data.filter((entry:ApiStudent)=>entry.status === "student")
                setStudentData(studentEntries)
                setStudentSize(studentEntries.length)
            }catch(err){
                // Handle error silently
            }
        }
        fetchStudents();
    },[])

    const handleStudentClick = (student: Student) => {
        const session = searchParams.get("session");
        const term = searchParams.get("term");
        const classId = searchParams.get("classId");
        
        const queryParams = new URLSearchParams({
            session: session || "",
            term: term || "",
            classId: classId || "",
            studentId: student.id.toString(),
            studentName: student.student_name,
            parentName: student.parent_name,
            gender: student.gender,
            phoneNumber: student.phone_number,
            className: student.class,
        });
        
        router.push(`/dashboard/result/student-result?${queryParams.toString()}`);
    };

      // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(data.length / rowsPerPage);

  // Change page function
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };
    return(
        <>
        {/* Table display on larger screen sizes */}
        <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#D1DFFF] shadow-md">
                <tr>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                    Profile
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                    Name
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                    Class
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                    Parent Name
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                    Gender
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                    Phone Number
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                    Manage
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item) => (
                <tr 
                    key={item.id} 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleStudentClick(item)}
                >
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-37 w-37">
                        <div className={`flex-shrink-0 bg-[#1AA939] rounded-full`}>
                            <Image 
                            width={40}
                            height={40}
                            src="/images/teacher.png" 
                            alt="avatar of a teacher" />
                        </div>
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#4A4C51] font-semibold">
                        {item.student_name}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.class}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {item.parent_name}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center justify-left">
                        {item.gender}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.phone_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                        <button 
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStudentClick(item);
                            }}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Manage
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {/* Card display on smaller screen sizes */}
    <div className="block md:hidden space-y-4 ">
  {paginatedData.map((item) => (
    <div 
        key={item.id} 
        className="bg-white shadow rounded-lg p-4 border border-gray-100 w-full cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => handleStudentClick(item)}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          width={60}
          height={60}
          src="/images/teacher.png"
          alt="avatar"
          className="rounded-full object-cover"
        />
        <div className="text-base font-semibold text-[#1AA939]">{item.student_name}</div>
      </div>

      <div className="mt-3 text-sm flex flex-col items-center justify-center ">
        <p><span className="font-medium p-2">Class:</span> {item.class}</p>
        <p><span className="font-medium p-2">Parent:</span> {item.parent_name}</p>
        <p><span className="font-medium p-2">Gender:</span> {item.gender}</p>
        <p><span className="font-medium  p-2">Phone:</span> {item.phone_number}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            onClick={(e) => {
                e.stopPropagation();
                handleStudentClick(item);
            }}
        >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage
        </button>
      </div>
    </div>
  ))}
</div>

    {/* Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 px-6 gap-2 my-2 text-center md:text-left">
        <div>
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)}{' '}
          of {data.length} entries
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 font-bold bg-transparent rounded text-[#1AA939]  border border-[#1AA939] hover:bg-[#1AA939] hover:text-white disabled cursor-pointer disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Number Display */}
          <span>
            Page
          </span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={endIndex >= data.length}
            className="px-4 py-2 bg-[#1AA939] text-white font-bold rounded border border-[#1AA939] hover:bg-transparent hover:text-[#1AA939] disabled cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
        </>
    )
}