import React from 'react';

// Types
interface ClassOverviewProps {
  teacherName: string;
  className: string;
  studentCount: number;
}

interface AssignmentProps {
  totalAssignments: number;
  submittedAssignments: number;
  dueAssignments: number;
}

// Class Overview Component
export const ClassOverviewCard: React.FC<ClassOverviewProps> = ({
  teacherName,
  className,
  studentCount
}) => {
  return (
    <div className="w-full flex-1 min-w-0 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate mb-1">
            {className}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Form Teacher: {teacherName}
          </p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1AA939] rounded-full flex items-center justify-center">
            <span className="text-white text-sm sm:text-base font-bold">
              {className.charAt(0)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs sm:text-sm text-gray-500 font-medium">
          Students Enrolled
        </span>
        <span className="text-lg sm:text-xl font-bold text-[#D97706] bg-[#FEF3C7] px-3 py-1 rounded-full">
          {studentCount}
        </span>
      </div>
    </div>
  );
};

// Assignment Component
export const AssignmentCard: React.FC<AssignmentProps> = ({
  totalAssignments,
  submittedAssignments,
  dueAssignments
}) => {
  const completionRate = totalAssignments > 0 ? Math.round((submittedAssignments / totalAssignments) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Assignments
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-[#1AA939] rounded-full"></div>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            {completionRate}% Complete
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Total Assignments */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">📋</span>
            </div>
            <span className="text-sm sm:text-base text-gray-700 font-medium">
              Total
            </span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {totalAssignments}
          </span>
        </div>

        {/* Submitted Assignments */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#DCFCE7] rounded-lg flex items-center justify-center">
              <span className="text-[#1AA939] text-sm font-medium">✓</span>
            </div>
            <span className="text-sm sm:text-base text-gray-700 font-medium">
              Submitted
            </span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-[#1AA939]">
            {submittedAssignments}
          </span>
        </div>

        {/* Due Assignments */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
              <span className="text-[#D97706] text-sm font-medium">⏰</span>
            </div>
            <span className="text-sm sm:text-base text-gray-700 font-medium">
              Due
            </span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-[#D97706]">
            {dueAssignments}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#1AA939] h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};