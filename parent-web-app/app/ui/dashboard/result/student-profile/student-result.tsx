import StudentAttendanceCard from "./student-attendace-card";
import StudentClassDetails from "./student-class-details";
import StudentOverviewCard from "./student-overview-card";
import StudentPerformanceTable from "./student-performance-table";
type StudentScores = {
  id: string;
  attendance: {
    first_term: number;
    second_term: number;
    third_term: number;
  };
  first_term: number;
  second_term: number;
  third_term: number;
};
type StudentResultProps = {
  onBack: () => void;
  studentScores?: StudentScores;
  studentSize: number;
};
export default function StudentResult({onBack,  studentSize,studentScores }: StudentResultProps) {
  if (!studentScores) {
    return (
      <div className="p-4 text-center text-red-500">
        Student score data is not available.
      </div>
    );
  }
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
         <StudentAttendanceCard attendance={studentScores.attendance}  />
         <StudentOverviewCard/>
         <StudentPerformanceTable/>
        </>
    )
}