"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { createAssignment, CreateAssignmentPayload, fetchAssignmentsList, AssignmentType } from "@/app/src/api/services/schoolService";

interface CreateAssignmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> =({ onClose, onSuccess })=>{
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    assignment_type: "classwork" as const,
    status: "submitted" as const, // Changed from "pending" to "submitted"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingAssignment, setExistingAssignment] = useState<AssignmentType | null>(null);

  // Fetch an existing assignment to get required field values
  useEffect(() => {
    const fetchExistingAssignment = async () => {
      try {
        const assignments = await fetchAssignmentsList();
        if (assignments.length > 0) {
          setExistingAssignment(assignments[0]);
          console.log("Using existing assignment as template:", assignments[0]);
        }
      } catch (error) {
        console.error("Error fetching existing assignment:", error);
      }
    };
    fetchExistingAssignment();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.due_date) {
      setError("Please fill all required fields.");
      return;
    }

    if (!existingAssignment) {
      setError("Unable to get assignment template. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Creating assignment with payload:", form);
      console.log("Using template assignment:", existingAssignment);
      
      const payload: CreateAssignmentPayload = {
        title: form.title,
        description: form.description,
        due_date: form.due_date, // Send as YYYY-MM-DD format
        assignment_type: form.assignment_type,
        status: "submitted", // Always use "submitted" regardless of form status
        // Add required fields from existing assignment
        term: existingAssignment.term || "",
        subject: existingAssignment.subject || "",
        created_by_teacher_cache: existingAssignment.created_by_teacher_cache || "",
      };

      console.log("Sending create payload:", payload);

      const newAssignment = await createAssignment(payload);
      console.log("Successfully created assignment:", newAssignment);
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error creating assignment:", err);
      console.error("Create error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config
      });
      
      if (err.response?.data) {
        console.error("Full create error response:", JSON.stringify(err.response.data, null, 2));
      }
      
      setError(`Failed to create assignment: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const assignmentTypes = [
    { value: "classwork", label: "Classwork" },
    { value: "homework", label: "Homework" },
    { value: "quiz", label: "Quiz" },
    { value: "project", label: "Project" },
  ];
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[#1AA939] font-bold text-xl uppercase">Create Assignment</h3>
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
              <label className="block font-medium mb-1">Title</label>
              <input 
                type="text" 
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter assignment title"
                className="w-full border border-gray-300 px-4 py-2 rounded" 
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea 
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter assignment description"
                rows={3}
                className="w-full border border-gray-300 px-4 py-2 rounded" 
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Assignment Type</label>
              <select 
                name="assignment_type"
                value={form.assignment_type}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              >
                {assignmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
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
              disabled={loading || !existingAssignment}
              className="px-6 py-2 bg-[#1AA939] text-white font-bold rounded hover:bg-[#1d5329] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAssignmentModal;