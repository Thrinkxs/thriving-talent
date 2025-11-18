"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userProfileFormIntroVideoSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { IconUpload, IconVideo } from "@tabler/icons-react";
import { uploadFileToSupabase } from "@/utils/Supabase/Supabase";
import { useUpdateInternProfile } from "@/hooks/intern/intern";
import { useInternStore } from "@/lib/store/intern-store";
import { Loader2 } from "lucide-react";

const UserProfileIntroVideoForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState("");

  const { mutate: submitInternProfile, isPending } = useUpdateInternProfile();
  const internUser = useInternStore((s) => s.intern);
  const updateIntern = useInternStore((s) => s.updateIntern);

  const form = useForm<z.infer<typeof userProfileFormIntroVideoSchema>>({
    resolver: zodResolver(userProfileFormIntroVideoSchema),
    defaultValues: {
      introVideo: internUser?.introVideo || "",
    },
  });

  // Dropzone handler
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      if (file.size > 30 * 1024 * 1024) {
        toast.error("Video must be under 30MB");
        return;
      }

      setUploadedName(file.name);

      await uploadFileToSupabase(
        file,
        form.setValue,
        setIsUploading,
        "introVideo",
        "introVideo"
      );
    },
    [form.setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
    },
    multiple: false,
  });

  const onSubmit = (
    values: z.infer<typeof userProfileFormIntroVideoSchema>
  ) => {
    submitInternProfile(values);
    updateIntern(values);
  };

  // Hydrate after Zustand loads
  useEffect(() => {
    if (internUser) {
      form.reset({
        introVideo: internUser?.introVideo || "",
      });
    }
  }, [internUser, form]);

  const videoURL = form.watch("introVideo") || internUser?.introVideo;
  const videoName =
    uploadedName || videoURL?.split("/").pop() || "Uploaded Video";

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 bg-white p-5 rounded-xl"
        >
          <FormLabel>Your Intro Video</FormLabel>

          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors w-6/12",
              "flex flex-col items-center justify-center gap-3 text-center bg-white",
              isDragActive
                ? "border-thrive-blue bg-thrive-blue/10"
                : "border-gray-300"
            )}
          >
            <Input {...getInputProps()} />

            {/* Upload Loader */}
            {isUploading ? (
              <Loader2 className="w-10 h-10 animate-spin text-thrive-blue" />
            ) : videoURL ? (
              // ---- Video Preview ----
              <div className="flex flex-col items-center gap-2">
                <video
                  src={videoURL}
                  className="w-32 h-32 rounded-lg object-cover"
                  muted
                  autoPlay
                  loop
                />

                <p className="text-sm font-medium text-gray-800">{videoName}</p>

                <p className="text-xs text-gray-500">
                  Click here to upload a new video
                </p>
              </div>
            ) : isDragActive ? (
              <p className="text-thrive-blue font-medium">Drop your video…</p>
            ) : (
              // ---- Empty State ----
              <div className="flex flex-col items-center gap-2">
                <IconUpload size={70} stroke={1.5} />
                <p className="text-sm text-gray-700">Upload Your Intro Video</p>
                <p className="text-xs text-gray-500">
                  MP4, MOV, AVI — Max 30MB
                </p>
              </div>
            )}
          </div>

          {/* View Video outside dropzone */}
          {videoURL && !isUploading && (
            <div className="flex items-center gap-3 mt-2">
              <IconVideo size={22} className="text-gray-600" />
              <a
                href={videoURL}
                target="_blank"
                className="text-thrive-blue underline text-sm"
              >
                View Video
              </a>
            </div>
          )}

          <hr className="text-gray-300" />

          {/* Submit */}
          <div className="flex justify-start">
            <Button className="px-20 bg-black hover:bg-black/85" type="submit">
              {isPending ? (
                <Loader2 className="w-6 h-6 animate-spin text-white" />
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

export default UserProfileIntroVideoForm;
