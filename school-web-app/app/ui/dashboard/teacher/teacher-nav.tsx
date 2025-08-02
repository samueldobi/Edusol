"use client";
import Image from "next/image";
import AddTeacherModal from "./add-teacher";
import { useState } from "react";
export default function TeacherNav(){
    const [ teacherModal, setTeacherModal ] = useState(false)
    const  handleClick = () =>{
        setTeacherModal(true);
    }
    return(
        <>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5 w-full">
        <h2 className="text-[#2eb24c] text-lg sm:text-xl md:text-[22px] font-bold tracking-wide">
            ALL TEACHERS
        </h2>

        <div className="">
            <button
            type="submit"
            onClick={handleClick}
            className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-lg border border-white shadow-sm hover:shadow-md transition-shadow"
            >
            <span className="w-6 sm:w-7 h-6 sm:h-7">
                <Image
                src="/images/plus.png"
                width={30}
                height={30}
                alt= "plus icon"
                />
            </span>
            <span className="text-[16px] sm:text-[18px] md:text-[20px] text-[#2eb24c] font-semibold tracking-wide">
                Add Teachers
            </span>
            </button>
        </div>
        </div>
        {teacherModal &&(
            <AddTeacherModal onClose={()=>setTeacherModal(false)} />
        )}
        </>
    )
}