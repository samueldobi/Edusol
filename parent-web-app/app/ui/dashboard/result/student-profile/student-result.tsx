import StudentAttendanceCard from "./student-attendace-card";
import StudentClassDetails from "./student-class-details";
import StudentOverviewCard from "./student-overview-card";
import StudentPerformanceTable from "./student-performance-table";
type StudentScore = {
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
  studentScore?: StudentScore;
  studentSize: number;
};
export default function StudentResult({onBack,  studentSize,studentScore }: StudentResultProps) {
  if (!studentScore) {
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
         <StudentAttendanceCard attendance={studentScore.attendance}  />
         <StudentOverviewCard/>
         <StudentPerformanceTable/>
        </>
    )
}