import React from 'react';
import Image from 'next/image';

interface SuccessModalProps {
  onClose: () => 
    void;
    title?: string;
    message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, title = "Success!", message = "Assignment has been submitted successfully." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
        <Image
         src="/images/checkbox.png"
         width={50}
         height={50}
        alt="Success" className="mx-auto mb-4" />
        <h2 className="text-green-700 font-bold text-xl mb-2">{title}!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button onClick={onClose} className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded font-semibold">
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
