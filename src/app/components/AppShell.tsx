import { Briefcase, LogOut } from "lucide-react";

export function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-foreground text-lg" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            Trackr
          </span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </header>
  );
}

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "DM Mono, monospace" }}>
        {label}
      </p>
      <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
        {value}
      </p>
      {sub && <p className="text-muted-foreground text-xs mt-1">{sub}</p>}
    </div>
  );
}