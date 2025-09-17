import { Button } from '@/app/ui/Auth/button';
import Link from 'next/link';
import Image from 'next/image';

export default function UnauthorizedPage() {
  return (
    <div className="relative h-screen bg-[url('/login-bg-image.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-lime-800 opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-11 md:w-[85%] lg:w-[60%] xl:w-[35%]">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Image
              alt="company logo"
              src="/images/logo.png"
              width={96}
              height={96}
              className="w-24 h-24"
            />
          </div>

          {/* Title + Subtitle */}
          <h2 className="text-4xl font-bold leading-[3.75rem] text-lime-600 text-center mt-4">
            Unauthorized
          </h2>
          <p className="text-base font-light text-indigo-950 text-center">
            You don't have permission to view this page.
          </p>

          {/* Buttons / Links */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <Link href="/dashboard">
              <Button>Back To Dashboard</Button>
            </Link>    
          </div>
        </div>
      </div>
    </div>
  );
}
