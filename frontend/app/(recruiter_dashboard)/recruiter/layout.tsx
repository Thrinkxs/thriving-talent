import RecruiterSideBar from "@/components/ThriveSideBar/RecruiterSideBar";

export default function RecruiterDashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RecruiterSideBar>
        <div className="mt-8 sm:mt-0">{children}</div>
      </RecruiterSideBar>
    </>
  );
}
