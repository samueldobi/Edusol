"use client";
import { useState } from "react";
import { subjects } from "@/app/lib/placeholder-data";
import EditSubjectModal from "./edit-subject-modal";
type Subject = {
  index: number;
  arm: string;
  subjectName: string;
};
export default function SubjectFilter(){
      const [activeTab, setActiveTab] = useState<'junior' | 'senior'>('junior');
     const [editModal, setEditModal] = useState(false);
        const handleClick=(tabName: 'junior' | 'senior')=>{
            setActiveTab(tabName);
        }
        const handleShowModal=()=>{
            setEditModal(true);
        }
        const handleClose=()=>{
            setEditModal(false);
        }
        const handleSuccess=()=>{
            setEditModal(false);
        }
    const currentSubjects = subjects[activeTab]

    return(
        <>
        <div className="flex w-full  mt-2 mb-6">
            <button 
            onClick={() => handleClick('junior')}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-bold tracking-wide text-white ${
                    activeTab === 'junior' ? 'bg-[#071331]' : 'bg-[#1AA939]'
                } rounded-l-lg ml-[5px]`}
            >
                Junior
            </button>
            <button 
            onClick={() => handleClick('senior')}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-bold tracking-wide text-white ${
                    activeTab === 'senior' ? 'bg-[#071331]' : 'bg-[#1AA939]'
                } rounded-r-lg ml-[5px]`}
            >
                Senior
            </button>
            </div>

            {/* Subjects lits */}
            <div>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                {currentSubjects.map((subject:Subject) => (
                    <li
                    key={`${subject.arm}-${subject.index}`}
                    onClick={() => handleShowModal}
                    className="w-full text-left bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                    <p className="text-[#071331] font-bold">
                        {subject.subjectName}
                    </p>
                    </li>
                ))}
                </ul>
            </div>
              {editModal && (
                    <EditSubjectModal    
                    onClose={handleClose}
                    onSuccess={handleSuccess}
                    />
                )}
                </>
    )
}