"use client"
import { useState } from "react";
import UserStats from "@/app/ui/dashboard/users/user-stats";
import UserTable from "@/app/ui/dashboard/users/user-table";
import UserEntries from "@/app/ui/dashboard/users/user-entries";
export default function Page() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
    const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };
  return(
    <>
    <UserStats/>
    <UserEntries
      entriesPerPage={rowsPerPage}
      setEntriesPerPage={updateRowsPerPage}
    />
    <UserTable rowsPerPage={rowsPerPage} />
    </>
  );
}
