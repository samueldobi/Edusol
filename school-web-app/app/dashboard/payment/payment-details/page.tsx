"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";



export default function PaymentDetails() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const userClass = searchParams.get("class");
  const amount = searchParams.get("amount");
  // TODO: Fetch payment details using userId

  return (
    <div className=" mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-0 sm:p-0 mt-8">
      <div className="flex items-center gap-3 bg-gray-50 px-6 py-5 border-b border-gray-200">
        <Image src="/images/cart.png" alt="Logo" width={50} height={50} className="rounded-md object-cover" />
        <h1 className="text-green-600 text-lg font-semibold tracking-wide">PAYMENT DETAILS</h1>
      </div>
      <div className="w-full">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-500 text-sm border-b border-gray-200">Name</th>
              <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-500 text-sm border-b border-gray-200">Class</th>
              <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-500 text-sm border-b border-gray-200">Order Id</th>
              <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-500 text-sm border-b border-gray-200">Payment Info</th>
              <th className="bg-gray-50 px-6 py-4 text-right font-medium text-gray-500 text-sm border-b border-gray-200">Amount</th>
              <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-500 text-sm border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Image src="/images/person.png" alt={userId || "User"} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-gray-800">{userId || "User"}</span>
                </div>
              </td>
              <td className="px-6 py-4 border-b border-gray-100">{userClass || "Class"}</td>
              <td className="px-6 py-4 border-b border-gray-100">#67586453</td>
              <td className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 border-2 border-blue-100 flex items-center justify-center mr-3">
                    <span >
                        <Image src="/images/tuition-icon.png" alt="tuition" width={40} height={30} />
                    </span>
                  </span>
                  <span className="text-gray-700">Tuition fee</span>
                </div>
              </td>
              <td className="px-6 py-4 border-b border-gray-100 text-right font-semibold">{amount || "Amount"}</td>
              <td className="px-6 py-4 border-b border-gray-100" rowSpan={3}>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">SUCCESSFUL</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-b border-gray-100"></td>
              <td className="px-6 py-4 border-b border-gray-100"></td>
              <td className="px-6 py-4 border-b border-gray-100"></td>
              <td className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-100 flex items-center justify-center mr-3">
                    <Image src="/images/brick-icon.png" alt="Logo" width={50} height={50} className="rounded-md object-cover" />
                  </span>
                  <span className="text-gray-700">Registration fee</span>
                </div>
              </td>
              <td className="px-6 py-4 border-b border-gray-100 text-right font-semibold">{amount || "Amount"}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-b border-gray-100"></td>
              <td className="px-6 py-4 border-b border-gray-100"></td>
              <td className="px-6 py-4 border-b border-gray-100"></td>
              <td className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-100 border-2 border-purple-100 flex items-center justify-center mr-3">
                    <span >
                        <Image src="/images/house-icon.png" alt="tuition" width={40} height={30} />
                    </span>
                  </div>
                  <span className="text-gray-700">Admission fee</span>
                </div>
              </td>
              <td className="px-6 py-4 border-b border-gray-100 text-right font-semibold">{amount || "Amount"}</td>
            </tr>
            <tr className="font-bold text-green-600">
              <td className="px-6 py-6 border-t-2 border-gray-200"></td>
              <td className="px-6 py-6 border-t-2 border-gray-200"></td>
              <td className="px-6 py-6 border-t-2 border-gray-200"></td>
              <td className="px-6 py-6 border-t-2 border-gray-200"></td>
              <td className="px-6 py-6 border-t-2 border-gray-200 text-right">NGN {amount || "Amount"}</td>
              <td className="px-6 py-6 border-t-2 border-gray-200"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
