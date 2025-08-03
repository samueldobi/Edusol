"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchUsersList, UserType } from "@/app/src/api/services/userService";
import UserStats from "@/app/ui/dashboard/users/user-stats";
import UserTable from "@/app/ui/dashboard/users/user-table";
import StudentTable from "@/app/ui/dashboard/users/student-table";
import TeacherTable from "@/app/ui/dashboard/users/teacher-table";
import AdminTable from "@/app/ui/dashboard/users/admin-table";
import GuardianTable from "@/app/ui/dashboard/users/guardian-table";
import UserEntries from "@/app/ui/dashboard/users/user-entries";

export default function Page() {
  const searchParams = useSearchParams();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await fetchUsersList();
      setUsers(usersData);
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
        // Filter real users by student type
        data = users.filter(user => 
          user.user_type === 'STUDENT' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search)
          )
        );
        break;
      case 'teachers':
        // Filter real users by teacher type
        data = users.filter(user => 
          user.user_type === 'TEACHER' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search)
          )
        );
        break;
      case 'guardians':
        // Filter real users by guardian type
        data = users.filter(user => 
          user.user_type === 'GUARDIAN' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search)
          )
        );
        break;
      case 'admin':
        // Filter real users by admin type
        data = users.filter(user => 
          user.user_type === 'ADMIN' && (
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.includes(search)
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
