import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-paper-700">
        Error 404
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-paper-100">
        This page got misfiled.
      </h1>
      <p className="mt-3 text-sm text-paper-500">
        We couldn&apos;t find what you were looking for. It might have moved,
        or the link might be off.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-all hover:bg-amber-400"
      >
        <ArrowLeft size={16} />
        Back to the toolkit
      </Link>
    </div>
  );
}
