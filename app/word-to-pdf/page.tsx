"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import FileDropzone from "@/components/FileDropzone";
import SubmitButton from "@/components/SubmitButton";
import ResultPanel from "@/components/ResultPanel";
import { getTool } from "@/lib/tools";
import { RequestStatus, UploadedFile } from "@/lib/types";
import { wordToPdf, resolveDownloadUrl } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

const tool = getTool("word-to-pdf")!;

export default function WordToPdfPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
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
      const res = await wordToPdf(files[0].file, (p) => {
        setProgress(p);
        if (p >= 100) setStatus("processing");
      });
      setDownloadUrl(resolveDownloadUrl(res.download_url));
      setStatus("success");
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't convert that file. Try again."));
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
          accept={[".doc", ".docx"]}
          multiple={false}
          accent="teal"
          label="Drop a Word document here, or click to browse"
        />

        <div className="mt-6">
          <SubmitButton
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={status === "uploading" || status === "processing"}
            accent="teal"
          >
            Convert to PDF
          </SubmitButton>
        </div>

        <ResultPanel
          status={status}
          progress={progress}
          error={error}
          downloadUrl={downloadUrl}
          fileName="converted.pdf"
        />
      </div>
    </div>
  );
}
