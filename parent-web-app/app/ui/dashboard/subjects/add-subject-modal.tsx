"use client";
import { useState } from "react";
import { createSubject, CreateSubjectPayload } from "@/app/src/api/services/schoolService";

interface AddSubjectModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSubjectModal({ onClose, onSuccess }: AddSubjectModalProps) {
  const [form, setForm] = useState({
    subject_name: "",
    subject_code: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.subject_name.trim() || !form.subject_code.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Creating subject with payload:", form);
      
      const payload: CreateSubjectPayload = {
        subject_name: form.subject_name,
        subject_code: form.subject_code,
        description: form.description || null,
        created_by: "ee824cad-d7a6-4f48-87dc-e8461a9201c4", // Default user ID
        created_at: new Date().toISOString(),
        school: "cdddc611-1fd3-4730-a819-9206c69b39d7" // Correct school ID
      };

      console.log("Sending create payload:", payload);

      const newSubject = await createSubject(payload);
      console.log("Successfully created subject:", newSubject);
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error creating subject:", err);
      console.error("Create error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config
      });
      
      if (err.response?.data) {
        console.error("Full create error response:", JSON.stringify(err.response.data, null, 2));
      }
      
      setError(`Failed to create subject: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[#1AA939] font-bold text-xl uppercase">Add New Subject</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Form Fields */}
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Subject Name *</label>
              <input 
                type="text" 
                name="subject_name"
                value={form.subject_name}
                onChange={handleChange}
                placeholder="Enter subject name"
                className="w-full border border-gray-300 px-4 py-2 rounded" 
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Subject Code *</label>
              <input 
                type="text" 
                name="subject_code"
                value={form.subject_code}
                onChange={handleChange}
                placeholder="Enter subject code"
                className="w-full border border-gray-300 px-4 py-2 rounded" 
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description (Optional)</label>
              <textarea 
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter subject description"
                rows={3}
                className="w-full border border-gray-300 px-4 py-2 rounded" 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
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
              className="px-6 py-2 bg-[#1AA939] text-white font-bold rounded hover:bg-[#1d5329] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 