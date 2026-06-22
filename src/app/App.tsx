import { useState } from "react";
import {
  Briefcase,
  LogOut,
  Plus,
  Search,
  MapPin,
  DollarSign,
  ChevronRight,
  ArrowLeft,
  X,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Eye,
} from "lucide-react";

type Status = "Applied" | "Interview" | "Offer" | "Rejected" | "Screening";

interface Job {
  id: number;
  company: string;
  role: string;
  status: Status;
  location: string;
  salary: number;
  notes: string;
  user_id: number;
  appliedDate: string;
}

type Page = "login" | "signup" | "dashboard" | "add-job" | "job-detail";

const STATUS_CONFIG: Record<Status, { color: string; bg: string; icon: React.ReactNode }> = {
  Applied: {
    color: "text-blue-300",
    bg: "bg-blue-500/15 border border-blue-500/25",
    icon: <Clock className="w-3 h-3" />,
  },
  Screening: {
    color: "text-violet-300",
    bg: "bg-violet-500/15 border border-violet-500/25",
    icon: <Eye className="w-3 h-3" />,
  },
  Interview: {
    color: "text-amber-300",
    bg: "bg-amber-500/15 border border-amber-500/25",
    icon: <Users className="w-3 h-3" />,
  },
  Offer: {
    color: "text-emerald-300",
    bg: "bg-emerald-500/15 border border-emerald-500/25",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  Rejected: {
    color: "text-red-300",
    bg: "bg-red-500/15 border border-red-500/25",
    icon: <XCircle className="w-3 h-3" />,
  },
};

const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Engineer",
    status: "Applied",
    location: "Remote",
    salary: 2500000,
    notes: "Applied through referral",
    user_id: 1,
    appliedDate: "2026-06-10",
  },
  {
    id: 2,
    company: "Stripe",
    role: "Senior React Developer",
    status: "Interview",
    location: "San Francisco, CA",
    salary: 2200000,
    notes: "Second round scheduled for next week. Prep system design.",
    user_id: 1,
    appliedDate: "2026-06-05",
  },
  {
    id: 3,
    company: "Vercel",
    role: "Staff Engineer",
    status: "Screening",
    location: "Remote",
    salary: 2800000,
    notes: "Recruiter reached out on LinkedIn. Promising team culture.",
    user_id: 1,
    appliedDate: "2026-06-14",
  },
  {
    id: 4,
    company: "Linear",
    role: "Product Engineer",
    status: "Offer",
    location: "Remote",
    salary: 1900000,
    notes: "Offer received! Equity vesting 4 years. Negotiate for sign-on.",
    user_id: 1,
    appliedDate: "2026-05-28",
  },
  {
    id: 5,
    company: "Figma",
    role: "UI Engineer",
    status: "Rejected",
    location: "New York, NY",
    salary: 2100000,
    notes: "Passed technical screen but rejected after final loop.",
    user_id: 1,
    appliedDate: "2026-05-20",
  },
];

function formatSalary(amount: number): string {
  if (amount >= 100000) return `$${(amount / 100000).toFixed(1)}L`;
  return `$${amount.toLocaleString()}`;
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}
      style={{ fontFamily: "DM Mono, monospace" }}
    >
      {cfg.icon}
      {status}
    </span>
  );
}

