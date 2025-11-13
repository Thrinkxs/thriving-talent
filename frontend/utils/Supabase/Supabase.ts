import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

/**
 * Upload any file (image, pdf, video, etc.) to Supabase storage.
 * @param file File object to upload (e.g., from input or drag-drop)
 * @param setFieldValue React Hook Form or Formik setter for field value
 * @param setIsUploading Setter to track upload state (boolean)
 * @param updateField The name of the field to update in your form
 * @param message Optional success message (e.g., "CV", "Profile Picture")
 */
export const uploadFileToSupabase = async (
  file: File,
  setFieldValue: any,
  setIsUploading: (val: boolean) => void,
  updateField: string,
  message?: string
) => {
  if (!file) {
    toast.error("Please select a file before uploading.");
    return;
  }

  setIsUploading(true);

  try {
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || "";
    const filePath = `${Date.now()}_${file.name}`;

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get the public URL
    const publicUrl = getPublicFileUrl(filePath);
    setFieldValue(updateField, publicUrl);

    toast.success(`Successfully uploaded ${message || "file"}`);
  } catch (error) {
    console.error("Supabase upload error:", error);
    toast.error("Failed to upload file. Please try again.");
  } finally {
    setIsUploading(false);
  }
};

/**
 * Get the public URL of an uploaded file.
 */
export const getPublicFileUrl = (filePath: string) => {
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || "";
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
};
