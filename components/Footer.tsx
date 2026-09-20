import { TOOLS } from "@/lib/tools";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink-600/60 bg-ink-900/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-base font-semibold text-paper-100">
            Foldr
          </p>
          <p className="mt-2 max-w-[22ch] text-sm text-paper-500">
            A small, fast toolkit for the paperwork that lands in your
            downloads folder.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper-700">
            Tools
          </p>
          <ul className="mt-3 space-y-2">
            {TOOLS.slice(0, 4).map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="text-sm text-paper-500 transition-colors hover:text-teal-400"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper-700">
            More
          </p>
          <ul className="mt-3 space-y-2">
            {TOOLS.slice(4).map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="text-sm text-paper-500 transition-colors hover:text-teal-400"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper-700">
            Files never linger
          </p>
          <p className="mt-3 text-sm text-paper-500">
            Uploaded files are processed for your conversion and not kept
            afterward.
          </p>
        </div>
      </div>
      <div className="border-t border-ink-600/60 py-5 text-center font-mono text-xs text-paper-700">
        Foldr — built for the desk, not the boardroom.
      </div>
    </footer>
  );
}