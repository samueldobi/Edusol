import { LockClosedIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Button } from '@/app/ui/Auth/button';
export default function ResetForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-11 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <LockClosedIcon className="h-20 w-20 text-indigo-950" />
      </div>
      {/*Title and Subtitle*/}
      <h2 className="text-3xl font-bold leading-[3.75rem] mt-3 text-center text-lime-500">
        Reset Password
      </h2>
      <p className="text-sm text-center font-light text-indigo-950">
        Phone number has been confirmed, type in the new password sent via sms
      </p>
      {/*Form section*/}
      <div className="mt-4 w-full flex flex-col items-stretch">
        <form action="#" method="POST" className="w-full">
          {/*Phone number/Username*/}
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full text-indigo-950 p-4 sm:p-5 mt-5 border-2 border-gray-300 rounded-xl focus:ring-[#66cc00] focus:border-[#66cc00] focus:outline-none"
              placeholder="Password"
            />
          </div>
          {/*Submit button*/}
          <div className="flex flex-col sm:flex-row items-center justify-between  mt-7 gap-4">
            <Button className="w-full sm:w-auto px-3 py-3">
              RESET PASSWORD
            </Button>
            <Link
              href="login"
              className="font-normal  text-sm text-indigo-950 cursor-pointer hover:underline focus:underline"
            >
              Back to log in page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
