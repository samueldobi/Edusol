import { authServiceClient } from '../clients/authServiceClient';
import { AUTH_SERVICE_API } from '../endpoints/authServiceEndpoints';

// --- Types ---
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

// --- User Functions ---
export const fetchUsersList = async (): Promise<UserType[]> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.USERS_LIST);
  return response.data;
};

export const fetchUserById = async (id: string): Promise<UserType> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.USERS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createUser = async (data: CreateUserPayload): Promise<UserType> => {
  const response = await authServiceClient.post(AUTH_SERVICE_API.USERS_CREATE, data);
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserPayload): Promise<UserType> => {
  const response = await authServiceClient.put(AUTH_SERVICE_API.USERS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateUser = async (id: string, data: Partial<UpdateUserPayload>): Promise<UserType> => {
  const response = await authServiceClient.patch(AUTH_SERVICE_API.USERS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<UserType> => {
  const response = await authServiceClient.delete(AUTH_SERVICE_API.USERS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Role Functions ---
export const fetchRolesList = async (): Promise<RoleType[]> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.ROLES_LIST);
  return response.data;
};

export const fetchRoleById = async (id: string): Promise<RoleType> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.ROLES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createRole = async (data: CreateRolePayload): Promise<RoleType> => {
  const response = await authServiceClient.post(AUTH_SERVICE_API.ROLES_CREATE, data);
  return response.data;
};

export const updateRole = async (id: string, data: RoleType): Promise<RoleType> => {
  const response = await authServiceClient.put(AUTH_SERVICE_API.ROLES_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateRole = async (id: string, data: Partial<RoleType>): Promise<RoleType> => {
  const response = await authServiceClient.patch(AUTH_SERVICE_API.ROLES_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteRole = async (id: string): Promise<RoleType> => {
  const response = await authServiceClient.delete(AUTH_SERVICE_API.ROLES_DELETE.replace('{id}', id));
  return response.data;
};

// --- Permission Functions ---
export const fetchPermissionsList = async (): Promise<PermissionType[]> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.PERMISSIONS_LIST);
  return response.data;
};

export const fetchPermissionById = async (id: string): Promise<PermissionType> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.PERMISSIONS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createPermission = async (data: CreatePermissionPayload): Promise<PermissionType> => {
  const response = await authServiceClient.post(AUTH_SERVICE_API.PERMISSIONS_CREATE, data);
  return response.data;
};

export const updatePermission = async (id: string, data: PermissionType): Promise<PermissionType> => {
  const response = await authServiceClient.put(AUTH_SERVICE_API.PERMISSIONS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdatePermission = async (id: string, data: Partial<PermissionType>): Promise<PermissionType> => {
  const response = await authServiceClient.patch(AUTH_SERVICE_API.PERMISSIONS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deletePermission = async (id: string): Promise<PermissionType> => {
  const response = await authServiceClient.delete(AUTH_SERVICE_API.PERMISSIONS_DELETE.replace('{id}', id));
  return response.data;
};

// --- User Role Functions ---
export const fetchUserRolesList = async (): Promise<UserRoleType[]> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.USER_ROLES_LIST);
  return response.data;
};

export const fetchUserRoleById = async (id: string): Promise<UserRoleType> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.USER_ROLES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createUserRole = async (data: CreateUserRolePayload): Promise<UserRoleType> => {
  const response = await authServiceClient.post(AUTH_SERVICE_API.USER_ROLES_CREATE, data);
  return response.data;
};

export const updateUserRole = async (id: string, data: UserRoleType): Promise<UserRoleType> => {
  const response = await authServiceClient.put(AUTH_SERVICE_API.USER_ROLES_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateUserRole = async (id: string, data: Partial<UserRoleType>): Promise<UserRoleType> => {
  const response = await authServiceClient.patch(AUTH_SERVICE_API.USER_ROLES_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteUserRole = async (id: string): Promise<UserRoleType> => {
  const response = await authServiceClient.delete(AUTH_SERVICE_API.USER_ROLES_DELETE.replace('{id}', id));
  return response.data;
};

// --- Profile Functions ---
export const fetchProfile = async (): Promise<ProfileType> => {
  const response = await authServiceClient.get(AUTH_SERVICE_API.PROFILE_GET);
  return response.data;
};

export const updateProfile = async (data: UpdateProfilePayload): Promise<ProfileType> => {
  const response = await authServiceClient.put(AUTH_SERVICE_API.PROFILE_UPDATE, data);
  return response.data;
};

export const partialUpdateProfile = async (data: Partial<UpdateProfilePayload>): Promise<ProfileType> => {
  const response = await authServiceClient.patch(AUTH_SERVICE_API.PROFILE_PARTIAL_UPDATE, data);
  return response.data;
}; 