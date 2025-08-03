"use client";
import Image from "next/image";

interface StudentData {
  id: string;
  name: string;
  parent_name: string;
  gender: string;
  phone_number: string;
  class: string;
  session: string;
  term: string;
  classId: string;
}

type Props = {
  studentSize?: number;
  studentData?: StudentData;
}

export default function StudentClassDetails({studentSize, studentData}: Props){
    return(
 
        <>
        <div className="  flex flex-col items-center justify-center lg:flex-row lg:justify-between bg-[#1AA939] text-white rounded-xl   mb-6 p-2">   
                <div className="flex p-4">
                      <Image
                        src="/images/teacher.png"
                        width={60}
                        height={60}
                        className="hidden md:block rounded-full border-2 m-2 border-white object-cover"
                        alt="Screenshots of the dashboard project showing desktop version"
                        />
                    <div className="mt-1">
                        <div className="text-lg uppercase tracking-wide opacity-80">Class Teacher</div>
                        <div className="font-semibold text-lg">Mr. Desmond Roland</div>
                    </div>
                </div>
                <div className="p-4">
                <div className="text-lg uppercase tracking-wide opacity-80">Number of Students</div>
                <div className="font-semibold text-2xl text-center text-[#fff]">{studentSize || 0}</div>
                </div>
                <div className="p-4">
                <div className="text-lg uppercase tracking-wide opacity-80 ">Input Student ID</div>
                <div className="flex items-center bg-white/10 rounded-md overflow-hidden">
                    <input
                    type="text"
                    defaultValue={studentData?.id || "8197465876"}
                    className="flex-1 px-3 py-2 bg-transparent text-white placeholder-white outline-none"
                    />
                  
                    <button className="p-2 hover:bg-white/20">
                    
                        <Image
                            src="/images/file.svg"
                            width={15}
                            height={7}
                            className="hidden md:block"
                            alt="Screenshots of the dashboard project showing desktop version"
                            />
                    </button>
                </div>
                </div>
            </div>
        </>

        
    )
}