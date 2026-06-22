import { useState } from "react";
import { AuthPage } from "./pages/AuthPage";
import { AddJobPage } from "./pages/AddJobPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { INITIAL_JOBS, type Job, type Page, type Status } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) || null;

  const handleLogin = () => setPage("dashboard");

  const handleLogout = () => {
    setPage("login");
    setAuthMode("login");
    setSelectedJobId(null);
  };

  const handleAddJob = (data: Omit<Job, "id" | "user_id">) => {
    const newJob: Job = { ...data, id: Date.now(), user_id: 1 };
    setJobs((prev) => [newJob, ...prev]);
    setPage("dashboard");
  };

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    setSelectedJobId(null);
    setPage("dashboard");
  };

  const handleStatusChange = (id: number, status: Status) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, status } : job)));
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
    return <AddJobPage onSave={handleAddJob} onCancel={() => setPage("dashboard")} onLogout={handleLogout} />;
  }

  if (page === "job-detail" && selectedJob) {
    return (
      <JobDetailPage
        job={selectedJob}
        onBack={() => setPage("dashboard")}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <DashboardPage
      jobs={jobs}
      onAddJob={() => setPage("add-job")}
      onViewJob={(id) => {
        setSelectedJobId(id);
        setPage("job-detail");
      }}
      onLogout={handleLogout}
    />
  );
}
