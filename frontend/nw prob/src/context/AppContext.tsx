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
  CandidateAnalysisResult,
} from "@/lib/api";

export type RoleType = "policymaker" | "principal" | "employer" | "candidate";

export interface StudentProfile {
  name: string;
  pursuingCourse: string;
  currentSkills: string[];
  targetCareerId: string;
  targetCareerTitle: string;
  experienceLevel: "Fresher" | "Final Year Trainee" | "Experienced (1-2 yrs)";
  preferredDistrict: string;
  isConfigured: boolean;
}

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

  // Candidate Intelligence (Gapped Skill Knowledge, Course Gap Alert, Future Predictions)
  candidateSkills: string[];
  setCandidateSkills: React.Dispatch<React.SetStateAction<string[]>>;
  candidateCourse: string;
  setCandidateCourse: (course: string) => void;
  candidateAnalysis: CandidateAnalysisResult | null;
  isAnalyzingCandidate: boolean;
  refreshCandidateAnalysis: (skills?: string[], course?: string, district?: string) => Promise<void>;

  // Student Persona Profile Setup
  studentProfile: StudentProfile;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: "Student",
  pursuingCourse: "ITI Machinist",
  currentSkills: ["Lathe", "AutoCAD"],
  targetCareerId: "path-cnc",
  targetCareerTitle: "Precision 5-Axis CNC & CAM Specialist",
  experienceLevel: "Final Year Trainee",
  preferredDistrict: "Pune",
  isConfigured: false,
};

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

  // Student Persona Profile Setup state
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(DEFAULT_STUDENT_PROFILE);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Backend state
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(null);
  const [liveJobs, setLiveJobs] = useState<LiveJobItem[]>([]);
  const [liveGapData, setLiveGapData] = useState<LiveGapAnalysis | null>(null);
  const [isLoadingBackend, setIsLoadingBackend] = useState<boolean>(false);

  // Candidate Analysis state
  const [candidateSkills, setCandidateSkills] = useState<string[]>(["Lathe", "AutoCAD"]);
  const [candidateCourse, setCandidateCourse] = useState<string>("ITI Machinist");
  const [candidateAnalysis, setCandidateAnalysis] = useState<CandidateAnalysisResult | null>(null);
  const [isAnalyzingCandidate, setIsAnalyzingCandidate] = useState<boolean>(false);

  // Load saved student profile from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("mahaskill_student_profile");
        if (stored) {
          const parsed = JSON.parse(stored) as StudentProfile;
          setStudentProfile(parsed);
          if (parsed.currentSkills?.length) setCandidateSkills(parsed.currentSkills);
          if (parsed.pursuingCourse) setCandidateCourse(parsed.pursuingCourse);
          if (parsed.targetCareerId) setCandidateRoleId(parsed.targetCareerId);
          if (parsed.preferredDistrict && parsed.preferredDistrict !== "All Districts") {
            setSelectedDistrict(parsed.preferredDistrict);
          }
        }
      } catch {}
    }
  }, []);

  const handleSetRole = (newRole: RoleType) => {
    setRole(newRole);
    if (newRole === "candidate" && !studentProfile.isConfigured) {
      setIsProfileModalOpen(true);
    }
  };

  const updateStudentProfile = (newVals: Partial<StudentProfile>) => {
    setStudentProfile((prev) => {
      const updated = { ...prev, ...newVals, isConfigured: true };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("mahaskill_student_profile", JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });

    if (newVals.currentSkills && newVals.currentSkills.length > 0) {
      setCandidateSkills(newVals.currentSkills);
    }
    if (newVals.pursuingCourse) {
      setCandidateCourse(newVals.pursuingCourse);
    }
    if (newVals.targetCareerId) {
      setCandidateRoleId(newVals.targetCareerId);
    }
    if (newVals.preferredDistrict && newVals.preferredDistrict !== "All Districts") {
      setSelectedDistrict(newVals.preferredDistrict);
    }
    showToast("Profile personalized! Tailored jobs and curriculum gap radar updated.");
  };

  const refreshCandidateAnalysis = useCallback(
    async (skills?: string[], course?: string, district?: string) => {
      setIsAnalyzingCandidate(true);
      try {
        const skillsToUse = skills || candidateSkills;
        const courseToUse = course || candidateCourse;
        const districtToUse =
          district || (selectedDistrict === "All Districts" ? "Pune" : selectedDistrict);

        const result = await api.getCandidateAnalysis(skillsToUse, courseToUse, districtToUse);
        if (result) {
          setCandidateAnalysis(result);
        }
      } catch (err) {
        console.error("Candidate analysis refresh error:", err);
      } finally {
        setIsAnalyzingCandidate(false);
      }
    },
    [candidateSkills, candidateCourse, selectedDistrict]
  );

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

  // Trigger candidate analysis when skills, course, or district changes
  useEffect(() => {
    refreshCandidateAnalysis();
  }, [refreshCandidateAnalysis]);

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
        setRole: handleSetRole,
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
        candidateSkills,
        setCandidateSkills,
        candidateCourse,
        setCandidateCourse,
        candidateAnalysis,
        isAnalyzingCandidate,
        refreshCandidateAnalysis,
        studentProfile,
        updateStudentProfile,
        isProfileModalOpen,
        setIsProfileModalOpen,
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
