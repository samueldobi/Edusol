"use client";
import { useState } from "react";
import { SchoolInformationType } from "@/app/src/api/services/schoolService";

interface AdminCardEditProps {
  schoolInfo: SchoolInformationType;
  onSave: (data: SchoolInformationType) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function AdminCardEdit({ schoolInfo, onSave, onCancel, loading = false }: AdminCardEditProps) {
  const [form, setForm] = useState<SchoolInformationType>(schoolInfo);

  const handleChange = (field: keyof SchoolInformationType, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-white rounded-xl p-5 mb-5 shadow-md">
      <div className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-100">
        Edit School Information
      </div>
      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">School Email</td>
              <td className="py-3">
                <input
                  type="email"
                  value={form.school_email}
                  onChange={e => handleChange('school_email', e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  required
                  disabled={loading}
                />
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">School Phone</td>
              <td className="py-3">
                <input
                  type="tel"
                  value={form.school_phone}
                  onChange={e => handleChange('school_phone', e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  required
                  disabled={loading}
                />
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Address</td>
              <td className="py-3">
                <textarea
                  value={form.address}
                  onChange={e => handleChange('address', e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  rows={3}
                  required
                  disabled={loading}
                />
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Principal Name</td>
              <td className="py-3">
                <input
                  type="text"
                  value={form.principal_name}
                  onChange={e => handleChange('principal_name', e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  required
                  disabled={loading}
                />
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Website</td>
              <td className="py-3">
                <input
                  type="url"
                  value={form.website || ''}
                  onChange={e => handleChange('website', e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  placeholder="https://example.com"
                  disabled={loading}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 disabled:bg-green-400"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 