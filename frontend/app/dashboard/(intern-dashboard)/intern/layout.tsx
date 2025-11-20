import InternSideBar from "@/components/ThriveSideBar/InternSideBar";

export default function InternDashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-thrive-dashboard-background">
      <InternSideBar>
        <div className="mt-8 sm:mt-0">{children}</div>
      </InternSideBar>
    </div>
  );
}
