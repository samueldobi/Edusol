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
      <div className="bg-[#f8f9fa] p-5 flex justify-between items-center border-b border-[#e9ecef]">
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-2 border-[#1AA939] px-4 py-2 rounded font-bold text-sm text-[#1AA939] hover:bg-[#1AA939] hover:text-white transition-colors disabled:opacity-50"
          >
            {refreshing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                REFRESHING...
              </div>
            ) : (
              'REFRESH'
            )}
          </button>
        </div>
        <div className="flex gap-2 justify-end md:justify-center">
          <button
            onClick={() => showManageModal(true)}
            className="border-2 border-[#1AA939] px-4 py-2 rounded font-bold text-sm text-[#1AA939] hover:bg-[#1AA939] hover:text-white transition-colors"
          >
            MANAGE
          </button>
          <button
            onClick={() => showComposeModal(true)}
            className="flex border-2 border-[#1AA939] font-bold text-[#1AA939] px-4 py-2 rounded text-sm hover:bg-[#1AA939] hover:text-white transition-colors"
          >
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