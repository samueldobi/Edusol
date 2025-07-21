'use client';

import { BellAlertIcon, UserIcon } from '@heroicons/react/24/solid';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
// import SearchInput from '@/app/ui/dashboard/search-input';
import Link from 'next/link';
import { useState,useRef, useEffect } from 'react';
import Image from 'next/image';
interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [isOpen, setIsOpen] =  useState(false)
  const dropDownRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }
  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);
  return (
    <header className="bg-[#1AA939] fixed inset-x-0 top-0 z-10 md:left-0 md:w-full">
      <nav className="flex items-center justify-between p-4">
        <div className=" flex items-center space-x-4">
          <Link href ="/dashboard">
          <Image
            alt="Educesol logo"
            src="/logo-white-better.png"
            className="w-10 h-10 -mt-3"
            width={50}
            height={50}
          />
          </Link>
            <Link href ="/dashboard">
              <span className="text-white text-2xl font-bold">Educesol</span>
            </Link>

          {/* Close Button */}
          <button
            onClick={onMenuToggle}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            aria-label="Toggle sidebar"
          >
            <span className="sr-only">Open sidebar menu</span>
            <Bars3CenterLeftIcon className="w-8 h-8" />
          </button>
        </div>
     

        <div className="flex items-center space-x-0 sm:space-x-4">
          {/* Notification Button */}
          <Link href="/dashboard/notifications">
                 <button
            type="button"
            className="text-white hover:bg-green-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="View notifications"
            title="view notifications"
          >
            <BellAlertIcon className="w-6 h-6" />
          </button>

          </Link>
     
          {/* User Profile Button */}
          <div className="relative"   ref={dropDownRef}>
            <button
            onClick={()=>setIsOpen(true)}
              type="button"
              className="text-white hover:bg-green-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Open user menu"
            >
              <UserIcon className="w-6 h-6" />
            </button>
          </div>
          {/* Dropdown Profile  */}
          {isOpen && (
        <div 
        className="absolute right-0 top-full mt-2 w-44 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"

        >
          <div className="py-2">
            <Link
              href="/dashboard/admin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
            >
              Profile
            </Link>
            <button
              onClick={() => alert("Logging out...")}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
          )}
        </div>
      </nav>
    </header>
  );
}
