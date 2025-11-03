"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<
    "intern" | "employer" | null
  >(null);

  const handleNext = () => {
    if (!selectedRole) return;

    if (selectedRole === "intern") {
      router.push("/user/signup");
    } else {
      router.push("/recruiter/signup");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Select Your Role
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => setSelectedRole("intern")}
          className={`w-full py-3 rounded-lg border-2 font-semibold transition-all duration-200
            ${
              selectedRole === "intern"
                ? "bg-[#9ABEF0] border-[#D1E9FF] text-white"
                : "border-[#D1E9FF] text-thrive-blue bg-transparent hover:bg-blue-50"
            }`}
        >
          I’m an Intern
        </button>

        <button
          onClick={() => setSelectedRole("employer")}
          className={`w-full py-3 rounded-lg border-2 font-semibold transition-all duration-200
            ${
              selectedRole === "employer"
                ? "bg-[#9ABEF0] border-[#D1E9FF] text-white"
                : "border-[#D1E9FF] text-thrive-blue bg-transparent hover:bg-blue-50"
            }`}
        >
          I’m an Employer
        </button>
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={handleNext}
        disabled={!selectedRole}
        className={`mt-8 w-full max-w-sm py-3 rounded-lg font-semibold transition-colors duration-200
          ${
            selectedRole
              ? "bg-thrive-blue text-white hover:bg-thrive-blue/90"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
      >
        Next
      </button>
    </div>
  );
}
