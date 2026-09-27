"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CANDIDATE_CAREER_PATHS } from "@/data/mockData";
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

const POPULAR_SKILLS = [
  "Lathe",
  "Milling",
  "AutoCAD",
  "Bench Working",
  "CNC",
  "Fanuc",
  "GD&T",
  "VMC",
  "G-code",
  "Hydraulics",
  "Pneumatics",
  "Preventive Maintenance",
  "Welding",
  "PLC",
  "Python",
  "React",
  "Docker",
  "EV",
  "BMS",
  "Solar PV",
];

const DISTRICT_CLUSTERS = [
  "Pune",
  "Mumbai",
  "Chhatrapati Sambhajinagar",
  "Nashik",
  "Nagpur",
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
              Tell us about yourself to tailor live job postings, curriculum alerts, and course recommendations.
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

        {/* Target Career / Dream Role */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
            <Target className="w-3.5 h-3.5 text-purple-600" />
            Target Career / Dream Job Role
          </label>
          <select
            value={targetCareerId}
            onChange={(e) => setTargetCareerId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white font-medium"
          >
            {CANDIDATE_CAREER_PATHS.map((path) => (
              <option key={path.id} value={path.id}>
                🎯 {path.roleTitle} ({path.sector})
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
            onChange={(e) => setPreferredDistrict(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white font-medium"
          >
            {DISTRICT_CLUSTERS.map((dist) => (
              <option key={dist} value={dist}>
                📍 {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Current Acquired Skills */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              Your Current Acquired Skills ({selectedSkills.length}):
            </label>
            <span className="text-[10px] text-slate-400">Click to toggle</span>
          </div>

          {/* Active Skills Display */}
          <div className="flex flex-wrap items-center gap-1.5 min-h-[36px] p-2 bg-slate-50 rounded-xl border border-slate-200 mb-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                onClick={() => handleToggleSkill(skill)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 hover:bg-red-100 hover:text-red-700 cursor-pointer transition-colors"
                title="Click to remove"
              >
                <span>{skill}</span>
                <X className="w-3 h-3 opacity-60" />
              </span>
            ))}
            {selectedSkills.length === 0 && (
              <span className="text-xs text-slate-400 italic">Select at least one skill below</span>
            )}
          </div>

          {/* Suggested Skill Chips */}
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 border border-slate-100 rounded-lg bg-white">
            {POPULAR_SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleToggleSkill(skill)}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-all ${
                    isSelected
                      ? "bg-purple-600 text-white font-semibold"
                      : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  {isSelected ? "✓ " : "+ "}
                  {skill}
                </button>
              );
            })}
          </div>

          {/* Custom Skill Input */}
          <div className="flex items-center gap-2 mt-2">
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
              placeholder="Add other skill (e.g. Siemens Sinumerik)..."
              className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleAddCustomSkill}
              disabled={!customSkillInput.trim()}
              className="text-xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add
            </Button>
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
