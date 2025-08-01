"use client";
import SubjectTable from "@/app/ui/dashboard/subjects/subject-table";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AddSubjectModal from "@/app/ui/dashboard/subjects/add-subject-modal";
import { fetchSubjectsList, SubjectType } from "@/app/src/api/services/schoolService";

function SubjectEntries({ entriesPerPage, setEntriesPerPage, search, setSearch }: { entriesPerPage: number; setEntriesPerPage: (value: number) => void; search: string; setSearch: (value: string) => void }) {
  return (
    <div className="flex justify-between">
      <div className="p-6 flex items-center space-x-4">
        <label htmlFor="rowsPerPage" className="mr-2">Show</label>
        <select
          id="rowsPerPage"
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          className="p-2 border rounded w-44"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <p>Entries</p>
      </div>
      <div className="p-6">
        <input
          placeholder="Search Subjects"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="shadow-md rounded-full pl-12 py-3 w-full font-normal text-xl text-[#2C2C2C] focus:outline-[#2C2C2C]"
        />
      </div>
    </div>
  );
}

export default function Page() {
  const searchParams = useSearchParams();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");
      const fetchedSubjects = await fetchSubjectsList();
      setSubjects(fetchedSubjects);
      setCurrentPage(1);
    } catch (error: any) {
      if (error.response?.status === 403) {
        setError("Access forbidden. Please check your permissions.");
      } else if (error.response?.status === 404) {
        setError("API endpoint not found. Please check the configuration.");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(`Failed to fetch subjects: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh');
    if (shouldRefresh === 'true') {
      fetchSubjects();
      const url = new URL(window.location.href);
      url.searchParams.delete('refresh');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  const filteredSubjects = subjects.filter(subj =>
    subj.subject_name.toLowerCase().includes(search.toLowerCase()) ||
    subj.subject_code.toLowerCase().includes(search.toLowerCase()) ||
    (subj.description && subj.description.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <div className="text-center py-8">Loading subjects...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={fetchSubjects}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5 w-full">
        <h2 className="text-[#2eb24c] text-lg sm:text-xl md:text-[22px] font-bold tracking-wide">
          ALL SUBJECTS
        </h2>
        <div>
          <button
            type="button"
            onClick={() => setShowAddSubject(true)}
            className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-lg border border-white shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="w-6 sm:w-7 h-6 sm:h-7">
              <Image
                src="/images/plus.png"
                width={30}
                height={30}
                alt="plus icon"
              />
            </span>
            <span className="text-[16px] sm:text-[18px] md:text-[20px] text-[#2eb24c] font-semibold tracking-wide">
              Add Subject
            </span>
          </button>
        </div>
      </div>
      
      <SubjectEntries
        entriesPerPage={rowsPerPage}
        setEntriesPerPage={updateRowsPerPage}
        search={search}
        setSearch={setSearch}
      />
      <SubjectTable
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={filteredSubjects}
        onSubjectUpdated={fetchSubjects}
      />
      {showAddSubject && (
        <AddSubjectModal
          onClose={() => setShowAddSubject(false)}
          onSuccess={() => {
            fetchSubjects();
            setShowAddSubject(false);
          }}
        />
      )}
    </>
  );
}
