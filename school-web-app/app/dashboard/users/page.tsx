"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAllUsers} from "@/app/src/api/services/schoolService";
import UserStats from "@/app/ui/dashboard/users/user-stats";
import UserTable from "@/app/ui/dashboard/users/user-table";
import StudentTable from "@/app/ui/dashboard/users/student-table";
import TeacherTable from "@/app/ui/dashboard/users/teacher-table";
import AdminTable from "@/app/ui/dashboard/users/admin-table";
import GuardianTable from "@/app/ui/dashboard/users/guardian-table";
import UserEntries from "@/app/ui/dashboard/users/user-entries";

// Combined user type for display
export interface CombinedUserType {
  id: string;
  user_type: 'admin' | 'teacher' | 'guardian' | 'student';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "student";
  // Additional fields for specific user types
  subject?: string;
  qualification?: string;
  description?: string;
  role?: string;
  permissions?: string;
  student_code?: string;
  gender?: 'M' | 'F';
  date_of_birth?: string;
  medical_conditions?: string;
  class_id?: string;
  class_obj?: string;
  school?: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [users, setUsers] = useState<CombinedUserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const { users: usersCache, students, teachers, admins } = await fetchAllUsers();
      
      // Combine all user types into a single array
      const combinedUsers: CombinedUserType[] = [
        // Add students (they have their own cache)
        ...students.map(student => ({
          id: student.id,
          user_type: 'student' as const,
          first_name: '', // Will be populated from user_cache
          last_name: '', // Will be populated from user_cache
          email: '', // Will be populated from user_cache
          phone: '', // Will be populated from user_cache
          status: student.status,
          student_code: student.student_code,
          gender: student.gender,
          date_of_birth: student.date_of_birth,
          medical_conditions: student.medical_conditions,
          class_id: student.class_id,
          class_obj: student.class_obj,
          school: student.school,
        })),
        // Add teachers with their cache data
        ...teachers.map(teacher => ({
          id: teacher.id,
          user_type: 'teacher' as const,
          first_name: '', // Will be populated from user_cache
          last_name: '', // Will be populated from user_cache
          email: '', // Will be populated from user_cache
          phone: '', // Will be populated from user_cache
          status: 'active', // Default status
          subject: teacher.subject,
          qualification: teacher.qualification,
          description: teacher.description,
          school: teacher.school,
        })),
        // Add admins with their cache data
        ...admins.map(admin => ({
          id: admin.id,
          user_type: 'admin' as const,
          first_name: '', // Will be populated from user_cache
          last_name: '', // Will be populated from user_cache
          email: '', // Will be populated from user_cache
          phone: '', // Will be populated from user_cache
          status: 'active', // Default status
          role: admin.role,
          permissions: admin.permissions,
          school: admin.school,
        })),
        // Add general users (guardians and others)
        ...usersCache.map(user => ({
          id: user.id,
          user_type: user.user_type,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          status: user.status,
        })),
      ];
      
      setUsers(combinedUsers);
    } catch (err: unknown) {
      console.error('Failed to load users:', err);
      if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: string }).message === 'string') {
        setError((err as { message: string }).message);
      } else {
        setError('Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load users on mount and when returning from add user page
  useEffect(() => {
    loadUsers();
  }, []);

  // Get the filter from URL params
  useEffect(() => {
    const filter = searchParams.get('filter') || 'students';
    setActiveTab(filter);
  }, [searchParams]);

  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  // Filter data based on search and active tab
  const getFilteredData = () => {
    let data = [];
    
    switch (activeTab) {
      case 'students':
        data = users.filter(user => 
          user.user_type === 'student' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search) ||
            user.student_code?.toLowerCase().includes(search.toLowerCase())
          )
        );
        break;
      case 'teachers':
        data = users.filter(user => 
          user.user_type === 'teacher' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search) ||
            user.subject?.toLowerCase().includes(search.toLowerCase())
          )
        );
        break;
      case 'guardians':
        data = users.filter(user => 
          user.user_type === 'guardian' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search)
          )
        );
        break;
      case 'admin':
        data = users.filter(user => 
          user.user_type === 'admin' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search) ||
            user.role?.toLowerCase().includes(search.toLowerCase())
          )
        );
        break;
      default:
        data = users;
    }
    
    return data;
  };

  const filteredData = getFilteredData();

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={loadUsers}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'students':
        return (
          <StudentTable
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={filteredData}
            onUserUpdated={loadUsers}
            onUserDeleted={loadUsers}
          />
        );
      case 'teachers':
        return (
          <TeacherTable
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={filteredData}
            onUserUpdated={loadUsers}
            onUserDeleted={loadUsers}
          />
        );
      case 'guardians':
        return (
          <GuardianTable
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={filteredData}
            onUserUpdated={loadUsers}
            onUserDeleted={loadUsers}
          />
        );
      case 'admin':
        return (
          <AdminTable
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={filteredData}
            onUserUpdated={loadUsers}
            onUserDeleted={loadUsers}
          />
        );
      default:
        return (
          <UserTable 
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={filteredData}
          />
        );
    }
  };

  return(
    <>
      <UserStats/>
      <UserEntries
        entriesPerPage={rowsPerPage}
        setEntriesPerPage={updateRowsPerPage}
        search={search}
        setSearch={setSearch}
      />
      {renderTable()}
    </>
  );
}
