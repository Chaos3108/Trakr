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
  user_app_id: number; 
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



export function formatSalary(amount: number): string {
  if (amount >= 100000) return `$${(amount / 100000).toFixed(1)}L`;
  return `$${amount.toLocaleString()}`;
}

