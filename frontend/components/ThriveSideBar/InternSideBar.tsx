"use client";

import { AppSidebar } from "@/components/ThriveSideBar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { UserNavList } from "@/components/Navigation/UserNavList";
import { IconBellFilled, IconBriefcaseFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useInternStore } from "@/lib/store/intern-store";
import { UserRole } from "@/lib/types/user-types/user-types";
import ThriveTalentDefaultImage from "@/public/default-image/TT_default_Image_2.jpg";

type Props = {
  children: React.ReactNode;
};

const InternSideBar = ({ children }: Props) => {
  const internUser = useInternStore((state) => state.intern);

  const [isLoading, setIsLoading] = useState(false);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar logoutUser={UserRole.INTERN} navList={UserNavList} />
      <SidebarInset className="min-h-screen bg-thrive-dashboard-background">
        <header className="grid grid-cols-12 px-4 sm:px-6">
          <div className="col-span-1 flex h-16 shrink-0 items-center gap-2 ">
            <SidebarTrigger className="-ml-1" id="swift-header" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="col-start-4 col-end-5 md:col-start-7 md:col-end-8">
            <div className="flex justify-between gap-5">
              {/* Notification will be done in the next sprint */}
              {/* <div className="rounded-full bg-white p-3 mt-4">
                <IconBellFilled size={20} color="black" stroke={2} />
              </div> */}
            </div>
          </div>
          <div className="col-start-8 col-end-11 md:col-start-11 md:col-end-13 flex items-center">
            {isLoading ? (
              <div className="col-start-12 col-span-2 flex justify-center">
                <TbLoader2 className="animate-spin text-btn" />
              </div>
            ) : (
              <div className="col-start-9 col-span-4 flex justify-end items-center gap-3">
                <Image
                  src={internUser?.profileImage || ThriveTalentDefaultImage} // Use a placeholder image for avatar
                  width={50}
                  height={50}
                  alt="avatar"
                  className="rounded-full w-[50px] h-[50px] object-cover mt-2"
                />
                <div>
                  <p className="mt-4 text-sm block font-bold">
                    {internUser?.fullName}
                  </p>
                  <p className="mt-0 text-xs block font-medium">
                    {internUser?.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 pt-0 ">
          {/* Children Here */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default InternSideBar;
