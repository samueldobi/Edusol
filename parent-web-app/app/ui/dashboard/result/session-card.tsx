"use client";
import Image from "next/image";

interface SessionCardProps {
  session: string;
  term: string;
  startDate: string;
  endDate: string;
  borderColor: string;
}

export default function SessionCard({ term, startDate, endDate, borderColor }: SessionCardProps) {
  return (
    <div className={`bg-white p-5 rounded-xl shadow border-l-4 ${borderColor} h-full cursor-pointer transition hover:shadow-lg`}>
      <div className="font-bold text-base mb-2">{term}</div>
      <div className="text-gray-600 text-sm leading-relaxed">
        <div className="flex items-center gap-2 mb-1">
          <Image
            src="/images/clockblue.png"
            alt="Clock"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          Start – {startDate}
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/clockblue.png"
            alt="Clock"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          End – {endDate}
        </div>
      </div>
    </div>
  );
}
