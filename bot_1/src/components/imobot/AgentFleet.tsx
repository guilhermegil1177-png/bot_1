import { Bot, Radio, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Agent } from "@/lib/imobot-types";
import { StatusOrb } from "./StatusOrb";

interface Props {
  agents: Agent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading: boolean;
}

export function AgentFleet({ agents, selectedId, onSelect, loading }: Props) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      agents.filter(
        (a) =>
          a.name.toLowerCase().includes(q.toLowerCase()) ||
          a.whatsapp_bot_number.includes(q),
      ),
    [agents, q],
  );

  const onlineCount = agents.filter((a) => (a.status ?? "").toLowerCase() === "active").length;

  return (
    <aside className="glass rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-[var(--color-primary)]" />
            <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Active Bot Fleet
            </h2>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10">
            {onlineCount}/{agents.length} ONLINE
          </span>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter fleet…"
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)]/60 focus:bg-white/10 outline-none transition"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-[72px] rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            <Bot className="h-8 w-8 mx-auto mb-3 opacity-50" />
            No bots in fleet
          </div>
        )}
        {filtered.map((a) => {
          const online = (a.status ?? "").toLowerCase() === "active";
          const active = a.id === selectedId;
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              className={`group w-full text-left rounded-xl p-3.5 transition-all duration-200 border ${
                active
                  ? "bg-white/[0.08] border-[var(--color-primary)]/40 glow-primary"
                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/15 hover:scale-[1.01]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${active ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)]/40" : "bg-white/5 border-white/10"}`}>
                    <Bot className={`h-5 w-5 ${active ? "text-[var(--color-primary)]" : "text-muted-foreground"}`} />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5">
                    <StatusOrb online={online} size="sm" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{a.name}</div>
                  <div className="text-[11px] font-mono text-muted-foreground truncate">
                    {a.whatsapp_bot_number}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-[10px] font-semibold tracking-wider ${online ? "text-online" : "text-offline"}`}>
                    {online ? "ONLINE" : "OFFLINE"}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
