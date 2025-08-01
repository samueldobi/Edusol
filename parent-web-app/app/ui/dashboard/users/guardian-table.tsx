"use client";
import { useState } from 'react';

interface GuardianData {
  id: number;
  guardian_name: string;
  student_name: string;
  relationship: string;
  phone_number: string;
  email: string;
  address: string;
  image: string;
}

interface GuardianTableProps {
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: GuardianData[];
}

// Hardcoded dummy data for guardians
const mockGuardians: GuardianData[] = [
  {
    id: 1,
    guardian_name: "Jane Doe",
    student_name: "John Doe",
    relationship: "Mother",
    phone_number: "1234567890",
    email: "jane.doe@email.com",
    address: "123 Main St, City",
    image: "/Person.png"
  },
  {
    id: 2,
    guardian_name: "Robert Smith",
    student_name: "Mary Smith",
    relationship: "Father",
    phone_number: "2345678901",
    email: "robert.smith@email.com",
    address: "456 Oak Ave, Town",
    image: "/Person.png"
  },
  {
    id: 3,
    guardian_name: "Michael Johnson",
    student_name: "Alice Johnson",
    relationship: "Father",
    phone_number: "3456789012",
    email: "michael.johnson@email.com",
    address: "789 Pine Rd, Village",
    image: "/Person.png"
  },
  {
    id: 4,
    guardian_name: "Linda Brown",
    student_name: "Bob Brown",
    relationship: "Mother",
    phone_number: "4567890123",
    email: "linda.brown@email.com",
    address: "321 Elm St, Borough",
    image: "/Person.png"
  },
  {
    id: 5,
    guardian_name: "Nancy Green",
    student_name: "Charlie Green",
    relationship: "Mother",
    phone_number: "5678901234",
    email: "nancy.green@email.com",
    address: "654 Maple Dr, District",
    image: "/Person.png"
  },
  {
    id: 6,
    guardian_name: "Paul White",
    student_name: "Diana White",
    relationship: "Father",
    phone_number: "6789012345",
    email: "paul.white@email.com",
    address: "987 Cedar Ln, County",
    image: "/Person.png"
  },
  {
    id: 7,
    guardian_name: "George Black",
    student_name: "Eve Black",
    relationship: "Father",
    phone_number: "7890123456",
    email: "george.black@email.com",
    address: "147 Birch Way, State",
    image: "/Person.png"
  },
  {
    id: 8,
    guardian_name: "Helen Blue",
    student_name: "Frank Blue",
    relationship: "Mother",
    phone_number: "8901234567",
    email: "helen.blue@email.com",
    address: "258 Spruce Ct, Province",
    image: "/Person.png"
  },
  {
    id: 9,
    guardian_name: "Ian Red",
    student_name: "Grace Red",
    relationship: "Father",
    phone_number: "9012345678",
    email: "ian.red@email.com",
    address: "369 Willow Pl, Region",
    image: "/Person.png"
  },
  {
    id: 10,
    guardian_name: "Olivia Yellow",
    student_name: "Henry Yellow",
    relationship: "Mother",
    phone_number: "0123456789",
    email: "olivia.yellow@email.com",
    address: "741 Aspen Blvd, Territory",
    image: "/Person.png"
  }
];

export default function GuardianTable({
  rowsPerPage,
  currentPage,
  setCurrentPage,
  data
}: GuardianTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<GuardianData | null>(null);

  // Use mock data if no data is provided
  const guardiansData = data.length > 0 ? data : mockGuardians;

  const totalPages = Math.ceil(guardiansData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = guardiansData.slice(startIndex, endIndex);

  const handleEdit = (guardian: GuardianData) => {
    setEditingId(guardian.id);
    setEditForm(guardian);
  };

  const handleSave = (id: number) => {
    // Here you would typically save to the backend
    console.log('Saving guardian:', editForm);
    setEditingId(null);
    setEditForm(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this guardian?')) {
      console.log('Deleting guardian:', id);
      // Here you would typically delete from the backend
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guardian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Relationship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((guardian) => (
              <tr key={guardian.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={guardian.image}
                        alt={guardian.guardian_name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {editingId === guardian.id ? (
                          <input
                            type="text"
                            value={editForm?.guardian_name || ''}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, guardian_name: e.target.value} : null)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          guardian.guardian_name
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === guardian.id ? (
                    <input
                      type="text"
                      value={editForm?.student_name || ''}
                      onChange={(e) => setEditForm(prev => prev ? {...prev, student_name: e.target.value} : null)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    guardian.student_name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === guardian.id ? (
                    <input
                      type="text"
                      value={editForm?.relationship || ''}
                      onChange={(e) => setEditForm(prev => prev ? {...prev, relationship: e.target.value} : null)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    guardian.relationship
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {editingId === guardian.id ? (
                      <div className="space-y-1">
                        <input
                          type="tel"
                          value={editForm?.phone_number || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, phone_number: e.target.value} : null)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                          placeholder="Phone"
                        />
                        <input
                          type="email"
                          value={editForm?.email || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, email: e.target.value} : null)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                          placeholder="Email"
                        />
                      </div>
                    ) : (
                      <>
                        <div>{guardian.phone_number}</div>
                        <div className="text-gray-500">{guardian.email}</div>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === guardian.id ? (
                    <input
                      type="text"
                      value={editForm?.address || ''}
                      onChange={(e) => setEditForm(prev => prev ? {...prev, address: e.target.value} : null)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    guardian.address
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === guardian.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(guardian.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(guardian)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(guardian.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, guardiansData.length)}</span> of{' '}
                <span className="font-medium">{guardiansData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-green-50 border-green-500 text-green-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 