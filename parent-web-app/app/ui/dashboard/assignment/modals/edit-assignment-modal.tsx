"use client";
import { useState, useEffect } from "react";
import { partialUpdateAssignment, AssignmentType } from "@/app/src/api/services/schoolService";

interface EditAssignmentModalProps {
  assignment: AssignmentType;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditAssignmentModal({ assignment, onClose, onSuccess }: EditAssignmentModalProps) {
  const [form, setForm] = useState({
    title: assignment?.title || "",
    description: assignment?.description || "",
    due_date: assignment?.due_date ? assignment.due_date.split('T')[0] : "",
    assignment_type: assignment?.assignment_type || "classwork",
    status: assignment?.status || "submitted",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form when assignment changes
  useEffect(() => {
    if (assignment) {
      setForm({
        title: assignment.title || "",
        description: assignment.description || "",
        due_date: assignment.due_date ? assignment.due_date.split('T')[0] : "",
        assignment_type: assignment.assignment_type || "classwork",
        status: assignment.status || "submitted",
      });
    }
  }, [assignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!assignment) {
      setError("No assignment data available.");
      return;
    }

    if (!form.title.trim() || !form.due_date) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Attempting to update assignment with ID:", assignment.id);
      console.log("Update URL will be:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/schools/assignments/${assignment.id}/`);
      console.log("Update data:", form);
      
      const updatedAssignment: AssignmentType = {
        ...assignment,
        title: form.title,
        description: form.description,
        due_date: form.due_date, // Send as YYYY-MM-DD format
        assignment_type: form.assignment_type,
        status: form.status,
        updated_at: new Date().toISOString()
      };

      console.log("Sending update payload:", updatedAssignment);

      // Only send the fields that should be updated
      const updatePayload = {
        title: form.title,
        description: form.description,
        due_date: form.due_date,
        assignment_type: form.assignment_type,
        status: form.status
      };

      console.log("Sending minimal update payload:", updatePayload);

      await partialUpdateAssignment(assignment.id, updatePayload);
      console.log("Successfully updated assignment with partial update");
      
      onSuccess();
    } catch (err: any) {
      console.error("Error updating assignment:", err);
      console.error("Update error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config,
        url: err.config?.url,
        method: err.config?.method,
        headers: err.config?.headers,
        requestData: err.config?.data
      });
      
      if (err.response?.data) {
        console.error("Full update error response:", JSON.stringify(err.response.data, null, 2));
      }
      
      setError(`Failed to update assignment: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Don't render if assignment is not available
  if (!assignment) {
    return null;
  }

  // Don't render if assignment doesn't have required properties
  if (!assignment.id || !assignment.title || !assignment.due_date) {
    console.error("Assignment missing required properties:", assignment);
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[#1AA939] font-bold text-xl uppercase">Edit Assignment</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
            <label className="block font-medium mb-1">Assignment Type</label>
            <select 
              name="assignment_type"
              value={form.assignment_type}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            >
              <option value="classwork">Classwork</option>
              <option value="homework">Homework</option>
              <option value="quiz">Quiz</option>
              <option value="project">Project</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select 
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            >
              <option value="submitted">Submitted</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
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
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
