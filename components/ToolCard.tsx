import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ToolMeta } from "@/lib/types";
import { ICONS } from "./icon-map";

export default function ToolCard({ tool, index }: { tool: ToolMeta; index: number }) {
  const Icon = ICONS[tool.icon];
  const accent = tool.accent === "amber" ? "#F5B942" : "#2DD4BF";
  const accentText = tool.accent === "amber" ? "text-amber-400" : "text-teal-400";
  const accentBg = tool.accent === "amber" ? "bg-amber-500/12" : "bg-teal-400/12";

  return (
    <Link
      href={`/${tool.slug}`}
      style={{ animationDelay: `${index * 60}ms`, ["--dogear-color" as string]: accent }}
      className="group relative flex animate-fadeUp flex-col justify-between overflow-hidden rounded-2xl border border-ink-600/70 bg-ink-800/60 p-6 opacity-0 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-ink-500 hover:bg-ink-700/70"
    >
      <div className="dogear" />

      <div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentBg} ${accentText} transition-transform duration-300 group-hover:scale-110`}
        >
          {Icon ? <Icon size={20} strokeWidth={2.1} /> : null}
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-paper-100">
          {tool.name}
        </h3>
        <p className={`mt-0.5 text-xs font-medium ${accentText}`}>
          {tool.tagline}
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-paper-500">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-paper-300 transition-colors group-hover:text-paper-100">
        Use tool
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}
