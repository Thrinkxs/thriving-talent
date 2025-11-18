import ResetPasswordForm from "@/components/Forms/ResetPasswordForm/ResetPasswordForm";
import { UserRole } from "@/lib/types/user-types/user-types";

const RecruiterPasswordTab = () => {
  return (
    <section>
      <ResetPasswordForm userType={UserRole.RECRUITER} />
    </section>
  );
};

export default RecruiterPasswordTab;
