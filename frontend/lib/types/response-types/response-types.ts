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
  location: string;
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

type DailyData = {
  count: number;
  date: string; // ISO date string
};

type WeeklyData = {
  count: number;
  week: string; // Format: "YYYY-WWW"
};

type MonthlyData = {
  count: number;
  month: string; // Format: "YYYY-MM"
};

export type ApplicationStatisticsResponse = {
  daily: DailyData[];
  weekly: WeeklyData[];
  monthly: MonthlyData[];
};

type CountChange = {
  count: number;
  change: number;
};

export type JobTypeStats = {
  fullTime: CountChange;
  partTime: CountChange;
  negotiable: CountChange;
};

export type RecuiterDashboardMetricsResponse = {
  totalJobs: CountChange;
  totalApplicants: CountChange;
  jobTypeStats: JobTypeStats;
};

/**
 * The EmployerApplicantResponse refers to the applicants
 * who applied for a job post by employer.
 **/
export type EmployerApplicantResponse = {
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantGender: string;
  applicantResume: string;
  applicantProfileImage: string;
  applicantIntroVideo: string;
  jobTitle: string;
  jobLocation: string;
  jobType: string;
  jobDescription: string;
  status: string;
  appliedAt: string;
};

export type InternByIdResponse = {
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
