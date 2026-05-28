import { useState } from "react";
import { X, Plus, ShieldAlert, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateBotModal({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    name: "",
    whatsapp_bot_number: "",
    google_calendar_id: "",
    evolution_api_url: "",
    evolution_api_key: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.from("agents").insert({
      name: form.name,
      whatsapp_bot_number: form.whatsapp_bot_number,
      google_calendar_id: form.google_calendar_id || null,
      evolution_api_url: form.evolution_api_url || null,
      evolution_api_key: form.evolution_api_key || null,
      status: "inactive",
    });
    setSubmitting(false);
    if (error) { setError(error.message); return; }
    onCreated();
    onClose();
    setForm({ name: "", whatsapp_bot_number: "", google_calendar_id: "", evolution_api_url: "", evolution_api_key: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-up">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative glass-strong rounded-3xl w-full max-w-lg p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-9 w-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Duplicate Bot Instance</h2>
            <p className="text-xs text-muted-foreground">Provision a new agent deployment</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3 mt-6">
          <Field label="Agent Name" value={form.name} onChange={update("name")} placeholder="Imobot — Lisboa Centro" required />
          <Field label="Bot Phone Number" value={form.whatsapp_bot_number} onChange={update("whatsapp_bot_number")} placeholder="+351 912 345 678" required mono />
          <Field label="Google Calendar ID" value={form.google_calendar_id} onChange={update("google_calendar_id")} placeholder="agenda@group.calendar.google.com" mono />
          <Field label="Evolution API URL" value={form.evolution_api_url} onChange={update("evolution_api_url")} placeholder="https://evo.example.com" mono />
          <Field label="Evolution API Key" value={form.evolution_api_key} onChange={update("evolution_api_key")} placeholder="sk_live_••••••••" mono type="password" />

          {error && (
            <div className="text-xs text-offline bg-[var(--color-offline)]/10 border border-[var(--color-offline)]/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex items-start gap-2 text-[11px] text-warning bg-[var(--color-warning)]/8 border border-[var(--color-warning)]/25 rounded-xl px-3 py-2.5 mt-1">
            <ShieldAlert className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>
              Instance will deploy in <strong>[OFFLINE / Inactive]</strong> status for structural
              validation prior to manual activation.
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 transition glow-primary disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {submitting ? "Provisioning…" : "Deploy Instance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, required, mono, type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  mono?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
        {label} {required && <span className="text-offline">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1.5 w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)]/60 focus:bg-white/10 outline-none text-sm ${mono ? "font-mono" : ""}`}
      />
    </label>
  );
}
