import Spinner from "./Spinner";

export default function SubmitButton({
  onClick,
  disabled,
  loading,
  children,
  accent = "teal",
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  accent?: "teal";
}) {
  const bg =
    "bg-teal-400 hover:bg-teal-300 hover:shadow-[0_0_0_6px_rgba(45,212,191,0.16)]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none ${bg}`}
    >
      {loading && <Spinner size={15} />}
      {children}
    </button>
  );
}