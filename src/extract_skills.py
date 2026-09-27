import json
import os
from pathlib import Path
import re

BASE_DIR = Path(__file__).resolve().parent.parent
INPUT_FILE = BASE_DIR / "data" / "raw" / "pune_jobs.json"
OUTPUT_FILE = BASE_DIR / "data" / "processed" / "parsed_skills.json"

# Comprehensive skill and tool taxonomy across technical domains
SKILL_TAXONOMY = [
    # Precision Manufacturing & Machining
    'CNC', 'VMC', 'Fanuc', 'Siemens', 'PLC', 'SCADA',
    'AutoCAD', 'SolidWorks', 'Mastercam', 'G-code', 'M-code',
    'Hydraulics', 'Pneumatics', 'Milling', 'Lathe', 'Welding',
    'Preventive Maintenance', 'GD&T', 'Quality Inspection', 'Metrology', 'CMM',
    # IT, Web & Cloud
    'React', 'Next.js', 'Node.js', 'Express', 'JavaScript', 'TypeScript',
    'Python', 'PostgreSQL', 'MongoDB', 'SQL', 'Docker', 'Git', 'GitHub',
    'AWS', 'Azure', 'Cloud', 'REST API', 'CI/CD', 'Prompt Engineering', 'AI',
    # Automotive, EV & Mechatronics
    'EV', 'Electric Vehicle', 'BMS', 'Battery Management', 'CAN-Bus', 'OBD-II',
    'High Voltage Safety', 'Powertrain', 'Telematics', 'Thermal Management',
    'Inverter', 'Sensors', 'Robotics', 'Mechatronics',
    # Renewable Energy & Electrical
    'Solar PV', 'Net Metering', 'Grid Safety', 'Transformer', 'Earthing'
]

def extract_skills(input_file=None, output_file=None):
    src_file = Path(input_file) if input_file else INPUT_FILE
    dst_file = Path(output_file) if output_file else OUTPUT_FILE

    if not src_file.exists():
        print(f'[-] Input file {src_file} not found. Run src/fetch_jobs.py first.')
        return []

    with open(src_file, 'r', encoding='utf-8') as f:
        jobs = json.load(f)

    extracted_results = []
    for job in jobs:
        desc = (job.get('job_description') or '') + ' ' + (job.get('job_title') or '') + ' ' + (job.get('job_highlights', {}).get('Qualifications', [''])[0] if isinstance(job.get('job_highlights'), dict) else '')
        found_skills = set()
        for token in SKILL_TAXONOMY:
            pattern = r'(?<![A-Za-z0-9])' + re.escape(token) + r'(?![A-Za-z0-9])'
            if re.search(pattern, desc, re.IGNORECASE):
                found_skills.add(token)

        extracted_results.append({
            'job_id': job.get('job_id') or job.get('job_uid'),
            'job_title': job.get('job_title'),
            'employer': job.get('employer_name'),
            'city': job.get('job_city') or job.get('job_location'),
            'apply_link': job.get('job_apply_link'),
            'posted_at': job.get('job_posted_at_datetime_utc') or job.get('job_posted_at'),
            'skills_detected': sorted(list(found_skills))
        })

    dst_file.parent.mkdir(parents=True, exist_ok=True)
    with open(dst_file, 'w', encoding='utf-8') as f:
        json.dump(extracted_results, f, indent=4)
    print(f'[✓] Extracted skills from {len(extracted_results)} jobs saved to {dst_file}')
    return extracted_results

if __name__ == '__main__':
    extract_skills()

