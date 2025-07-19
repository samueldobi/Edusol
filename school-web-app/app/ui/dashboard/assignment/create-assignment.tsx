"use client";
import { useState } from "react";
import Image from "next/image";
import CreateAssignmentModal from "./modals/create-modal";
export default function CreateAssignmnent(){
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const handleCreateClick = () => {
    setIsLoading(true);
    // Small delay to show loading state, then show modal
    setTimeout(() => {
      setIsLoading(false);
      setShowCreate(true);
    }, 100);
  };
    return(
        <>
    <div className="flex flex-wrap gap-5 my-5">

      <div
        className="flex items-center justify-center px-6 py-4 rounded-xl font-semibold cursor-pointer flex-1 min-w-[200px] text-green-800 bg-white border-2 border-dashed border-[#1AA939] text-lg shadow-md hover:-translate-y-1 hover:shadow-lg transition">
          <button 
            onClick={handleCreateClick}
            disabled={isLoading}
            className="flex items-center"
          > 
            {isLoading ? (
              <>
                <div className="animate-spin mr-2 h-5 w-5 border-2 border-green-800 border-t-transparent rounded-full"></div>
                LOADING...
              </>
            ) : (
              <>
                <Image 
                src="/plus.png"
                width={20}
                height={20}
                alt="create icon"
                className="m-2"
                />
                CREATE
              </>
            )}
          </button>

      </div>

      {/* Total Assignments */}
      <div
        className="flex items-center justify-center px-6 py-4 rounded-xl font-semibold cursor-pointer flex-1 min-w-[200px]  text-white bg-[#1AA939] shadow-md hover:-translate-y-1 hover:shadow-lg transition"
      >
        <Image
          src="/contract.png"
          alt="Document Icon"
          className="mr-2 w-6 filter invert brightness-0"
          width={20}
          height={20}
        />
        26 Total Assignments
      </div>

      {/* Assignments Done */}
      <div
        className="flex items-center justify-center px-6 py-4 rounded-xl font-semibold cursor-pointer flex-1 min-w-[200px]  text-white bg-[#030036D9] shadow-md hover:-translate-y-1 hover:shadow-lg transition"
      >
        <Image
          src="/contract.png"
          alt="Document Icon"
          className="mr-2 w-6 filter invert brightness-0"
          width={20}
          height={20}
        />
        21 Assignment Done
      </div>
    </div>
        {showCreate && (
      <CreateAssignmentModal
        onClose={() => setShowCreate(false)}
        onSuccess={() => {
          setShowCreate(false);
        }}
      />
    )}
        </>
    )
}