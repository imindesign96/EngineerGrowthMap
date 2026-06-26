type ProgressBarProps = {
  value: number;
  tone?: "emerald" | "sky" | "amber" | "rose";
};

const toneClasses = {
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

export function ProgressBar({ value, tone = "emerald" }: ProgressBarProps) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10" aria-hidden="true">
      <div
        className={`h-full rounded-full transition-all duration-500 ${toneClasses[tone]}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
