import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../components/AppShell";
import { STATUSES, type Job, type Status } from "../types";
import axios from "axios";
import { URL } from "../utils";
import { useNavigate } from "react-router-dom";

export function AddJobPage({
  onCancel,
  onLogout,
}: {
  onCancel: () => void;
  onLogout: () => void;
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
  const navigate = useNavigate();

  const set =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const submit  = axios.post(`${URL}/applications`, form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Job submitted successfully:", submit);
    navigate("/dashboard");
  }
    catch (error) {
      console.error("Error submitting job:", error);
    }
    
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm";

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-[100px]" style={{ background: "#7c5cfc" }} />
      </div>

      <Navbar onLogout={onLogout} />

      <main className="max-w-2xl mx-auto px-6 py-10 relative z-10">
        <button onClick={onCancel} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
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
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
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
              <input type="number" value={form.salary} onChange={set("salary")} placeholder="2500000" className={inputClass} />
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
            <button type="button" onClick={onCancel} className="flex-1 py-2.5 bg-secondary hover:bg-secondary/70 text-secondary-foreground font-semibold rounded-xl transition-all text-sm">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 text-sm">
              Save Application
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}