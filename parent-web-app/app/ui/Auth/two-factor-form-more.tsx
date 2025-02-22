import { LockClosedIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import OtpInput from '@/app/ui/Auth/otpinputs';
import { Button } from '@/app/ui/Auth/button';

export default function TwoFactorFormMore() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-6 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <img alt="company logo" src="/logo.png" className="w-24 h-24" />
      </div>
      {/*Title and Subtitle*/}
      <h2 className="text-2xl font-bold w-full  mt-5 text-center text-lime-500">
        One more step
      </h2>
      <p className="text-sm mt-0 text-center font-light text-indigo-950">
        Type in your two factor authentication code
      </p>

      <div className="flex justify-center items-center">
        <LockClosedIcon className="h-20 w-20 text-indigo-950" />
      </div>
      {/*Form section*/}
      <div className="mt-4 w-full flex flex-col items-stretch">
        <form action="#" method="POST" className="w-full">
          {/*OTP input*/}
          <OtpInput length={6} />
          {/*Submit button*/}
          <div className="flex justify-center mt-14">
            <Button>LOG IN</Button>
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
