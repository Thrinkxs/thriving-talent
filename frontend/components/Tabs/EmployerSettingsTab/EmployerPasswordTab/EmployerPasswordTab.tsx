import ResetPasswordForm from "@/components/Forms/ResetPasswordForm/ResetPasswordForm";
import { UserRole } from "@/lib/types/user-types/user-types";

const EmployerPasswordTab = () => {
  return (
    <section>
      <ResetPasswordForm userType={UserRole.EMPLOYER} />
    </section>
  );
};

export default EmployerPasswordTab;
