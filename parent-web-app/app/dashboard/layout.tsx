import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '@/app/ui/dashboard/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative h-screen flex-col md:flex-row md:overflow-hidden">
      <Header />
      {/*<div className=" w-full flex-none sm:w-80 md:w-96">
        <SideNav />
      </div>*/}

      <SideNav />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
