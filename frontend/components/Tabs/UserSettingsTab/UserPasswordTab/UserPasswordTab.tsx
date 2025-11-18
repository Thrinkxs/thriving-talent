import ResetPasswordForm from "@/components/Forms/ResetPasswordForm/ResetPasswordForm";
import { UserRole } from "@/lib/types/user-types/user-types";

const UserPasswordTab = () => {
  return (
    <section>
      <ResetPasswordForm userType={UserRole.INTERN} />
    </section>
  );
};

export default UserPasswordTab;
