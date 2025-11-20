/*
 * The navigation list for the Intern dashboard layout.
 * Each item includes an icon, title, URL, and optional flags for active state and logout handling.
 */

import {
  IconLayoutDashboardFilled,
  IconBriefcaseFilled,
  IconSettingsFilled,
  IconLogout,
  IconHistory,
} from "@tabler/icons-react";

export const InternNavList = {
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
          url: "/dashboard/intern/home",
        },
        {
          icons: <IconBriefcaseFilled size={20} color="white" stroke={2} />,
          title: "Jobs",
          url: "/dashboard/intern/jobs",
        },
        {
          icons: <IconHistory size={20} color="white" stroke={2} />,
          title: "History",
          url: "/dashboard/intern/history",
        },
        {
          icons: <IconSettingsFilled size={20} color="white" stroke={2} />,
          title: "Settings",
          url: "/dashboard/intern/settings",
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
