"use client";
import { useState } from "react";
export default function TeacherDepartmentTab(){
    const [activeTab, setActiveTab] = useState('science');
    const handleClick=(tabName)=>{
        setActiveTab(tabName);
    }
    return(
        <>
            <div className="flex w-full  mt-2 mb-6">
            <button 
            onClick={() => handleClick('science')}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-bold tracking-wide text-white ${
                    activeTab === 'science' ? 'bg-[#071331]' : 'bg-[#1AA939]'
                } rounded-l-lg ml-[5px]`}
            >
                Science
            </button>
            <button 
            onClick={() => handleClick('art')}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-bold tracking-wide text-white ${
                    activeTab === 'art' ? 'bg-[#071331]' : 'bg-[#1AA939]'
                } rounded-none ml-[5px]`}
            >
                Art
            </button>
            <button 
            onClick={() => handleClick('commercial')}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-bold tracking-wide text-white ${
                    activeTab === 'commercial' ? 'bg-[#071331]' : 'bg-[#1AA939]'
                } rounded-none ml-[5px]`}
            >
                Commercial
            </button>
            <button 
            onClick = {() => handleClick('others')}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-bold tracking-wide text-white ${
                    activeTab === 'others' ? 'bg-[#071331]' : 'bg-[#1AA939]'
                } rounded-r-lg ml-[5px]`}
            >
                Others
            </button>
            </div>

        </> 
    );
}