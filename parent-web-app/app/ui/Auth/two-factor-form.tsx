import { LockClosedIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function TwoFactorForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-11 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <LockClosedIcon className="h-20 w-20 text-indigo-950" />
      </div>
      {/*Title and Subtitle*/}
      <h2 className="text-2xl font-bold w-full  mt-3 text-center text-lime-500">
        Two Factor Authentication
      </h2>
      <p className="text-sm mt-0 text-center font-light text-indigo-950">
        Add an Extra Layer of security
      </p>
      <p className="text-sm mt-16 text-center font-light text-lime-500">
        Create a personalized code
      </p>
      {/*Form section*/}
      <div className="mt-4 w-full flex flex-col items-stretch">
        <form action="#" method="POST" className="w-full">
          <div className="flex sm:mx-9 justify-between">
            <input
              type="text"
              className="w-12 h-12 border-2 border-gray-300 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#66cc00] focus:border-[#66cc00]"
            />
            <input
              type="text"
              className="w-12 h-12 border-2 border-gray-300 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#66cc00] focus:border-[#66cc00]"
            />
            <input
              type="text"
              className="w-12 h-12 border-2 border-gray-300 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#66cc00] focus:border-[#66cc00]"
            />
            <input
              type="text"
              className="w-12 h-12 border-2 border-gray-300 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#66cc00] focus:border-[#66cc00]"
            />
            <input
              type="text"
              className="w-12 h-12 border-2 border-gray-300 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#66cc00] focus:border-[#66cc00]"
            />
            <input
              type="text"
              className="w-12 h-12 border-2 border-gray-300 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#66cc00] focus:border-[#66cc00]"
            />
          </div>
          {/*Submit button*/}
          <div className="flex justify-center mt-14">
            <button
              className="bg-indigo-950 font-bold text-white px-20 py-3"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
        <div className="mt-2 flex justify-center">
          <Link
            href="#"
            className="font-normal mt-8 text-sm text-indigo-950 cursor-pointer hover:underline focus:underline"
          >
            Back to log in page
          </Link>
        </div>
      </div>
    </div>
  );
}
