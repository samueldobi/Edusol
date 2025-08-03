"use client";
import { useSearchParams } from "next/navigation";
import StudentOverviewCard from "@/app/ui/dashboard/result/student-profile/student-class-details";
import StudentClassDetails from "@/app/ui/dashboard/result/student-profile/student-overview-card";
// import StudentAttendanceCard from "@/app/ui/dashboard/result/student-profile/student-attendace-card";
import StudentPerformanceTable from "@/app/ui/dashboard/result/student-profile/student-performance-table";

export default function Page(){
    const searchParams = useSearchParams();
    const session = searchParams.get("session");
    const term = searchParams.get("term");
    const classId = searchParams.get("classId");
    const studentId = searchParams.get("studentId");
    const studentName = searchParams.get("studentName");
    const parentName = searchParams.get("parentName");
    const gender = searchParams.get("gender");
    const phoneNumber = searchParams.get("phoneNumber");
    const className = searchParams.get("className");

    // Student data object to pass to components
    const studentData = {
        id: studentId,
        name: studentName,
        parent_name: parentName,
        gender: gender,
        phone_number: phoneNumber,
        class: className,
        session,
        term,
        classId,
    };

    return(
        <>
            <div className="p-4">
                <h2 className="p-2 text-center text-white bg-[#1AA939] text-[15px] md:text-[23px] mb-4">
                    Student Result
                </h2>
                {/* <h2 className="p-2 text-center text-white bg-[#1AA939] text-[15px] md:text-[23px] mb-4">
                    Student Result - {studentName} ({className}) - {term} {session}
                </h2> */}
            </div>
            <StudentOverviewCard studentData={studentData}/>
            <StudentClassDetails studentData={studentData}/>
            {/* <StudentAttendanceCard attendance={studentScore.attendance} /> */}
            {/* <StudentAttendanceCard studentData={studentData} /> */}
            <StudentPerformanceTable studentData={studentData}/>
        </>
    )
}