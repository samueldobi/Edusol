import StudentOverviewCard from '../../../ui/dashboard/result/student-profile/student-class-details';
import StudentClassDetails from '../../../ui/dashboard/result/student-profile/student-overview-card';
import StudentAttendanceCard from '../../../ui/dashboard/result/student-profile/student-attendace-card';
import StudentPerformanceTable from '../../../ui/dashboard/result/student-profile/student-performance-table';


export default function Page(){
    return(
        <>
            <StudentOverviewCard/>
            <StudentClassDetails/>
            {/* <StudentAttendanceCard attendance={studentScore.attendance} /> */}
            <StudentAttendanceCard  />
            <StudentPerformanceTable/>
        </>

    )
}