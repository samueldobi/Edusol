import { SessionsPropTypes } from "@/app/constants/sessions";
import SessionCard from "./session-card";
import Link from "next/link";
import PrimaryButton from "../PrimaryButton";

export default function Session({ session }: { session: SessionsPropTypes }) {
  return (
    <div className="w-full px-4 py-2 flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-[30px] text-center font-semibold text-[#050548]">
          {session.name} ({session.year})
        </h2>
       <PrimaryButton>View all</PrimaryButton>
      </div>
      <Link
        href={`/dashboard/result/${session.id}`}
        className="w-full px-12 py-4 p-2 bg-[#b4d6fd33] items-center justify-center grid grid-cols-[repeat(3,300px)] gap-16"
      >
        {session.terms.map((term) => {
          return <SessionCard 
            key={term.id} 
            term={term.name}
            startDate={term.start}
            endDate={term.end}
            borderColor="border-blue-500"
          />;
        })}
      </Link>
    </div>
  );
}
