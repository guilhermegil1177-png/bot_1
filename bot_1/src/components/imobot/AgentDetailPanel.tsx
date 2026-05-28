import { useEffect, useState } from "react";
import { BarChart3, Building2, Terminal, Archive, Bot, Copy, Check } from "lucide-react";
import type { Agent, Lead, Property } from "@/lib/imobot-types";
import { supabase } from "@/integrations/supabase/client";
import { StatusOrb } from "./StatusOrb";
import { DataHubTab } from "./tabs/DataHubTab";
import { PropertyTab } from "./tabs/PropertyTab";
import { ErrorLogsTab } from "./tabs/ErrorLogsTab";
import { CompactorTab } from "./tabs/CompactorTab";

type TabId = "data" | "properties" | "errors" | "compactor";
const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "data", label: "Data & Marketing Hub", icon: BarChart3 },
  { id: "properties", label: "Property Inventory", icon: Building2 },
  { id: "errors", label: "Isolated Error Logs", icon: Terminal },
  { id: "compactor", label: "Database Compactor", icon: Archive },
];

export function AgentDetailPanel({ agent }: { agent: Agent | null }) {
  const [tab, setTab] = useState<TabId>("data");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!agent) return;
    setLoading(true);
    setTab("data");
    Promise.all([
      supabase.from("leads").select("*").eq("agent_id", agent.id).order("created_at", { ascending: false }).limit(500),
      supabase.from("properties").select("*").eq("agent_id", agent.id).order("created_at", { ascending: false }).limit(500),
    ])
      .then(([l, p]) => {
        setLeads((l.data as Lead[]) ?? []);
        setProperties((p.data as Property[]) ?? []);
      })
      .finally(() => setLoading(false));
  }, [agent]);

  if (!agent) {
    return (
      <div className="h-full glass rounded-2xl flex items-center justify-center relative overflow-hidden grid-bg">
        <div className="text-center px-6">
          <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20 blur-2xl animate-pulse-orb" />
            <div className="relative h-24 w-24 rounded-2xl glass-strong flex items-center justify-center">
              <Bot className="h-12 w-12 text-[var(--color-primary)] animate-pulse-orb" />
            </div>
          </div>
          <h2 className="mt-8 text-xl font-semibold tracking-wide">Command Center Standby</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
            Select an operational bot from the fleet to load command center.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            Awaiting input
          </div>
        </div>
      </div>
    );
  }

  const online = (agent.status ?? "").toLowerCase() === "active";

  const copyNumber = () => {
    navigator.clipboard.writeText(agent.whatsapp_bot_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-full flex flex-col gap-4 animate-fade-up">
      <div className="glass-strong rounded-2xl p-5 flex items-center gap-5">
        <div className="relative">
          <div className="h-14 w-14 rounded-2xl bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 flex items-center justify-center">
            <Bot className="h-7 w-7 text-[var(--color-primary)]" />
          </div>
          <span className="absolute -top-1 -right-1">
            <StatusOrb online={online} size="md" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold truncate">{agent.name}</h1>
            <span className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded-md border ${
              online ? "text-online border-[var(--color-online)]/40 bg-[var(--color-online)]/10" : "text-offline border-[var(--color-offline)]/40 bg-[var(--color-offline)]/10"
            }`}>
              {online ? "ONLINE" : "OFFLINE"}
            </span>
          </div>
          <button
            onClick={copyNumber}
            className="mt-1 inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition"
          >
            {agent.whatsapp_bot_number}
            {copied ? <Check className="h-3 w-3 text-online" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-2 text-right">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Agent ID</div>
          <div className="text-xs font-mono text-foreground">{agent.id.slice(0, 8)}…</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Calendar</div>
          <div className="text-xs font-mono text-foreground truncate max-w-[140px]">
            {agent.google_calendar_id ? agent.google_calendar_id.slice(0, 14) + "…" : "—"}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-1.5 flex gap-1 overflow-x-auto">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                active
                  ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 rounded-2xl glass animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {tab === "data" && <DataHubTab leads={leads} />}
            {tab === "properties" && <PropertyTab properties={properties} />}
            {tab === "errors" && <ErrorLogsTab agent={agent} />}
            {tab === "compactor" && <CompactorTab />}
          </>
        )}
      </div>
    </div>
  );
}
