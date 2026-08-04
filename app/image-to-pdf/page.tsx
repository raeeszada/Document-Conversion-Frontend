"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import FileDropzone from "@/components/FileDropzone";
import SubmitButton from "@/components/SubmitButton";
import ResultPanel from "@/components/ResultPanel";
import { getTool } from "@/lib/tools";
import { RequestStatus, UploadedFile } from "@/lib/types";
import { imageToPdf, resolveDownloadUrl } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

const tool = getTool("image-to-pdf")!;

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const canSubmit = files.length >= 1 && status !== "uploading" && status !== "processing";

  const handleSubmit = async () => {
    setStatus("uploading");
    setError(null);
    setDownloadUrl(null);
    setProgress(0);
    try {
      const res = await imageToPdf(
        files.map((f) => f.file),
        (p) => {
          setProgress(p);
          if (p >= 100) setStatus("processing");
        }
      );
      setDownloadUrl(resolveDownloadUrl(res.download_url));
      setStatus("success");
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't build a PDF from those images."));
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
          multiple
          allowReorder
          accent="teal"
          label="Drop images here, or click to browse"
          hint=".jpg, .png, .webp · order becomes page order"
        />

        <div className="mt-6">
          <SubmitButton
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={status === "uploading" || status === "processing"}
            accent="teal"
          >
            Create PDF
          </SubmitButton>
        </div>

        <ResultPanel
          status={status}
          progress={progress}
          error={error}
          downloadUrl={downloadUrl}
          fileName="images.pdf"
        />
      </div>
    </div>
  );
}
