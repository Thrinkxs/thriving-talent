"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import Logo from "@/components/Navigation/Logo";
import { useInternStore } from "@/lib/store/intern-store";
import { UserRole } from "@/lib/types/user-types/user-types";

// ✅ Define nav item types
export interface NavItem {
  icons: React.ReactNode;
  title: string;
  url: string;
  isActive?: boolean;
  isLogout?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface NavList {
  navMain: NavSection[];
}
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navList: NavList; // ✅ this makes it reusable
  logoutUser: UserRole;
}

export function AppSidebar({ navList, logoutUser, ...props }: AppSidebarProps) {
  const router = useRouter();
  const logoutIntern = useInternStore((state) => state.logout);
  const logoutRecruiter = useInternStore((state) => state.logout);

  // const accessToken = Cookies.get("accessToken") || "";
  // const refreshToken = Cookies.get("refreshToken") || "";

  const logout = async () => {
    // if (logoutUser === UserRole.RECRUITER) {
    //   await logoutRecruiter(refreshToken, () =>
    //     router.push("/recruiter/signin")
    //   );
    // } else {
    //   await logoutIntern(refreshToken, () => router.push("/user/signin"));
    // }
    if (logoutUser === UserRole.RECRUITER) {
      await logoutRecruiter(() => router.push("/recruiter/signin"));
    } else {
      await logoutIntern(() => router.push("/user/signin"));
    }
  };

  return (
    <Sidebar variant="floating" {...props} className="">
      <SidebarHeader className="">
        <SidebarMenu className="">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo imageLogoWidth={100} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navList.navMain.map((section) => (
              <SidebarMenu key={section.title} className="gap-2">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.isLogout ? (
                      <div className="mt-16">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <div className="flex items-center gap-2 p-2 text-white cursor-pointer hover:bg-thrive-blue rounded-md">
                              {item.icons}
                              <span className="whitespace-nowrap text-sm">
                                Logout
                              </span>
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="w-[300px] min-[500px]:w-[400px] min-[600px]:w-full">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to logout?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={logout}
                                className="bg-thrive-red"
                              >
                                Logout
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-thrive-blue text-white hover:text-white"
                      >
                        <a href={item.url} className="flex items-center gap-2">
                          {item.icons}{" "}
                          <span className="whitespace-nowrap">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
