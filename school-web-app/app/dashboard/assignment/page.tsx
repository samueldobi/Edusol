import SearchClass from "@/app/ui/dashboard/assignment/search"
import CreateAssignmnent from "@/app/ui/dashboard/assignment/create-assignment";
import StudendInput from "@/app/ui/dashboard/assignment/student-input";
import AssignmentCards from "@/app/ui/dashboard/assignment/assignment-cards";
export default function Page() {
  return(
    <>
      <p className="text-[#1AA939] font-extrabold text-3xl">ASSIGNMENT</p>
        <SearchClass/>
        <CreateAssignmnent/>
        <StudendInput/>
        <AssignmentCards/>
    </>
  ) 
}
