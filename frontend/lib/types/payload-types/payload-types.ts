export type RecruiterSignupPayload = {
  fullName: string;
  companyName: string;
  description: string;
  images: string[];
  email: string;
  password: string;
  registrationNumber: string;
  sector: string;
  industry: string;
  numberOfEmployees: number; // this is a number, I'll change it to a string in the backend
  roleInOrganization: string;
  address: string;
  bio?: string;
};

export type InternSignupPayload = {
  fullName: string;
  email: string;
  bio: string;
  phone: string;
  password: string;
  gender: string;
  profileImage: string;
  introVideo: string;
  resume: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type ResetUserPasswordPayload = {
  currentPassword: string;
  password: string;
};

export interface FetchJobsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export type JobPayload = {
  title: string;
  description: string;
  location: string;
  type: string;
};

export interface UpdateApplicationParams {
  applicationId: string;
  payload: Partial<ApplicationPayload>;
}

export type ApplicationPayload = {
  jobId: string;
  internId: string;
};

export interface ApplicationParams {
  jobId?: string;
  internId?: string;
  search?: string; // not included in the backend yet.
  status?: string;
  page?: number;
  limit?: number;
}
