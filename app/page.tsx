import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Languages } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { CATEGORY_LABEL, CATEGORY_NOTE, TOOLS } from "@/lib/tools";
import { ToolCategory } from "@/lib/types";

const CATEGORIES: ToolCategory[] = ["organize", "convert", "extract"];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-radial-fade px-6 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/70 px-3 py-1 font-mono text-xs text-paper-500">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              7 tools, 0 sign-up
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold italic leading-[1.05] tracking-tight text-paper-100 sm:text-6xl">
              Your PDFs, reshaped
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">on your terms.</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 z-0 h-4 origin-left animate-stampIn rounded-sm bg-teal-400/25 sm:h-5"
                />
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper-500">
              Merge, split, and convert between PDF, Word and image files —
              plus OCR for English, Urdu and Arabic. Everything runs in one
              clean pass, no watermarks, no waiting rooms.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#tools"
                className="group inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-teal-300 hover:shadow-[0_0_0_6px_rgba(45,212,191,0.16)] active:scale-95"
              >
                Browse the toolkit
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <div className="flex items-center gap-2 text-sm text-paper-500">
                <ShieldCheck size={16} className="text-teal-400" />
                Files aren&apos;t kept after processing
              </div>
            </div>
          </div>

          {/* Signature element: a stack of pages, fanned and drifting */}
          <div className="relative mx-auto hidden h-72 w-72 sm:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-52 w-40">
                <div className="absolute inset-0 rotate-[10deg] rounded-lg border border-ink-500 bg-ink-700 shadow-xl" />
                <div className="absolute inset-0 rotate-[-6deg] rounded-lg border border-ink-500 bg-ink-700 shadow-xl" />
                <div className="absolute inset-0 animate-float rounded-lg border border-ink-500 bg-ink-800 shadow-2xl">
                  <div className="absolute right-0 top-0 h-8 w-8 rounded-bl-lg rounded-tr-lg bg-teal-400/25" />
                  <div className="mt-9 space-y-2.5 px-4">
                    <div className="h-2 w-3/4 rounded-full bg-paper-700/50" />
                    <div className="h-2 w-full rounded-full bg-paper-700/40" />
                    <div className="h-2 w-2/3 rounded-full bg-paper-700/40" />
                    <div className="mt-5 h-2 w-1/2 rounded-full bg-teal-400/40" />
                    <div className="h-2 w-5/6 rounded-full bg-paper-700/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-ink-600/60 bg-ink-800/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3">
          <Feature
            icon={<Zap size={17} />}
            title="Fast by default"
            note="Progress shown from upload to finished file."
          />
          <Feature
            icon={<Languages size={17} />}
            title="Reads three scripts"
            note="OCR tools cover English, Urdu and Arabic."
          />
          <Feature
            icon={<ShieldCheck size={17} />}
            title="Nothing to install"
            note="Runs straight in the browser, on any device."
          />
        </div>
      </section>

      {/* Tool sections grouped by what they actually do */}
      <section id="tools" className="mx-auto max-w-6xl px-6 py-20">
        {CATEGORIES.map((cat) => (
          <div key={cat} id={cat} className="scroll-mt-24 pb-16 last:pb-0">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-ink-600/60 pb-4">
              <div>
                <h2 className="font-display text-2xl font-semibold text-paper-100">
                  {CATEGORY_LABEL[cat]}
                </h2>
                <p className="mt-1 text-sm text-paper-500">
                  {CATEGORY_NOTE[cat]}
                </p>
              </div>
              <span className="hidden font-mono text-xs text-paper-700 sm:block">
                {TOOLS.filter((t) => t.category === cat).length} tools
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.filter((t) => t.category === cat).map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function Feature({
  icon,
  title,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-700 text-teal-400">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-paper-100">{title}</p>
        <p className="text-sm text-paper-500">{note}</p>
      </div>
    </div>
  );
}