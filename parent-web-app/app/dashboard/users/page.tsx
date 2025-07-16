import UserStats from "@/app/ui/dashboard/users/user-stats";
import UserTable from "@/app/ui/dashboard/users/user-table";
import UserEntries from "@/app/ui/dashboard/users/user-entries";
export default function Page() {
  return(
    <>
    <UserStats/>
    <UserEntries/>
    <UserTable/>
    </>
  );
}
