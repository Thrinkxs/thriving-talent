import React from "react";
import Image from "next/image";
import signUpImage from "@/public/signup-side-image.jpg";
import EmployerSignUpForm from "@/components/Forms/AuthForms/EmployerAuthForms/EmployerSignUpForm/EmployerSignUpForm";

const EmployerSignUpPage = () => {
  return (
    <section>
      <div className="grid grid-cols-12">
        <div className="hidden md:block col-span-6 h-screen">
          <Image
            src={signUpImage}
            alt="Sign Up Side Image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-12 mt-10 md:mt-0 md:col-span-6">
          <EmployerSignUpForm />
        </div>
      </div>
    </section>
  );
};

export default EmployerSignUpPage;
