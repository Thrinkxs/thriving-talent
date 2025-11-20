export type StateEmployerTypes = {
  fullName: string;
  companyName: string;
  companyPhoto: string;
  images: string[]; // or any[] if images can be other types
  email: string;
  isVerified: boolean;
  status: "active" | "inactive" | "suspended"; // or string
  registrationNumber: string;
  sector: string;
  industry: string;
  numberOfEmployees: number;
  roleInOrganization: string;
  address: string;
  isDeleted: boolean;
  description: string;
  _id: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
};
