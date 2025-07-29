"use client"
import { performanceTable } from "@/app/lib/placeholder-data"

interface StudentData {
  id: string;
  name: string;
  parent_name: string;
  gender: string;
  phone_number: string;
  class: string;
  session: string;
  term: string;
  classId: string;
}

interface Props {
  studentData?: StudentData;
}

export default function StudentPerformanceTable({ studentData }: Props){
    return(
    <>

            <div className="my-8">
              <div className="h-1 w-60 mx-auto bg-[#5695DC] rounded-full mb-4"></div>
              <h2 className="text-3xl md:text-3xl font-bold text-center text-[#5695DC] tracking-wide">
                ACADEMIC PERFORMANCE - {studentData?.name || "Student"}
              </h2>
              <div className="h-1 w-60 mx-auto bg-[#5695DC] rounded-full mt-4"></div>
            </div>

     <div className="space-y-8">
      {performanceTable.map((termData) => (
        <div key={termData.term} className="space-y-4">
          {/* Term Title */}
          <h2 className="text-xl font-semibold ">{termData.term}</h2>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-[#5695DC]">
                <tr
                className="text-[#fff]"
                >
                  <th className="px-4 py-2 border">Subject</th>
                  <th className="px-4 py-2 border">C.A</th>
                  <th className="px-4 py-2 border">Exam</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Grades</th>
                </tr>
              </thead>
              <tbody>
                {termData.details.map((row,idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-[#D9D9D9B2]"}>
                    <td className="px-4 py-2 border text-center">{row.subject}</td>
                    <td className="px-4 py-2 border text-center">{row.ca}</td>
                    <td className="px-4 py-2 border text-center">{row.exam}</td>
                    <td className="px-4 py-2 border text-center">{row.total}</td>
                    <td className="px-4 py-2 border text-center">{row.grades}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
    </>
    )
}