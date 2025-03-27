"use client";

import { PropsWithChildren } from "react";

export default function PrimaryButton({children}:PropsWithChildren){
    return <button className="bg-[#1AA939] p-[2px] px-1 md:p-2 md:px-4 text-center text-white text-[14px] md:text-[22px] font-medium rounded-[10px]">
   {children}
    </button>
}