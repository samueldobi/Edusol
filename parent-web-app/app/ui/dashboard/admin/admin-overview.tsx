"use client";
import AdminNav from "./admin-nav"
import AdminCard from "./admin-card";
import AdminCardEdit from "./admin-card-edit";
import { useState, useEffect } from "react";
import { fetchSchoolInformationById, partialUpdateSchoolInformation, SchoolInformationType } from "@/app/src/api/services/schoolService";

const SCHOOL_ID = "a0308e2a-412f-4a57-b2ac-150a4507931a";

export default function AdminOverview(){
    const [schoolInfo, setSchoolInfo] = useState<SchoolInformationType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // 0 is to view, 1 is to edit
    const [activeTab, setActiveTab] = useState(0); 

    useEffect(() => {
        fetchSchoolData();
    }, []);

    const fetchSchoolData = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching school information for ID:', SCHOOL_ID);
            console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL);
            
            const data = await fetchSchoolInformationById(SCHOOL_ID);
            console.log('School data received:', data);
            setSchoolInfo(data);
        } catch (err: any) {
            console.error('Error fetching school information:', err);
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                config: err.config,
                url: err.config?.url,
                method: err.config?.method,
                headers: err.config?.headers
            });
            
            // Log the full error response if available
            if (err.response?.data) {
                console.error('Full error response:', JSON.stringify(err.response.data, null, 2));
            }
            
            setError(`Failed to load school information: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSave = async (updatedData: SchoolInformationType) => {
        try {
            setLoading(true);
            setError(null);
            
            // Only send the fields that should be updated
            const updatePayload = {
                school_email: updatedData.school_email,
                school_phone: updatedData.school_phone,
                address: updatedData.address,
                principal_name: updatedData.principal_name,
                website: updatedData.website
            };
            
            console.log('Updating school information with payload:', updatePayload);
            console.log('Update URL will be:', `${process.env.NEXT_PUBLIC_BASE_URL}/api/schools/school-information/${SCHOOL_ID}`);
            
            const updated = await partialUpdateSchoolInformation(SCHOOL_ID, updatePayload as SchoolInformationType);
            console.log('School updated successfully:', updated);
            setSchoolInfo(updated);
            setActiveTab(0);
        } catch (err: any) {
            console.error('Error updating school information:', err);
            console.error('Update error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                config: err.config,
                url: err.config?.url,
                method: err.config?.method,
                headers: err.config?.headers,
                requestData: err.config?.data
            });
            
            // Log the full error response if available
            if (err.response?.data) {
                console.error('Full update error response:', JSON.stringify(err.response.data, null, 2));
            }
            
            setError(`Failed to update school information: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setActiveTab(0);
        setError(null);
    };

    const handleRetry = () => {
        fetchSchoolData();
    };

    const testApiEndpoint = async () => {
        try {
            console.log('Testing API endpoint directly...');
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
            const url = `${baseURL}/api/schools/school-information/${SCHOOL_ID}/`;
            console.log('Testing URL:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            
            console.log('Direct fetch response status:', response.status);
            const data = await response.text();
            console.log('Direct fetch response data:', data);
            
        } catch (error) {
            console.error('Direct fetch error:', error);
        }
    };

    const testUpdateWithMinimalData = async () => {
        try {
            console.log('Testing update with minimal data...');
            const minimalData = {
                school_email: schoolInfo?.school_email || 'test@example.com',
                school_phone: schoolInfo?.school_phone || '1234567890',
                address: schoolInfo?.address || 'Test Address',
                principal_name: schoolInfo?.principal_name || 'Test Principal',
                website: schoolInfo?.website || null
            };
            
            console.log('Minimal update data:', minimalData);
            const updated = await partialUpdateSchoolInformation(SCHOOL_ID, minimalData);
            console.log('Minimal update successful:', updated);
            
        } catch (error) {
            console.error('Minimal update error:', error);
        }
    };

    const testBasicPatch = async () => {
        try {
            console.log('Testing basic PATCH request...');
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
            const url = `${baseURL}/api/schools/school-information/${SCHOOL_ID}/`;
            
            const testData = {
                school_email: 'test@example.com'
            };
            
            console.log('PATCH URL:', url);
            console.log('PATCH data:', testData);
            
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(testData)
            });
            
            console.log('PATCH response status:', response.status);
            const data = await response.text();
            console.log('PATCH response data:', data);
            
        } catch (error) {
            console.error('Basic PATCH error:', error);
        }
    };

    const testAuthenticatedPatch = async () => {
        try {
            console.log('Testing authenticated PATCH request...');
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
            const url = `${baseURL}/api/schools/school-information/${SCHOOL_ID}/`;
            
            // Get tokens from localStorage (similar to the interceptor)
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
            
            console.log('Token found:', token ? 'YES' : 'NO');
            console.log('Refresh token found:', refreshToken ? 'YES' : 'NO');
            
            const testData = {
                school_email: 'test@example.com'
            };
            
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            
            // Add authentication headers (similar to the interceptor)
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const username = payload.id || 'admin';
                    const password = token.substring(0, 20);
                    const basicAuth = btoa(`${username}:${password}`);
                    headers.Authorization = `Basic ${basicAuth}`;
                    headers['X-User-ID'] = payload.id;
                    headers['X-User-Role'] = payload.role;
                    headers['X-Auth-Token'] = token;
                } catch (error) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }
            
            if (refreshToken) {
                headers['x-refresh-token'] = refreshToken;
            }
            
            console.log('PATCH URL:', url);
            console.log('PATCH headers:', headers);
            console.log('PATCH data:', testData);
            
            const response = await fetch(url, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(testData)
            });
            
            console.log('Authenticated PATCH response status:', response.status);
            const data = await response.text();
            console.log('Authenticated PATCH response data:', data);
            
        } catch (error) {
            console.error('Authenticated PATCH error:', error);
        }
    };

    if (loading && !schoolInfo) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Loading school information...</div>
            </div>
        );
    }

    if (error && !schoolInfo) {
        return (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <div className="text-lg text-red-600">{error}</div>
                <button 
                    onClick={handleRetry}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!schoolInfo) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">No school information found</div>
            </div>
        );
    }

    return(
        <>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <div className="mt-2 space-x-2">
                        <button 
                            onClick={testUpdateWithMinimalData}
                            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        >
                            Test Minimal Update
                        </button>
                        <button 
                            onClick={testApiEndpoint}
                            className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                        >
                            Test API Endpoint
                        </button>
                        <button 
                            onClick={testBasicPatch}
                            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                        >
                            Test Basic PATCH
                        </button>
                        <button 
                            onClick={testAuthenticatedPatch}
                            className="bg-teal-500 text-white px-3 py-1 rounded text-sm hover:bg-teal-600"
                        >
                            Test Authenticated PATCH
                        </button>
                    </div>
                </div>
            )}
            <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 0 ? (
              <AdminCard schoolInfo={schoolInfo} onEdit={() => setActiveTab(1)} />
            ) : (
              <AdminCardEdit 
                schoolInfo={schoolInfo} 
                onSave={handleEditSave} 
                onCancel={handleCancel}
                loading={loading}
              />
            )}
        </>
    )
}