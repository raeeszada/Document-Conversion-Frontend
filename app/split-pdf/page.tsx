"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import FileDropzone from "@/components/FileDropzone";
import SubmitButton from "@/components/SubmitButton";
import ResultPanel from "@/components/ResultPanel";
import { getTool } from "@/lib/tools";
import { RequestStatus, UploadedFile } from "@/lib/types";
import { splitPdf, resolveDownloadUrl } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

const tool = getTool("split-pdf")!;

export default function SplitPdfPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<"range" | "every-page">("range");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    setPageCount(null);
    const file = files[0]?.file;
    if (!file) return;

    let cancelled = false;
    (async () => {
      try {
        const { PDFDocument } = await import("pdf-lib");
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { updateMetadata: false });
        if (!cancelled) setPageCount(doc.getPageCount());
      } catch {
        if (!cancelled) setPageCount(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [files]);

  const start = Number(startPage);
  const end = Number(endPage);
  const rangeIsValid =
    startPage.trim() !== "" &&
    endPage.trim() !== "" &&
    Number.isInteger(start) &&
    Number.isInteger(end) &&
    start >= 1 &&
    end >= start &&
    (pageCount == null || end <= pageCount);

  const canSubmit =
    files.length === 1 &&
    (mode === "every-page" || rangeIsValid) &&
    status !== "uploading" &&
    status !== "processing";

  const handleSubmit = async () => {
    setStatus("uploading");
    setError(null);
    setDownloadUrl(null);
    setProgress(0);
    try {
      const res = await splitPdf(
        files[0].file,
        {
          mode,
          startPage: mode === "range" ? start : undefined,
          endPage: mode === "range" ? end : undefined,
        },
        (p) => {
          setProgress(p);
          if (p >= 100) setStatus("processing");
        }
      );
      setDownloadUrl(resolveDownloadUrl(res.download_url));
      setStatus("success");
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't split that file. Try again."));
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
          multiple={false}
          accent="amber"
          label="Drop a PDF here, or click to browse"
        />

        {pageCount !== null && (
          <p className="mt-3 font-mono text-xs text-teal-400">
            {pageCount} page{pageCount === 1 ? "" : "s"} detected.
          </p>
        )}

        {files.length === 1 && (
          <div className="mt-8 space-y-5 rounded-2xl border border-ink-600/70 bg-ink-800/50 p-5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("range")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "range"
                    ? "border-amber-500/60 bg-amber-500/15 text-amber-400"
                    : "border-ink-600 text-paper-500 hover:text-paper-100"
                }`}
              >
                By page range
              </button>
              <button
                type="button"
                onClick={() => setMode("every-page")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "every-page"
                    ? "border-amber-500/60 bg-amber-500/15 text-amber-400"
                    : "border-ink-600 text-paper-500 hover:text-paper-100"
                }`}
              >
                Every page separately
              </button>
            </div>

            {mode === "range" && (
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-paper-700">
                  Page range
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={pageCount ?? undefined}
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    placeholder="Start"
                    className="w-28 rounded-xl border border-ink-600 bg-ink-900 px-4 py-2.5 text-sm text-paper-100 placeholder:text-paper-700 outline-none transition-colors focus:border-amber-500/60"
                  />
                  <span className="text-sm text-paper-700">to</span>
                  <input
                    type="number"
                    min={1}
                    max={pageCount ?? undefined}
                    value={endPage}
                    onChange={(e) => setEndPage(e.target.value)}
                    placeholder="End"
                    className="w-28 rounded-xl border border-ink-600 bg-ink-900 px-4 py-2.5 text-sm text-paper-100 placeholder:text-paper-700 outline-none transition-colors focus:border-amber-500/60"
                  />
                </div>
                <p className="mt-1.5 text-xs text-paper-700">
                  Page numbers start at 1
                  {pageCount ? ` · this file has ${pageCount} pages` : ""}.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <SubmitButton onClick={handleSubmit} disabled={!canSubmit} loading={status === "uploading" || status === "processing"}>
            Split PDF
          </SubmitButton>
        </div>

        <ResultPanel
          status={status}
          progress={progress}
          error={error}
          downloadUrl={downloadUrl}
          fileName="split.pdf"
        />
      </div>
    </div>
  );
}