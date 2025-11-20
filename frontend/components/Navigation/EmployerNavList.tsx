/*
 * The navigation list for the employer dashboard layout.
 * Each item includes an icon, title, URL, and optional flags for active state and logout handling.
 */

import {
  IconLayoutDashboardFilled,
  IconBriefcaseFilled,
  IconSettingsFilled,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";

export const EmployerNavList = {
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
          url: "/dashboard/employer/home",
        },
        {
          icons: <IconUsers size={20} color="white" stroke={2} />,
          title: "Candidates",
          url: "/dashboard/employer/candidate",
        },
        {
          icons: <IconBriefcaseFilled size={20} color="white" stroke={2} />,
          title: "Jobs",
          url: "/dashboard/employer/jobs",
        },
        {
          icons: <IconSettingsFilled size={20} color="white" stroke={2} />,
          title: "Settings",
          url: "/dashboard/employer/settings",
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
