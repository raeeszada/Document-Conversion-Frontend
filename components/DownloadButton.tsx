import { Download } from "lucide-react";

export default function DownloadButton({
  href,
  fileName,
}: {
  href: string;
  fileName?: string;
}) {
  return (
    <a
      href={href}
      download={fileName}
      className="group inline-flex animate-fadeUp items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-teal-300 hover:shadow-[0_0_0_6px_rgba(45,212,191,0.16)] active:scale-95"
    >
      <Download
        size={16}
        className="transition-transform duration-300 group-hover:translate-y-0.5"
      />
      Download {fileName ? fileName : "file"}
    </a>
  );
}
