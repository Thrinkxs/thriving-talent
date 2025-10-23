import { AuthGuard } from "@/(security)/auth-guard";
import { DashboardLayout } from "@/layout/components/dashboard-layout";
import { userRoleEnum } from "@/layout/utils/enum";

export default function UserDashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole={userRoleEnum.USER}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
