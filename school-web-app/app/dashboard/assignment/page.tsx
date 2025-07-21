import SearchClass from '../../ui/dashboard/assignment/search';
import CreateAssignmnent from '../../ui/dashboard/assignment/create-assignment';
import StudendInput from '../../ui/dashboard/assignment/student-input';
import AssignmentCards from '../../ui/dashboard/assignment/assignment-cards';
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
