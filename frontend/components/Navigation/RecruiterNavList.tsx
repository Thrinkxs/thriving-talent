/*
 * The navigation list for the recruiter dashboard layout.
 * Each item includes an icon, title, URL, and optional flags for active state and logout handling.
 */

import {
  IconLayoutDashboardFilled,
  IconBriefcaseFilled,
  IconSettingsFilled,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";

export const RecruiterNavList = {
  navMain: [
    {
      title: "",
      url: "#",
      items: [
        {
          icons: (
            <IconLayoutDashboardFilled size={20} color="white" stroke={2} />
          ),
          title: "Home",
          url: "/dashboard/recruiter/home",
        },
        {
          icons: <IconUsers size={20} color="white" stroke={2} />,
          title: "Candidates",
          url: "/dashboard/recruiter/candidate",
        },
        {
          icons: <IconBriefcaseFilled size={20} color="white" stroke={2} />,
          title: "Jobs",
          url: "/dashboard/recruiter/jobs",
        },
        {
          icons: <IconSettingsFilled size={20} color="white" stroke={2} />,
          title: "Settings",
          url: "/dashboard/recruiter/settings",
        },

        {
          icons: <IconLogout size={16} color="white" />,
          title: "Logout",
          url: "#",
          isLogout: true, // Flag to handle logout separately
        },
      ],
    },
  ],
};
