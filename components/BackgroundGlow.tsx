export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-900">
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-teal-500/10 blur-[110px] animate-driftSlow" />
      <div
        className="absolute right-[-10rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-teal-400/10 blur-[110px] animate-driftSlow"
        style={{ animationDelay: "-6s" }}
      />
      <div className="absolute bottom-[-14rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-teal-500/5 blur-[120px] animate-driftSlow" />
      <div className="grain-overlay" />
    </div>
  );
}