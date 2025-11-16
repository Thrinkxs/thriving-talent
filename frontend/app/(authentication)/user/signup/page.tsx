import UserSignUpForm from "@/components/Forms/AuthForms/UserAuthForms/UserSignUpForm/UserSignUpForm";
import React from "react";
import Image from "next/image";
import signUpImage from "@/public/signup-side-image.jpg";

const UserSignUpPage = () => {
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
          <UserSignUpForm />
        </div>
      </div>
    </section>
  );
};

export default UserSignUpPage;
