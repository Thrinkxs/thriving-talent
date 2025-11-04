"use client";

import { useFormContext } from "react-hook-form";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

export default function StepTwoCVUpload({ nextStep, prevStep }: any) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const cv = watch("cv");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue("cv", file, { shouldValidate: true }); // ✅ update RHF state
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
          Selected: <strong>{cv.name}</strong>
        </p>
      )}

      {errors.cv && (
        <p className="text-red-500 text-sm mt-2">
          {errors.cv.message as string}
        </p>
      )}
    </div>
  );
}
