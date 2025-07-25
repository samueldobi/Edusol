import { userClient } from "../clients/userClient";

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

const USER_API = {
  USERS_LIST: "/api/users/users/",
  USERS_DETAIL: (id: string) => `/api/users/users/${id}/`,
  USERS_COUNT: (school_id: string) => `/api/users/users/user_count/${school_id}/`,
};

// List all users
export const fetchUsersList = async (): Promise<UserType[]> => {
  const response = await userClient.get(USER_API.USERS_LIST);
  return response.data;
};

// Create a new user
export const createUser = async (data: CreateUserPayload): Promise<UserType> => {
  const response = await userClient.post(USER_API.USERS_LIST, data);
  return response.data;
};

// Get user by ID
export const fetchUserById = async (id: string): Promise<UserType> => {
  const response = await userClient.get(USER_API.USERS_DETAIL(id));
  return response.data;
};

// Update user by ID (PATCH)
export const updateUser = async (id: string, data: Partial<CreateUserPayload>): Promise<UserType> => {
  const response = await userClient.patch(USER_API.USERS_DETAIL(id), data);
  return response.data;
};

// Delete user by ID
export const deleteUser = async (id: string): Promise<void> => {
  await userClient.delete(USER_API.USERS_DETAIL(id));
};

// Get user counts for a school
export const fetchUserCounts = async (school_id: string): Promise<UserCountResponse> => {
  const response = await userClient.get(USER_API.USERS_COUNT(school_id));
  return response.data;
};
