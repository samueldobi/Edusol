"use client";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Image from "next/image"
import EditAssignmentModal from "./modals/edit-assignment-modal";
import DeleteConfirmModal from "./modals/delete-assignment-modal";
import SuccessModal from "./modals/show-success-modal";
import ViewAssignmentModal from "./modals/view-assignment-modal";
import { fetchAssignmentsList, AssignmentType } from "@/app/src/api/services/schoolService";

interface AssignmentCardsProps {
  onRefresh?: () => void;
}

const AssignmentCards = forwardRef<{ refresh: () => void }, AssignmentCardsProps>(({ onRefresh }, ref) => {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentType | null>(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching assignments...");
      console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
      
      const fetchedAssignments = await fetchAssignmentsList();
      setAssignments(fetchedAssignments);
      console.log("Fetched assignments:", fetchedAssignments);
    } catch (error: any) {
      console.error("Error fetching assignments:", error);
      console.error("Fetch error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      setError(`Failed to fetch assignments: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: fetchAssignments
  }));

  const testAssignmentAPI = async () => {
    try {
      console.log("Testing assignment API endpoints...");
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      
      // Test GET assignments
      const getResponse = await fetch(`${baseURL}/api/schools/assignments/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      console.log("GET assignments response status:", getResponse.status);
      const getData = await getResponse.text();
      console.log("GET assignments response data:", getData);
      
      // Test GET subjects
      const subjectsResponse = await fetch(`${baseURL}/api/schools/subjects/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      console.log("GET subjects response status:", subjectsResponse.status);
      const subjectsData = await subjectsResponse.text();
      console.log("GET subjects response data:", subjectsData);
      
    } catch (error) {
      console.error("API test error:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const groupByDay = (data: AssignmentType[]) => {
    return data.reduce((acc, item) => {
      const dueDate = new Date(item.due_date);
      const day = dueDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      acc[day] = acc[day] ? [...acc[day], item] : [item];
      return acc;
    }, {} as Record<string, AssignmentType[]>);
  };

  const handleViewAssignment = (assignment: AssignmentType) => {
    setSelectedAssignment(assignment);
    setShowView(true);
  };

  const handleEditAssignment = (assignment: AssignmentType) => {
    console.log("Setting selected assignment for edit:", assignment);
    setSelectedAssignment(assignment);
    setShowEdit(true);
  };

  const handleDeleteAssignment = (assignment: AssignmentType) => {
    setSelectedAssignment(assignment);
    setShowDelete(true);
  };

  const grouped = groupByDay(assignments);

  if (loading) {
    return <div className="text-center py-8">Loading assignments...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <div className="flex gap-2 justify-center">
          <button 
            onClick={fetchAssignments}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
          <button 
            onClick={testAssignmentAPI}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Test API
          </button>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No assignments found. Create your first assignment to get started.
      </div>
    );
  }

  return(
    <>
      {Object.entries(grouped).map(([day, items]) => (
        <div key={day} className="mb-10">
          <h3 className="text-[1.4rem] text-gray-800 mb-5 pb-2 relative">
            {day}
            <span className="absolute bottom-0 left-0 w-20 h-[3px] bg-green-300 rounded-sm"></span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-xl p-5 min-h-[180px] flex flex-col justify-between relative shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleViewAssignment(item)}
              >
                <div className="flex gap-4 items-center mb-4">
                  <div className="w-[60px] h-[60px] rounded-lg bg-blue-100 flex justify-center items-center overflow-hidden">
                    <Image
                      src="/math-logo.png"
                      alt={item.title}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <strong className="text-[1.1rem] text-gray-800 block">{item.title}</strong>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Due: {formatDate(item.due_date)}</p>
                    <p className="text-xs text-gray-400 mt-1">Type: {item.assignment_type}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm shadow-md cursor-pointer hover:bg-blue-700 transition"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleEditAssignment(item);
                         }}>
                      ✎
                    </div>
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm shadow-md cursor-pointer hover:bg-red-700 transition"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleDeleteAssignment(item);
                         }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                      item.status === 'submitted'
                        ? "bg-[#1AA939] text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {item.status === 'submitted' 
                      ? 'SUBMITTED' 
                      : 'NOT SUBMITTED'
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* View Assignment Modal */}
      {showView && selectedAssignment && (
        <ViewAssignmentModal
          assignment={selectedAssignment}
          onClose={() => {
            setShowView(false);
            setSelectedAssignment(null);
          }}
          onEdit={() => {
            setShowView(false);
            setShowEdit(true);
          }}
          onDelete={() => {
            setShowView(false);
            setShowDelete(true);
          }}
        />
      )}

      {/* Edit Assignment Modal */}
      {showEdit && selectedAssignment && (
        <>
          {console.log("Rendering EditAssignmentModal with assignment:", selectedAssignment)}
          <EditAssignmentModal
            assignment={selectedAssignment}
            onClose={() => {
              setShowEdit(false);
              setSelectedAssignment(null);
            }}
            onSuccess={() => {
              setShowEdit(false);
              setSelectedAssignment(null);
              setSuccessTitle("Success!");
              setSuccessMessage("Assignment was successfully updated.");
              setShowSuccess(true);
              fetchAssignments(); // Refresh the list
            }}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && selectedAssignment && (
        <DeleteConfirmModal
          assignment={selectedAssignment}
          onClose={() => {
            setShowDelete(false);
            setSelectedAssignment(null);
          }}
          onDelete={() => {
            setShowDelete(false);
            setSelectedAssignment(null);
            setSuccessTitle("Success!");
            setSuccessMessage("Assignment was successfully deleted.");
            setShowSuccess(true);
            fetchAssignments(); // Refresh the list
          }}
        />
      )}

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          title={successTitle}
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  )
});

export default AssignmentCards;