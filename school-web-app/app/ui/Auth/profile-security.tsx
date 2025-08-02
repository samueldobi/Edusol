import { Cog8ToothIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Button } from '@/app/ui/Auth/button';

export default function ProfileSecurityForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-16 md:p-20 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <Cog8ToothIcon className="h-20 w-20 text-indigo-950" />
      </div>
      {/*Title and Subtitle*/}
      <h2 className="text-2xl font-bold w-full  mt-3 text-center text-lime-500">
        Profile security setting
      </h2>
      <p className="text-sm mt-2 text-center font-light text-indigo-950">
        create and set all your personal information at one end
      </p>
      {/*Form section*/}
      <div className="mt-4 w-full flex flex-col items-stretch">
        <form
          action="#"
          method="POST"
          className="w-full  flex flex-col items-stretch"
        >
          {/*Submit button*/}
          <div className="flex justify-center">
            <Button className="w-full">Password settings</Button>
          </div>
          <div className="flex justify-center mt-5">
            <Button className="w-full">2FA security settings</Button>
          </div>
          <div className="flex justify-center mt-5">
            <Button className="w-full">HELP</Button>
          </div>
        </form>
        <div className="mt-5 flex justify-center">
          <Link
            href="login"
            className="font-normal mt-8 text-sm text-indigo-950 cursor-pointer hover:underline focus:underline"
          >
            Back to log in page
          </Link>
        </div>
      </div>
    </div>
  );
}
