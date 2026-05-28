import { Terminal } from "lucide-react";
import type { Agent } from "@/lib/imobot-types";

export function ErrorLogsTab({ agent }: { agent: Agent }) {
  const tag = agent.id.slice(0, 8);
  const lines = [
    { t: "INFO", c: "text-info", m: `[boot] agent=${tag} channel=evolution bound to ${agent.whatsapp_bot_number}` },
    { t: "OK  ", c: "text-online", m: `[heartbeat] webhook latency=124ms last_ack=ok` },
    { t: "WARN", c: "text-warning", m: `[lead] missing budget on whatsapp=+35191****22 -> qualification deferred` },
    { t: "ERR ", c: "text-offline", m: `[gcal] sync_failed code=403 reason="calendar.events.insert denied" cal=${agent.google_calendar_id ?? "<none>"}` },
    { t: "INFO", c: "text-info", m: `[scraper] indexed property=2f1a… url=remax.pt/listing/5521` },
    { t: "OK  ", c: "text-online", m: `[evolution] message.outbound id=msg_8821 status=delivered` },
    { t: "ERR ", c: "text-offline", m: `[parser] unexpected token at offset=412 payload_truncated=true` },
    { t: "WARN", c: "text-warning", m: `[rate] inbound burst detected: 14 msg/10s — backpressure engaged` },
    { t: "INFO", c: "text-info", m: `[archive] candidates=312 size_est=2.4MB ready_for_compaction=true` },
    { t: "OK  ", c: "text-online", m: `[gpt] completion tokens=842 latency=2.1s model=gpt-4o-mini` },
  ];

  return (
    <div className="animate-fade-up">
      <div className="rounded-2xl border border-[var(--color-offline)]/15 bg-[oklch(0.1_0.02_260/0.9)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/30">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[var(--color-offline)]" />
            <span className="text-xs font-mono text-muted-foreground">
              imobot://agent/{tag}/logs --tail --level=warn
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-offline)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-warning)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-online)]" />
          </div>
        </div>
        <div className="p-5 font-mono text-[12.5px] leading-relaxed scanlines max-h-[480px] overflow-y-auto">
          {lines.map((l, i) => {
            const ts = new Date(Date.now() - i * 47_000).toISOString().replace("T", " ").slice(0, 19);
            return (
              <div key={i} className="flex gap-3 hover:bg-white/[0.02] px-2 -mx-2 rounded">
                <span className="text-muted-foreground/60 select-none">{ts}</span>
                <span className={`${l.c} font-bold w-12`}>{l.t}</span>
                <span className="text-foreground/90 break-all">{l.m}</span>
              </div>
            );
          })}
          <div className="mt-3 text-[var(--color-primary)] flex items-center gap-2">
            <span className="animate-pulse">▍</span>
            <span className="text-muted-foreground">awaiting next event…</span>
          </div>
        </div>
      </div>
    </div>
  );
}
