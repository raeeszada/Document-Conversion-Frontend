import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ToolMeta } from "@/lib/types";
import { ICONS } from "./icon-map";

export default function PageHeader({ tool }: { tool: ToolMeta }) {
  const Icon = ICONS[tool.icon];
  const accentText = tool.accent === "amber" ? "text-amber-400" : "text-teal-400";
  const accentBg = tool.accent === "amber" ? "bg-amber-500/12" : "bg-teal-400/12";

  return (
    <div className="mx-auto max-w-3xl px-6 pb-10 pt-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-paper-500 transition-colors hover:text-paper-100"
      >
        <ArrowLeft size={14} />
        All tools
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentBg} ${accentText}`}
        >
          {Icon ? <Icon size={22} strokeWidth={2.1} /> : null}
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-paper-100">
            {tool.name}
          </h1>
          <p className={`text-sm font-medium ${accentText}`}>{tool.tagline}</p>
        </div>
      </div>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper-500">
        {tool.description}
      </p>
    </div>
  );
}
