"use client";
import Image from "next/image";
export default function StudentClassDetails({studentSize}){
    return(
 
        <>
        <div className="  flex flex-col items-center justify-center lg:flex-row lg:justify-between bg-green-600 text-white rounded-xl   mb-6 p-2">   
                <div className="flex p-4">
                      <Image
                        src="/teacher.png"
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
                <div className="font-semibold text-2xl text-center text-[#fff]">{studentSize}</div>
                </div>
                <div className="p-4">
                <div className="text-lg uppercase tracking-wide opacity-80 ">Input Student ID</div>
                <div className="flex items-center bg-white/10 rounded-md overflow-hidden">
                    <input
                    type="text"
                    defaultValue="8197465876"
                    className="flex-1 px-3 py-2 bg-transparent text-white placeholder-white outline-none"
                    />
                    {/* Example SVG icon */}
                    <button className="p-2 hover:bg-white/20">
                    {/* I used the file icon here*/}
                        <Image
                            src="/file.svg"
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