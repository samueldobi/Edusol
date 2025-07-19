import Image from "next/image";
import clock from "@/public/clockblue.png";
import { TermsPropTypes } from "@/app/constants/sessions";
export default function SessionCard({ term }: { term: TermsPropTypes }) {
  const border =
    term.id == "1" ? "1AA93947" : term.id == "2" ? "#00003266" : "#297fe180";
  const bg =
    term.id == "1" ? "#1AA939" : term.id == "2" ? "#424c87" : "#297FE1";
  return (
    <div
      style={{ borderColor: border }}
      className={`w-full border bg-white p-6 px-[2.1rem] py-2 items-center justify-center rounded-[10px]`}
    >
      <div className="w-full px-[2.2rem] p-2 flex flex-col space-y-6">
        <div
          style={{ backgroundColor: bg }}
          className={`flex rounded-[15px] px-4 items-center justify-between`}
        >
          <h2 className="text-[22px] font-semibold">{term.name}</h2>
          <Image src={clock} alt="Clock"  />
        </div>
        <div className="flex space-y-2 flex-col px-[1px] text-center">
          <p className="text-[15px] text-[#000032b2]">Start - {term.start}</p>
          <p className="text-[15px] text-[#000032b2]">End - {term.end}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
