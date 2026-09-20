"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import FileDropzone from "@/components/FileDropzone";
import LanguageSelect from "@/components/LanguageSelect";
import SubmitButton from "@/components/SubmitButton";
import ResultPanel from "@/components/ResultPanel";
import { getTool } from "@/lib/tools";
import { Language, RequestStatus, UploadedFile } from "@/lib/types";
import { imageToWord, resolveDownloadUrl } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

const tool = getTool("image-to-word")!;

export default function ImageToWordPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [language, setLanguage] = useState<Language>("eng");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const canSubmit = files.length === 1 && status !== "uploading" && status !== "processing";

  const handleSubmit = async () => {
    setStatus("uploading");
    setError(null);
    setDownloadUrl(null);
    setProgress(0);
    try {
      const res = await imageToWord(files[0].file, language, (p) => {
        setProgress(p);
        if (p >= 100) setStatus("processing");
      });
      setDownloadUrl(resolveDownloadUrl(res.download_url));
      setStatus("success");
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't read that image. Try another one."));
      setStatus("error");
    }
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
            Extract to Word
          </SubmitButton>
        </div>

        <ResultPanel
          status={status}
          progress={progress}
          error={error}
          downloadUrl={downloadUrl}
          fileName="extracted.docx"
        />
      </div>
    </div>
  );
}
