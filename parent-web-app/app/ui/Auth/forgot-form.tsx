import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export default function ResetForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-11 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <InformationCircleIcon className="h-20 w-20 text-indigo-950" />
        
      </div>
      {/*Title and Subtitle*/}
      <h2 className="text-3xl font-bold leading-[3.75rem] mt-3 text-center text-lime-500">
        Forgot Password
      </h2>
      <p className="text-sm text-center font-light text-indigo-950">
        Enter your phone number and you can get a link for a new password
      </p>
      {/*Form section*/}
      <div className="mt-4 w-full flex flex-col items-stretch">
        <form action="#" method="POST" className="w-full">
          {/*Phone number/Username*/}
          <div>
            <input
              id="phone"
              name="phone"
              type="phone"
              required
              autoComplete="phone"
              className="w-full text-indigo-950 p-4 sm:p-5 mt-4 border-2 border-gray-300 rounded-xl focus:ring-[#66cc00] focus:border-[#66cc00] focus:outline-none"
              placeholder="Phone number / Username"
            />
          </div>
          {/*Submit button*/}
          <div className="flex justify-center mt-7">
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
