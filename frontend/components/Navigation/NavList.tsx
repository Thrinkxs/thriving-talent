/**
 * this module contains the path to other pages in the application
 */

import { Handshake } from "lucide-react";
import { Home } from "lucide-react";
import { Briefcase } from "lucide-react";



export const NavList = [
  {
    icons: <Home size={20} color="white"  />,
    title: "Home",
    path: "/dashboard",
  },
  {
    icons: <Briefcase size={20} color="white"  />,
    title: "Jobs",
    path: "/jobs",
  },
 
  {
    icons: <Handshake size={20} color="white" />,
    title: "Interns",
    path: "/interns",
  },
 
];
