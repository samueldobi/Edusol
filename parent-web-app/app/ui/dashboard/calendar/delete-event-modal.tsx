import React from "react";
interface DeleteModalProps {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
export default function DeleteModal({ show, onConfirm, onClose }: DeleteModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl border-2 border-red-600 shadow-2xl w-[450px] max-w-[90vw] text-center flex flex-col items-center animate-scale-in">
        {/* Warning icon */}
        <div className="w-20 h-20 bg-red-600 text-white flex items-center justify-center rounded-full mb-6">
          <span className="text-4xl">⚠️</span>
        </div>

        {/* Message */}
        <p className="text-[1.1rem] text-gray-800 font-medium leading-relaxed mb-8">
          You are about to delete an event, are you sure you want to?
        </p>

        {/* Buttons */}
        <div className="flex gap-5 justify-center w-full">
          <button
            onClick={onConfirm}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg transition-all flex-grow max-w-[120px]"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all flex-grow max-w-[120px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
