import Link from 'next/link';
import OtpInput from '@/app/ui/Auth/otpinputs';
import { Button } from '@/app/ui/Auth/button';

export default function ErrorForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col py-12 sm:w-[90%] px-6 sm:px-12 md:px-16 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <img alt="company logo" src="/logo.png" className="w-24 h-24" />
      </div>

      <p className="text-xs mt-5 text-center font-normal text-white bg-red-300 p-2 border border-red-500 ">
        <span className="font-bold">Whoops!</span> <br></br> There is a problem
        with your inputs, too many failed attemps or might be as a problem from
        server
      </p>
      <p className="text-sm text-center mt-5 font-light text-indigo-950">
        The following options might help
      </p>
      {/*Form section*/}
      <div className="mt-4 w-full flex flex-col items-stretch">
        <form action="#" method="POST" className="w-full">
          {/* button*/}
          <div className="flex justify-center mt-5">
            <Button className="w-full text-center">
              Profile security settings
            </Button>
          </div>
          <div className="flex w-full mt-5">
            <Button className="w-full">HELP</Button>
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
