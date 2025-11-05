"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Axios } from "@/utils/Axios/Axios";
import Cookies from "js-cookie";
import Logo from "@/components/Navigation/Logo";

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
}

export function AppSidebar({ navList, ...props }: AppSidebarProps) {
  const router = useRouter();

  const businessId = "123abc"; // I will make it dynamic later on

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
