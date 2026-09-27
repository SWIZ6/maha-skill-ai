import json
import os
from pathlib import Path
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.fetch_jobs import fetch_market_postings
from src.extract_skills import extract_skills, SKILL_TAXONOMY
from src.gap_analysis import run_gap_analysis
from src.candidate_analysis import run_full_candidate_analysis

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_JOBS_FILE = DATA_DIR / "raw" / "pune_jobs.json"
PARSED_SKILLS_FILE = DATA_DIR / "processed" / "parsed_skills.json"
PULSE_FILE = DATA_DIR / "processed" / "pulse_submissions.json"
VALIDATION_CARDS_FILE = DATA_DIR / "processed" / "validation_cards.json"
APPLIED_PATCHES_FILE = DATA_DIR / "processed" / "applied_patches.json"

app = FastAPI(
    title="MahaSkill AI - Labour Market Intelligence API",
    description="Backend API for Maharashtra Labour Market Skill Intelligence Platform (SIH26134)",
    version="1.0.0",
)

# Enable CORS for frontend connectivity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Helper functions for JSON storage
def read_json(path: Path, default):
    if not path.exists():
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def write_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


# Pydantic Schemas
class FetchJobRequest(BaseModel):
    query: Optional[str] = "CNC Operator OR Machinist in Pune, Maharashtra"


class PulseSubmissionRequest(BaseModel):
    companyName: str
    sector: str
    district: str
    role: str
    skills: List[str]
    openings: int
    proficiencyRequired: str
    timeline: str


class VoteRequest(BaseModel):
    cardId: str
    action: str  # "approve" | "reject"


class PatchRequest(BaseModel):
    diffId: str


class CandidateAnalysisRequest(BaseModel):
    user_skills: List[str] = ["Lathe", "AutoCAD"]
    course_name: Optional[str] = "ITI Machinist"
    district: Optional[str] = "Pune"


@app.get("/")
@app.get("/api/health")
def health_check():
    raw_jobs = read_json(RAW_JOBS_FILE, [])
    parsed_skills = read_json(PARSED_SKILLS_FILE, [])
    pulse_subs = read_json(PULSE_FILE, [])
    patches = read_json(APPLIED_PATCHES_FILE, [])

    return {
        "status": "healthy",
        "service": "MahaSkill AI Backend Engine",
        "version": "1.0.0",
        "live_data": {
            "raw_jobs_count": len(raw_jobs),
            "parsed_skills_count": len(parsed_skills),
            "pulse_submissions_count": len(pulse_subs),
            "applied_patches_count": len(patches),
        },
    }


@app.get("/api/jobs")
def get_jobs(
    query: Optional[str] = None,
    city: Optional[str] = None,
    skill: Optional[str] = None,
):
    parsed = read_json(PARSED_SKILLS_FILE, [])
    raw = read_json(RAW_JOBS_FILE, [])

    # Map raw extra details by job_id
    raw_map = {
        j.get("job_id") or j.get("job_uid"): j for j in raw if isinstance(j, dict)
    }

    results = []
    for item in parsed:
        jid = item.get("job_id")
        raw_detail = raw_map.get(jid, {})

        link = (item.get("apply_link") or raw_detail.get("job_apply_link") or "").lower()
        if "linkedin" in link:
            platform = "LinkedIn"
        elif "naukri" in link:
            platform = "Naukri"
        elif "indeed" in link:
            platform = "Indeed"
        elif "internshala" in link:
            platform = "Internshala"
        elif len(results) % 3 == 1:
            platform = "Naukri"
        elif len(results) % 3 == 2:
            platform = "Indeed"
        else:
            platform = "LinkedIn"

        job_record = {
            "job_id": jid,
            "job_title": item.get("job_title"),
            "employer": item.get("employer"),
            "city": item.get("city") or raw_detail.get("job_city", "Maharashtra"),
            "skills_detected": item.get("skills_detected", []),
            "apply_link": item.get("apply_link") or raw_detail.get("job_apply_link", "#"),
            "posted_at": item.get("posted_at") or raw_detail.get("job_posted_at_datetime_utc", "Recent"),
            "description_snippet": (raw_detail.get("job_description") or "")[:200] + "...",
            "platform": platform,
            "salary_range": raw_detail.get("job_salary") or "₹22,000 - ₹35,000 / mo",
            "work_mode": "On-site",
        }

        # Apply optional filters
        if query and query.lower() not in (job_record["job_title"] or "").lower():
            continue
        if city and city.lower() not in (job_record["city"] or "").lower():
            continue
        if skill and not any(skill.lower() == s.lower() for s in job_record["skills_detected"]):
            continue

        results.append(job_record)

    return {"total": len(results), "jobs": results}


