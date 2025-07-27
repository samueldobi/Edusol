"use client";
import SubjectTable from "@/app/ui/dashboard/subjects/subject-table";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchSubjectsList, SubjectType } from "@/app/src/api/services/schoolService";

// Commented out mock data as requested
/*
const mockJuniorSubjects = [
  { id: 1, subject_name: "Mathematics", subject_code: "MATH101", description: "Basic Math" },
  { id: 2, subject_name: "English", subject_code: "ENG101", description: "English Language" },
  { id: 3, subject_name: "Basic Science", subject_code: "BSC101", description: "Basic Science" },
  { id: 4, subject_name: "Social Studies", subject_code: "SOC101", description: "Social Studies" },
  { id: 5, subject_name: "Civic Education", subject_code: "CIV101", description: "Civic Education" },
  { id: 6, subject_name: "Home Economics", subject_code: "HEC101", description: "Home Economics" },
  { id: 7, subject_name: "Physical Education", subject_code: "PED101", description: "Physical Education" },
  { id: 8, subject_name: "Computer Studies", subject_code: "CST101", description: "Computer Studies" },
  { id: 9, subject_name: "Agricultural Science", subject_code: "AGR101", description: "Agricultural Science" },
  { id: 10, subject_name: "French", subject_code: "FRN101", description: "French Language" },
  { id: 11, subject_name: "Business Studies", subject_code: "BUS101", description: "Business Studies" },
  { id: 12, subject_name: "Fine Arts", subject_code: "ART101", description: "Fine Arts" },
];
const mockSeniorSubjects = [
  { id: 13, subject_name: "Biology", subject_code: "BIO101", description: "Biology Basics" },
  { id: 14, subject_name: "Chemistry", subject_code: "CHEM101", description: "Chemistry Basics" },
  { id: 15, subject_name: "Physics", subject_code: "PHY101", description: "Physics Basics" },
  { id: 16, subject_name: "Mathematics", subject_code: "MATH201", description: "Advanced Math" },
  { id: 17, subject_name: "English", subject_code: "ENG201", description: "Advanced English" },
  { id: 18, subject_name: "Economics", subject_code: "ECO101", description: "Economics" },
  { id: 19, subject_name: "Government", subject_code: "GOV101", description: "Government" },
  { id: 20, subject_name: "Literature", subject_code: "LIT101", description: "Literature in English" },
  { id: 21, subject_name: "Geography", subject_code: "GEO101", description: "Geography" },
  { id: 22, subject_name: "Further Mathematics", subject_code: "FMATH101", description: "Further Mathematics" },
  { id: 23, subject_name: "CRS/IRS", subject_code: "CRS101", description: "Christian/Islamic Religious Studies" },
  { id: 24, subject_name: "Technical Drawing", subject_code: "TD101", description: "Technical Drawing" },
];
*/

function SubjectEntries({ entriesPerPage, setEntriesPerPage, search, setSearch }: { entriesPerPage: number; setEntriesPerPage: (value: number) => void; search: string; setSearch: (value: string) => void }) {
  return (
    <div className="flex justify-between">
      <div className=" p-6 flex items-center space-x-4">
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
          className=" shadow-md rounded-full pl-12 py-3 w-full font-normal text-xl text-[#2C2C2C] focus:outline-[#2C2C2C]"
        />
      
      </div>
    </div>
  );
}

export default function Page() {
  const searchParams = useSearchParams();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // Commented out tab functionality as requested
  // const [tab, setTab] = useState<'junior' | 'senior'>('junior');
  const [search, setSearch] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  // Fetch subjects from API
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching subjects...");
      console.log("API URL:", process.env.NEXT_PUBLIC_SCHOOL_SERVICE_URL);
      console.log("Full endpoint:", `${process.env.NEXT_PUBLIC_SCHOOL_SERVICE_URL}/api/schools/subjects`);
      
      const fetchedSubjects = await fetchSubjectsList();
      setSubjects(fetchedSubjects);
      console.log("Fetched subjects:", fetchedSubjects);
    } catch (error: any) {
      console.error("Error fetching subjects:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error config:", error.config);
      console.error("Request URL:", error.config?.url);
      console.error("Request method:", error.config?.method);
      console.error("Request headers:", error.config?.headers);
      
      if (error.response?.status === 403) {
        setError("Access forbidden. This might be a server configuration issue. Check console for details.");
      } else if (error.response?.status === 404) {
        setError("API endpoint not found. Please check the URL configuration.");
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

  // Check if we should refresh (e.g., when returning from add-subject page)
  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh');
    if (shouldRefresh === 'true') {
      fetchSubjects();
      // Clean up the URL parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('refresh');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  // Filter subjects based on search
  const filteredSubjects = subjects.filter(subj =>
    subj.subject_name.toLowerCase().includes(search.toLowerCase()) ||
    subj.subject_code.toLowerCase().includes(search.toLowerCase()) ||
    (subj.description && subj.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Test function to check API accessibility
  const testAPI = async () => {
    try {
      console.log("Testing API accessibility...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SCHOOL_SERVICE_URL}/api/schools/subjects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Test response status:", response.status);
      console.log("Test response headers:", response.headers);
      const data = await response.text();
      console.log("Test response data:", data);
      
      if (response.ok) {
        alert("API is accessible! Check console for details.");
      } else {
        alert(`API test failed with status: ${response.status}. Check console for details.`);
      }
    } catch (error) {
      console.error("API test error:", error);
      alert("API test failed. Check console for details.");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading subjects...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <div className="flex gap-2 justify-center">
          <button 
            onClick={fetchSubjects}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
          <button 
            onClick={testAPI}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Test API
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Check the browser console for more details
        </div>
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
                src="/plus.png"
                width={30}
                height={30}
                alt="plus icon"
              />
            </span>
            <Link href="/dashboard/subjects/add-subject">
              <span className="text-[16px] sm:text-[18px] md:text-[20px] text-[#2eb24c] font-semibold tracking-wide">
                Add Subject
              </span>
            </Link>
          </button>
        </div>
      </div>
      {/* Commented out Junior/Senior Tabs as requested */}
      {/*
      <div className="flex gap-4 mb-4 mt-2">
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-lg ${tab === 'junior' ? 'bg-[#1AA939] text-white' : 'bg-gray-200 text-[#1AA939]'}`}
          onClick={() => { setTab('junior'); setCurrentPage(1); }}
        >
          Junior
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-lg ${tab === 'senior' ? 'bg-[#1AA939] text-white' : 'bg-gray-200 text-[#1AA939]'}`}
          onClick={() => { setTab('senior'); setCurrentPage(1); }}
        >
          Senior
        </button>
      </div>
      */}
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
      />
     
    </>
  );
}
