"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  MACRO_STATS,
  DISTRICT_METRICS,
  SYLLABUS_DIFF_DATA,
  VALIDATION_CARDS,
  PULSE_SURVEY_HISTORY,
  CANDIDATE_CAREER_PATHS,
  DistrictMetric,
  MacroStats,
  SyllabusDiffItem,
  PulseSurveySubmission,
  CurriculumValidationCard,
  CandidateRolePath,
} from "@/data/mockData";
import {
  api,
  BackendHealth,
  LiveGapAnalysis,
  LiveJobItem,
} from "@/lib/api";

export type RoleType = "policymaker" | "principal" | "employer" | "candidate";

interface AppContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedTradeDiff: string;
  setSelectedTradeDiff: (diffId: string) => void;
  appliedPatches: string[];
  applyPatch: (diffId: string) => Promise<void>;
  pulseSubmissions: PulseSurveySubmission[];
  addPulseSubmission: (sub: Omit<PulseSurveySubmission, "id" | "submittedAt" | "verified">) => Promise<void>;
  validationCards: CurriculumValidationCard[];
  voteValidationCard: (cardId: string, action: "approve" | "reject") => Promise<void>;
  candidateRole: CandidateRolePath;
  setCandidateRoleId: (id: string) => void;
  enrolledCourses: string[];
  enrollInCourse: (courseId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Backend Live Connectivity State & Methods
  backendConnected: boolean;
  backendHealth: BackendHealth | null;
  liveJobs: LiveJobItem[];
  liveGapData: LiveGapAnalysis | null;
  isLoadingBackend: boolean;
  refreshBackendData: () => Promise<void>;
  triggerJobIngestion: (query?: string) => Promise<boolean>;
  fetchTradeGapAnalysis: (tradeId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>("policymaker");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All Districts");
  const [selectedTradeDiff, setSelectedTradeDiff] = useState<string>(SYLLABUS_DIFF_DATA[0].id);
  const [appliedPatches, setAppliedPatches] = useState<string[]>([]);
  const [pulseSubmissions, setPulseSubmissions] = useState<PulseSurveySubmission[]>(PULSE_SURVEY_HISTORY);
  const [validationCards, setValidationCards] = useState<CurriculumValidationCard[]>(VALIDATION_CARDS);
  const [candidateRoleId, setCandidateRoleId] = useState<string>(CANDIDATE_CAREER_PATHS[0].id);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Backend state
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(null);
  const [liveJobs, setLiveJobs] = useState<LiveJobItem[]>([]);
  const [liveGapData, setLiveGapData] = useState<LiveGapAnalysis | null>(null);
  const [isLoadingBackend, setIsLoadingBackend] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  // Fetch gap analysis for selected trade
  const fetchTradeGapAnalysis = useCallback(async (tradeId: string) => {
    try {
      const data = await api.getGapAnalysis(tradeId);
      if (data) {
        setLiveGapData(data);
      }
    } catch (err) {
      console.error("Failed to fetch gap analysis:", err);
    }
  }, []);

  // Sync all backend data
  const refreshBackendData = useCallback(async () => {
    setIsLoadingBackend(true);
    try {
      const health = await api.getHealth();
      setBackendHealth(health);
      const isOnline = health.status !== "offline";
      setBackendConnected(isOnline);

      if (isOnline) {
        const [jobs, subs, cards, patches] = await Promise.all([
          api.getJobs(),
          api.getPulseSubmissions(),
          api.getValidationCards(),
          api.getAppliedPatches(),
        ]);

        if (jobs.length > 0) setLiveJobs(jobs);
        if (subs.length > 0) setPulseSubmissions(subs);
        if (cards.length > 0) setValidationCards(cards);
        if (patches.length > 0) setAppliedPatches(patches);

        await fetchTradeGapAnalysis(selectedTradeDiff);
      }
    } catch (err) {
      console.error("Backend refresh error:", err);
    } finally {
      setIsLoadingBackend(false);
    }
  }, [selectedTradeDiff, fetchTradeGapAnalysis]);

  // Initial load
  useEffect(() => {
    refreshBackendData();
  }, [refreshBackendData]);

  // When selected trade changes, fetch corresponding gap analysis
  useEffect(() => {
    fetchTradeGapAnalysis(selectedTradeDiff);
  }, [selectedTradeDiff, fetchTradeGapAnalysis]);

  // Trigger live job ingestion
  const triggerJobIngestion = async (query?: string): Promise<boolean> => {
    const targetQuery = query || "CNC Operator in Pune, Maharashtra";
    setIsLoadingBackend(true);
    showToast(`Triggering live job ingestion for: "${targetQuery}"...`);

    const result = await api.triggerFetchJobs(targetQuery);
    if (result.success) {
      showToast(result.message || "Live market postings ingested & skills extracted successfully!");
      await refreshBackendData();
      setIsLoadingBackend(false);
      return true;
    } else {
      showToast("Notice: Ingestion pipeline updated from cached signals.");
      await refreshBackendData();
      setIsLoadingBackend(false);
      return false;
    }
  };

  const applyPatch = async (diffId: string) => {
    if (!appliedPatches.includes(diffId)) {
      setAppliedPatches((prev) => [...prev, diffId]);
      showToast("Patch successfully approved & synchronized with Maharashtra DVET syllabus repository!");
      try {
        const updated = await api.applyPatch(diffId);
        setAppliedPatches(updated);
      } catch (err) {
        console.error("Error persisting patch:", err);
      }
    } else {
      showToast("Curriculum patch is already applied and active.");
    }
  };

  const addPulseSubmission = async (sub: Omit<PulseSurveySubmission, "id" | "submittedAt" | "verified">) => {
    const newSubmission: PulseSurveySubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      submittedAt: "Just now",
      verified: true,
    };
    setPulseSubmissions((prev) => [newSubmission, ...prev]);
    showToast(`Hiring demand for ${sub.openings} positions submitted! Added to regional LMI radar.`);

    try {
      const created = await api.createPulseSubmission(sub);
      if (created) {
        setPulseSubmissions((prev) => [created, ...prev.filter((p) => p.id !== newSubmission.id)]);
      }
    } catch (err) {
      console.error("Error creating pulse:", err);
    }
  };

  const voteValidationCard = async (cardId: string, action: "approve" | "reject") => {
    setValidationCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          return {
            ...c,
            employerEndorsements: action === "approve" ? c.employerEndorsements + 1 : c.employerEndorsements,
            employerObjections: action === "reject" ? c.employerObjections + 1 : c.employerObjections,
          };
        }
        return c;
      })
    );
    showToast(
      action === "approve"
        ? "Curriculum patch endorsed! Thank you for industry validation."
        : "Revision feedback recorded for steering committee review."
    );

    try {
      await api.voteValidationCard(cardId, action);
    } catch (err) {
      console.error("Error voting card:", err);
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses((prev) => [...prev, courseId]);
      showToast("Application submitted successfully! MahaKaushalya admission ticket generated.");
    }
  };

  const candidateRole =
    CANDIDATE_CAREER_PATHS.find((p) => p.id === candidateRoleId) || CANDIDATE_CAREER_PATHS[0];

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        selectedDistrict,
        setSelectedDistrict,
        selectedTradeDiff,
        setSelectedTradeDiff,
        appliedPatches,
        applyPatch,
        pulseSubmissions,
        addPulseSubmission,
        validationCards,
        voteValidationCard,
        candidateRole,
        setCandidateRoleId,
        enrolledCourses,
        enrollInCourse,
        toastMessage,
        showToast,
        backendConnected,
        backendHealth,
        liveJobs,
        liveGapData,
        isLoadingBackend,
        refreshBackendData,
        triggerJobIngestion,
        fetchTradeGapAnalysis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
