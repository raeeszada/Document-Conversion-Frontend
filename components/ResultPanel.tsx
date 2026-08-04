import { RequestStatus } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import Spinner from "./Spinner";
import ToastMessage from "./ToastMessage";
import DownloadButton from "./DownloadButton";

export default function ResultPanel({
  status,
  progress,
  error,
  downloadUrl,
  fileName,
}: {
  status: RequestStatus;
  progress: number;
  error: string | null;
  downloadUrl: string | null;
  fileName?: string;
}) {
  if (status === "idle") return null;

  return (
    <div className="mt-6 space-y-4">
      {status === "uploading" && (
        <ProgressBar percent={progress} label="Uploading" />
      )}

      {status === "processing" && (
        <div className="flex items-center gap-2.5 text-sm text-paper-500">
          <Spinner size={16} />
          Processing your file&hellip;
        </div>
      )}

      {status === "error" && error && (
        <ToastMessage type="error" message={error} />
      )}

      {status === "success" && downloadUrl && (
        <div className="space-y-3">
          <ToastMessage type="success" message="All done — your file is ready." />
          <DownloadButton href={downloadUrl} fileName={fileName} />
        </div>
      )}
    </div>
  );
}
