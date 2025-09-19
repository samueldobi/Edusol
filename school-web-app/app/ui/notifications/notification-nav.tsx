"use client";
import Image from "next/image";
import { useState } from "react";
import ManageNotificationModal from "./manage-notification";
import ComposeNotificationModal from "./compose-notification";

interface NotificationNavProps {
  onRefresh: () => Promise<void>;
  onNotificationCreated: () => Promise<void>;
}

export default function NotificationNav({ onRefresh, onNotificationCreated }: NotificationNavProps) {
  const [manageModal, showManageModal] = useState(false);
  const [composeModal, showComposeModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <div className="bg-[#f8f9fa] p-3 sm:p-5 flex flex-col sm:flex-row justify-between items-center border-b border-[#e9ecef] gap-3">
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-2 border-[#1AA939] px-2 sm:px-4 py-1 sm:py-2 rounded font-bold text-xs sm:text-sm text-[#1AA939] hover:bg-[#1AA939] hover:text-white transition-colors disabled:opacity-50 flex-1 sm:flex-none"
          >
            {refreshing ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-current"></div>
                <span className="hidden sm:inline">REFRESHING...</span>
                <span className="sm:hidden">...</span>
              </div>
            ) : (
              'REFRESH'
            )}
          </button>
        </div>
        <div className="flex gap-2 justify-end w-full sm:w-auto">
          <button
            onClick={() => showManageModal(true)}
            className="border-2 border-[#1AA939] px-2 sm:px-4 py-1 sm:py-2 rounded font-bold text-xs sm:text-sm text-[#1AA939] hover:bg-[#1AA939] hover:text-white transition-colors flex-1 sm:flex-none"
          >
            MANAGE
          </button>
          <button
            onClick={() => showComposeModal(true)}
            className="flex border-2 border-[#1AA939] font-bold text-[#1AA939] px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-[#1AA939] hover:text-white transition-colors flex-1 sm:flex-none"
          >
            <span className="hidden sm:inline">
              <Image
                src="/Images/plus.png"
                width={20}
                height={20}
                alt="plus icon"
                className="p-1"
              />
            </span>
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">COMPOSE NEW</span>
            <span className="sm:hidden">COMPOSE</span>
          </button>
        </div>
      </div>

      {manageModal && (
        <ManageNotificationModal 
          onClose={() => showManageModal(false)} 
          onSuccess={handleRefresh}
        />
      )}
      {composeModal && (
        <ComposeNotificationModal 
          onClose={() => showComposeModal(false)} 
          onSuccess={onNotificationCreated}
        />
      )}
    </>
  );
}