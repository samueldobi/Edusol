"use client";
import { useState } from "react";
import { updateAssignment, AssignmentType } from "@/app/src/api/services/schoolService";

interface EditAssignmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onDelete: () => void;
}

export default function EditAssignmentModal({ onClose, onSuccess, onDelete }: EditAssignmentModalProps) {
  const [form, setForm] = useState({
    subject: "Mathematics",
    topic: "",
    start_date: "",
    due_date: "",
    status: "active" as const,
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
      // Generate a random ID for now
      const randomId = Math.random().toString(36).substr(2, 9);
      
      const assignmentData: AssignmentType = {
        id: randomId,
        subject: form.subject,
        topic: form.topic,
        start_date: form.start_date,
        due_date: form.due_date,
        status: form.status,
        created_by: "ee824cad-d7a6-4f48-87dc-e8461a9201c4",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        school: "997b5388-c4ee-4b64-8b19-f252d6b255e7"
      };

      await updateAssignment(randomId, assignmentData);
      console.log("Updated assignment:", assignmentData);
      
      onSuccess();
    } catch (err: any) {
      console.error("Error updating assignment:", err);
      setError("Failed to update assignment. Please try again.");
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
        <h3 className="text-[#1AA939] font-bold text-xl mb-5 uppercase">Edit Assignment</h3>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <select 
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            >
              {subjectsList.map((item) => (
                <option key={item.index} value={item.subject}>
                  {item.subject.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Topic</label>
            <input 
              type="text" 
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="Update Topic" 
              className="w-full border border-gray-300 px-4 py-2 rounded" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input 
              type="date" 
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Due Date</label>
            <input 
              type="date" 
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select 
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button 
            onClick={onDelete} 
            className="text-red-600 font-semibold hover:underline"
            disabled={loading}
          >
            Delete
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-6 py-2 bg-[#1AA939] text-white font-bold rounded hover:bg-[#1d5329] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
