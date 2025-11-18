"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userProfileFormSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { IconPhotoFilled } from "@tabler/icons-react";
import { uploadFileToSupabase } from "@/utils/Supabase/Supabase";
import { useUpdateInternProfile } from "@/hooks/intern/intern";
import { TbLoader2 } from "react-icons/tb";
import { useInternStore } from "@/lib/store/intern-store";

const UserProfileForm = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");

  const { mutate: submitInternProfile, isPending } = useUpdateInternProfile();

  const internUser = useInternStore((state) => state.intern);
  const updateIntern = useInternStore((state) => state.updateIntern);

  const form = useForm<z.infer<typeof userProfileFormSchema>>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      bio: internUser?.bio || "",
      profileImage: internUser?.profileImage || "",
      fullName: internUser?.fullName || "",
      phoneNumber: internUser?.phone || "",
      email: internUser?.email || "",
    },
  });

  const {
    setValue,
    formState: { errors },
  } = form;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > 3 * 1024 * 1024) {
          toast.error("File size should not exceed 3MB");
          return;
        }

        setFileName(file.name);
        await uploadFileToSupabase(
          file,
          setValue,
          setIsUploading,
          "profileImage",
          "profileImage"
        );
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    },
    multiple: false,
  });

  const onSubmit = async (values: z.infer<typeof userProfileFormSchema>) => {
    submitInternProfile(values);
    updateIntern(values);
  };

  // Reset form when internUser becomes available (hydrated)
  useEffect(() => {
    if (internUser) {
      form.reset({
        bio: internUser.bio || "",
        profileImage: internUser.profileImage || "",
        fullName: internUser.fullName || "",
        phoneNumber: internUser.phone || "",
        email: internUser.email || "",
      });
    }
  }, [internUser]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-4 rounded-xl"
        >
          <FormLabel>Your profile picture</FormLabel>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors w-4/12",
              "flex items-center justify-center",
              isDragActive
                ? "border-thrive-blue bg-thrive-blue/5"
                : "border-gray-300",
              errors.profileImage ? "border-red-500" : ""
            )}
          >
            <Input {...getInputProps()} />

            {/* Image Preview OR Default Upload UI */}
            {!isUploading &&
            (form.watch("profileImage") || internUser?.profileImage) ? (
              <img
                src={form.watch("profileImage") || internUser?.profileImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : isDragActive ? (
              <p className="text-thrive-blue">Drop your file here...</p>
            ) : !isUploading ? (
              <>
                <div className="flex flex-col items-center">
                  <IconPhotoFilled
                    color="black"
                    size={100}
                    stroke={2}
                    className="w-10 h-10 md:w-32 md:h-32"
                  />
                  <h1 className="text-xs sm:text-sm">UPLOAD YOUR PHOTO</h1>
                </div>
              </>
            ) : null}

            {/* Uploading Loader */}
            {isUploading && (
              <div className="flex justify-center">
                <TbLoader2 className="text-thrive-blue w-10 h-10 animate-spin text-center" />
              </div>
            )}
          </div>

          <hr className="text-gray-400" />
          <div className="grid sm:grid-cols-2 gap-5 sm:w-10/12">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="full name"
                      {...field}
                      className="bg-thrive-input"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:w-10/12">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription></FormDescription>
                  <FormControl>
                    <Input
                      placeholder="email"
                      type="email"
                      {...field}
                      className="bg-thrive-input"
                      disabled={true}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      {...field}
                      className="bg-thrive-input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="sm:w-10/12">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="e.g. bio about your yourself"
                      {...field}
                      className="bg-thrive-input h-40"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-start">
            <Button className="px-20 bg-black hover:bg-black/85" type="submit">
              {isPending ? (
                <TbLoader2 className="text-thrive-blue" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
