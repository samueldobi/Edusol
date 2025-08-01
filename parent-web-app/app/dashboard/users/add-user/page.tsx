"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddUserModal from '../../../ui/users/add-user';

export default function AddUserPage() {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setShowModal(false);
    // Redirect back to users page
    router.push('/dashboard/users');
  };

  const handleSuccess = () => {
    // User was added successfully, redirect back to users page
    // The users page will automatically refresh when mounted
    router.push('/dashboard/users');
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
      </div>
      
      {showModal && (
        <AddUserModal 
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
} 