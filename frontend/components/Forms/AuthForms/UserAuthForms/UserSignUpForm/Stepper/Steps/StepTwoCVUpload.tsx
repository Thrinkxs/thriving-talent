"use client";

import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/utils/AppWrite/AppWrite";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";

export default function StepTwoCVUpload({ nextStep, prevStep }: any) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const cv = watch("cv");

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
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  return (
    <div className="space-y-5 text-center">
      <h2 className="text-xl font-semibold">Upload CV</h2>

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors",
          isDragActive
            ? "border-thrive-blue bg-thrive-blue/5"
            : "border-gray-300",
          errors.cv ? "border-red-500" : ""
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-thrive-blue">Drop your file here...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop your CV here, or click to select (PDF or DOCX)
          </p>
        )}
      </div>

      {cv && (
        <p className="mt-2 text-sm text-gray-700">
          <strong>{fileName}</strong>
        </p>
      )}

      {isUploading && (
        <div className="flex justify-center">
          <TbLoader2 className="text-thrive-blue w-10 h-10 animate-spin text-center" />
        </div>
      )}

      {errors.cv && (
        <p className="text-red-500 text-sm mt-2">
          {errors.cv.message as string}
        </p>
      )}
    </div>
  );
}
