import { CheckCircle2, Clock, Eye, Users, XCircle, type LucideIcon } from "lucide-react";

export type Status = "Applied" | "Interview" | "Offer" | "Rejected" | "Screening";

export interface Job {
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

export type Page = "login" | "signup" | "dashboard" | "add-job" | "job-detail";

export const STATUSES: Status[] = ["Applied", "Screening", "Interview", "Offer", "Rejected"];

export const STATUS_CONFIG: Record<Status, { color: string; bg: string; icon: LucideIcon }> = {
  Applied: {
    color: "text-blue-300",
    bg: "bg-blue-500/15 border border-blue-500/25",
    icon: Clock,
  },
  Screening: {
    color: "text-violet-300",
    bg: "bg-violet-500/15 border border-violet-500/25",
    icon: Eye,
  },
  Interview: {
    color: "text-amber-300",
    bg: "bg-amber-500/15 border border-amber-500/25",
    icon: Users,
  },
  Offer: {
    color: "text-emerald-300",
    bg: "bg-emerald-500/15 border border-emerald-500/25",
    icon: CheckCircle2,
  },
  Rejected: {
    color: "text-red-300",
    bg: "bg-red-500/15 border border-red-500/25",
    icon: XCircle,
  },
};

export const INITIAL_JOBS: Job[] = [
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

export function formatSalary(amount: number): string {
  if (amount >= 100000) return `$${(amount / 100000).toFixed(1)}L`;
  return `$${amount.toLocaleString()}`;
}

