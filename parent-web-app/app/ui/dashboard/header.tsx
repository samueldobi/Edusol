'use client';

import { BellAlertIcon, UserIcon } from '@heroicons/react/24/solid';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import SearchInput from '@/app/ui/dashboard/search-input';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-[#1AA939] fixed inset-x-0 top-0 z-10 md:left-0 md:w-full">
      <nav className="flex items-center justify-between p-4">
        <div className=" flex items-center space-x-4">
          <img
            alt="Educesol logo"
            src="/logo-white-better.png"
            className="w-10 h-10 -mt-3"
          />
          <span className="text-white text-2xl font-bold">Educesol</span>

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
        <div className="hidden md:block">
          <SearchInput />
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <button
            type="button"
            className="text-white hover:bg-green-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="View notifications"
          >
            <BellAlertIcon className="w-6 h-6" />
          </button>

          {/* User Profile Button */}
          <button
            type="button"
            className="text-white hover:bg-green-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Open user menu"
          >
            <UserIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}
