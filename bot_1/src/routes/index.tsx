import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Plus, Activity, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Agent } from "@/lib/imobot-types";
import { AgentFleet } from "@/components/imobot/AgentFleet";
import { AgentDetailPanel } from "@/components/imobot/AgentDetailPanel";
import { CreateBotModal } from "@/components/imobot/CreateBotModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IMOBOT Commander — Multi-Agent Control Room" },
      { name: "description", content: "High-tech command center for managing real estate WhatsApp bot fleet." },
    ],
  }),
  component: Commander,
});

function Commander() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("agents")
      .select("*")
      .order("created_at", { ascending: false });
    setAgents((data as Agent[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const selected = agents.find((a) => a.id === selectedId) ?? null;
  const onlineCount = agents.filter((a) => (a.status ?? "").toLowerCase() === "active").length;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 lg:px-8 py-5 flex items-center justify-between border-b border-white/5 glass-strong sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[oklch(0.55_0.18_240)] flex items-center justify-center glow-primary">
              <Shield className="h-5 w-5 text-[var(--color-primary-foreground)]" />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              v2.4 · Command Console
            </div>
            <h1 className="text-base font-bold tracking-tight">
              IMOBOT <span className="text-[var(--color-primary)]">COMMANDER</span>
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <Activity className="h-3.5 w-3.5 text-online" />
            <span className="text-xs font-mono">
              Fleet: <span className="text-online">{onlineCount}</span>
              <span className="text-muted-foreground"> / {agents.length}</span>
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 transition hover:scale-[1.02] glow-primary"
          >
            <Plus className="h-4 w-4" />
            Duplicate Bot Instance
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-[calc(100vh-110px)]">
          <div className="lg:col-span-1 min-h-0">
            <AgentFleet
              agents={agents}
              selectedId={selectedId}
              onSelect={setSelectedId}
              loading={loading}
            />
          </div>
          <div className="lg:col-span-2 min-h-0">
            <AgentDetailPanel agent={selected} />
          </div>
        </div>
      </main>

      <CreateBotModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={load} />
    </div>
  );
}
