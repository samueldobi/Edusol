"use client";
import { useState, useEffect } from "react";
import AdminCard from "./admin-card";
import AdminCardEdit from "./admin-card-edit";
import { fetchSchoolInformationById, partialUpdateSchoolInformation, SchoolInformationType } from "@/app/src/api/services/schoolService";
import { getErrorMessage } from "@/app/src/utils/errorHandling";

const SCHOOL_ID = "a0308e2a-412f-4a57-b2ac-150a4507931a";

export default function AdminOverview() {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInformationType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchoolData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSchoolInformationById(SCHOOL_ID);
      setSchoolInfo(data);
    } catch (err: unknown) {
      console.error('Failed to load school information:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const handleEditSave = async (updatedData: SchoolInformationType) => {
    try {
      setLoading(true);
      const updatePayload = {
        school_email: updatedData.school_email,
        school_phone: updatedData.school_phone,
        address: updatedData.address,
        principal_name: updatedData.principal_name,
        website: updatedData.website,
      };

      await partialUpdateSchoolInformation(SCHOOL_ID, updatePayload);
      setSchoolInfo(updatedData);
      setIsEditing(false);
    } catch (err: unknown) {
      console.error('Failed to update school information:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchSchoolData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={handleRetry}
              className="text-red-800 underline hover:no-underline text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {isEditing ? (
        <AdminCardEdit
          schoolInfo={schoolInfo}
          onSave={handleEditSave}
          onCancel={() => setIsEditing(false)}
          loading={loading}
        />
      ) : (
        <AdminCard
          schoolInfo={schoolInfo}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}