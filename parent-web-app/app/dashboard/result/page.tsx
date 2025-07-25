"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const sessions = [
  {
    year: "2022/2023",
    terms: [
      { title: "1st Term ", start: "1st Sep 2022", end: "5th Dec 2022", border: "border-l-green-600" },
      { title: "2nd Term ", start: "9th Jan 2023", end: "5th April 2023", border: "border-l-blue-900" },
      { title: "3rd Term ", start: "5th May 2023", end: "27th July 2023", border: "border-l-blue-500" },
    ],
  },
  {
    year: "2021/2022",
    terms: [
      { title: "1st Term ", start: "1st Sep 2021", end: "5th Dec 2021", border: "border-l-green-600" },
      { title: "2nd Term ", start: "9th Jan 2022", end: "5th April 2022", border: "border-l-blue-900" },
      { title: "3rd Term ", start: "5th May 2022", end: "27th July 2022", border: "border-l-blue-500" },
    ],
  },
  {
    year: "2020/2021",
    terms: [
      { title: "1st Term ", start: "1st Sep 2020", end: "5th Dec 2020", border: "border-l-green-600" },
      { title: "2nd Term ", start: "9th Jan 2021", end: "5th April 2021", border: "border-l-blue-900" },
      { title: "3rd Term ", start: "5th May 2021", end: "27th July 2021", border: "border-l-blue-500" },
    ],
  },
];

export default function AcademicSession() {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen text-gray-900">
    

      {/* Main Section */}
      <section className="max-w-5xl mx-auto mt-10 px-4">
        {/* Search Bar */}
        {/* <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow mb-6 max-w-md">
          <Image
            src="/file.svg"
            alt="Search"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <input
            type="text"
            placeholder="Search academic session"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border-none outline-none text-base bg-transparent"
          />
        </div> */}

        {/* Add New Session */}
        <Link
          href="/dashboard/result/session/add-session"
          className="flex items-center gap-2 mb-8 font-semibold text-green-600 hover:underline cursor-pointer"
        >
          <Image
            src="/plus.png"
            alt="Add"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          Add New academic session
        </Link>

        {/* Academic Sessions */}
        {sessions
          .filter(session =>
            session.year.toLowerCase().includes(search.toLowerCase()) ||
            session.terms.some(term =>
              term.title.toLowerCase().includes(search.toLowerCase()) ||
              term.start.toLowerCase().includes(search.toLowerCase()) ||
              term.end.toLowerCase().includes(search.toLowerCase())
            )
          )
          .map((session) => (
            <div className="mb-10" key={session.year}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 mb-3 gap-2">
                <h3 className="text-lg font-bold">Academic Session ({session.year})</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition">View all</button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                {session.terms.map((term) => (
                  <Link
                    key={term.title}
                    href={{
                      pathname: "/dashboard/result/session",
                      query: {
                        session: session.year,
                        term: term.title,
                      },
                    }}
                    className="flex-1 min-w-[200px]"
                  >
                    <div
                      className={`bg-white p-5 rounded-xl shadow border-l-4 ${term.border} h-full cursor-pointer transition hover:shadow-lg`}
                    >
                      <div className="font-bold text-base mb-2">{term.title}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">
                        Start – {term.start}
                        <br />
                        End – {term.end}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
