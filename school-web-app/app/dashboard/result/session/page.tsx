"use client";
import Image from "next/image";
import Class from "@/app/ui/dashboard/result/class";
import { useSearchParams } from "next/navigation";
import classes from "@/app/constants/classes";
import Link from "next/link";

export default function ResultSession() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const session = searchParams.get("session");
  const classarr = classes.find((c) => c.session == session);

  return (
    <div className="flex flex-col space-y-2 md:space-y-6 px-4 md:px-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className=" text-[15px] md:text-[25px] text-[#050548] font-medium">
            Academic session ({session})
          </h2>
          <Image
            className=" w-[0.9rem] md:w-[1.2rem]"
            src="/Images/Polygon 1.png"
            alt="Polygon"
            width={20}
            height={20}
          />
        </div>
        <div className="text-center p-[2px] px-1 md:px-4 rounded-[5px] bg-[#1AA939] font-semibold text-[12px] md:text-[25px] text-white">
          {term}
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        {classarr?.classes.map((c) => (
        <Link 
        key={c.id}
        href={{
          pathname: "class-details",
          query:{
            session,
            term,
            classId: c.id,
          }
        }}  
        >
            <Class
              classes={c.class} 
            id={c.id} />
        </Link>
        ))}
      </div>
    </div>

  );
}
