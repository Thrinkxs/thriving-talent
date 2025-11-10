export type EmployerSignupPayload = {
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
