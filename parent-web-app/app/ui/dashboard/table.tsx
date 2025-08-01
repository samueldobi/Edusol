import Link from "next/link";

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
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#D1DFFF] shadow-md">
        <tr>
          <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
            Profile
          </th>
          <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
            Class
          </th>
          <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
            Date / Time
          </th>
          <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
            Payment details
          </th>
          <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
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
                    <img src="/images/teacher.png" alt="avatar of a teacher" />
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
                    <img
                      src="/images/house-icon.png"
                      alt="Tuition"
                      className="h-6 w-6 mr-1"
                    />
                    <img
                      src="/images/tuition-icon.png"
                      alt="Tuition"
                      className="h-6 w-6 mr-1"
                    />
                    <img
                      src="/images/brick-icon.png"
                      alt="Tuition"
                      className="h-6 w-6 mr-1"
                    />
                  </div>
                ) : item.paymentDetails === '(2)' ? (
                  <div className="flex">
                    <img
                      src="/images/house-icon.png"
                      alt="Tuition"
                      className="h-6 w-6 mr-1"
                    />
                    <img
                      src="/images/tuition-icon.png"
                      alt="Tuition"
                      className="h-6 w-6 mr-1"
                    />
                  </div>
                ) : (
                  <div className="flex">
                    <img
                      src="/images/brick-icon.png"
                      alt="Tuition"
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
  );
}
