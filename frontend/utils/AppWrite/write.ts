import { Client, Storage, ID } from "appwrite";
import { toast } from "sonner";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

const storage = new Storage(client);

export const uploadFile = async (
  file: File,
  setFieldValue: any,
  setIsUploading: (val: boolean) => void,
  updateField: string,
  message?: string
) => {
  if (!file) {
    console.error("No file selected");
    return;
  }

  setIsUploading(true);

  try {
    // Upload file to Appwrite
    const response = await storage.createFile({
      bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
      fileId: ID.unique(),
      file,
    });

    // Get a viewable or downloadable URL depending on file type
    const fileUrl = getFilePreviewUrl(response.$id, file.type);
    setFieldValue(updateField, fileUrl);

    toast.success(`Successfully uploaded ${message || "file"}`);
  } catch (error) {
    console.error(error);
    toast.error("Failed to upload file");
  } finally {
    setIsUploading(false);
  }
};

// 🖼️ Generate the appropriate preview/download URL
export const getFilePreviewUrl = (fileId: string, mimeType?: string) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";

  if (mimeType?.startsWith("image/")) {
    // Image can be viewed directly
    return storage.getFileView({ bucketId, fileId });
  } else if (mimeType?.startsWith("video/")) {
    // Videos should use getFileView for streaming
    return storage.getFileView({ bucketId, fileId });
  } else if (mimeType === "application/pdf") {
    // PDFs can also be viewed directly
    return storage.getFileView({ bucketId, fileId });
  } else {
    // Default to downloadable link for other file types
    return storage.getFileDownload({ bucketId, fileId });
  }
};

// 📥 For programmatically downloading a file
export const getDownloadedFile = (fileId: string) => {
  return storage.getFileDownload({
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
    fileId,
  });
};

// 🔍 For retrieving file details
export const getFileDetails = (fileId: string) => {
  return storage.getFile({
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
    fileId,
  });
};