function AuthPage({
  mode,
  onSwitch,
  onLogin,
}: {
  mode: "login" | "signup";
  onSwitch: () => void;
  onLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background glow */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #7c5cfc 0%, transparent 70%)" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Trackr
          </span>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <h1
            className="text-2xl font-semibold text-foreground mb-1"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            {mode === "login"
              ? "Sign in to manage your job applications"
              : "Start tracking your job search today"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-150 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 text-sm mt-2"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={onSwitch}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="font-bold text-foreground text-lg"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
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

function StatCard({
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
      <p
        className="text-3xl font-bold text-foreground"
        style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
      >
        {value}
      </p>
      {sub && <p className="text-muted-foreground text-xs mt-1">{sub}</p>}
    </div>
  );
}

function Dashboard({
  jobs,
  onAddJob,
  onViewJob,
  onLogout,
}: {
  jobs: Job[];
  onAddJob: () => void;
  onViewJob: (id: number) => void;
  onLogout: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");

  const statuses: (Status | "All")[] = ["All", "Applied", "Screening", "Interview", "Offer", "Rejected"];

  const filtered = jobs.filter((j) => {
    const matchSearch =
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: jobs.length,
    active: jobs.filter((j) => j.status !== "Rejected").length,
    interviews: jobs.filter((j) => j.status === "Interview").length,
    offers: jobs.filter((j) => j.status === "Offer").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-[100px]"
          style={{ background: "#7c5cfc" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8 blur-[100px]"
          style={{ background: "#f5a623" }}
        />
      </div>

      <Navbar onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Job Pipeline
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track and manage your applications
            </p>
          </div>
          <button
            onClick={onAddJob}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-150 shadow-lg shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={counts.total} sub="applications" />
          <StatCard label="Active" value={counts.active} sub="in progress" />
          <StatCard label="Interviews" value={counts.interviews} sub="scheduled" />
          <StatCard label="Offers" value={counts.offers} sub="received" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, role, or location…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === s
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Job List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No jobs found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((job) => (
              <button
                key={job.id}
                onClick={() => onViewJob(job.id)}
                className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:bg-card/80 transition-all duration-150 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Company logo placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-foreground font-bold text-sm" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {job.company[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3
                          className="font-semibold text-foreground group-hover:text-primary transition-colors"
                          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                        >
                          {job.role}
                        </h3>
                        <StatusBadge status={job.status} />
                      </div>
                      <p className="text-muted-foreground text-sm mt-0.5">{job.company}</p>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground" style={{ fontFamily: "DM Mono, monospace" }}>
                          <DollarSign className="w-3 h-3" />
                          {formatSalary(job.salary)}
                        </span>
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: "DM Mono, monospace" }}>
                          {new Date(job.appliedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const STATUSES: Status[] = ["Applied", "Screening", "Interview", "Offer", "Rejected"];

function AddJobPage({
  onSave,
  onCancel,
}: {
  onSave: (job: Omit<Job, "id" | "user_id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied" as Status,
    location: "",
    salary: "",
    notes: "",
    appliedDate: new Date().toISOString().split("T")[0],
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      salary: Number(form.salary) || 0,
    });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm";

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-[100px]"
          style={{ background: "#7c5cfc" }}
        />
      </div>

      <Navbar onLogout={onCancel} />

      <main className="max-w-2xl mx-auto px-6 py-10 relative z-10">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </button>

        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Add New Job
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Log a new application to your pipeline</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Company *</label>
              <input required value={form.company} onChange={set("company")} placeholder="Google" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Role *</label>
              <input required value={form.role} onChange={set("role")} placeholder="Frontend Engineer" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
              <select value={form.status} onChange={set("status")} className={inputClass}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
              <input value={form.location} onChange={set("location")} placeholder="Remote" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Salary <span className="text-muted-foreground font-normal">(annual, ₹/$ amount)</span>
              </label>
              <input
                type="number"
                value={form.salary}
                onChange={set("salary")}
                placeholder="2500000"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Date Applied</label>
              <input type="date" value={form.appliedDate} onChange={set("appliedDate")} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Notes</label>
            <textarea
              value={form.notes}
              onChange={set("notes")}
              placeholder="Applied through referral, key contacts, interview rounds…"
              rows={4}
              className={inputClass + " resize-none"}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 bg-secondary hover:bg-secondary/70 text-secondary-foreground font-semibold rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              Save Application
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function JobDetail({
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
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-[100px]"
          style={{ background: "#7c5cfc" }}
        />
      </div>

      <Navbar onLogout={onLogout} />

      <main className="max-w-3xl mx-auto px-6 py-10 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to pipeline
        </button>

        {/* Header card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-bold text-foreground flex-shrink-0"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {job.company[0]}
              </div>
              <div>
                <h1
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
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

        {/* Details grid */}
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
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date(job.appliedDate).getFullYear()}
            </p>
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

        {/* Status update */}
        <div className="bg-card border border-border rounded-xl p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              Application Status
            </h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Update
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusSave}
                  className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedStatus === s
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {s}
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

        {/* Notes */}
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

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || null;

  const handleLogin = () => setPage("dashboard");
  const handleLogout = () => { setPage("login"); setAuthMode("login"); };

  const handleAddJob = (data: Omit<Job, "id" | "user_id">) => {
    const newJob: Job = { ...data, id: Date.now(), user_id: 1 };
    setJobs((prev) => [newJob, ...prev]);
    setPage("dashboard");
  };

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setPage("dashboard");
  };

  const handleStatusChange = (id: number, status: Status) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  };

  if (page === "login" || page === "signup") {
    return (
      <AuthPage
        mode={authMode}
        onSwitch={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        onLogin={handleLogin}
      />
    );
  }

  if (page === "add-job") {
    return <AddJobPage onSave={handleAddJob} onCancel={() => setPage("dashboard")} />;
  }

  if (page === "job-detail" && selectedJob) {
    return (
      <JobDetail
        job={selectedJob}
        onBack={() => setPage("dashboard")}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Dashboard
      jobs={jobs}
      onAddJob={() => setPage("add-job")}
      onViewJob={(id) => { setSelectedJobId(id); setPage("job-detail"); }}
      onLogout={handleLogout}
    />
  );
}
