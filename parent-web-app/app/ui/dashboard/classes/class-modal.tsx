"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSchoolClass } from "@/app/src/api/services/schoolService";

interface AddClassUIProps {
  onClassAdded?: () => void;
}

export default function AddClassUI({ onClassAdded }: AddClassUIProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    class_name: "",
    class_level: "",
    class_arm: "",
    form_teacher_id: "774ee9c9-a23a-413c-85dc-36ac8f19a256",
    capacity: 30,
    created_by: "ee824cad-d7a6-4f48-87dc-e8461a9201c4", 
    created_at: new Date().toISOString(),
    school: "997b5388-c4ee-4b64-8b19-f252d6b255e7"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Basic validation
    if (!form.class_name || !form.class_level || !form.created_by || !form.school) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      await createSchoolClass({
        ...form,
        id: Date.now().toString(),
        updated_at: new Date().toISOString(),
        class_arm: form.class_arm || null,
        capacity: Number(form.capacity),
      });
      setSuccess("Class added successfully!");
      
      // Reset form
      setForm({
        class_name: "",
        class_level: "",
        class_arm: "",
        form_teacher_id: "",
        capacity: 30,
        created_by: "", 
        created_at: new Date().toISOString(),
        school: ""
      });

      // Call the callback to refresh classes list
      if (onClassAdded) {
        onClassAdded();
      }

      // Redirect to classes page after a short delay
      setTimeout(() => {
        router.push("/dashboard/classes?refresh=true");
      }, 1500);
    } catch (err) {
      setError("Failed to add class. Please try again.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Add New Class</h2>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <div>
        <label className="block font-medium">Class Name<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="class_name"
          maxLength={100}
          value={form.class_name}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Class Level<span className="text-red-500">*</span></label>
        <select
          name="class_level"
          value={form.class_level}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        >
          <option value="">Select class level</option>
          <option value="jss1">JSS1</option>
          <option value="jss2">JSS2</option>
          <option value="jss3">JSS3</option>
          <option value="ss1">SS1</option>
          <option value="ss2">SS2</option>
          <option value="ss3">SS3</option>
          <option value="primary 1">Primary 1</option>
          <option value="primary 2">Primary 2</option>
          <option value="primary 3">Primary 3</option>
          <option value="primary 4">Primary 4</option>
          <option value="primary 5">Primary 5</option>
          <option value="primary 6">Primary 6</option>
          <option value="nursery 1">Nursery 1</option>
          <option value="nursery 2">Nursery 2</option>
          <option value="nursery 3">Nursery 3</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Class Arm</label>
        <select
          name="class_arm"
          value={form.class_arm}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select class arm</option>
          <option value="nursery">Nursery</option>
          <option value="primary">Primary</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      {/* Hidden fields with default values */}
      <input type="hidden" name="created_by" value={form.created_by} />
      <input type="hidden" name="school" value={form.school} />
      <div>
        <label className="block font-medium">Created At</label>
        <input
          type="datetime-local"
          name="created_at"
          value={form.created_at.slice(0, 16)}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          disabled
        />
      </div>
      <button type="submit" className="bg-[#1AA939] text-white px-4 py-2 rounded mt-2" disabled={loading}>
        {loading ? "Adding..." : "Add Class"}
      </button>
    </form>
  );
}