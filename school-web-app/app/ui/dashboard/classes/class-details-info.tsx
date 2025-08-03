"use client";
import Image from "next/image";
import { ClassType } from "@/app/src/api/services/schoolService";
import { UserType } from "@/app/src/api/services/userService";

type Props = {
  studentSize?: number;
  classData?: ClassType | null;
  teacherData?: UserType | null;
}

export default function ClassDetailsInfo({ studentSize, classData, teacherData }: Props) {
  // Helper function to format teacher name
  const getTeacherName = () => {
    if (!teacherData) {
      return "Not Assigned";
    }
    
    const firstName = teacherData.first_name || "";
    const lastName = teacherData.last_name || "";
    const middleName = teacherData.middle_name || "";
    
    if (firstName && lastName) {
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
      return fullName;
    }
    
    return "Unknown Teacher";
  };

  // Helper function to format class level
  const getClassLevel = () => {
    if (!classData?.class_level) return "Unknown";
    return classData.class_level.charAt(0).toUpperCase() + classData.class_level.slice(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#1AA939] px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {classData?.class_name?.charAt(0) || "C"}
                </span>
              </div>
              <div>
                <h1 className="text-white text-3xl font-bold">{classData?.class_name || "Class"}</h1>
                <p className="text-white/80 text-lg">{getClassLevel()} Level</p>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="text-2xl font-bold">{studentSize || 0}</div>
              <div className="text-white/80">Students</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Teacher Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/images/teacher.png"
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="Teacher icon"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Class Teacher</h3>
                  <p className="text-blue-600 font-medium">{getTeacherName()}</p>
                </div>
              </div>
              {teacherData?.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{teacherData.email}</span>
                </div>
              )}
            </div>

            {/* Class Details */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Class Information</h3>
                  <p className="text-green-600 font-medium">{classData?.class_name}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{getClassLevel()}</span>
                </div>
                {classData?.class_arm && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Arm:</span>
                    <span className="font-medium">{classData.class_arm}</span>
                  </div>
                )}
                {classData?.capacity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{classData.capacity} students</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Student ID Input Section */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Search Student</h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Enter student ID or name..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 