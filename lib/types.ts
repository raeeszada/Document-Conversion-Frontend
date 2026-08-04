export type ToolCategory = "organize" | "convert" | "extract";

export interface ToolMeta {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  accent: "amber" | "teal";
  icon: string; // lucide-react icon name
}

export interface ConversionResponse {
  download_url: string;
}

export interface OcrResponse {
  text: string;
}

export type Language = "eng" | "urd" | "ara";

export interface UploadedFile {
  id: string;
  file: File;
}

export type RequestStatus = "idle" | "uploading" | "processing" | "success" | "error";
