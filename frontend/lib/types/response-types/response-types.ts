export type RecruiterResponse = {
  employer: {
    fullName: string;
    companyName: string;
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
    _id: string;
    createdAt: string; // or Date if you parse it
    updatedAt: string; // or Date if you parse it
  };
  accessToken: string;
  refreshToken: string;
};

export type InternResponse = {
  intern: {
    fullName: string;
    email: string;
    bio: string;
    isVerified: boolean;
    phone: string;
    password: string;
    status: string; // or just string if other statuses are possible
    gender: string;
    profileImage: string;
    introVideo: string;
    resume: string;
    isDeleted: boolean;
    _id: string;
    __v: number;
  };
  accessToken: string;
  refreshToken: string;
};

export type JobResponse = {
  _id: string;
  title: string;
  description: string;
  company: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ApplicationResponse = {
  _id: string;
  job: JobResponse;
  intern: InternResponse;
  status: string;
  createdAt: string;
  updatedAt: string;
};
