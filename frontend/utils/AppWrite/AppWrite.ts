import { Client, Storage, ID } from "appwrite";
import { toast } from "sonner";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

const storage = new Storage(client);

/**
 * Upload any file (image, pdf, video, etc.) to Appwrite storage.
 * @param file File object to upload (e.g., from input or drag-drop)
 * @param setFieldValue React Hook Form or Formik setter for field value
 * @param setIsUploading Setter to track upload state (boolean)
 * @param updateField The name of the field to update in your form
 * @param message Optional success message (e.g., "CV", "Profile Picture")
 */
export const uploadFileToAppwrite = async (
  file: File,
  setFieldValue: any,
  setIsUploading: (val: boolean) => void,
  updateField: string,
  message?: string
) => {
  if (!file) {
    console.error("No file selected");
    toast.error("Please select a file before uploading.");
    return;
  }

  setIsUploading(true);

  try {
    const response = await storage.createFile({
      bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
      fileId: ID.unique(),
      file,
    });

    const fileUrl = getFileViewUrl(response.$id);
    setFieldValue(updateField, fileUrl);

    toast.success(`Successfully uploaded ${message || "file"}`);
  } catch (error) {
    console.error("Appwrite upload error:", error);
    toast.error("Failed to upload file. Please try again.");
  } finally {
    setIsUploading(false);
  }
};

/**
 * Get file view URL (preview or direct view link)
 */
export const getFileViewUrl = (fileId: string) => {
  return storage.getFileView({
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
    fileId,
  });
};

/**
 * Get file download URL
 */
export const getFileDownloadUrl = (fileId: string) => {
  return storage.getFileDownload({
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
    fileId,
  });
};
