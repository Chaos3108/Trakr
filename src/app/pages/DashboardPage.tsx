import { useState , useEffect } from "react";
import { Briefcase, ChevronRight, DollarSign, MapPin, Plus, Search } from "lucide-react";
import { Navbar, StatCard } from "../components/AppShell";
import { formatSalary, STATUS_CONFIG, type Job, type Status } from "../types";
import { URL } from "../utils";
import { useNavigate } from "react-router-dom";

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}
      style={{ fontFamily: "DM Mono, monospace" }}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

export function DashboardPage({
  onAddJob,
  onLogout,
}: {

  onAddJob: () => void;
  onLogout: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [fetchedJobs, setFetchedJobs] = useState<Job[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const statuses: (Status | "All")[] = ["All", "Applied", "Screening", "Interview", "Offer", "Rejected"];
  const fetchJobApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log("Fetched jobs:", data);
    
      setFetchedJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobApplications();
  }, []);

  const filtered = fetchedJobs.filter((job) => {
    const matchSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || job.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: fetchedJobs.length,
    active: fetchedJobs.filter((job) => job.status !== "Rejected").length,
    interviews: fetchedJobs.filter((job) => job.status === "Interview").length,
    offers: fetchedJobs.filter((job) => job.status === "Offer").length,
  };
  const handleViewClick = (jobId: number) => {
    navigate(`/job-detail/${jobId}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-[100px]" style={{ background: "#7c5cfc" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8 blur-[100px]" style={{ background: "#f5a623" }} />
      </div>

      <Navbar onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              Job Pipeline
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">Track and manage your applications</p>
          </div>
          <button
            onClick={onAddJob}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-150 shadow-lg shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Job
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={counts.total} sub="applications" />
          <StatCard label="Active" value={counts.active} sub="in progress" />
          <StatCard label="Interviews" value={counts.interviews} sub="scheduled" />
          <StatCard label="Offers" value={counts.offers} sub="received" />
        </div>

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
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading applications...</div>
        ) : filtered.length === 0 ? (
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
                onClick={() => handleViewClick(job?.user_app_id)}
                className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:bg-card/80 transition-all duration-150 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-foreground font-bold text-sm" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {job.company[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
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