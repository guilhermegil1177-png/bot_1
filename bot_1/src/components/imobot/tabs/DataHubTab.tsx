import { Users, Sparkles, Snowflake, TrendingUp } from "lucide-react";
import type { Lead } from "@/lib/imobot-types";

function MetricCard({
  label, value, sublabel, icon: Icon, tone,
}: {
  label: string; value: number | string; sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "info" | "online" | "warning";
}) {
  const toneClass =
    tone === "online" ? "text-online" : tone === "warning" ? "text-warning" : "text-info";
  const ringClass =
    tone === "online" ? "from-[var(--color-online)]/20" :
    tone === "warning" ? "from-[var(--color-warning)]/20" : "from-[var(--color-info)]/20";

  return (
    <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.01] transition-transform">
      <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${ringClass} to-transparent blur-2xl`} />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">{label}</div>
          <div className={`text-5xl font-bold tabular-nums ${toneClass}`}>{value}</div>
          <div className="text-xs text-muted-foreground mt-2">{sublabel}</div>
        </div>
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function DataHubTab({ leads }: { leads: Lead[] }) {
  const total = leads.length;
  const perfect = leads.filter(
    (l) => l.name && l.budget && l.objective && l.objective !== "indefinido" && l.property_type,
  ).length;
  const cold = leads.filter(
    (l) => !l.budget || l.objective === "indefinido" || !l.property_type,
  ).length;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Total Leads Captured" value={total} sublabel="All inbound contacts" icon={Users} tone="info" />
        <MetricCard label="Perfect / Fully Qualified" value={perfect} sublabel="Name · Budget · Objective · Type" icon={Sparkles} tone="online" />
        <MetricCard label="Curious / Cold Leads" value={cold} sublabel="Missing qualification data" icon={Snowflake} tone="warning" />
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[var(--color-primary)]" />
            <h3 className="text-sm font-semibold tracking-wider uppercase">Latest Captures</h3>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">Showing last 8</span>
        </div>
        <div className="divide-y divide-white/5">
          {leads.slice(0, 8).map((l) => (
            <div key={l.whatsapp} className="py-3 flex items-center gap-4 text-sm">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{l.name ?? "Anonymous"}</div>
                <div className="text-xs text-muted-foreground font-mono truncate">{l.whatsapp}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider">
                {l.objective}
              </span>
              <span className="text-xs text-muted-foreground hidden md:inline">{l.property_type ?? "—"}</span>
              <span className="text-xs tabular-nums text-info">
                {l.budget ? `€${Number(l.budget).toLocaleString()}` : "—"}
              </span>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">No leads captured yet for this bot.</div>
          )}
        </div>
      </div>
    </div>
  );
}
