"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import FileDropzone from "@/components/FileDropzone";
import SubmitButton from "@/components/SubmitButton";
import ResultPanel from "@/components/ResultPanel";
import { getTool } from "@/lib/tools";
import { RequestStatus, UploadedFile } from "@/lib/types";
import { mergePdf, resolveDownloadUrl } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

const tool = getTool("merge-pdf")!;

export default function MergePdfPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const canSubmit = files.length >= 2 && status !== "uploading" && status !== "processing";

  const handleSubmit = async () => {
    setStatus("uploading");
    setError(null);
    setDownloadUrl(null);
    setProgress(0);
    try {
      const res = await mergePdf(
        files.map((f) => f.file),
        (p) => {
          setProgress(p);
          if (p >= 100) setStatus("processing");
        }
      );
      setDownloadUrl(resolveDownloadUrl(res.download_url));
      setStatus("success");
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't merge those files. Try again."));
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
          accept={[".pdf"]}
          multiple
          allowReorder
          accent="amber"
          label="Drop two or more PDFs here, or click to browse"
          hint=".pdf · up to 25 MB each · order shown below"
        />

        <p className="mt-3 font-mono text-xs text-paper-700">
          {files.length < 2
            ? "Add at least two PDFs to merge."
            : `${files.length} files will be combined in the order shown, top to bottom.`}
        </p>

        <div className="mt-6">
          <SubmitButton onClick={handleSubmit} disabled={!canSubmit} loading={status === "uploading" || status === "processing"}>
            Merge {files.length > 0 ? `${files.length} files` : "PDFs"}
          </SubmitButton>
        </div>

        <ResultPanel
          status={status}
          progress={progress}
          error={error}
          downloadUrl={downloadUrl}
          fileName="merged.pdf"
        />
      </div>
    </div>
  );
}
