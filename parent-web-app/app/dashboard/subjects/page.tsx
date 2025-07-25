"use client";
import SubjectTable from "@/app/ui/dashboard/subjects/subject-table";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState<'junior' | 'senior'>('junior');
  const [search, setSearch] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);
  console.log(showAddSubject);

  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const subjects = tab === 'junior' ? mockJuniorSubjects : mockSeniorSubjects;
  const filteredSubjects = subjects.filter(subj =>
    subj.subject_name.toLowerCase().includes(search.toLowerCase()) ||
    subj.subject_code.toLowerCase().includes(search.toLowerCase()) ||
    (subj.description && subj.description.toLowerCase().includes(search.toLowerCase()))
  );

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
      {/* Junior/Senior Tabs */}
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
      {/* AddSubjectModal would go here if implemented */}
    </>
  );
}
