"use client";
import { useState } from "react";
import { createSubject, CreateSubjectPayload } from "@/app/src/api/services/schoolService";
import { fetchUsersList } from "@/app/src/api/services/userService";

const categoryOptions = [
  { value: "senior", label: "Senior" },
  { value: "junior", label: "Junior" },
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
];

export default function Page() {
  const [form, setForm] = useState({
    category: "senior",
    subject_name: "",
    subject_code: "",
    description: "",
    created_by: "",
    created_at: new Date().toISOString(),
    school: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [newSubjectId, setNewSubjectId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject_name || !form.subject_code || !form.created_by || !form.school) {
      setError("Please fill all required fields.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    setNewSubjectId(null);
    try {
      const payload: CreateSubjectPayload = {
        subject_name: form.subject_name,
        subject_code: form.subject_code,
        description: form.description || null,
        created_by: form.created_by,
        created_at: form.created_at,
        school: form.school,
      };
      const newSubject = await createSubject(payload);
      setSuccess("Subject added successfully!");
      setNewSubjectId(newSubject.id);
      setForm({
        category: "senior",
        subject_name: "",
        subject_code: "",
        description: "",
        created_by: "",
        created_at: new Date().toISOString(),
        school: ""
      });
    } catch (err) {
      setError("Failed to add subject. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Demo button to trigger the function
  const handleDemoCreate = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    setNewSubjectId(null);
    try {
      const payload: CreateSubjectPayload = {
        subject_name: "Demo Subject",
        subject_code: "DEMO101",
        description: "Demo subject for UUID extraction",
        created_by: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        created_at: new Date().toISOString(),
        school: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      };
      const newSubject = await createSubject(payload);
      setSuccess("Demo subject added successfully!");
      setNewSubjectId(newSubject.id);
    } catch (err) {
      setError("Failed to add demo subject. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleListUsers = async () => {
    try {
      const users = await fetchUsersList();
      console.log("Fetched users:", users);
      alert("Check the console for the list of users.");
    } catch (err) {
      alert("Failed to fetch users.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#1AA939] mb-4 text-center">Add New Subject</h2>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
      {newSubjectId && (
        <div className="text-blue-600 text-sm mb-2">New Subject UUID: {newSubjectId}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          >
            {categoryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Subject Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="subject_name"
            maxLength={100}
            value={form.subject_name}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Subject Code<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="subject_code"
            maxLength={20}
            value={form.subject_code}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Created By (User ID)<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="created_by"
            value={form.created_by}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Created At</label>
          <input
            type="datetime-local"
            name="created_at"
            value={form.created_at.slice(0, 16)}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
            disabled
          />
        </div>
        <div>
          <label className="block font-medium mb-1">School ID<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="school"
            value={form.school}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#1AA939] text-white px-4 py-2 rounded mt-2 w-full font-semibold hover:bg-[#168a2c] transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Subject"}
        </button>
      </form>
      <button
        type="button"
        onClick={handleListUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full font-semibold hover:bg-blue-700 transition"
      >
        List Users (Console Log)
      </button>
      <button
        type="button"
        onClick={handleDemoCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full font-semibold hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Creating Demo Subject..." : "Create Demo Subject (Show UUID)"}
      </button>
    </div>
  );
}