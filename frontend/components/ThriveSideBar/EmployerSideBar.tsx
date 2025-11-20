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
import { EmployerNavList } from "@/components/Navigation/EmployerNavList";
import { UserRole } from "@/lib/types/user-types/user-types";
import { useEmployerStore } from "@/lib/store/employer-store";
import CreateJobDialogButton from "@/components/Button/CreateJobDialogButton";
import ThriveTalentDefaultImage from "@/public/default-image/TT_default_Image_2.jpg";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const EmployerSideBar = ({ children }: Props) => {
  const employerUser = useEmployerStore((state) => state.employer);
  const [isLoading] = useState(false);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar logoutUser={UserRole.EMPLOYER} navList={EmployerNavList} />
      <SidebarInset className="min-h-screen bg-thrive-dashboard-background">
        <header className="grid grid-cols-12 px-4 sm:px-6">
          <div className="col-span-1 flex h-16 shrink-0 items-center gap-2 ">
            <SidebarTrigger className="-ml-1" id="swift-header" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="col-start-4 col-end-5 md:col-start-7 md:col-end-8">
            <div className="flex justify-between gap-5">
              <div className="mt-5 hidden md:block">
                {/* <Button className="bg-black hover:bg-black/80">
                  <IconBriefcaseFilled size={20} color="white" stroke={2} />
                  Post a Job
                </Button> */}
                <CreateJobDialogButton />
              </div>
              {/* Notification will be done in the next sprint */}
              {/* <div className="rounded-full bg-white p-3 mt-4">
                <IconBellFilled size={20} color="black" stroke={2} />
              </div> */}
            </div>
          </div>
          <div className="col-start-8 col-end-11 md:col-start-11 md:col-end-13 flex items-center">
            {isLoading ? (
              <div className="col-start-12 col-span-2 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-btn" />
              </div>
            ) : (
              <div className="col-start-9 col-span-4 flex justify-end items-center gap-3">
                <Image
                  src={employerUser?.companyPhoto || ThriveTalentDefaultImage}
                  width={50}
                  height={50}
                  alt="avatar"
                  className="rounded-full w-[50px] h-[50px] object-cover mt-2"
                />
                <div>
                  <p className="mt-4 text-sm block font-bold">
                    {employerUser?.fullName || ""}
                  </p>
                  <p className="mt-0 text-xs block font-medium">
                    {employerUser?.email || ""}
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

export default EmployerSideBar;
