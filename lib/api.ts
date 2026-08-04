import axios, { AxiosProgressEvent } from "axios";
import { ConversionResponse, Language, OcrResponse } from "./types";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
});

type Progress = (percent: number) => void;

function onProgress(cb?: Progress) {
  return (e: AxiosProgressEvent) => {
    if (!cb || !e.total) return;
    cb(Math.round((e.loaded / e.total) * 100));
  };
}

export async function mergePdf(
  files: File[],
  cb?: Progress
): Promise<ConversionResponse> {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));
  const res = await client.post<ConversionResponse>("/merge-pdf", form, {
    onUploadProgress: onProgress(cb),
  });
  return res.data;
}

export interface SplitOptions {
  mode: "range" | "every-page";
  startPage?: number;
  endPage?: number;
}

export async function splitPdf(
  file: File,
  options: SplitOptions,
  cb?: Progress
): Promise<ConversionResponse> {
  const form = new FormData();
  form.append("file", file);
  form.append("mode", options.mode);
  if (options.mode === "range") {
    if (options.startPage != null) form.append("start_page", String(options.startPage));
    if (options.endPage != null) form.append("end_page", String(options.endPage));
  }
  const res = await client.post<ConversionResponse>("/split-pdf", form, {
    onUploadProgress: onProgress(cb),
  });
  return res.data;
}

export async function pdfToWord(
  file: File,
  cb?: Progress
): Promise<ConversionResponse> {
  const form = new FormData();
  form.append("file", file);
  const res = await client.post<ConversionResponse>("/pdf-to-word", form, {
    onUploadProgress: onProgress(cb),
  });
  return res.data;
}

export async function wordToPdf(
  file: File,
  cb?: Progress
): Promise<ConversionResponse> {
  const form = new FormData();
  form.append("file", file);
  const res = await client.post<ConversionResponse>("/word-to-pdf", form, {
    onUploadProgress: onProgress(cb),
  });
  return res.data;
}

export async function imageToPdf(
  files: File[],
  cb?: Progress
): Promise<ConversionResponse> {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));
  const res = await client.post<ConversionResponse>("/image-to-pdf", form, {
    onUploadProgress: onProgress(cb),
  });
  return res.data;
}

export async function imageToWord(
  file: File,
  language: Language,
  cb?: Progress
): Promise<ConversionResponse> {
  const form = new FormData();
  form.append("file", file);
  form.append("language", language);
  const res = await client.post<ConversionResponse>("/image-to-word", form, {
    onUploadProgress: onProgress(cb),
  });
  return res.data;
}

export async function imageToText(
  file: File,
  language: Language,
  cb?: Progress
): Promise<OcrResponse> {
  const form = new FormData();
  form.append("file", file);
  form.append("language", language);
  const res = await client.post<OcrResponse>("/image-to-text", form, {
    onUploadProgress: onProgress(cb),
  });
  return res.data;
}

export function resolveDownloadUrl(url: string): string {
  if (url.startsWith("http")) return url;

  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const origin = new URL(base).origin; // strips any /api (or other) path segment from the base

  if (url.startsWith("/")) return `${origin}${url}`;
  return `${origin}/${url}`;
}