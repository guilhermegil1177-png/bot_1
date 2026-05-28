export function StatusOrb({ online, size = "md" }: { online: boolean; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-3.5 w-3.5" : size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  return (
    <span className="relative inline-flex items-center justify-center">
      <span
        className={`${dim} rounded-full animate-pulse-orb ${
          online ? "bg-[var(--color-online)] glow-online" : "bg-[var(--color-offline)] glow-offline"
        }`}
      />
    </span>
  );
}
