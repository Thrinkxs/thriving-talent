import { AuthGuard } from "@/(security)/auth-guard";
import { DashboardLayout } from "@/layout/components/dashboard-layout";

export default function UserDashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="user">
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
