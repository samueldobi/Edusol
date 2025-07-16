import StudentOverviewCard from "@/app/ui/dashboard/result/student-profile/student-class-details";
import StudentClassDetails from "@/app/ui/dashboard/result/student-profile/student-overview-card";
import StudentAttendanceCard from "@/app/ui/dashboard/result/student-profile/student-attendace-card";
 import StudentPerformanceTable from "@/app/ui/dashboard/result/student-profile/student-performance-table";//import StudentList from "@/app/ui/dashboard/result/student-profile/studentList";


export default function Page(){
    return(
        <>
            <StudentOverviewCard/>
            <StudentClassDetails/>
            <StudentAttendanceCard  />
            <StudentPerformanceTable/>
        </>

    )
}