import z from "zod";

export const userSignInSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const userSignUpSchema = z
  .object({
    fullName: z.string().min(2, "full name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(7, "Enter a valid phone number"),
    birthday: z.date({ error: "Birthday is required" }).refine(
      // Checking if the user is of valid age, 18 and above
      (birthday) => {
        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();
        const dayDiff = today.getDate() - birthday.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          return age - 1 >= 18;
        }
        return age >= 18;
      },
      {
        message: "You must be at least 18 years old",
      }
    ),
    gender: z.enum(["Male", "Female"]),
    resume: z.string().min(1, "Resume is required"),
    introVideo: z.string().min(1, "Introduction video is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const recruiterSignUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    companyName: z.string().min(2, "Company name is required"),
    registrationNumber: z
      .string()
      .min(2, "Business Registration Number is required"),
    description: z.string().optional(), // didn't use description in the sign up form
    sector: z.string().min(2, "Business sector is required"),
    industry: z.string().min(2, "Business industry is required"),
    roleInOrganization: z.string().min(2, "Role is required"),
    address: z.string().min(2, "Address is required"),
    numberOfEmployees: z.number().min(1, "Number of employees is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileFormSchema = z.object({
  companyPhoto: z.string().optional(),
  fullName: z
    .string()
    .min(3, { message: "Full name is required" })
    .max(255, { message: "Full name is required" }),
  companyName: z
    .string()
    .min(3, { message: "Company name is required" })
    .max(255, { message: "Company name is required" }),
  email: z.string().email({ message: "A valid email is required" }),
  phoneNumber: z.string().min(1, { message: "A valid email is required" }),
  description: z
    .string()
    .min(3, { message: "Description is too short" })
    .max(255, { message: "Description is too long" }),
});

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
