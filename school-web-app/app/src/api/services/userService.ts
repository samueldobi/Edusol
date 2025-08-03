import { userClient } from "../clients/userClient";
import { USER_API } from "../endpoints/userEndpoints";

// --- Types ---
export interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  phone?: string | null;
  email?: string | null;
  user_type: "TEACHER" | "GUARDIAN" | "ADMIN" | "SUPER_ADMIN" | "STUDENT";
  created_at: string;
  updated_at: string;
  student_profile?: string;
  teacher_profile?: string;
  admin_profile?: string;
  guardian_profile?: string;
}

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  phone?: string | null;
  email?: string | null;
  user_type: "TEACHER" | "GUARDIAN" | "ADMIN" | "SUPER_ADMIN" | "STUDENT";
  created_at: string;
}

export interface UserCountResponse {
  users_count: number;
  admin_count: number;
  student_count: number;
  teacher_count: number;
  guardian_count: number;
}

// Helper function to get the correct endpoint based on user type
const getUserEndpoint = (userType: string) => {
  switch (userType) {
    case 'STUDENT':
      return USER_API.STUDENTS;
    case 'TEACHER':
      return USER_API.TEACHERS;
    case 'GUARDIAN':
      return USER_API.GUARDIANS;
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return USER_API.ADMINS;
    default:
      throw new Error(`Invalid user type: ${userType}`);
  }
};

// List all users - we'll need to fetch from all endpoints and combine
export const fetchUsersList = async (): Promise<UserType[]> => {
  try {
    const [students, teachers, guardians, admins] = await Promise.all([
      userClient.get(USER_API.STUDENTS).catch(() => ({ data: [] })),
      userClient.get(USER_API.TEACHERS).catch(() => ({ data: [] })),
      userClient.get(USER_API.GUARDIANS).catch(() => ({ data: [] })),
      userClient.get(USER_API.ADMINS).catch(() => ({ data: [] })),
    ]);

    const allUsers = [
      ...students.data.map((user: any) => ({ ...user, user_type: 'STUDENT' as const })),
      ...teachers.data.map((user: any) => ({ ...user, user_type: 'TEACHER' as const })),
      ...guardians.data.map((user: any) => ({ ...user, user_type: 'GUARDIAN' as const })),
      ...admins.data.map((user: any) => ({ ...user, user_type: 'ADMIN' as const })),
    ];

    return allUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Create a new user - route to the appropriate endpoint based on user type
export const createUser = async (data: CreateUserPayload): Promise<UserType> => {
  const endpoint = getUserEndpoint(data.user_type);
  const response = await userClient.post(endpoint, data);
  return { ...response.data, user_type: data.user_type };
};

// Get user by ID - we'll need to try different endpoints
export const fetchUserById = async (id: string): Promise<UserType> => {
  // Try each endpoint to find the user
  const endpoints = [
    USER_API.STUDENTS,
    USER_API.TEACHERS,
    USER_API.GUARDIANS,
    USER_API.ADMINS,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await userClient.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      // Continue to next endpoint if user not found
      continue;
    }
  }
  
  throw new Error(`User with ID ${id} not found`);
};

// Update user by ID (PATCH) - route to the appropriate endpoint
export const updateUser = async (id: string, data: Partial<CreateUserPayload>): Promise<UserType> => {
  // First, we need to get the user to determine their type
  const user = await fetchUserById(id);
  const endpoint = getUserEndpoint(user.user_type);
  const response = await userClient.patch(`${endpoint}/${id}`, data);
  return response.data;
};

// Delete user by ID - route to the appropriate endpoint
export const deleteUser = async (id: string): Promise<void> => {
  // First, we need to get the user to determine their type
  const user = await fetchUserById(id);
  const endpoint = getUserEndpoint(user.user_type);
  await userClient.delete(`${endpoint}/${id}`);
};

// Get user counts for a school
export const fetchUserCounts = async (school_id: string): Promise<UserCountResponse> => {
  try {
    const [students, teachers, guardians, admins] = await Promise.all([
      userClient.get(USER_API.STUDENTS).catch(() => ({ data: [] })),
      userClient.get(USER_API.TEACHERS).catch(() => ({ data: [] })),
      userClient.get(USER_API.GUARDIANS).catch(() => ({ data: [] })),
      userClient.get(USER_API.ADMINS).catch(() => ({ data: [] })),
    ]);

    return {
      users_count: students.data.length + teachers.data.length + guardians.data.length + admins.data.length,
      student_count: students.data.length,
      teacher_count: teachers.data.length,
      guardian_count: guardians.data.length,
      admin_count: admins.data.length,
    };
  } catch (error) {
    console.error('Error fetching user counts:', error);
    return {
      users_count: 0,
      student_count: 0,
      teacher_count: 0,
      guardian_count: 0,
      admin_count: 0,
    };
  }
};
