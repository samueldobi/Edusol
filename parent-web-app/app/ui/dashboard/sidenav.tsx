'use client';

import { useState } from 'react';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/dashboard/nav-links';

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ☰ Menu Button (Fixed Position) */}
      {/*Remember to remove hidden class from the button below*/}
      <button
        className="fixed top-4 left-4 z-30 p-2 bg-green-600 rounded-full md:top-6 md:left-6 hidden"
        onClick={() => setIsOpen(true)}
      >
        <Bars3CenterLeftIcon className="w-8 h-8 text-white" />
      </button>

      {/* 🔥 SideNav Panel */}
      <div
        className={`fixed bg-white shadow-lg h-screen w-full md:w-80 transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? 'translate-x-0' : '-translate-y-full md:-translate-x-full'}
        top-0 left-0 md:top-0 md:left-0`}
      >
        {/* Header with Close Button */}
        <div className="bg-green-600 p-4 flex items-center">
          <img
            alt="company logo"
            src="/logo-white-better.png"
            className="w-10 h-10 -mt-3"
          />
          <span className="text-white ml-1 text-3xl font-bold">Educesol</span>

          {/* Close Button */}
          <button className="ml-auto" onClick={() => setIsOpen(false)}>
            <XMarkIcon className="w-8 h-8 text-white hover:cursor-pointer" />
          </button>
        </div>

        {/* Navigation Links */}
        <NavLinks />
      </div>
    </>
  );
}
