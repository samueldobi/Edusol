// "use client";
import { Button } from '@/app/ui/Auth/button';
import Image from 'next/image';
import Link from 'next/link';
export default function HomePage() {
  return (
  
        <div className="relative h-screen bg-[url('/login-bg-image.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-lime-800 opacity-70"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
            <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-11 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <Image
        width={50}
        height={50}
        alt="company logo" 
        src="/logo.png" 
        className="w-24 h-24" />
      </div>
      {/*Title and Subtitle*/}
      <h2 className="text-4xl font-bold leading-[3.75rem] text-lime-600">
        Welcome to Edusol
      </h2>
        <div className="">
            <p className=" text-center font-light text-indigo-950 ">
            To Get Started 
      </p>
        </div>
      
      {/*Form section*/}
      <div className="mt-4 mx-auto transition-transform duration-300 hover:scale-75 ">
       
           <Link href= "/auth/login">
                <Button>LOG IN</Button>
            </Link>
        
      </div>
    </div>
      </div>
    </div>
  );
}
