"use client";
import { useState } from "react";
import { createTerm, CreateTermPayload } from "@/app/src/api/services/schoolService";
import { useRouter } from "next/navigation";

export default function SessionCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstTerm: { start: "", end: "" },
    secondTerm: { start: "", end: "" },
    thirdTerm: { start: "", end: "" },
  });

  const handleInputChange = (term: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [term]: {
        ...prev[term as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const currentYear = new Date().getFullYear();
      const academicYear = `${currentYear}/${currentYear + 1}`;
      const currentDate = new Date().toISOString();

      // Create terms data
      const termsToCreate: CreateTermPayload[] = [
        {
          term_name: "First Term",
          academic_year: academicYear,
          start_date: formData.firstTerm.start,
          end_date: formData.firstTerm.end,
          is_current: true,
          created_by: "admin", 
          created_at: currentDate,
          school: "school_id", 
        },
        {
          term_name: "Second Term",
          academic_year: academicYear,
          start_date: formData.secondTerm.start,
          end_date: formData.secondTerm.end,
          is_current: false,
          created_by: "admin",
          created_at: currentDate,
          school: "school_id",
        },
        {
          term_name: "Third Term",
          academic_year: academicYear,
          start_date: formData.thirdTerm.start,
          end_date: formData.thirdTerm.end,
          is_current: false,
          created_by: "admin",
          created_at: currentDate,
          school: "school_id",
        },
      ];

      // Create all terms
      const createdTerms = await Promise.all(
        termsToCreate.map(term => createTerm(term))
      );
      
      // Redirect to sessions page with refresh parameter
      router.push("/dashboard/result/session?refresh=true");
    } catch (error: any) {
      console.error("Error creating terms:", error);
      setError(`Failed to create terms: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const terms = [
    {
      title: "FIRST TERM",
      key: "firstTerm",
      color: "bg-[#1AA939]",
    },
    {
      title: "SECOND TERM",
      key: "secondTerm",
      color: "bg-[#3b4d9e]",
    },
    {
      title: "THIRD TERM",
      key: "thirdTerm",
      color: "bg-[#1e90ff]",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1 bg-white p-8 rounded-xl shadow">
          {terms.map((term) => (
            <div key={term.title} className="mb-8">
              <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
                <span className={`inline-block w-4 h-4 rounded-sm mr-3 ${term.color}`} />
                {term.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label htmlFor={`${term.key}-start`} className="block text-gray-600 font-semibold mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id={`${term.key}-start`}
                    name={`${term.key}-start`}
                    value={formData[term.key as keyof typeof formData].start}
                    onChange={(e) => handleInputChange(term.key, "start", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[var(--dark-green)]"
                  />
                </div>
                <div className="relative">
                  <label htmlFor={`${term.key}-end`} className="block text-gray-600 font-semibold mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id={`${term.key}-end`}
                    name={`${term.key}-end`}
                    value={formData[term.key as keyof typeof formData].end}
                    onChange={(e) => handleInputChange(term.key, "end", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[var(--dark-green)]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {/* Display created terms info */}
          <div className="bg-[#3498db] text-[#000032B2] p-6 rounded-xl shadow">
            <div className="flex items-center mb-2">
              <h4 className="text-lg text-[#fff] font-bold mr-2">Academic Year</h4>
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-[#fff]">{new Date().getFullYear()}/{new Date().getFullYear() + 1}</p>
          </div>

          {/* Error display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Create button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-[#1AA939] hover:bg-green-800 text-white font-bold px-8 py-3 rounded-full shadow transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
              {loading ? "CREATING..." : "CREATE"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}