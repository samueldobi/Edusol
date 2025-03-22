interface Payment {
  name: string;
  class: string;
  dateTime: string;
  paymentDetails: string;
  amount: string;
  status: string;
}

export default function TableRow(payment: Payment) {
  const {
    name,
    class: studentClass,
    dateTime,
    paymentDetails,
    amount,
    status,
  } = payment;

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'SUCCESSFUL':
        return 'bg-green-100 text-green-600';
      case 'UNSUCCESSFUL':
        return 'bg-red-100 text-red-600';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return '';
    }
  };

  return (
    <tr>
      <td className="border border-gray-200 p-2">{name}</td>
      <td className="border border-gray-200 p-2">{studentClass}</td>
      <td className="border border-gray-200 p-2">{dateTime}</td>
      <td className="border border-gray-200 p-2">{paymentDetails}</td>
      <td className="border border-gray-200 p-2">{amount}</td>
      <td
        className={`border border-gray-200 p-2 rounded-full px-[10px] py-[5px] font-semibold ${getStatusClass(
          status
        )}`}
      >
        {status}
      </td>
    </tr>
  );
}
