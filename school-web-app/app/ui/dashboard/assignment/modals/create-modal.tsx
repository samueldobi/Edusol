"use client"
import Image from "next/image";
import { useState } from "react";
import { subjectsList } from '../../../../lib/placeholder-data';
interface CreateAssignmentModalProps {
  onClose: () => void;
  onSuccess: (assignment: { subject: string; topic: string }) => void;
}
const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> =({ onClose, onSuccess })=>{
  const [subject, setSubject] = useState(subjectsList[0].subject);
  const [topic, setTopic] = useState('')
   const handleSubmit = () => {
    if (!topic.trim()) {
      alert("Topic is required.");
      return;
    }
      const newAssignment = {
      subject,
      topic,
    };
    onSuccess(newAssignment);
    alert("Assignment has been created")
  
  };
 
     return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h3 className="text-green-700 font-bold text-xl mb-5 uppercase">Create Assignment</h3>

        {/* Form Fields */}
        <form 
          onSubmit={(e) => {
          e.preventDefault();
          
        }}
        >
             <div className="flex flex-col md:flex-row gap-5 mb-6">
          <div className="flex-1 space-y-4">
            <FormItem label="Select subject">
              <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded">
                    {subjectsList.map((item) => (
                  <option key={item.index} value={item.subject}>
                    {item.subject.toUpperCase()}
                  </option>
                ))}
              </select>
            </FormItem>
            <FormItem label="Topic">
              <input type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border
            border-gray-300 px-4 py-2 rounded"  />
            </FormItem>
            <FormItem label="Start Date">
              <input type="date" className="w-full border border-gray-300 px-4 py-2 rounded" />
            </FormItem>
            <FormItem label="Due Date">
              <input type="date" className="w-full border border-gray-300 px-4 py-2 rounded" />
            </FormItem>
          </div>

          <div className="w-14 h-14 min-w-[3.5rem] rounded-lg bg-blue-100 flex justify-center items-center shadow">
            <Image 
            src="/math-logo.png"
            width={60}
            height={60}
            alt="Icon" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800"
          >
            + CREATE
          </button>
        </div>
        </form>
     
      </div>
    </div>
  );
}
interface FormItemProps {
  label: string;
  children: React.ReactNode;
}
const FormItem: React.FC<FormItemProps> = ({ label, children }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
    <label className="w-full md:w-32 font-semibold text-gray-700">{label}</label>
    <div className="w-full flex-1">{children}</div>
  </div>
);

export default CreateAssignmentModal;