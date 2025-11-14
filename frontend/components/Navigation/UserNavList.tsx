/*
 * The navigation list for the User dashboard layout.
 * Each item includes an icon, title, URL, and optional flags for active state and logout handling.
 */

import {
  IconLayoutDashboardFilled,
  IconBriefcaseFilled,
  IconSettingsFilled,
  IconLogout,
  IconHistory,
} from "@tabler/icons-react";

export const UserNavList = {
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
          url: "/dashboard/user/home",
        },
        {
          icons: <IconBriefcaseFilled size={20} color="white" stroke={2} />,
          title: "Jobs",
          url: "/dashboard/user/jobs",
        },
        {
          icons: <IconHistory size={20} color="white" stroke={2} />,
          title: "History",
          url: "/dashboard/user/history",
        },
        {
          icons: <IconSettingsFilled size={20} color="white" stroke={2} />,
          title: "Settings",
          url: "/dashboard/user/settings",
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
