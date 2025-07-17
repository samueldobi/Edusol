import StudentAttendanceCard from "./student-attendace-card";
import StudentClassDetails from "./student-class-details";
import StudentOverviewCard from "./student-overview-card";
import StudentPerformanceTable from "./student-performance-table";
type StudentResultProps = {
  onBack: () => void;
  studentScore: number; 
  studentSize: number;
};
export default function StudentResult({onBack,  studentSize }:StudentResultProps){
    return(
        <>
        <div>
            <button
            onClick={onBack}
            className=" px-5 py-2 - bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition">
              Go back
            </button>
        </div>
         <StudentClassDetails studentSize ={studentSize}/>
         <StudentAttendanceCard />
         <StudentOverviewCard/>
         <StudentPerformanceTable/>
        </>
    )
}