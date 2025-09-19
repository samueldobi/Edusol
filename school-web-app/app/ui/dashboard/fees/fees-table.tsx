"use client";
import { useState, useEffect } from 'react';
import { FeeType } from '@/app/src/api/services/schoolService';
import { fetchFeesList } from '@/app/src/api/services/schoolService';
import FeeDetailsModal from './fee-details-modal';
import Image from 'next/image';

interface FeesTableProps {
  onFeeUpdated?: () => void;
}

export default function FeesTable({ onFeeUpdated }: FeesTableProps) {
  const [fees, setFees] = useState<FeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFee, setSelectedFee] = useState<FeeType | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchFees = async () => {
    try {
      setLoading(true);
      setError(null);
      const feesData = await fetchFeesList();
      setFees(feesData);
    } catch {
      setError('Failed to fetch fees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleManageClick = (fee: FeeType) => {
    setSelectedFee(fee);
    setShowModal(true);
  };

  const handleFeeUpdated = () => {
    fetchFees();
    onFeeUpdated?.();
  };

  const handleFeeDeleted = () => {
    fetchFees();
    onFeeUpdated?.();
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
        <div className="flex items-center justify-between">
          <span>{error}</span>
          <button 
            onClick={fetchFees}
            className="text-red-800 underline hover:no-underline text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (fees.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">
            <Image src="/Images/fees_two.png" alt="fee-icon" width={60} height={60} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Fees Created</h3>
          <p className="text-gray-600 mb-6">
            There are no fees configured for this school yet. Click &quot;Add New Fee&quot; to get started.
          </p>
          <div className="text-gray-400">
            <p className="text-sm">Start by adding your first fee</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#D1DFFF] shadow-md">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                  Fee Amount
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-[#2C2C2C] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-semibold">
                          <Image 
                     
                          src="/Images/fees_two.png" alt="fee-icon" width={40} height={40} />
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {fee.fee_type}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {fee.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      ₦{fee.fee_amount?.toLocaleString() || '0'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Nigerian Naira
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(fee.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleManageClick(fee)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                   
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {fees.map((fee) => (
            <div key={fee.id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">
                    <Image src="/Images/fees_two.png" alt="fee-icon" width={25} height={25} />
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {fee.fee_type}
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      ₦{fee.fee_amount?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(fee.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleManageClick(fee)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                 
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fee Details Modal */}
      <FeeDetailsModal
        fee={selectedFee}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onFeeUpdated={handleFeeUpdated}
        onFeeDeleted={handleFeeDeleted}
      />
    </>
  );
} 