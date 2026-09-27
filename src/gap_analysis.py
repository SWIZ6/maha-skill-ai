import json
import os
from pathlib import Path
from collections import Counter

BASE_DIR = Path(__file__).resolve().parent.parent
PROCESSED_FILE = BASE_DIR / "data" / "processed" / "parsed_skills.json"
CURRICULUM_DIR = BASE_DIR / "data" / "curriculum"
DEFAULT_CURRICULUM = CURRICULUM_DIR / "iti_sample_curriculum.json"

TRADE_FILE_MAP = {
    "machinist": "iti_sample_curriculum.json",
    "iti-mech-07": "iti_sample_curriculum.json",
    "copa": "iti_copa_curriculum.json",
    "iti-copa-01": "iti_copa_curriculum.json",
    "automobile": "iti_automobile_curriculum.json",
    "iti-auto-03": "iti_automobile_curriculum.json",
}

def resolve_curriculum_file(trade_identifier=None):
    if not trade_identifier:
        return DEFAULT_CURRICULUM
    norm = trade_identifier.lower().strip()
    if norm in TRADE_FILE_MAP:
        return CURRICULUM_DIR / TRADE_FILE_MAP[norm]
    # Check if exact file or path exists
    target = Path(trade_identifier)
    if target.exists():
        return target
    # Fallback default
    return DEFAULT_CURRICULUM

def run_gap_analysis(trade_or_file=None, processed_file=None):
    proc_path = Path(processed_file) if processed_file else PROCESSED_FILE
    curr_path = resolve_curriculum_file(trade_or_file)

    if not proc_path.exists() or not curr_path.exists():
        msg = f"[-] Required input files missing ({proc_path} or {curr_path}). Ensure previous pipeline steps were run."
        print(msg)
        return {"error": msg}

    with open(proc_path, "r", encoding="utf-8") as f:
        jobs = json.load(f)
    with open(curr_path, "r", encoding="utf-8") as f:
        curriculum = json.load(f)

    # Calculate frequency of industry requirements across parsed postings
    counter = Counter()
    for item in jobs:
        counter.update(item.get("skills_detected", []))

    curr_text = " ".join(curriculum.get("modules", [])).lower()
    missing_in_curriculum = []
    covered_in_curriculum = []

    for skill, count in counter.most_common():
        if skill.lower() in curr_text:
            covered_in_curriculum.append({"skill": skill, "frequency": count})
        else:
            missing_in_curriculum.append({"skill": skill, "frequency": count})

    total_demanded = len(covered_in_curriculum) + len(missing_in_curriculum)
    match_rate = round((len(covered_in_curriculum) / total_demanded * 100), 1) if total_demanded > 0 else 50.0

    result = {
        "trade_name": curriculum.get("trade_name", "Unknown Trade"),
        "trade_code": curriculum.get("trade_code", "ITI-GEN"),
        "framework": curriculum.get("framework", "NSQF"),
        "total_jobs_analyzed": len(jobs),
        "match_rate": match_rate,
        "modules_covered": curriculum.get("modules", []),
        "missing_in_curriculum": missing_in_curriculum,
        "covered_in_curriculum": covered_in_curriculum,
        "top_skills_demanded": [
            {"skill": s, "count": c} for s, c in counter.most_common(12)
        ],
    }

    print("\n======================================================")
    print(f"   CURRICULUM GAP ANALYSIS REPORT: {result['trade_name']}")
    print(f"   Match Rate: {match_rate}% | Postings Analyzed: {len(jobs)}")
    print("======================================================")
    print("\n[*] HIGH-DEMAND EMERGING SKILLS MISSING IN CURRICULUM:")
    for item in missing_in_curriculum:
        print(f"    - {item['skill']:<15} (Demanded in {item['frequency']} postings)")

    print("\n[*] ALIGNED TOPICS CURRENTLY COVERED:")
    for item in covered_in_curriculum:
        print(f"    - {item['skill']:<15} (Demanded in {item['frequency']} postings)")
    print("======================================================\n")

    return result

if __name__ == "__main__":
    run_gap_analysis()

