"use client";
import Image from "next/image";
import { attendanceCardData } from "@/app/lib/placeholder-data";
import { useEffect, useState } from "react";


 
export default function StudentAttendanceCard() {

  // Card data type
  type CardData = {
    id: number;
    term: string;
    iconSrc: string;
    attendance: string;
    text: string;
  };

  const [cardData, setCardData] = useState<CardData[]>([]);
  

  useEffect(() => {
   
    setCardData(attendanceCardData)
    console.log(setCardData)
  }, []);

  return (
    <>
      <div className="my-6 p-7">
        <div className="h-1 w-60 mx-auto bg-green-500 rounded-full mt-50"></div>
        <h2 className="text-3xl md:text-5xl text-center font-bold text-gray-800 mb-4">
          Attendance
        </h2>
        <div className="h-1 w-60 mx-auto bg-green-500 rounded-full"></div>
      </div>

      <div className="flex flex-col items-center bg-white text-gray-900 p-8 rounded-xl shadow-md mb-8 mt-8">
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
      </div>
    </>
  );
}