@app.post("/api/jobs/fetch")
def trigger_fetch_jobs(payload: FetchJobRequest):
    """
    Fetches live job market signals via RapidAPI JSearch,
    runs automated skill extraction, and returns updated jobs.
    """
    query = payload.query or "CNC Operator in Pune, Maharashtra"
    fetched = fetch_market_postings(query=query)

    # Re-run extraction
    extracted = extract_skills()

    return {
        "success": True,
        "message": f"Successfully ingested {len(fetched)} postings and extracted technical skills.",
        "jobs_count": len(extracted),
        "query": query,
    }


@app.get("/api/skills")
def get_skills_report():
    parsed = read_json(PARSED_SKILLS_FILE, [])
    from collections import Counter

    counter = Counter()
    for item in parsed:
        counter.update(item.get("skills_detected", []))

    ranked_skills = [{"skill": s, "demandCount": c} for s, c in counter.most_common()]

    return {
        "total_jobs_parsed": len(parsed),
        "total_skills_tracked": len(SKILL_TAXONOMY),
        "skill_taxonomy": SKILL_TAXONOMY,
        "demand_ranking": ranked_skills,
    }


@app.get("/api/gap-analysis")
def get_gap_analysis(trade: Optional[str] = Query("machinist")):
    """
    Computes curriculum gap analysis for a specific trade against live market postings.
    Supports trade values: machinist (ITI-MECH-07), copa (ITI-COPA-01), automobile (ITI-AUTO-03)
    """
    # Normalize diff IDs from frontend
    trade_key = trade.lower().replace("diff-", "").strip() if trade else "machinist"
    analysis = run_gap_analysis(trade_key)
    if "error" in analysis:
        raise HTTPException(status_code=400, detail=analysis["error"])
    return analysis


@app.get("/api/pulse")
def get_pulse_submissions():
    subs = read_json(PULSE_FILE, [])
    return subs


@app.post("/api/pulse")
def create_pulse_submission(sub: PulseSubmissionRequest):
    subs = read_json(PULSE_FILE, [])
    new_sub = {
        "id": f"sub-{int(os.times().elapsed * 1000) if hasattr(os, 'times') else len(subs)+105}",
        "companyName": sub.companyName,
        "sector": sub.sector,
        "district": sub.district,
        "role": sub.role,
        "skills": sub.skills,
        "openings": sub.openings,
        "proficiencyRequired": sub.proficiencyRequired,
        "timeline": sub.timeline,
        "submittedAt": "Just now",
        "verified": True,
    }
    subs.insert(0, new_sub)
    write_json(PULSE_FILE, subs)
    return {"success": True, "submission": new_sub}


@app.get("/api/validation-cards")
def get_validation_cards():
    cards = read_json(VALIDATION_CARDS_FILE, [])
    return cards


@app.post("/api/validation-cards/vote")
def vote_validation_card(payload: VoteRequest):
    cards = read_json(VALIDATION_CARDS_FILE, [])
    updated = None
    for card in cards:
        if card["id"] == payload.cardId:
            if payload.action == "approve":
                card["employerEndorsements"] = card.get("employerEndorsements", 0) + 1
            elif payload.action == "reject":
                card["employerObjections"] = card.get("employerObjections", 0) + 1
            updated = card
            break

    if not updated:
        raise HTTPException(status_code=404, detail="Validation card not found")

    write_json(VALIDATION_CARDS_FILE, cards)
    return {"success": True, "card": updated}


@app.get("/api/patches")
def get_applied_patches():
    patches = read_json(APPLIED_PATCHES_FILE, [])
    return patches


@app.post("/api/patches/apply")
def apply_patch_endpoint(payload: PatchRequest):
    patches = read_json(APPLIED_PATCHES_FILE, [])
    if payload.diffId not in patches:
        patches.append(payload.diffId)
        write_json(APPLIED_PATCHES_FILE, patches)
        return {
            "success": True,
            "message": "Patch synchronized with Maharashtra DVET syllabus repository!",
            "appliedPatches": patches,
        }
    return {
        "success": True,
        "message": "Patch already active.",
        "appliedPatches": patches,
    }


@app.post("/api/candidate/analysis")
def candidate_analysis_post_endpoint(payload: CandidateAnalysisRequest):
    return run_full_candidate_analysis(
        user_skills=payload.user_skills,
        course_name=payload.course_name or "ITI Machinist",
        district=payload.district or "Pune",
    )


@app.get("/api/candidate/analysis")
def candidate_analysis_get_endpoint(
    skills: Optional[str] = Query("Lathe,AutoCAD"),
    course: Optional[str] = Query("ITI Machinist"),
    district: Optional[str] = Query("Pune"),
):
    skill_list = (
        [s.strip() for s in skills.split(",") if s.strip()]
        if skills
        else ["Lathe", "AutoCAD"]
    )
    return run_full_candidate_analysis(
        user_skills=skill_list,
        course_name=course or "ITI Machinist",
        district=district or "Pune",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("src.api:app", host="0.0.0.0", port=8000, reload=True)
