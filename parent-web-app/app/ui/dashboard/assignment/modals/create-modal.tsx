"use client"
import Image from "next/image";
import { useState } from "react";
import { createAssignment, CreateAssignmentPayload } from "@/app/src/api/services/schoolService";

interface CreateAssignmentModalProps {
  onClose: () => void;
  onSuccess: (assignment: { subject: string; topic: string }) => void;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> =({ onClose, onSuccess })=>{
  const [form, setForm] = useState({
    subject: "Mathematics",
    topic: "",
    start_date: "",
    due_date: "",
    status: "active" as const,
    created_by: "ee824cad-d7a6-4f48-87dc-e8461a9201c4", // Default user ID
    created_at: new Date().toISOString(),
    school: "997b5388-c4ee-4b64-8b19-f252d6b255e7" // Default school ID
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.topic.trim() || !form.start_date || !form.due_date) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload: CreateAssignmentPayload = {
        subject: form.subject,
        topic: form.topic,
        start_date: form.start_date,
        due_date: form.due_date,
        status: form.status,
        created_by: form.created_by,
        created_at: form.created_at,
        school: form.school,
      };

      const newAssignment = await createAssignment(payload);
      console.log("Created assignment:", newAssignment);
      
      onSuccess({ subject: form.subject, topic: form.topic });
      onClose();
    } catch (err: any) {
      console.error("Error creating assignment:", err);
      setError("Failed to create assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const subjectsList = [
    { index: 1, subject: "Mathematics" },
    { index: 2, subject: "English" },
    { index: 3, subject: "Physics" },
    { index: 4, subject: "Chemistry" },
    { index: 5, subject: "Biology" },
    { index: 6, subject: "History" },
    { index: 7, subject: "Geography" },
    { index: 8, subject: "Literature" },
  ];
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h3 className="text-green-700 font-bold text-xl mb-5 uppercase">Create Assignment</h3>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Form Fields */}
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <div className="flex flex-col md:flex-row gap-5 mb-6">
            <div className="flex-1 space-y-4">
              <FormItem label="Select subject">
                <select 
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded">
                  {subjectsList.map((item) => (
                    <option key={item.index} value={item.subject}>
                      {item.subject.toUpperCase()}
                    </option>
                  ))}
                </select>
              </FormItem>
              <FormItem label="Topic">
                <input 
                  type="text" 
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded" 
                />
              </FormItem>
              <FormItem label="Start Date">
                <input 
                  type="date" 
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded" 
                />
              </FormItem>
              <FormItem label="Due Date">
                <input 
                  type="date" 
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded" 
                />
              </FormItem>
            </div>

            <div className="w-14 h-14 min-w-[3.5rem] rounded-lg bg-blue-100 flex justify-center items-center shadow">
              <Image 
                src="/math-logo.png"
                width={60}
                height={60}
                alt="Icon" 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 disabled:opacity-50"
            >
              {loading ? "Creating..." : "+ CREATE"}
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