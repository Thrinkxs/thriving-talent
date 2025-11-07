"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileFormSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { Axios } from "@/utils/Axios/Axios";
import { useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/utils/AppWrite/AppWrite";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { IconPhotoFilled } from "@tabler/icons-react";

const ProfileForm = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      companyPhoto: "",
      fullName: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      description: "",
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
        await uploadFile(file, setValue, setIsUploading, "cv", "CV");
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

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    console.log(values);
  };

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
              errors.companyPhoto ? "border-red-500" : ""
            )}
          >
            <Input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-thrive-blue">Drop your file here...</p>
            ) : (
              <>
                <div className="">
                  <IconPhotoFilled
                    color="black"
                    size={100}
                    stroke={2}
                    className="w-10 h-10 md:w-32 md:h-32"
                  />

                  <h1 className="text-xs sm:text-sm">UPLOAD YOUR PHOTO</h1>
                </div>
              </>
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

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="company name"
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
                  <FormControl>
                    <Input
                      placeholder="email"
                      type="email"
                      {...field}
                      className="bg-thrive-input"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="e.g. description about your company"
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
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
