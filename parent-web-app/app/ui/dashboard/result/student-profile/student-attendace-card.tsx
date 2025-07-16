"use client";
import Image from "next/image";
import { attendanceCardData } from "@/app/lib/placeholder-data";
import { useEffect, useState } from "react";
export default function  StudentAttendanceCard({attendance}){
        type CardData = {
        id: number;
        term: string;
        iconSrc: string;
        attendance: string;
        text: string;
        };
    const [cardData, setCardData] = useState<CardData[]>([]);
    useEffect(()=>{
        setCardData(attendanceCardData)
    },[])
    return(
        <>
           {/* <div className=" mt-2 mb-2">
                 <div className="h-0.5 mt-3 mb-2 bg-[#1AA939]"></div>
                    <p className="text-5xl text-center p-3">Attendance</p>
                 <div className="h-0.5 mt-2 mb-2 bg-[#1AA939]"></div>
            </div> */}
            <div className="my-6 p-7">
                <div className="h-1 w-60 mx-auto bg-green-500 rounded-full mt-50  "></div>
                <h2 className="text-3xl md:text-5xl text-center font-bold text-gray-800 mb-4">
                    Attendance
                </h2>
                <div className="h-1 w-60 mx-auto bg-green-500 rounded-full"></div>
                </div>

         <div className="flex flex-col items-center bg-white text-gray-900 p-8 rounded-xl shadow-md mb-8 mt-8">
         
            {/* Mapped card Start */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                    {cardData.map((card) => (
                        <div
                        key={card.id}
                        className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-[#cad9ffcc]"
                        >
                        <p className="text-lg font-semibold mt-2 mb-2">{card.term}</p>
                        <Image
                            src={card.iconSrc}
                            width={60}
                            height={60}
                            className="hidden md:block mt-2 "
                            alt={`Icon for ${card.term}`}
                        />
                        <p className="mt-2 mb-1 text-[#5695DC] ">{card.attendance}</p>
                        <p className="text-sm text-[#5695DC] mt-2" >{card.text}</p>
                        </div>
                    ))}
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cardData.map((card) => (
                        <div
                        key={card.id}
                        className="flex flex-col items-center bg-white p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 hover:bg-blue-50"
                        >
                        <p className="text-xl font-semibold text-gray-800 mb-3">{card.term}</p>
                        <Image
                            src={card.iconSrc}
                            width={60}
                            height={60}
                            className="hidden md:block mb-4"
                            alt={`Icon for ${card.term}`}
                        />
                        <p className="text-lg font-medium text-blue-500 mb-1">{card.attendance}</p>
                        <p className="text-sm text-blue-400 text-center">{card.text}</p>
                        </div>
                    ))}
                    </div>

            {/* Mapped card Start */}
   
    
        </div>

        </>
    )
}