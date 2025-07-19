"use client";
import Image from "next/image";
import { useState } from "react";
import ManageNotificationModal from "./manage-notification";
import ComposeNotificationModal from "./compose-notification";
export default function NotificationNav() {
        const [manageModal, showManageModal] = useState(false)
        const [composeModal, showComposeModal] = useState(false)
    return(
        <>
            <div className="bg-[#f8f9fa] p-5 flex justify-end items-center border-b border-[#e9ecef]">
            <div className="flex gap-2 justify-end md:justify-center">
                <button 
                onClick={()=>showManageModal(true)}
                className="border-2 border-[#1AA939]  px-4 py-2 rounded font-bold text-sm text-[#1AA939]">
                MANAGE
                </button>
                <button 
                    onClick={()=>showComposeModal(true)}
                    className=" flex border-2 border-[#1AA939] font-bold text-[#1AA939] px-4 py-2 rounded  text-sm ">
                    <span>
                        <Image 
                         src="/plus.png"
                        width={20}
                        height={20}
                        alt="plus icon"
                        className="p-1"
                        />
                    </span>
                    COMPOSE NEW
                </button>
            </div>
            </div>

            {manageModal &&
           < ManageNotificationModal onClose = {()=> showManageModal(false)} />}
            {composeModal &&
           < ComposeNotificationModal onClose = {()=> showComposeModal(false)} />}

        </>
    )
}