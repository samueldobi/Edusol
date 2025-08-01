"use client";
import { useState, useEffect } from "react";
import FeesTable from "@/app/ui/dashboard/fees/fees-table";
import AddFeeModal from "@/app/ui/dashboard/fees/add-fee-modal";
import Image from "next/image";

export default function FeesDetails() {
  const [showAddFee, setShowAddFee] = useState(false);

  const handleFeeAdded = () => {
    setShowAddFee(false);
    // Refresh fees data if needed
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fees Management</h1>
            <p className="text-gray-600">
              List of fees for School
            </p>
          </div>
          <button
            onClick={() => setShowAddFee(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Fee
          </button>
        </div>

        {/* School Info Card */}
        <div className="bg-gradient-to-r from-[#1AA939] to-[#2eb24c] rounded-lg p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                School Name
              </h2>
              <p className="text-green-100">
                school@example.com
              </p>
              <p className="text-green-100">
                Phone: N/A
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
              <Image src="/images/fees.png" alt="fee-icon" width={60} height={60} />
              </div>
              <p className="text-green-100 text-sm">Fees Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <FeesTable onFeeUpdated={() => {}} />

      {/* Add Fee Modal */}
      {showAddFee && (
        <AddFeeModal
          onClose={() => setShowAddFee(false)}
          onSuccess={handleFeeAdded}
        />
      )}
    </div>
  );
}