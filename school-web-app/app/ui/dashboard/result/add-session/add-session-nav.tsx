export default function AddSessionNav(){
    return(
    <>
<div className="flex justify-between items-center mb-8 p-4 md:p-6 bg-[#000032] rounded-xl shadow">
  <h2 className="text-2xl font-bold text-[#fff]">
    ADD NEW ACADEMIC SESSION
  </h2>

  <div className="relative group">
    <button
      className="flex items-center gap-2 text-xl font-semibold text-white focus:outline-none"
    >
      2025/2026
      {/* <svg
        className="w-4 h-4 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg> */}
    </button>
    {/* <div
      className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 hidden group-hover:block"
    >
      <a
        href="#"
        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        2024/2025
      </a>
      <a
        href="#"
        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        2025/2026 
      </a>
    </div> */}
  </div>
</div>

        </>
    )
}