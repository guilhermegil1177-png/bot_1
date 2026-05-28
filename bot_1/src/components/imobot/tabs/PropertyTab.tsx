import { useState } from "react";
import { Link2, Zap, ExternalLink, Building2 } from "lucide-react";
import type { Property } from "@/lib/imobot-types";

export function PropertyTab({ properties }: { properties: Property[] }) {
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(properties.length / pageSize));
  const slice = properties.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="glass-strong rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="h-4 w-4 text-[var(--color-primary)]" />
          <h3 className="text-sm font-semibold tracking-wider uppercase">Inject Listing</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste real estate listing URL here…"
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)]/60 focus:bg-white/10 outline-none text-sm font-mono"
          />
          <button
            disabled={!url}
            className="px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 glow-primary justify-center"
          >
            <Zap className="h-4 w-4" />
            Process & Inject Link
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-3 font-mono">
          → Scraper extracts metadata and feeds context into this agent's knowledge base.
        </p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[var(--color-primary)]" />
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Linked Inventory · {properties.length}
            </h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-widest text-muted-foreground bg-white/[0.02]">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Title</th>
                <th className="text-left px-5 py-3 font-medium">Type</th>
                <th className="text-left px-5 py-3 font-medium">Location</th>
                <th className="text-right px-5 py-3 font-medium">Price</th>
                <th className="text-right px-5 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {slice.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.03] transition">
                  <td className="px-5 py-4 max-w-xs truncate font-medium">{p.title}</td>
                  <td className="px-5 py-4 text-muted-foreground">{p.property_type ?? "—"}</td>
                  <td className="px-5 py-4 text-muted-foreground">{p.location ?? "—"}</td>
                  <td className="px-5 py-4 text-right tabular-nums text-info">
                    {p.price ? `€${Number(p.price).toLocaleString()}` : "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {(p.url_anuncio || p.link_remax) && (
                      <a
                        href={p.url_anuncio ?? p.link_remax ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {slice.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
                    No properties linked to this bot yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {properties.length > pageSize && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 text-xs">
            <span className="text-muted-foreground font-mono">
              Page {page + 1} / {pages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
                disabled={page >= pages - 1}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
