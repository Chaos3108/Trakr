import { useState } from "react";
import { ArrowLeft, Building2, Clock, DollarSign, FileText, MapPin, X } from "lucide-react";
import { Navbar } from "../components/AppShell";
import { formatSalary, STATUSES, STATUS_CONFIG, type Job, type Status } from "../types";

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`} style={{ fontFamily: "DM Mono, monospace" }}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

export function JobDetailPage({
  job,
  onBack,
  onDelete,
  onStatusChange,
  onLogout,
}: {
  job: Job;
  onBack: () => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
  onLogout: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(job.status);

  const handleStatusSave = () => {
    onStatusChange(job.id, selectedStatus);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-[100px]" style={{ background: "#7c5cfc" }} />
      </div>

      <Navbar onLogout={onLogout} />

      <main className="max-w-3xl mx-auto px-6 py-10 relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to pipeline
        </button>

        <div className="bg-card border border-border rounded-2xl p-8 mb-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-bold text-foreground flex-shrink-0" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                {job.company[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                  {job.role}
                </h1>
                <p className="text-muted-foreground mt-0.5">{job.company}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <StatusBadge status={job.status} />
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDelete(job.id)}
              className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/10"
              title="Delete application"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "DM Mono, monospace" }}>
              <DollarSign className="w-3.5 h-3.5" />
              Salary
            </div>
            <p className="text-xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              {formatSalary(job.salary)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">per year</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "DM Mono, monospace" }}>
              <Clock className="w-3.5 h-3.5" />
              Applied On
            </div>
            <p className="text-xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              {new Date(job.appliedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{new Date(job.appliedDate).getFullYear()}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "DM Mono, monospace" }}>
              <Building2 className="w-3.5 h-3.5" />
              Company
            </div>
            <p className="text-xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              {job.company}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{job.location}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              Application Status
            </h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                Update
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button onClick={handleStatusSave} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                  Save
                </button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <StatusBadge status={job.status} />
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${(["Applied", "Screening", "Interview", "Offer"].indexOf(job.status) + 1) * 25}%`,
                    background: job.status === "Rejected" ? "#e05252" : "#7c5cfc",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              Notes
            </h2>
          </div>
          {job.notes ? (
            <p className="text-sm text-foreground leading-relaxed">{job.notes}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">No notes added for this application.</p>
          )}
        </div>
      </main>
    </div>
  );
}
