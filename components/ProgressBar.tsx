export default function ProgressBar({
  percent,
  label,
}: {
  percent: number;
  label?: string;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex justify-between font-mono text-xs text-paper-500">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 via-teal-300 to-teal-400 bg-[length:200%_100%] transition-[width] duration-300 ease-out animate-shimmer"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}