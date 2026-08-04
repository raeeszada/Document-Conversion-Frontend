export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function extractFileName(url: string): string {
  try {
    const clean = url.split("?")[0];
    const parts = clean.split("/");
    return parts[parts.length - 1] || "download";
  } catch {
    return "download";
  }
}

export function isAxiosLikeError(err: unknown): err is {
  response?: { data?: { message?: string; detail?: string } };
  message?: string;
} {
  return typeof err === "object" && err !== null;
}

export function getErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosLikeError(err)) {
    const detail = err.response?.data?.detail;
    const message = err.response?.data?.message;
    if (typeof detail === "string") return detail;
    if (typeof message === "string") return message;
    if (typeof err.message === "string" && err.message) return err.message;
  }
  return fallback;
}
