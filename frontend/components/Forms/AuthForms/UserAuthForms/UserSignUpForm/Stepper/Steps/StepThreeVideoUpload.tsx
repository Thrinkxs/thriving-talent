"use client";

import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/utils/AppWrite/AppWrite";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";

export default function StepThreeVideoUpload({ nextStep, prevStep }: any) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const video = watch("video");

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     if (acceptedFiles.length > 0) {
  //       const file = acceptedFiles[0];
  //       setValue("video", file, { shouldValidate: true }); // ✅ update RHF state
  //     }
  //   },
  //   [setValue]
  // );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > 30 * 1024 * 1024) {
          toast.error("File size should not exceed 30MB");
          return;
        }

        setFileName(file.name);
        await uploadFile(file, setValue, setIsUploading, "video", "video");
      }
    },
    [setValue]
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

  return (
    <div className="space-y-5 text-center">
      <h2 className="text-xl font-semibold">Upload Video</h2>

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors",
          isDragActive
            ? "border-thrive-blue bg-thrive-blue/5"
            : "border-gray-300",
          errors.video ? "border-red-500" : ""
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-thrive-blue">Drop your file here...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop your video here, or click to select (MP4, MOV, AVI)
          </p>
        )}
      </div>

      {video && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-700">
            <strong>{fileName}</strong>
          </p>
        </div>
      )}

      {isUploading && (
        <div className="flex justify-center">
          <TbLoader2 className="text-thrive-blue w-10 h-10 animate-spin text-center" />
        </div>
      )}

      {errors.video && (
        <p className="text-red-500 text-sm mt-2">
          {errors.video.message as string}
        </p>
      )}
    </div>
  );
}
