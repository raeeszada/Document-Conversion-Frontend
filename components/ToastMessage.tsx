import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ToastMessage({
  type,
  message,
}: {
  type: "error" | "success";
  message: string;
}) {
  const isError = type === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex animate-fadeUp items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? "border-red-500/30 bg-red-500/10 text-red-300"
          : "border-teal-400/30 bg-teal-400/10 text-teal-200"
      }`}
    >
      {isError ? (
        <AlertTriangle size={17} className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}
