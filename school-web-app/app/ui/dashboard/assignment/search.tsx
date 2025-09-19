"use client";
import { useState, useEffect } from "react";
// import Image from "next/image";
export default function SearchClass(){
    const [selectedClass, setSelectedClass] = useState("");
    useEffect(() => {
        console.log(setSelectedClass);
    }, [selectedClass]);
    return (
    <div className="flex items-center gap-3 mb-6 p-2">
      {/* Input Wrapper */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search class"
          className="w-full pl-10 pr-4 py-2 text-base border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
          🔍
        </span>
      </div>

      {/* Class Selector Button */}
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 bg-[#1AA939] text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
      >
        {selectedClass}
        <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white" />
      </button>
    </div> 
    )
}

