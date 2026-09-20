"use client";

import { Language } from "@/lib/types";

const OPTIONS: { value: Language; label: string }[] = [
  { value: "eng", label: "English" },
  { value: "urd", label: "Urdu" },
  { value: "ara", label: "Arabic" },
];

export default function LanguageSelect({
  value,
  onChange,
}: {
  value: Language;
  onChange: (v: Language) => void;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-paper-700">
        Text language
      </label>
      <div className="flex gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              value === opt.value
                ? "border-teal-400/60 bg-teal-400/15 text-teal-400"
                : "border-ink-600 text-paper-500 hover:border-ink-500 hover:text-paper-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}