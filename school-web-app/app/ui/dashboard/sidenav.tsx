'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/dashboard/nav-links';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNav({ isOpen, onClose }: SideNavProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar*/}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="bg-[#1AA939] flex items-center justify-between p-5">
          <div className="flex items-center">
            <img
              src="/images/logo-white-better.png"
              alt="Educesol logo"
              className="w-8 h-8 mr-2"
            />
            <span className="text-white text-xl font-bold">Educesol</span>
          </div>
          <button
            onClick={onClose}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <NavLinks />
      </aside>
    </>
  );
}
