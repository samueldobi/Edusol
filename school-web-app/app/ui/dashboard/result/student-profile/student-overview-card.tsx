"use client"
import Image from "next/image"
export default function StudentOverviewCard(){
    return(
        <div className="flex flex-col w-full mt-5 mb-5">
    <div className="my-8">
        <div className="h-1 w-60 mx-auto bg-[#000032] rounded-full mb-4"></div>
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#000032] tracking-wide">
          PERFORMANCE PROFILE
        </h2>
        <div className="h-1 w-60 mx-auto bg-[#000032] rounded-full mt-4"></div>
      </div>


  <div className="flex flex-col md:flex-row md:items-start md:gap-12 bg-white p-8 rounded-xl shadow-md mt-5 mb-8  md:w-[80%] mx-auto ">
    {/* Student Card */}
    <div className="flex flex-col items-center text-center mb-6 md:mb-0 flex-shrink-0">
      <div className="w-24 h-24 rounded-full mb-3 flex justify-center items-center overflow-hidden bg-gray-100">
        {/* Avatar Image */}
         <Image src="/graduate.png"
         width={150}
         height={150}
         alt="student image avatar"
         />
      </div>
      <p className="text-xl font-semibold text-gray-800">Tola Diamond</p>
      <p className="text-sm text-blue-500">JSS2 Blue</p>
    </div>

    {/* Profile Details Grid */}
    <div className="flex-grow grid grid-cols-1 gap-0 w-full text-[#040234]">
      {[
        { label: "Date Of Birth", value: "2 January 2010" },
        { label: "Parent's/Guardian's Contact", value: "+234 8197465876" },
        { label: "Class Strength", value: "30" },
        { label: "Position In Class", value: "8th" },
        { label: "Skill Acquired", value: "Fashion Designing" },
        { label: "Hobby", value: "Gaming" },
      ].map((item, idx) => (
        <div
          key={item.label}
          className={`flex justify-between items-center py-1 border-b border-gray-200 min-h-[25px]
            ${idx === 0 ? "pt-0" : ""}
            ${idx === 5 ? "border-b-0 pb-0" : ""}
          `}
        >
          <span className="text-sm text-gray-500 font-medium mr-1 text-left flex-shrink-0">
            {item.label}
          </span>
          <span className="text-base font-semibold text-gray-800 text-right flex-grow">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </div>

 <div className="button mt-5 mb-5 mx-auto">
  <button className=" px-5 py-2 - bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition">
    EDIT PROFILE
  </button>
 </div>
</div>

    )
}