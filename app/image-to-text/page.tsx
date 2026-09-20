"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import FileDropzone from "@/components/FileDropzone";
import LanguageSelect from "@/components/LanguageSelect";
import SubmitButton from "@/components/SubmitButton";
import ProgressBar from "@/components/ProgressBar";
import Spinner from "@/components/Spinner";
import ToastMessage from "@/components/ToastMessage";
import { getTool } from "@/lib/tools";
import { Language, RequestStatus, UploadedFile } from "@/lib/types";
import { imageToText } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

const tool = getTool("image-to-text")!;

export default function ImageToTextPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [language, setLanguage] = useState<Language>("eng");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = files.length === 1 && status !== "uploading" && status !== "processing";

  const handleSubmit = async () => {
    setStatus("uploading");
    setError(null);
    setText(null);
    setProgress(0);
    try {
      const res = await imageToText(files[0].file, language, (p) => {
        setProgress(p);
        if (p >= 100) setStatus("processing");
      });
      setText(res.text);
      setStatus("success");
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't read that image. Try another one."));
      setStatus("error");
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadTxt = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader tool={tool} />
      <div className="mx-auto max-w-3xl px-6 pb-24">
        <FileDropzone
          files={files}
          onChange={setFiles}
          accept={[".jpg", ".jpeg", ".png", ".webp"]}
          multiple={false}
          accent="teal"
          label="Drop an image here, or click to browse"
        />

        <div className="mt-6">
          <LanguageSelect value={language} onChange={setLanguage} />
        </div>

        <div className="mt-6">
          <SubmitButton onClick={handleSubmit} disabled={!canSubmit} loading={status === "uploading" || status === "processing"}>
            Extract text
          </SubmitButton>
        </div>

        <div className="mt-6 space-y-4">
          {status === "uploading" && <ProgressBar percent={progress} label="Uploading" />}
          {status === "processing" && (
            <div className="flex items-center gap-2.5 text-sm text-paper-500">
              <Spinner size={16} />
              Reading the image&hellip;
            </div>
          )}
          {status === "error" && error && <ToastMessage type="error" message={error} />}

          {status === "success" && text !== null && (
            <div className="animate-fadeUp space-y-3">
              <div className="rounded-2xl border border-ink-600/70 bg-ink-800/60 p-4">
                <textarea
                  readOnly
                  value={text}
                  rows={10}
                  className="w-full resize-y bg-transparent font-mono text-sm text-paper-100 outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-5 py-2.5 text-sm font-medium text-paper-100 transition-colors hover:border-ink-500 hover:bg-ink-700"
                >
                  {copied ? <Check size={15} className="text-teal-400" /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy text"}
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:bg-amber-400 active:scale-95"
                >
                  <Download size={15} />
                  Download .txt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
