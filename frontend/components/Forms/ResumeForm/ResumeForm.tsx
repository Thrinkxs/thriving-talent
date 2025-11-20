"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { internProfileFormResumeSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { IconFileText, IconUpload } from "@tabler/icons-react";
import { uploadFileToSupabase } from "@/utils/Supabase/Supabase";
import { useUpdateInternProfile } from "@/hooks/intern/intern";
import { useInternStore } from "@/lib/store/intern-store";
import { Loader2 } from "lucide-react";

const InternProfileResumeForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState<string>("");

  const { mutate: submitInternProfile, isPending } = useUpdateInternProfile();
  const internUser = useInternStore((s) => s.intern);
  const updateIntern = useInternStore((s) => s.updateIntern);

  const form = useForm<z.infer<typeof internProfileFormResumeSchema>>({
    resolver: zodResolver(internProfileFormResumeSchema),
    defaultValues: {
      resume: internUser?.resume || "",
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      if (file.size > 3 * 1024 * 1024) {
        toast.error("Resume must be under 3MB");
        return;
      }

      setUploadedName(file.name);

      await uploadFileToSupabase(
        file,
        form.setValue,
        setIsUploading,
        "resume",
        "resume"
      );
    },
    [form.setValue]
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

  const onSubmit = (values: z.infer<typeof internProfileFormResumeSchema>) => {
    submitInternProfile(values);
    updateIntern(values);
  };

  // hydrate when internUser loads
  useEffect(() => {
    if (internUser) {
      form.reset({
        resume: internUser.resume || "",
      });
    }
  }, [internUser, form]);

  const resumeURL = form.watch("resume") || internUser?.resume;
  const resumeName =
    uploadedName || resumeURL?.split("/").pop() || "Uploaded Resume";

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-xl"
        >
          <FormLabel className="text-base font-semibold">Your Resume</FormLabel>

          {/* RESUME PREVIEW BOX (OUTSIDE DROPZONE) */}
          {resumeURL && (
            <div className="flex items-center justify-between w-6/12 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <IconFileText size={40} className="text-gray-700" />
                <div>
                  <p className="font-medium text-sm text-gray-800">
                    {resumeName}
                  </p>
                  <p className="text-xs text-gray-500">PDF or DOCX</p>
                </div>
              </div>

              <a
                href={resumeURL}
                target="_blank"
                className="text-thrive-blue text-sm underline font-medium"
              >
                View Resume
              </a>
            </div>
          )}

          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors w-6/12",
              "flex flex-col items-center justify-center gap-3 text-center",
              isDragActive
                ? "border-thrive-blue bg-thrive-blue/10"
                : "border-gray-300"
            )}
          >
            <Input {...getInputProps()} />

            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-thrive-blue" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <IconUpload size={70} stroke={1.5} className="text-gray-700" />
                <p className="text-sm text-gray-700">
                  Click or drag to upload your resume
                </p>
                <p className="text-xs text-gray-500">PDF or DOCX — Max 5MB</p>
              </div>
            )}
          </div>

          <hr className="text-gray-300" />

          <Button className="px-20 bg-black hover:bg-black/85" type="submit">
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InternProfileResumeForm;
