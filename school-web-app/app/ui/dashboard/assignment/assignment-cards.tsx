"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { fetchAssignmentsList, AssignmentType } from "@/app/src/api/services/schoolService";
import { getErrorMessage } from "@/app/src/utils/errorHandling";
import ViewAssignmentModal from "./modals/view-assignment-modal";
import EditAssignmentModal from "./modals/edit-assignment-modal";
import DeleteConfirmModal from "./modals/delete-assignment-modal";
import Image from "next/image";

interface AssignmentCardsProps {
  onRefresh?: () => void;
}

export interface AssignmentCardsRef {
  refresh: () => void;
}

const AssignmentCards = forwardRef<AssignmentCardsRef, AssignmentCardsProps>(
  ({ onRefresh }, ref) => {
    const [assignments, setAssignments] = useState<AssignmentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<AssignmentType | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedAssignments = await fetchAssignmentsList();
        setAssignments(fetchedAssignments);
      } catch (err: unknown) {
        console.error('Failed to load assignments:', err);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      refresh: fetchAssignments,
    }));

    useEffect(() => {
      fetchAssignments();
    }, []);

    const handleViewClick = (assignment: AssignmentType) => {
      setSelectedAssignment(assignment);
      setShowViewModal(true);
    };

    const handleEditClick = (assignment: AssignmentType) => {
      setSelectedAssignment(assignment);
      setShowEditModal(true);
    };

    const handleDeleteClick = (assignment: AssignmentType) => {
      setSelectedAssignment(assignment);
      setShowDeleteModal(true);
    };

    const handleAssignmentUpdated = () => {
      fetchAssignments();
      onRefresh?.();
    };

    const handleAssignmentDeleted = () => {
      fetchAssignments();
      onRefresh?.();
    };

    const groupAssignmentsByDueDate = (assignments: AssignmentType[]) => {
      const groups: { [key: string]: AssignmentType[] } = {};
      
      assignments.forEach(assignment => {
        const dueDate = new Date(assignment.due_date).toDateString();
        if (!groups[dueDate]) {
          groups[dueDate] = [];
        }
        groups[dueDate].push(assignment);
      });
      
      return Object.entries(groups).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());
    };

    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchAssignments}
              className="text-red-800 underline hover:no-underline text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (assignments.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-500">No assignments found</div>
        </div>
      );
    }

    const groupedAssignments = groupAssignmentsByDueDate(assignments);

    return (
      <>
        <div className="space-y-6">
          {groupedAssignments.map(([dueDate, assignments]) => (
            <div key={dueDate} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Due: {new Date(dueDate).toLocaleDateString()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 truncate">{assignment.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        assignment.status === 'submitted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {assignment.status === 'submitted' ? 'SUBMITTED' : 'NOT SUBMITTED'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{assignment.description}</p>
                    <div className="text-xs text-gray-500 mb-3">
                      Type: {assignment.assignment_type}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewClick(assignment)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditClick(assignment)}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          Edit
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteClick(assignment)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Image src="/images/delete.svg" alt="delete" width={27} height={27} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showViewModal && selectedAssignment && (
          <ViewAssignmentModal
            assignment={selectedAssignment}
            onClose={() => setShowViewModal(false)}
            onEdit={() => {
              setShowViewModal(false);
              handleEditClick(selectedAssignment);
            }}
            onDelete={() => {
              setShowViewModal(false);
              handleDeleteClick(selectedAssignment);
            }}
          />
        )}

        {showEditModal && selectedAssignment && (
          <EditAssignmentModal
            assignment={selectedAssignment}
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSuccess={handleAssignmentUpdated}
          />
        )}

        {showDeleteModal && selectedAssignment && (
          <DeleteConfirmModal
            assignment={selectedAssignment}
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onSuccess={handleAssignmentDeleted}
          />
        )}
      </>
    );
  }
);

AssignmentCards.displayName = "AssignmentCards";

export default AssignmentCards;