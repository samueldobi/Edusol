"use client";
import { useState } from "react";

interface AdminCardEditProps {
  adminData: { label: string; value: string; key: string }[];
  onSave: (data: { label: string; value: string; key: string }[]) => void;
  onCancel: () => void;
}

export default function AdminCardEdit({ adminData, onSave, onCancel }: AdminCardEditProps) {
  const [form, setForm] = useState(adminData);

  const handleChange = (index: number, value: string) => {
    setForm(prev => prev.map((item, i) => i === index ? { ...item, value } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-white rounded-xl p-5 mb-5 shadow-md">
      <div className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-100">
        Edit Admin Information
      </div>
      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse">
          <tbody>
            {form.map(({ label, value }, index, arr) => (
              <tr
                key={label}
                className={index !== arr.length - 1 ? 'border-b border-gray-100' : ''}
              >
                <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">{label}</td>
                <td className="py-3">
                  <input
                    type="text"
                    value={value}
                    onChange={e => handleChange(index, e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
} 