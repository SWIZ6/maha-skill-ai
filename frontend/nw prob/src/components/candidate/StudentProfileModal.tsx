"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { CANDIDATE_CAREER_PATHS } from "@/data/mockData";
import {
  COMPREHENSIVE_SKILLS_CATALOG,
  SKILL_CATEGORY_TABS,
} from "@/data/skillsCatalog";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  UserCheck,
  GraduationCap,
  Sparkles,
  MapPin,
  Plus,
  X,
  Target,
  Briefcase,
  CheckCircle2,
  Search,
  Check,
} from "lucide-react";

const PURSUING_COURSES = [
  "ITI Machinist",
  "ITI Computer Operator & Programming Assistant (COPA)",
  "ITI Mechanic Motor Vehicle / Automobile",
  "Diploma in Mechanical Engineering",
  "Diploma in Mechatronics & Automation",
  "B.Tech / B.E. Computer Science / IT",
  "B.Voc Renewable Energy & Solar",
  "Custom Degree / PolyTechnic",
];

const DISTRICT_CLUSTERS = [
  "Pune",
  "Mumbai",
  "Chhatrapati Sambhajinagar",
  "Nashik",
  "Nagpur",
  "Kolhapur & Sangli",
  "All Districts",
];

export const StudentProfileModal: React.FC = () => {
  const {
    studentProfile,
    updateStudentProfile,
    isProfileModalOpen,
    setIsProfileModalOpen,
  } = useApp();

  const [name, setName] = useState(studentProfile.name || "Student");
  const [pursuingCourse, setPursuingCourse] = useState(
    studentProfile.pursuingCourse || "ITI Machinist"
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    studentProfile.currentSkills?.length ? studentProfile.currentSkills : ["Lathe", "AutoCAD"]
  );
  const [targetCareerId, setTargetCareerId] = useState(
    studentProfile.targetCareerId || CANDIDATE_CAREER_PATHS[0].id
  );
  const [preferredDistrict, setPreferredDistrict] = useState(
    studentProfile.preferredDistrict || "Pune"
  );
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("All");
  const [skillSearchQuery, setSkillSearchQuery] = useState("");

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills((prev) => [...prev, trimmed]);
      setCustomSkillInput("");
    }
  };

  // Group careers by selected preferred district
  const { districtCareers, otherCareers } = useMemo(() => {
    if (preferredDistrict === "All Districts") {
      return { districtCareers: CANDIDATE_CAREER_PATHS, otherCareers: [] };
    }
    const distLower = preferredDistrict.toLowerCase();
    const inDist = CANDIDATE_CAREER_PATHS.filter(
      (c) =>
        (c.primaryDistrict && c.primaryDistrict.toLowerCase().includes(distLower)) ||
        (c.availableDistricts && c.availableDistricts.some((d) => d.toLowerCase().includes(distLower)))
    );
    const outside = CANDIDATE_CAREER_PATHS.filter(
      (c) => !inDist.some((item) => item.id === c.id)
    );
    return { districtCareers: inDist, otherCareers: outside };
  }, [preferredDistrict]);

  // Filter skills catalog based on category and search query
  const filteredCatalogSkills = useMemo(() => {
    return COMPREHENSIVE_SKILLS_CATALOG.filter((item) => {
      const matchCat = activeCategoryTab === "All" || item.category === activeCategoryTab;
      const matchQuery =
        !skillSearchQuery.trim() ||
        item.name.toLowerCase().includes(skillSearchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategoryTab, skillSearchQuery]);

  const handleSave = () => {
    const matchedPath = CANDIDATE_CAREER_PATHS.find((p) => p.id === targetCareerId);
    updateStudentProfile({
      name: name.trim() || "Student",
      pursuingCourse,
      currentSkills: selectedSkills,
      targetCareerId,
      targetCareerTitle: matchedPath ? matchedPath.roleTitle : "Target Career",
      preferredDistrict,
      isConfigured: true,
    });
    setIsProfileModalOpen(false);
  };

  return (
    <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <DialogTitle className="text-base sm:text-lg font-bold text-slate-900">
              Personalize Your Student Career Radar
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Tell us your background, skills, and target career in Maharashtra to tailor live postings and gap alerts.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <DialogContent className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
        {/* Name Input */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            Your Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sanket Shinde"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
          />
        </div>

        {/* Current Pursuing Course */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            Currently Pursuing Course / Degree
          </label>
          <select
            value={pursuingCourse}
            onChange={(e) => setPursuingCourse(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white font-medium"
          >
            {PURSUING_COURSES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Work District */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            Preferred Industrial Cluster / Work Location
          </label>
          <select
            value={preferredDistrict}
            onChange={(e) => {
              const newDist = e.target.value;
              setPreferredDistrict(newDist);
              // Pick the first career matching this district if current target is outside
              if (newDist !== "All Districts") {
                const matchedInDist = CANDIDATE_CAREER_PATHS.find(
                  (c) =>
                    c.primaryDistrict?.toLowerCase().includes(newDist.toLowerCase()) ||
                    c.availableDistricts?.some((d) => d.toLowerCase().includes(newDist.toLowerCase()))
                );
                if (matchedInDist) {
                  setTargetCareerId(matchedInDist.id);
                }
              }
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white font-medium"
          >
            {DISTRICT_CLUSTERS.map((dist) => (
              <option key={dist} value={dist}>
                📍 {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Target Career / Dream Role (Location-Aware Grouping) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-purple-600" />
              Target Career Pathways ({districtCareers.length} available in {preferredDistrict})
            </label>
            <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
              {CANDIDATE_CAREER_PATHS.length} Total Careers
            </span>
          </div>
          <select
            value={targetCareerId}
            onChange={(e) => setTargetCareerId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white font-medium"
          >
            {preferredDistrict !== "All Districts" && districtCareers.length > 0 && (
              <optgroup label={`⭐ Highly Active in ${preferredDistrict} Cluster (${districtCareers.length})`}>
                {districtCareers.map((path) => (
                  <option key={path.id} value={path.id}>
                    🎯 {path.roleTitle} — {path.avgSalary} ({path.sector})
                  </option>
                ))}
              </optgroup>
            )}

            <optgroup
              label={
                preferredDistrict !== "All Districts"
                  ? `🌐 Other Maharashtra Industrial Clusters (${otherCareers.length})`
                  : "All Available Maharashtra Career Pathways"
              }
            >
              {(preferredDistrict !== "All Districts" ? otherCareers : CANDIDATE_CAREER_PATHS).map(
                (path) => (
                  <option key={path.id} value={path.id}>
                    🎯 {path.roleTitle} ({path.primaryDistrict || path.sector})
                  </option>
                )
              )}
            </optgroup>
          </select>
        </div>

        {/* Current Acquired Skills (Rich 80+ Catalog with Search & Tabs) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              Your Acquired Skills ({selectedSkills.length} selected):
            </label>
            <span className="text-[10px] text-slate-400">Click to toggle or remove</span>
          </div>

          {/* Active Selected Skills Chips */}
          <div className="flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 bg-slate-50 rounded-xl border border-slate-200 mb-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                onClick={() => handleToggleSkill(skill)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 hover:bg-red-100 hover:text-red-700 cursor-pointer transition-colors group"
                title="Click to remove"
              >
                <span>{skill}</span>
                <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </span>
            ))}
            {selectedSkills.length === 0 && (
              <span className="text-xs text-slate-400 italic">Select your tools and skills below</span>
            )}
          </div>

          {/* Catalog Controls: Search and Category Tabs */}
          <div className="space-y-2 border border-slate-200 rounded-xl p-2.5 bg-white">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={skillSearchQuery}
                onChange={(e) => setSkillSearchQuery(e.target.value)}
                placeholder="Search 80+ skills (e.g. Fanuc, Docker, GD&T, BMS, PLC, React)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 focus:bg-white"
              />
              {skillSearchQuery && (
                <button
                  type="button"
                  onClick={() => setSkillSearchQuery("")}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1">
              {SKILL_CATEGORY_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCategoryTab(tab)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-all ${
                    activeCategoryTab === tab
                      ? "bg-purple-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Catalog Grid Chips */}
            <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-1 border border-slate-100 rounded-lg bg-slate-50/50">
              {filteredCatalogSkills.map((item) => {
                const isSelected = selectedSkills.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleToggleSkill(item.name)}
                    className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-all flex items-center gap-1 ${
                      isSelected
                        ? "bg-purple-600 text-white font-semibold shadow-2xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:text-purple-700"
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <span className="opacity-50">+</span>
                    )}
                    <span>{item.name}</span>
                    {item.popular && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" title="Popular in demand" />
                    )}
                  </button>
                );
              })}
              {filteredCatalogSkills.length === 0 && (
                <span className="text-xs text-slate-400 italic p-2">
                  No matching skills found. Add it using the custom input below!
                </span>
              )}
            </div>

            {/* Custom Skill Input */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomSkill();
                  }
                }}
                placeholder="+ Add another skill (e.g. Siemens 840D)..."
                className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddCustomSkill}
                disabled={!customSkillInput.trim()}
                className="text-xs h-7 px-2.5 shrink-0"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogFooter className="bg-slate-50 p-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2 justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsProfileModalOpen(false)}
          className="text-xs text-slate-600"
        >
          {studentProfile.isConfigured ? "Cancel" : "Skip for now"}
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs"
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
          Save & Personalize My Radar
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
