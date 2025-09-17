import FeesDetails from "@/app/ui/dashboard/fees/fees-details";
import ProtectedRoute from '@/app/components/ProtectedRoute';
export default function Page() {
  return (
    <>
    <ProtectedRoute roles={["ADMIN", "SUPER_ADMIN", "GUARDIAN"]}>
      <FeesDetails />
      </ProtectedRoute>
    </>
  );
}