import { SessionsPropTypes } from "@/app/constants/sessions";
import SessionCard from "./session-card";
// import Link from "next/link";
import PrimaryButton from "../PrimaryButton";

export default function Session({ session }: { session: SessionsPropTypes }) {
  return (
    <div className="w-full px-1 md:px-4 md:py-2 flex flex-col space-y-2 md:space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-[17px] max-w-[70%] md:text-[30px] font-medium md:font-semibold text-[#050548]">
          {session.name} ({session.year})
        </h2>
        <PrimaryButton>View all</PrimaryButton>
      </div>
      <div
                className="w-full px-2 md:px-2 py:2 md:py-4  p-1 bg-[#b4d6fd33] items-center justify-center grid grid-cols-1 md:grid-cols-[repeat(3,minmax(214px,1fr))] gap-4 md:gap-10 xl:gap-16"
      >
        {session.terms.map((term) => {
          return <SessionCard session={session.year} key={term.id} term={term} />;
        })}
      </div>
    </div>
  );
}
