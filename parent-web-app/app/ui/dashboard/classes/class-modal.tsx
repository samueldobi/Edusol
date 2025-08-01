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
    form_teacher_id: "92a3ff05-d633-4420-b552-c49dfa365946", // Using the provided teacher ID
    capacity: 50,
    created_by: "cdddc611-1fd3-4730-a819-9206c69b39d7", // School admin ID
    school: "cdddc611-1fd3-4730-a819-9206c69b39d7" // School ID
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
    if (!form.class_name || !form.class_level) {
      setError("Please fill all required fields.");
      return;
    }
    
    setLoading(true);
    try {
      // Create payload matching the expected structure
      const payload = {
        created_by: form.created_by,
        class_name: form.class_name,
        class_level: form.class_level,
        class_arm: form.class_arm.toUpperCase(), // Convert to uppercase as expected
        form_teacher_id: form.form_teacher_id,
        capacity: Number(form.capacity),
        school: form.school
      };

      console.log("Sending payload:", payload);
      
      await createSchoolClass(payload);
      setSuccess("Class added successfully!");
      
      // Reset form
      setForm({
        class_name: "",
        class_level: "",
        class_arm: "",
        form_teacher_id: "92a3ff05-d633-4420-b552-c49dfa365946",
        capacity: 50,
        created_by: "cdddc611-1fd3-4730-a819-9206c69b39d7",
        school: "cdddc611-1fd3-4730-a819-9206c69b39d7"
      });

      // Call the callback to refresh classes list
      if (onClassAdded) {
        onClassAdded();
      }

      // Redirect to classes page after a short delay
      setTimeout(() => {
        router.push("/dashboard/classes?refresh=true");
      }, 1500);
    } catch (err: any) {
      console.error("Error adding class:", err);
      console.error("Error response:", err.response?.data);
      setError(`Failed to add class: ${err.response?.data?.message || err.message || 'Unknown error'}`);
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
          placeholder="e.g., SS1A"
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
          <option value="JSS1">JSS1</option>
          <option value="JSS2">JSS2</option>
          <option value="JSS3">JSS3</option>
          <option value="SS1">SS1</option>
          <option value="SS2">SS2</option>
          <option value="SS3">SS3</option>
          <option value="PRIMARY1">Primary 1</option>
          <option value="PRIMARY2">Primary 2</option>
          <option value="PRIMARY3">Primary 3</option>
          <option value="PRIMARY4">Primary 4</option>
          <option value="PRIMARY5">Primary 5</option>
          <option value="PRIMARY6">Primary 6</option>
          <option value="NURSERY1">Nursery 1</option>
          <option value="NURSERY2">Nursery 2</option>
          <option value="NURSERY3">Nursery 3</option>
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
          <option value="NURSERY">Nursery</option>
          <option value="PRIMARY">Primary</option>
          <option value="JUNIOR">Junior</option>
          <option value="SENIOR">Senior</option>
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
          min="1"
          max="100"
        />
      </div>
      
      <button type="submit" className="bg-[#1AA939] text-white px-4 py-2 rounded mt-2 w-full" disabled={loading}>
        {loading ? "Adding..." : "Add Class"}
      </button>
    </form>
  );
}