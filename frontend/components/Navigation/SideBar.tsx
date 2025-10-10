/**
 * This module displays the the navbar by the left side of the screen
 *  which is used for navigation of the application
 */

"use client";
import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { NavList } from "./NavList";
import Link from "next/link";
import { useAuth } from "@/context/LoginContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Axios } from "@/utils/Axios";
import { LogoutAlertDialog } from "./AlertDialog/LogoutAlertDialog";
import User from "@/hooks/user/User";
import Cookies from "js-cookie";
import { IconMenu, IconMenu2, IconMenuDeep } from "@tabler/icons-react";
type Props = {
  children: React.ReactNode;
};

const SideBar = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  User();
  const { businessId } = useAuth();

  const handleOpen = () => {
    setOpen(!open);
  };

  const logout = async () => {
    // Clear user data from state
    localStorage.clear();
    Cookies.remove("access-token");
    Cookies.remove("refresh-token");
    // Make a request to the /logout endpoint
    const response = await Axios.post(`/api/business/logout/${businessId}`);

    if (response.status === 200) {
      toast.success("You have successfully logged out");
      router.push("/signin");
    } else {
      console.error("Failed to log out");
    }
  };

  return (
    <section className=" gap-6 z-20 md:z-0">
      <div
        className={`bg-gradient-radial-to-l from-side-nav min-h-screen to-black to border-primary rounded-tr-lg   ${
          open ? "w-72" : "w-16"
        } text-primary px-3 duration-500 fixed top-0 left-0 z-50`}
      >
        <div className="py-3 pr-1 flex justify-end text-white">
          <IconMenu2
            width={30}
            size={26}
            stroke={1}
            className="cursor-pointer"
            onClick={handleOpen}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {NavList.map((item, index) => {
            return (
              <Link
                href={item.path}
                key={index}
                className=" flex items-center text-sm gap-3.5 font-medium p-2  hover:bg-button rounded-md"
              >
                <p className="flex-shrink-0 w-5 h-5">{item.icons}</p>
                <span
                  style={{
                    transitionDelay: `${index * 300}ms`,
                    color: "white",
                  }}
                  className={`whitespace-pre duration-500  ${
                    !open && "opacity-0 translate-x-[200px] overflow-hidden "
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col gap-4 relative">
          <LogoutAlertDialog logout={logout} open={open} />
        </div>
      </div>

      <div className="m-3 text-xl text-gray-900 font-semibold pl-16 sm:pl-20 sm:pr-8">
        {children}
      </div>
    </section>
  );
};

export default SideBar;
