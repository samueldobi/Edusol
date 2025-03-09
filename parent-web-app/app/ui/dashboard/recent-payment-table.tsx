const data = [
  {
    profile: 'Anabella George',
    class: 'SS3A',
    date: '07-06-2024',
    time: '6:30',
    paymentDetails: '(3)',
    amount: 'NGN 122,000',
    status: 'SUCCESSFUL',
  },
  {
    profile: 'Amaka Chukwuka',
    class: 'SS2B',
    date: '07-06-2024',
    time: '6:30',
    paymentDetails: '(2)',
    amount: 'NGN 120,000',
    status: 'UNSUCCESSFUL',
  },
  {
    profile: 'Daniel Gabriel',
    class: 'SS3A',
    date: '07-06-2024',
    time: '6:30',
    paymentDetails: '(3)',
    amount: 'NGN 122,000',
    status: 'Pending',
  },
  {
    profile: 'Harrison Benji',
    class: 'SS1A',
    date: '07-06-2024',
    time: '6:30',
    paymentDetails: '(1)',
    amount: 'NGN 100,000',
    status: 'SUCCESSFUL',
  },
  {
    profile: 'Daniel Gabriel',
    class: 'SS3A',
    date: '07-06-2024',
    time: '6:30',
    paymentDetails: '(3)',
    amount: 'NGN 122,000',
    status: 'Pending',
  },
];

const RecentPaymentsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <p className="font-medium p-4 uppercase">Recent Payments</p>
      {/* Added shadow and overflow-x-auto for horizontal scrolling */}
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
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16">
                    <div className={`flex-shrink-0 bg-[#1AA939] rounded-full`}>
                      <img src="/teacher.png" alt="avatar of a teacher" />
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
                        src="/house.icon.png"
                        alt="Tuition"
                        className="h-6 w-6 mr-1"
                      />
                      <img
                        src="/tuition.icon.png"
                        alt="Tuition"
                        className="h-6 w-6 mr-1"
                      />
                      <img
                        src="/brick.icon.png"
                        alt="Tuition"
                        className="h-6 w-6 mr-1"
                      />
                    </div>
                  ) : item.paymentDetails === '(2)' ? (
                    <div className="flex">
                      <img
                        src="/house.icon.png"
                        alt="Tuition"
                        className="h-6 w-6 mr-1"
                      />
                      <img
                        src="/tuition.icon.png"
                        alt="Tuition"
                        className="h-6 w-6 mr-1"
                      />
                    </div>
                  ) : (
                    <div className="flex">
                      <img
                        src="/brick.icon.png"
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
                      : item.status === 'Pending'
                      ? 'bg-[#FFB400] text-[#FFFFFF]'
                      : 'bg-[#F84141] text-[#FFFFFF]'
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-3 flex justify-end">
        <button className="text-blue-600 hover:text-blue-800 text-sm">
          View All Payments
        </button>
      </div>
    </div>
  );
};

export default RecentPaymentsTable;
