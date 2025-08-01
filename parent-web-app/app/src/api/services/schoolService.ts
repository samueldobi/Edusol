import {schoolClient} from '../clients/schoolClient';
import {SCHOOL_API} from '../endpoints/schoolEndpoint';

// --- Types ---
export interface ClassType {
  id: string;
  class_name: string;
  class_level: string;
  class_arm?: string | null;
  form_teacher_id?: string | null;
  capacity?: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  school: string;
}

export interface FeeType {
  id: string;
  fee_type: string;
  fee_amount: number;
  image_url?: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  created_by: string;
  school: string;
}

export interface ResultType {
  id: string;
  total_score: string;
  average_score: string;
  position_in_class?: number | null;
  remarks?: string | null;
  status: 'draft' | 'submitted' | 'approved';
  approved_at?: string | null;
  created_at: string;
  updated_at: string;
  approved_by_admin?: string | null;
  class_obj: string;
  student: string;
  term: string;
  created_by_teacher: string;
}

export interface SchoolInformationType {
  id: string;
  school_email: string;
  school_phone: string;
  address: string;
  principal_name: string;
  website?: string | null;
  created_at: string;
  updated_at: string;
  school: string;
}

export interface SchoolType {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface SubjectType {
  id: string;
  subject_name: string;
  subject_code: string;
  description?: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  school: string;
}

export interface TermType {
  id: string;
  term_name: string;
  academic_year: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  created_at: string;
  updated_at: string;
  school: string;
}

export interface AssignmentType {
  id: string;
  title: string;
  description: string;
  due_date: string;
  assignment_type: string;
  status?: 'submitted';
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  school?: string;
  start_date?: string;
  subject?: string;
  topic?: string;
  term?: string;
  created_by_teacher_cache?: string;
}

export type CreateSubjectPayload = {
  subject_name: string;
  subject_code: string;
  description?: string | null;
  created_by: string;
  created_at: string;
  school: string;
};

export type CreateAssignmentPayload = {
  title: string;
  description: string;
  due_date: string;
  assignment_type: string;
  status?: 'submitted';
  created_by?: string;
  created_at?: string;
  school?: string;
  start_date?: string;
  subject?: string;
  topic?: string;
  term?: string;
  created_by_teacher_cache?: string;
};

export type CreateTermPayload = {
  term_name: string;
  academic_year: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  created_by: string;
  created_at: string;
  school: string;
};

export type CreateFeePayload = {
  fee_type: string;
  fee_amount: number;
  status?: 'active' | 'inactive';
  created_by?: string;
  school?: string;
};

// Get Requests
export const fetchSchoolClasses = async (): Promise<ClassType[]> => {
  const response = await schoolClient.get(SCHOOL_API.CLASSES);
  return response.data;
};
export const fetchSchoolClassById = async (id: string): Promise<ClassType> => {
  const response = await schoolClient.get(SCHOOL_API.CLASSES_BY_ID.replace('{id}', id));
  return response.data;
};
export const fetchSchoolFeesList= async (): Promise<FeeType[]> => {
  const response = await schoolClient.get(SCHOOL_API.FEES);
  return response.data;
};
export const fetchSchoolFeesListById= async (id: string): Promise<FeeType> => {
  const response = await schoolClient.get(SCHOOL_API.FEES_BY_ID.replace('{id}', id));
  return response.data;
};
export const fetchSchoolResultList= async (): Promise<ResultType[]> => {
  const response = await schoolClient.get(SCHOOL_API.RESULTS);
  return response.data;
};
export const fetchSchoolResultById= async (id: string): Promise<ResultType> => {
  const response = await schoolClient.get(SCHOOL_API.RESULTS_BY_ID.replace('{id}', id));
  return response.data;
};
export const fetchSchoolInformation= async (): Promise<SchoolInformationType> => {
  const response = await schoolClient.get(SCHOOL_API.SCHOOL_INFORMATION);
  return response.data;
};
export const fetchSchoolInformationById= async (id: string): Promise<SchoolInformationType> => {
  const response = await schoolClient.get(SCHOOL_API.SCHOOL_INFORMATION_BY_ID.replace('{id}', id));
  return response.data;
};
export const fetchSchoolsList= async (): Promise<SchoolType[]> => {
  const response = await schoolClient.get(SCHOOL_API.SCHOOLS);
  return response.data;
};
export const fetchSchoolsListById= async (id: string): Promise<SchoolType> => {
  const response = await schoolClient.get(SCHOOL_API.SCHOOLS_BY_ID.replace('{id}', id));
  return response.data;
};

// -------------------- CLASSES --------------------
export const createSchoolClass = async (data: ClassType): Promise<ClassType> => {
  const response = await schoolClient.post(SCHOOL_API.CLASSES, data);
  return response.data;
};
export const updateSchoolClass = async (id: string, data: ClassType): Promise<ClassType> => {
  const response = await schoolClient.put(SCHOOL_API.CLASSES_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const partialUpdateSchoolClass = async (id: string, data: Partial<ClassType>): Promise<ClassType> => {
  const response = await schoolClient.patch(SCHOOL_API.CLASSES_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const deleteSchoolClass = async (id: string): Promise<ClassType> => {
  const response = await schoolClient.delete(SCHOOL_API.CLASSES_BY_ID.replace('{id}', id));
  return response.data;
};

// -------------------- FEES --------------------
export const fetchFeesList = async (): Promise<FeeType[]> => {
  const response = await schoolClient.get(SCHOOL_API.FEES);
  return response.data;
};

export const fetchFeeById = async (id: string): Promise<FeeType> => {
  const response = await schoolClient.get(SCHOOL_API.FEES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createFee = async (data: CreateFeePayload): Promise<FeeType> => {
  const response = await schoolClient.post(SCHOOL_API.FEES, data);
  return response.data;
};

export const updateFee = async (id: string, data: Partial<CreateFeePayload>): Promise<FeeType> => {
  const response = await schoolClient.patch(SCHOOL_API.FEES_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const deleteFee = async (id: string): Promise<void> => {
  await schoolClient.delete(SCHOOL_API.FEES_BY_ID.replace('{id}', id));
};

// -------------------- RESULTS --------------------
export const createSchoolResult = async (data: ResultType): Promise<ResultType> => {
  const response = await schoolClient.post(SCHOOL_API.RESULTS, data);
  return response.data;
};
export const updateSchoolResult = async (id: string, data: ResultType): Promise<ResultType> => {
  const response = await schoolClient.put(SCHOOL_API.RESULTS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const partialUpdateSchoolResult = async (id: string, data: Partial<ResultType>): Promise<ResultType> => {
  const response = await schoolClient.patch(SCHOOL_API.RESULTS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const deleteSchoolResult = async (id: string): Promise<ResultType> => {
  const response = await schoolClient.delete(SCHOOL_API.RESULTS_BY_ID.replace('{id}', id));
  return response.data;
};

// -------------------- SCHOOL INFORMATION --------------------
export const createSchoolInformation = async (data: SchoolInformationType): Promise<SchoolInformationType> => {
  const response = await schoolClient.post(SCHOOL_API.SCHOOL_INFORMATION, data);
  return response.data;
};
export const updateSchoolInformation = async (id: string, data: SchoolInformationType): Promise<SchoolInformationType> => {
  const response = await schoolClient.put(SCHOOL_API.SCHOOL_INFORMATION_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const partialUpdateSchoolInformation = async (id: string, data: Partial<SchoolInformationType>): Promise<SchoolInformationType> => {
  const response = await schoolClient.patch(SCHOOL_API.SCHOOL_INFORMATION_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const deleteSchoolInformation = async (id: string): Promise<SchoolInformationType> => {
  const response = await schoolClient.delete(SCHOOL_API.SCHOOL_INFORMATION_BY_ID.replace('{id}', id));
  return response.data;
};

// -------------------- SCHOOLS --------------------
export const createSchool = async (data: SchoolType): Promise<SchoolType> => {
  const response = await schoolClient.post(SCHOOL_API.SCHOOLS, data);
  return response.data;
};
export const updateSchool = async (id: string, data: SchoolType): Promise<SchoolType> => {
  const response = await schoolClient.put(SCHOOL_API.SCHOOLS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const partialUpdateSchool = async (id: string, data: Partial<SchoolType>): Promise<SchoolType> => {
  const response = await schoolClient.patch(SCHOOL_API.SCHOOLS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const deleteSchool = async (id: string): Promise<SchoolType> => {
  const response = await schoolClient.delete(SCHOOL_API.SCHOOLS_BY_ID.replace('{id}', id));
  return response.data;
};

// -------------------- SUBJECTS --------------------
export const fetchSubjectsList = async (): Promise<SubjectType[]> => {
  const response = await schoolClient.get(SCHOOL_API.SUBJECTS);
  return response.data;
};
export const fetchSubjectById = async (id: string): Promise<SubjectType> => {
  const response = await schoolClient.get(SCHOOL_API.SUBJECTS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createSubject = async (data: CreateSubjectPayload): Promise<SubjectType> => {
  const response = await schoolClient.post(SCHOOL_API.SUBJECTS, data);
  return response.data;
};
export const updateSubject = async (id: string, data: SubjectType): Promise<SubjectType> => {
  const response = await schoolClient.put(SCHOOL_API.SUBJECTS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const partialUpdateSubject = async (id: string, data: Partial<SubjectType>): Promise<SubjectType> => {
  const response = await schoolClient.patch(SCHOOL_API.SUBJECTS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const deleteSubject = async (id: string): Promise<SubjectType> => {
  const response = await schoolClient.delete(SCHOOL_API.SUBJECTS_BY_ID.replace('{id}', id));
  return response.data;
};

// -------------------- TERMS --------------------
export const fetchTermsList = async (): Promise<TermType[]> => {
  const response = await schoolClient.get(SCHOOL_API.TERMS);
  return response.data;
};
export const fetchTermById = async (id: string): Promise<TermType> => {
  const response = await schoolClient.get(SCHOOL_API.TERMS_BY_ID.replace('{id}', id));
  return response.data;
};
export const createTerm = async (data: CreateTermPayload): Promise<TermType> => {
  const response = await schoolClient.post(SCHOOL_API.TERMS, data);
  return response.data;
};
export const updateTerm = async (id: string, data: TermType): Promise<TermType> => {
  const response = await schoolClient.put(SCHOOL_API.TERMS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const partialUpdateTerm = async (id: string, data: Partial<TermType>): Promise<TermType> => {
  const response = await schoolClient.patch(SCHOOL_API.TERMS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const deleteTerm = async (id: string): Promise<TermType> => {
  const response = await schoolClient.delete(SCHOOL_API.TERMS_BY_ID.replace('{id}', id));
  return response.data;
};

// -------------------- ASSIGNMENTS --------------------
export const fetchAssignmentsList = async (): Promise<AssignmentType[]> => {
  const response = await schoolClient.get(SCHOOL_API.ASSIGNMENTS);
  return response.data;
};
export const fetchAssignmentById = async (id: string): Promise<AssignmentType> => {
  const response = await schoolClient.get(SCHOOL_API.ASSIGNMENTS_BY_ID.replace('{id}', id));
  return response.data;
};
export const createAssignment = async (data: CreateAssignmentPayload): Promise<AssignmentType> => {
  const response = await schoolClient.post(SCHOOL_API.ASSIGNMENTS, data);
  return response.data;
};
export const updateAssignment = async (id: string, data: AssignmentType): Promise<AssignmentType> => {
  const response = await schoolClient.put(SCHOOL_API.ASSIGNMENTS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const partialUpdateAssignment = async (id: string, data: Partial<AssignmentType>): Promise<AssignmentType> => {
  const response = await schoolClient.patch(SCHOOL_API.ASSIGNMENTS_BY_ID.replace('{id}', id), data);
  return response.data;
};
export const deleteAssignment = async (id: string): Promise<AssignmentType> => {
  const response = await schoolClient.delete(SCHOOL_API.ASSIGNMENTS_BY_ID.replace('{id}', id));
  return response.data;
};