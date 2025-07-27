"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSubject, CreateSubjectPayload } from "@/app/src/api/services/schoolService";

const categoryOptions = [
  { value: "senior", label: "Senior" },
  { value: "junior", label: "Junior" },
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
];

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState({
    category: "senior",
    subject_name: "",
    subject_code: "",
    description: "",
    created_by: "ee824cad-d7a6-4f48-87dc-e8461a9201c4", // Default user ID
    created_at: new Date().toISOString(),
    school: "997b5388-c4ee-4b64-8b19-f252d6b255e7" // Default school ID
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject_name || !form.subject_code) {
      setError("Please fill all required fields.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    
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
      
      // Reset form
      setForm({
        category: "",
        subject_name: "",
        subject_code: "",
        description: "",
        created_by: "0ad7e1c2-2056-4aaf-8093-ff01e3ebcb43", 
        created_at: new Date().toISOString(),
        school: "997b5388-c4ee-4b64-8b19-f252d6b255e7" 
      });

      
      setTimeout(() => {
        router.push("/dashboard/subjects?refresh=true");
      }, 1500);
    } catch (err) {
      setError("Failed to add subject. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#1AA939] mb-4 text-center">Add New Subject</h2>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
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
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
            rows={3}
          />
        </div>
        {/* Hidden fields with default values */}
        <input type="hidden" name="created_by" value={form.created_by} />
        <input type="hidden" name="school" value={form.school} />
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
        <button
          type="submit"
          className="bg-[#1AA939] text-white px-4 py-2 rounded mt-2 w-full font-semibold hover:bg-[#168a2c] transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Subject"}
        </button>
      </form>
    </div>
  );
}