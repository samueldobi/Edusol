'use client';
import { useState } from 'react';
import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '@/app/ui/dashboard/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };
  return (
    <div className="flex relative h-screen flex-col md:flex-row md:overflow-hidden">
      <Header onMenuToggle={toggleSideNav} />
      <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} />
      <div className="flex-grow px-2 py-4 md:overflow-y-auto md:p-12 mt-16 ">
        {children}
      </div>
    </div>
  );
}
