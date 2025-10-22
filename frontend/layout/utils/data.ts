import {
  Home,
  Briefcase,
  User,
  FileText,
  Building2,
  Settings2,
} from "lucide-react";

export const userNavItems = [
  { href: "/dashboard/user/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/user/jobs", label: "Browse Jobs", icon: Briefcase },
  {
    href: "/dashboard/user/applications",
    label: "My Applications",
    icon: FileText,
  },
  { href: "/dashboard/user/settings", label: "Settings", icon: Settings2 },
];

export const recruiterNavItems = [
  { href: "/dashboard/recruiter", label: "Dashboard", icon: Home },
  { href: "/dashboard/recruiter/jobs", label: "My Jobs", icon: Briefcase },
  {
    href: "/dashboard/recruiter/post-job",
    label: "Post a Job",
    icon: FileText,
  },
  {
    href: "/dashboard/recruiter/company",
    label: "Company Profile",
    icon: Building2,
  },
];
