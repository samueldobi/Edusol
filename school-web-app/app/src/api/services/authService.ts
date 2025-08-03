import { authClient } from '../clients/authClient';
import { AUTH_API } from '../endpoints/authEndpoints';
import axios from 'axios';

// Create a separate client for refresh token requests without interceptors
const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'https://api-gateway-ms-app.fly.dev',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface UserType {
  id: string;
  email: string;
  name: string;
  phone_number?: string;
  avatar_url?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoleType {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface PermissionType {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  created_at: string;
  updated_at: string;
}

export interface UserRoleType {
  id: string;
  user_id: string;
  role_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileType {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  avatar_url?: string;
  date_of_birth?: string;
  address?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
  phone_number?: string;
}

export interface UpdateUserPayload {
  name?: string;
  phone_number?: string;
  is_active?: boolean;
}

export interface CreateRolePayload {
  name: string;
  description?: string;
  permissions: string[];
}

export interface CreatePermissionPayload {
  name: string;
  description?: string;
  resource: string;
  action: string;
}

export interface CreateUserRolePayload {
  user_id: string;
  role_id: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar_url?: string;
  date_of_birth?: string;
  address?: string;
  bio?: string;
}

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await authClient.post(AUTH_API.LOGIN, data);
    
    if (!response.data) {
      throw new Error('No response data received');
    }
    
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid email or password');
    } else if (error.response?.status === 403) {
      throw new Error('Access forbidden');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Login failed - please try again');
    }
  }
};

export const register = async (data: RegisterPayload): Promise<AuthResponse> => {
  try {
    const response = await authClient.post(AUTH_API.REGISTER, data);
    
    if (!response.data) {
      throw new Error('No response data received');
    }
    
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('Invalid registration data');
    } else if (error.response?.status === 409) {
      throw new Error('User already exists');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Registration failed - please try again');
    }
  }
};

export const forgotPassword = async (data: ForgotPasswordPayload): Promise<{ message: string }> => {
  const response = await authClient.post(AUTH_API.FORGOT_PASSWORD, data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordPayload): Promise<{ message: string }> => {
  const response = await authClient.post(AUTH_API.RESET_PASSWORD, data);
  return response.data;
};

export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  const response = await authClient.post(AUTH_API.VERIFY_EMAIL, { token });
  return response.data;
};

export const resendVerification = async (email: string): Promise<{ message: string }> => {
  const response = await authClient.post(AUTH_API.RESEND_VERIFICATION, { email });
  return response.data;
};

export const refreshToken = async (data: RefreshTokenPayload): Promise<AuthResponse> => {
  try {
    const response = await refreshClient.post(AUTH_API.REFRESH_TOKEN, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const changePassword = async (data: ChangePasswordPayload): Promise<{ message: string }> => {
  const response = await authClient.post(AUTH_API.CHANGE_PASSWORD, data);
  return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const response = await authClient.post(AUTH_API.LOGOUT);
  return response.data;
};

export const fetchUsersList = async (): Promise<UserType[]> => {
  const response = await authClient.get(AUTH_API.USERS);
  return response.data;
};

export const fetchUserById = async (id: string): Promise<UserType> => {
  const response = await authClient.get(AUTH_API.USERS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createUser = async (data: CreateUserPayload): Promise<UserType> => {
  const response = await authClient.post(AUTH_API.USERS, data);
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserPayload): Promise<UserType> => {
  const response = await authClient.put(AUTH_API.USERS_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateUser = async (id: string, data: Partial<UpdateUserPayload>): Promise<UserType> => {
  const response = await authClient.patch(AUTH_API.USERS_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<UserType> => {
  const response = await authClient.delete(AUTH_API.USERS_BY_ID.replace('{id}', id));
  return response.data;
};

export const fetchRolesList = async (): Promise<RoleType[]> => {
  const response = await authClient.get(AUTH_API.ROLES);
  return response.data;
};

export const fetchRoleById = async (id: string): Promise<RoleType> => {
  const response = await authClient.get(AUTH_API.ROLES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createRole = async (data: CreateRolePayload): Promise<RoleType> => {
  const response = await authClient.post(AUTH_API.ROLES, data);
  return response.data;
};

export const updateRole = async (id: string, data: RoleType): Promise<RoleType> => {
  const response = await authClient.put(AUTH_API.ROLES_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateRole = async (id: string, data: Partial<RoleType>): Promise<RoleType> => {
  const response = await authClient.patch(AUTH_API.ROLES_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const deleteRole = async (id: string): Promise<RoleType> => {
  const response = await authClient.delete(AUTH_API.ROLES_BY_ID.replace('{id}', id));
  return response.data;
};

export const fetchPermissionsList = async (): Promise<PermissionType[]> => {
  const response = await authClient.get(AUTH_API.PERMISSIONS);
  return response.data;
};

export const fetchPermissionById = async (id: string): Promise<PermissionType> => {
  const response = await authClient.get(AUTH_API.PERMISSIONS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createPermission = async (data: CreatePermissionPayload): Promise<PermissionType> => {
  const response = await authClient.post(AUTH_API.PERMISSIONS, data);
  return response.data;
};

export const updatePermission = async (id: string, data: PermissionType): Promise<PermissionType> => {
  const response = await authClient.put(AUTH_API.PERMISSIONS_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const partialUpdatePermission = async (id: string, data: Partial<PermissionType>): Promise<PermissionType> => {
  const response = await authClient.patch(AUTH_API.PERMISSIONS_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const deletePermission = async (id: string): Promise<PermissionType> => {
  const response = await authClient.delete(AUTH_API.PERMISSIONS_BY_ID.replace('{id}', id));
  return response.data;
};

export const fetchUserRolesList = async (): Promise<UserRoleType[]> => {
  const response = await authClient.get(AUTH_API.USER_ROLES);
  return response.data;
};

export const fetchUserRoleById = async (id: string): Promise<UserRoleType> => {
  const response = await authClient.get(AUTH_API.USER_ROLES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createUserRole = async (data: CreateUserRolePayload): Promise<UserRoleType> => {
  const response = await authClient.post(AUTH_API.USER_ROLES, data);
  return response.data;
};

export const updateUserRole = async (id: string, data: UserRoleType): Promise<UserRoleType> => {
  const response = await authClient.put(AUTH_API.USER_ROLES_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateUserRole = async (id: string, data: Partial<UserRoleType>): Promise<UserRoleType> => {
  const response = await authClient.patch(AUTH_API.USER_ROLES_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const deleteUserRole = async (id: string): Promise<UserRoleType> => {
  const response = await authClient.delete(AUTH_API.USER_ROLES_BY_ID.replace('{id}', id));
  return response.data;
};

export const fetchProfile = async (): Promise<ProfileType> => {
  const response = await authClient.get(AUTH_API.PROFILE_GET);
  return response.data;
};

export const updateProfile = async (data: UpdateProfilePayload): Promise<ProfileType> => {
  const response = await authClient.put(AUTH_API.PROFILE_UPDATE, data);
  return response.data;
};

export const partialUpdateProfile = async (data: Partial<UpdateProfilePayload>): Promise<ProfileType> => {
  const response = await authClient.patch(AUTH_API.PROFILE_PARTIAL_UPDATE, data);
  return response.data;
};
