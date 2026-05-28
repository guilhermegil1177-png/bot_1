import { Database, AlertTriangle, Archive, ShieldCheck } from "lucide-react";

export function CompactorTab() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--color-warning)]/15 blur-3xl" />
        <div className="flex items-start gap-5 relative">
          <div className="h-12 w-12 rounded-2xl bg-[var(--color-warning)]/15 border border-[var(--color-warning)]/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-widest text-warning font-semibold mb-1">
              Archival Opportunity Detected
            </div>
            <h3 className="text-2xl font-bold mb-2">1,120 legacy closed leads</h3>
            <p className="text-sm text-muted-foreground max-w-xl">
              Reduce database allocation overhead by compressing closed deals into monthly /
              annual JSON blocks stored in <span className="font-mono text-foreground">archived_leads_bundles</span>.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5 max-w-md">
              <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Rows</div>
                <div className="text-lg font-bold tabular-nums">1,120</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Recovery</div>
                <div className="text-lg font-bold tabular-nums text-online">~84%</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Bundles</div>
                <div className="text-lg font-bold tabular-nums">12</div>
              </div>
            </div>
          </div>
          <button className="px-5 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider bg-[var(--color-warning)] text-[oklch(0.15_0.02_260)] hover:brightness-110 transition hover:scale-[1.02] flex items-center gap-2 shrink-0">
            <Archive className="h-4 w-4" />
            Execute Data Compression
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database className="h-4 w-4 text-[var(--color-primary)]" />
            <h4 className="text-sm font-semibold tracking-wider uppercase">Compaction Strategy</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>· Closed leads grouped by month per agent_id</li>
            <li>· Serialized to compressed JSON bundle</li>
            <li>· Original rows soft-deleted after checksum match</li>
            <li>· Retrievable via archived_leads_bundles index</li>
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-4 w-4 text-online" />
            <h4 className="text-sm font-semibold tracking-wider uppercase">Safety Net</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>· Atomic transaction with rollback on hash mismatch</li>
            <li>· 30-day quarantine window before purge</li>
            <li>· Full bundle export (download .json.gz)</li>
            <li>· Audit trail logged per execution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
