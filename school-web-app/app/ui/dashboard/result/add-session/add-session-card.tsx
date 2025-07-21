import { termData } from '../../../../lib/placeholder-data';
// import Image from "next/image"
export default function  SessionCard(){
    return(
        <>
            <div className="flex flex-col gap-8 md:flex-row">
  <div className="flex-1 bg-white p-8 rounded-xl shadow">
    {[
      {
        title: "FIRST TERM",
        startId: "term1-start",
        endId: "term1-end",
      },
      {
        title: "SECOND TERM",
        iconSrc: "/calendar.png",
        startId: "term2-start",
        endId: "term2-end",
      },
      {
        title: "THIRD TERM",
        startId: "term3-start",
        endId: "term3-end",
      },
    ].map((term) => (
      <div key={term.title} className="mb-8">
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
            <span
            className={`
                inline-block w-4 h-4 rounded-sm mr-3
                ${
                term.title === "FIRST TERM"
                    ? "bg-[#1AA939]"
                    : term.title === "SECOND TERM"
                    ? "bg-[#3b4d9e]"
                    : term.title === "THIRD TERM"
                    ? "bg-[#1e90ff]"
                    : "bg-gray-300"
                }
            `}
            />
        {term.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <label htmlFor={term.startId} className="block text-gray-600 font-semibold mb-1">
              Start Date
            </label>
            <input
              type="date"
              id={term.startId}
              name={term.startId}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[var(--dark-green)]"
            />
          </div>
          <div className="relative">
            <label htmlFor={term.endId} className="block text-gray-600 font-semibold mb-1">
              End Date
            </label>
            <input
              type="date"
              id={term.endId}
              name={term.endId}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[var(--dark-green)]"
            />
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Right Column */}
  <div className="w-full md:w-1/3 flex flex-col gap-6">
    {termData.map((card) => (
      <div
        key={card.id}
        className="bg-[#3498db] text-[#000032B2] p-6 rounded-xl shadow"
      >
        <div className="flex items-center mb-2">
          <h4 className="text-lg  text-[#fff] font-bold mr-2">{card.title}</h4>
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
        <p className="text-sm text-[#fff]">{card.start}</p>
        <p className="text-sm text-[#fff]">{card.end}</p>
      </div>
    ))}
    {/* Right column button */}
    <div className="flex justify-center mt-10">
  <button
    className="flex items-center gap-2 bg-[#1AA939] hover:bg-green-800 text-white font-bold px-8 py-3 rounded-full shadow transition-colors duration-300"
  >
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
    CREATE
  </button>
</div>

  </div>
</div>

        </>
    )
}