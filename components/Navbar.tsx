"use client";

import Link from "next/link";
import { FileStack } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-600/60 bg-ink-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <FileStack size={19} strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-paper-100">
            Foldr
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/#organize"
            className="text-sm text-paper-500 transition-colors hover:text-paper-100"
          >
            Organize
          </Link>
          <Link
            href="/#convert"
            className="text-sm text-paper-500 transition-colors hover:text-paper-100"
          >
            Convert
          </Link>
          <Link
            href="/#extract"
            className="text-sm text-paper-500 transition-colors hover:text-paper-100"
          >
            Extract
          </Link>
        </nav>

        <Link
          href="/#tools"
          className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-amber-400 hover:shadow-[0_0_0_4px_rgba(245,185,66,0.18)] active:scale-95"
        >
          Open a tool
        </Link>
      </div>
    </header>
  );
}
