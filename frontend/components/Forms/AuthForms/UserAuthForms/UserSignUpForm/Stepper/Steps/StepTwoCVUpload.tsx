"use client";

import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { uploadFileToSupabase } from "@/utils/Supabase/Supabase";
import { Loader2 } from "lucide-react";

export default function StepTwoCVUpload() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const resume = watch("resume");

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
          setValue, // form setter
          setIsUploading, // upload state
          "resume", // field name
          "resume" // success message
        );
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  return (
    <div className="space-y-5 text-center">
      <h2 className="text-xl font-semibold">Upload resume</h2>

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors",
          isDragActive
            ? "border-thrive-blue bg-thrive-blue/5"
            : "border-gray-300",
          errors.resume ? "border-red-500" : ""
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-thrive-blue">Drop your file here...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop your resume here, or click to select (PDF or DOCX)
          </p>
        )}
      </div>

      {resume && (
        <p className="mt-2 text-sm text-gray-700">
          <strong>{fileName}</strong>
        </p>
      )}

      {isUploading && (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-thrive-blue" />
        </div>
      )}

      {errors.resume && (
        <p className="text-red-500 text-sm mt-2">
          {errors.resume.message as string}
        </p>
      )}
    </div>
  );
}
