import UserSideBar from "@/components/ThriveSideBar/UserSideBar";

export default function UserDashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-thrive-dashboard-background">
      <UserSideBar>
        <div className="mt-8 sm:mt-0">{children}</div>
      </UserSideBar>
    </div>
  );
}
