import Link from "next/link";
import Image from "next/image";

interface TableProps {
  data: {
    profile: string;
    class: string;
    date: string;
    time: string;
    paymentDetails: string;
    amount: string;
    status: string;
  }[];
}
export default function Table({ data }: TableProps) {
  return (
    <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-[#D1DFFF] shadow-md">
      <tr>
        <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider whitespace-nowrap">
          Profile
        </th>
        <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider whitespace-nowrap">
          Name
        </th>
        <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider whitespace-nowrap">
          Class
        </th>
        <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider whitespace-nowrap">
          Date / Time
        </th>
        <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider whitespace-nowrap">
          Payment details
        </th>
        <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider whitespace-nowrap">
          Amount
        </th>
        <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider whitespace-nowrap">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item, index) => (
        <Link key={index} href={{ pathname: "/dashboard/payment/payment-details", query: { userId: item.profile, class: item.class, amount: item.amount } }} legacyBehavior>
          <tr className="cursor-pointer hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16">
                <div className={`flex-shrink-0 bg-[#1AA939] rounded-full`}>
                  <Image 
                    src="/Images/teacher.png" 
                    alt="avatar of a teacher"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-[#4A4C51] font-semibold">
              {item.profile}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{item.class}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {item.date} {item.time}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900 flex items-center justify-center">
              {item.paymentDetails === '(3)' ? (
                <div className="flex">
                  <Image
                    src="/Images/house-icon.png"
                    alt="House icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 mr-1"
                  />
                  <Image
                    src="/Images/tuition-icon.png"
                    alt="Tuition icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 mr-1"
                  />
                  <Image
                    src="/Images/brick-icon.png"
                    alt="Brick icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 mr-1"
                  />
                </div>
              ) : item.paymentDetails === '(2)' ? (
                <div className="flex">
                  <Image
                    src="/Images/house-icon.png"
                    alt="House icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 mr-1"
                  />
                  <Image
                    src="/Images/tuition-icon.png"
                    alt="Tuition icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 mr-1"
                  />
                </div>
              ) : (
                <div className="flex">
                  <Image
                    src="/images/brick-icon.png"
                    alt="Brick icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 mr-1"
                  />
                </div>
              )}
              {item.paymentDetails}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{item.amount}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                item.status === 'SUCCESSFUL'
                  ? 'bg-[#1AA939] text-[#FFFFFF]'
                  : item.status === 'PENDING'
                  ? 'bg-[#FFB400] text-[#FFFFFF]'
                  : 'bg-[#F84141] text-[#FFFFFF]'
              }`}
            >
              {item.status}
            </span>
          </td>
        </tr>
        </Link>
      ))}
    </tbody>
  </table>
</div>

  );
}
