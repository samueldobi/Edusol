"use client";
import { assignmentData } from "@/app/lib/placeholder-data"
import { useState } from "react";
import Image from "next/image"
import EditAssignmentModal from "./modals/edit-assignment-modal";
import DeleteConfirmModal from "./modals/delete-assignment-modal";
import SuccessModal from "./modals/show-success-modal";

export default function AssignmentCards(){
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const groupByDay = (data) => {
    return data.reduce((acc, item) => {
      acc[item.day] = acc[item.day] ? [...acc[item.day], item] : [item];
      return acc;
    }, {});
  };

  const grouped = groupByDay(assignmentData);

  return(
    <>
      {Object.entries(grouped).map(([day, items]) => (
        <div key={day} className="mb-10">
          <h3 className="text-[1.4rem] text-gray-800 mb-5 pb-2 relative">
            {day}
            <span className="absolute bottom-0 left-0 w-20 h-[3px] bg-green-300 rounded-sm"></span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-xl p-5 min-h-[180px] flex flex-col justify-between relative shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex gap-4 items-center mb-4">
                  <div className="w-[60px] h-[60px] rounded-lg bg-blue-100 flex justify-center items-center overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.subject}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <strong className="text-[1.1rem] text-gray-800 block">{item.subject}</strong>
                    <p className="text-sm text-gray-600">{item.topic}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="absolute bottom-5 right-4 w-9 h-9 bg-green-700 text-white rounded-full flex items-center justify-center text-lg shadow-md cursor-pointer hover:bg-green-800 transition">
                    <button onClick={() => setShowEdit(true)}>
                      ✎
                    </button>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                      item.submitted
                        ? "bg-[#1AA939] text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.submitted ? "SUBMITTED" : "NOT SUBMITTED"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Fixed modal rendering */}
      {showEdit && (
        <EditAssignmentModal
          onClose={() => setShowEdit(false)}
          onSuccess={() => {
            setShowEdit(false);
            setSuccessTitle("Success!");
            setSuccessMessage("Assignment was successfully updated.");
            setShowSuccess(true);
          }}
          onDelete={() => {
            setShowDelete(false);
            setSuccessTitle("Success!");
            setSuccessMessage("Assignment was successfully deleted.");
            setShowSuccess(true);
          }}
        />
      )}

            {showSuccess && (
            <SuccessModal
                title={successTitle}
                message={successMessage}
                onClose={() => setShowSuccess(false)}
            />
            )}

      {showDelete && (
        <DeleteConfirmModal
          onClose={() => setShowDelete(false)}
          onDelete={() => {
            setShowDelete(false);
            setShowSuccess(true);
          }}
        />
      )}
   
    </>
  )
}