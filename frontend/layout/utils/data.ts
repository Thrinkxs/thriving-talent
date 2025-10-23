import { Home, Briefcase, FileText, Settings2 } from "lucide-react";

export const userNavItems = [
  { href: "/user/dashboard", label: "Dashboard", icon: Home },
  { href: "/user/jobs", label: "Browse Jobs", icon: Briefcase },
  {
    href: "/user/applications",
    label: "My Applications",
    icon: FileText,
  },
  { href: "/user/settings", label: "Settings", icon: Settings2 },
];

export const recruiterNavItems = [
  { href: "/recruiter/dashboard", label: "Dashboard", icon: Home },
  { href: "/recruiter/jobs", label: "My Jobs", icon: Briefcase },
  {
    href: "/recruiter/post-job",
    label: "Post a Job",
    icon: FileText,
  },
  { href: "/recruiter/settings", label: "Settings", icon: Settings2 },
];
