"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronDown, ChevronUp, UploadCloud, X } from "lucide-react";
import { UploadedFile } from "@/lib/types";
import { formatBytes, uid } from "@/lib/utils";

interface Props {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  accept: string[]; // e.g. [".pdf"] or [".jpg", ".png", ".webp"]
  multiple?: boolean;
  maxSizeMB?: number;
  allowReorder?: boolean;
  accent?: "teal";
  label?: string;
  hint?: string;
}

export default function FileDropzone({
  files,
  onChange,
  accept,
  multiple = false,
  maxSizeMB = 25,
  allowReorder = false,
  accent = "teal",
  label = "Drop files here, or click to browse",
  hint,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptAttr = accept.join(",");
  const accentText = "text-teal-400";
  const accentBorder = "border-teal-400/60";
  const accentBg = "bg-teal-400/8";

  const validate = useCallback(
    (incoming: File[]): { valid: File[]; problem: string | null } => {
      const valid: File[] = [];
      let problem: string | null = null;

      for (const f of incoming) {
        const ext = "." + (f.name.split(".").pop() || "").toLowerCase();
        const okType = accept.includes(ext);
        const okSize = f.size <= maxSizeMB * 1024 * 1024;

        if (!okType) {
          problem = `"${f.name}" isn't a supported file type (${accept.join(", ")}).`;
          continue;
        }
        if (!okSize) {
          problem = `"${f.name}" is over the ${maxSizeMB} MB limit.`;
          continue;
        }
        valid.push(f);
      }
      return { valid, problem };
    },
    [accept, maxSizeMB]
  );

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      const { valid, problem } = validate(list);
      setError(problem);
      if (valid.length === 0) return;

      const next: UploadedFile[] = valid.map((file) => ({ id: uid(), file }));
      if (multiple) {
        onChange([...files, ...next]);
      } else {
        onChange([next[0]]);
      }
    },
    [files, multiple, onChange, validate]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= files.length) return;
    const next = [...files];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-200 ${
          isDragging
            ? `${accentBorder} ${accentBg} scale-[1.01]`
            : "border-ink-600 bg-ink-800/40 hover:border-ink-500 hover:bg-ink-800/70"
        }`}
      >
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full ${accentBg} ${accentText} transition-transform duration-300 ${
            isDragging ? "scale-110" : ""
          }`}
        >
          <UploadCloud size={22} />
        </span>
        <div>
          <p className="text-sm font-medium text-paper-100">{label}</p>
          <p className="mt-1 font-mono text-xs text-paper-700">
            {hint || `${accept.join(", ")} · up to ${maxSizeMB} MB each`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptAttr}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((uf, i) => (
            <li
              key={uf.id}
              className="flex animate-fadeUp items-center justify-between gap-3 rounded-xl border border-ink-600/70 bg-ink-800/60 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-paper-100">{uf.file.name}</p>
                <p className="font-mono text-xs text-paper-700">
                  {formatBytes(uf.file.size)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {allowReorder && (
                  <>
                    <button
                      type="button"
                      aria-label="Move up"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="rounded-md p-1.5 text-paper-500 transition-colors hover:bg-ink-700 hover:text-paper-100 disabled:opacity-30"
                    >
                      <ChevronUp size={15} />
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      onClick={() => move(i, 1)}
                      disabled={i === files.length - 1}
                      className="rounded-md p-1.5 text-paper-500 transition-colors hover:bg-ink-700 hover:text-paper-100 disabled:opacity-30"
                    >
                      <ChevronDown size={15} />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  aria-label="Remove file"
                  onClick={() => removeFile(uf.id)}
                  className="rounded-md p-1.5 text-paper-500 transition-colors hover:bg-red-500/15 hover:text-red-400"
                >
                  <X size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}