import EmployerSideBar from "@/components/ThriveSideBar/EmployerSideBar";

export default function EmployerDashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-thrive-dashboard-background">
      <EmployerSideBar>
        <div className="mt-8 sm:mt-0">{children}</div>
      </EmployerSideBar>
    </div>
  );
}
