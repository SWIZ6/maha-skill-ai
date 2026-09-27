import { PulseSurveySubmission, CurriculumValidationCard } from "@/data/mockData";

export interface LiveGapAnalysis {
  trade_name: string;
  trade_code: string;
  framework: string;
  total_jobs_analyzed: number;
  match_rate: number;
  modules_covered: string[];
  missing_in_curriculum: { skill: string; frequency: number }[];
  covered_in_curriculum: { skill: string; frequency: number }[];
  top_skills_demanded: { skill: string; count: number }[];
}

export interface LiveJobItem {
  job_id: string;
  job_title: string;
  employer: string;
  city: string;
  skills_detected: string[];
  apply_link: string;
  posted_at: string;
  description_snippet: string;
}

export interface BackendHealth {
  status: string;
  service: string;
  version: string;
  python_online?: boolean;
  live_data?: {
    raw_jobs_count: number;
    parsed_skills_count: number;
    pulse_submissions_count: number;
    applied_patches_count: number;
  };
}

export const api = {
  async getHealth(): Promise<BackendHealth> {
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (!res.ok) throw new Error("Health check failed");
      return await res.json();
    } catch {
      return {
        status: "offline",
        service: "Disconnected",
        version: "0.0.0",
        python_online: false,
      };
    }
  },

  async getJobs(params?: { query?: string; city?: string; skill?: string }): Promise<LiveJobItem[]> {
    try {
      const sp = new URLSearchParams();
      if (params?.query) sp.set("query", params.query);
      if (params?.city) sp.set("city", params.city);
      if (params?.skill) sp.set("skill", params.skill);

      const qs = sp.toString();
      const res = await fetch(`/api/jobs${qs ? `?${qs}` : ""}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      return data.jobs || [];
    } catch (err) {
      console.error("Error in getJobs:", err);
      return [];
    }
  },

  async triggerFetchJobs(query: string): Promise<{ success: boolean; message: string; jobs_count: number }> {
    try {
      const res = await fetch("/api/jobs/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Job ingestion trigger failed");
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err?.message || "Failed to trigger live jobs", jobs_count: 0 };
    }
  },

  async getSkills(): Promise<{ total_jobs_parsed: number; demand_ranking: { skill: string; demandCount: number }[] }> {
    try {
      const res = await fetch("/api/skills", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch skills");
      return await res.json();
    } catch {
      return { total_jobs_parsed: 0, demand_ranking: [] };
    }
  },

  async getGapAnalysis(trade: string = "machinist"): Promise<LiveGapAnalysis | null> {
    try {
      const res = await fetch(`/api/gap-analysis?trade=${encodeURIComponent(trade)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch gap analysis");
      return await res.json();
    } catch (err) {
      console.error("Error in getGapAnalysis:", err);
      return null;
    }
  },

  async getPulseSubmissions(): Promise<PulseSurveySubmission[]> {
    try {
      const res = await fetch("/api/pulse", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch pulse submissions");
      return await res.json();
    } catch {
      return [];
    }
  },

  async createPulseSubmission(
    sub: Omit<PulseSurveySubmission, "id" | "submittedAt" | "verified">
  ): Promise<PulseSurveySubmission | null> {
    try {
      const res = await fetch("/api/pulse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      if (!res.ok) throw new Error("Failed to submit pulse");
      const data = await res.json();
      return data.submission || null;
    } catch (err) {
      console.error("Error in createPulseSubmission:", err);
      return null;
    }
  },

  async getValidationCards(): Promise<CurriculumValidationCard[]> {
    try {
      const res = await fetch("/api/validation-cards", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch validation cards");
      return await res.json();
    } catch {
      return [];
    }
  },

  async voteValidationCard(
    cardId: string,
    action: "approve" | "reject"
  ): Promise<CurriculumValidationCard | null> {
    try {
      const res = await fetch("/api/validation-cards/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId, action }),
      });
      if (!res.ok) throw new Error("Failed to vote");
      const data = await res.json();
      return data.card || null;
    } catch (err) {
      console.error("Error in voteValidationCard:", err);
      return null;
    }
  },

  async getAppliedPatches(): Promise<string[]> {
    try {
      const res = await fetch("/api/patches", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch patches");
      return await res.json();
    } catch {
      return [];
    }
  },

  async applyPatch(diffId: string): Promise<string[]> {
    try {
      const res = await fetch("/api/patches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diffId }),
      });
      if (!res.ok) throw new Error("Failed to apply patch");
      const data = await res.json();
      return data.appliedPatches || [diffId];
    } catch {
      return [diffId];
    }
  },
};
