import z from "zod";

export const userSignInSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const userSignUpSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(7, "Enter a valid phone number"),
    // age: z.number().min(1, "Age is required"),
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
    sex: z.enum(["male", "female"]),
    // cv: z.instanceof(File, { message: "Please upload your CV" }),
    // video: z.instanceof(File, { message: "Please upload your video" }),
    cv: z.any().refine((file) => file instanceof File, {
      message: "CV is required",
    }),
    video: z.any().refine((file) => file instanceof File, {
      message: "Video is required",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
