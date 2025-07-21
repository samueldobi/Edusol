import Session from '../../ui/dashboard/result/session';
import sessions from '../../constants/sessions';
import Image from "next/image";
import plus from '../../../public/plus.png';
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col space-y-6">
      <Link href={"/dashboard/result/session/add-session"} className="flex items-center space-x-4">
        <Image src={plus} alt="Plus" />
        <p className="text-[#1AA939] text-[14px] md:text-[20px] font-medium">
          Add New academic session
        </p>
      </Link>
      <div className="px-4 md:px-12 p-1 flex flex-col space-y-4">
        {sessions.map((session) => {
          return <Session key={session.id} session={session} />;
        })}
      </div>
    </div>
  );
}
