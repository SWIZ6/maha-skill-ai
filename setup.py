import os

PROJECT_TREE = {
    ".env": (
        'RAPIDAPI_KEY="b13f9ae478mshae99efd0aa8a7c9p14c782jsnac3aebf4c7e3"\n'
        'RAPIDAPI_HOST="jsearch.p.rapidapi.com"\n'
    ),
    "requirements.txt": (
        "requests>=2.31.0\n"
        "python-dotenv>=1.0.0\n"
    ),
    "README.md": (
        "# SIH26134 - Labour Market Skill Intelligence Platform\n\n"
        "### Workflow Steps:\n"
        "1. `python src/fetch_jobs.py` -> Ingests live job market signals.\n"
        "2. `python src/extract_skills.py` -> Extracts technical competencies and tools.\n"
        "3. `python src/gap_analysis.py` -> Computes curriculum gap and obsolescence.\n"
    ),
    "data/raw/.gitkeep": "",
    "data/processed/.gitkeep": "",
    "data/curriculum/iti_sample_curriculum.json": (
        "{\n"
        '    "trade_name": "Mechanic Machine Tool Maintenance / CNC Operator",\n'
        '    "framework": "NSQF Level 4",\n'
        '    "modules": [\n'
        '        "Bench Working and Fitting",\n'
        '        "Conventional Lathe and Milling Operation",\n'
        '        "Basic Hydraulics and Pneumatics",\n'
        '        "Preventive Maintenance of Machine Tools",\n'
        '        "Engineering Drawing Interpretation"\n'
        "    ]\n"
        "}\n"
    ),
    "src/__init__.py": "",
    "src/fetch_jobs.py": (
        "import os\n"
        "import json\n"
        "import requests\n"
        "from dotenv import load_dotenv\n\n"
        "load_dotenv()\n\n"
        "API_KEY = os.getenv('RAPIDAPI_KEY')\n"
        "API_HOST = os.getenv('RAPIDAPI_HOST')\n"
        "OUTPUT_FILE = 'data/raw/pune_jobs.json'\n\n"
        "def fetch_market_postings(query='CNC Operator OR Machinist in Pune, Maharashtra', num_pages=1):\n"
        "    url = f'https://{API_HOST}/search'\n"
        "    headers = {\n"
        "        'X-RapidAPI-Key': API_KEY,\n"
        "        'X-RapidAPI-Host': API_HOST\n"
        "    }\n"
        "    params = {\n"
        "        'query': query,\n"
        "        'page': '1',\n"
        "        'num_pages': str(num_pages),\n"
        "        'date_posted': 'all'\n"
        "    }\n\n"
        "    print(f'[+] Fetching live data for: \"{query}\"...')\n"
        "    response = requests.get(url, headers=headers, params=params)\n"
        "    if response.status_code != 200:\n"
        "        print(f'[-] API Error: {response.status_code} - {response.text}')\n"
        "        return\n\n"
        "    records = response.json().get('data', [])\n"
        "    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)\n"
        "    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:\n"
        "        json.dump(records, f, indent=4)\n"
        "    print(f'[✓] Ingested {len(records)} postings saved to {OUTPUT_FILE}')\n\n"
        "if __name__ == '__main__':\n"
        "    fetch_market_postings()\n"
    ),
    "src/extract_skills.py": (
        "import json\n"
        "import os\n"
        "import re\n\n"
        "INPUT_FILE = 'data/raw/pune_jobs.json'\n"
        "OUTPUT_FILE = 'data/processed/parsed_skills.json'\n\n"
        "# Skill and tool ontology for manufacturing and mechanical trades\n"
        "SKILL_TAXONOMY = [\n"
        "    'CNC', 'VMC', 'Fanuc', 'Siemens', 'PLC', 'SCADA',\n"
        "    'AutoCAD', 'SolidWorks', 'Mastercam', 'G-code', 'M-code',\n"
        "    'Hydraulics', 'Pneumatics', 'Milling', 'Lathe', 'Welding',\n"
        "    'Preventive Maintenance', 'GD&T', 'Quality Inspection'\n"
        "]\n\n"
        "def extract_skills():\n"
        "    if not os.path.exists(INPUT_FILE):\n"
        "        print(f'[-] Input file {INPUT_FILE} not found. Run src/fetch_jobs.py first.')\n"
        "        return\n\n"
        "    with open(INPUT_FILE, 'r', encoding='utf-8') as f:\n"
        "        jobs = json.load(f)\n\n"
        "    extracted_results = []\n"
        "    for job in jobs:\n"
        "        desc = (job.get('job_description') or '') + ' ' + (job.get('job_title') or '')\n"
        "        found_skills = set()\n"
        "        for token in SKILL_TAXONOMY:\n"
        "            if re.search(r'\\b' + re.escape(token) + r'\\b', desc, re.IGNORECASE):\n"
        "                found_skills.add(token)\n\n"
        "        extracted_results.append({\n"
        "            'job_id': job.get('job_id'),\n"
        "            'job_title': job.get('job_title'),\n"
        "            'employer': job.get('employer_name'),\n"
        "            'city': job.get('job_city'),\n"
        "            'skills_detected': sorted(list(found_skills))\n"
        "        })\n\n"
        "    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)\n"
        "    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:\n"
        "        json.dump(extracted_results, f, indent=4)\n"
        "    print(f'[✓] Extracted skills from {len(extracted_results)} jobs saved to {OUTPUT_FILE}')\n\n"
        "if __name__ == '__main__':\n"
        "    extract_skills()\n"
    ),
    "src/gap_analysis.py": (
        "import json\n"
        "import os\n"
        "from collections import Counter\n\n"
        "PROCESSED_FILE = 'data/processed/parsed_skills.json'\n"
        "CURRICULUM_FILE = 'data/curriculum/iti_sample_curriculum.json'\n\n"
        "def run_gap_analysis():\n"
        "    if not os.path.exists(PROCESSED_FILE) or not os.path.exists(CURRICULUM_FILE):\n"
        "        print('[-] Required input files missing. Ensure previous pipeline steps were run.')\n"
        "        return\n\n"
        "    with open(PROCESSED_FILE, 'r', encoding='utf-8') as f:\n"
        "        jobs = json.load(f)\n"
        "    with open(CURRICULUM_FILE, 'r', encoding='utf-8') as f:\n"
        "        curriculum = json.load(f)\n\n"
        "    # Calculate frequency of industry requirements\n"
        "    counter = Counter()\n"
        "    for item in jobs:\n"
        "        counter.update(item.get('skills_detected', []))\n\n"
        "    curr_text = ' '.join(curriculum.get('modules', [])).lower()\n"
        "    missing_in_curriculum = []\n"
        "    covered_in_curriculum = []\n\n"
        "    for skill, count in counter.most_common():\n"
        "        if skill.lower() in curr_text:\n"
        "            covered_in_curriculum.append({'skill': skill, 'frequency': count})\n"
        "        else:\n"
        "            missing_in_curriculum.append({'skill': skill, 'frequency': count})\n\n"
        "    print('\\n======================================================')\n"
        "    print(f\"   CURRICULUM GAP ANALYSIS REPORT: {curriculum['trade_name']}\")\n"
        "    print('======================================================')\n"
        "    print('\\n[*] HIGH-DEMAND EMERGING SKILLS MISSING IN CURRICULUM:')\n"
        "    for item in missing_in_curriculum:\n"
        "        print(f\"    - {item['skill']:<15} (Demanded in {item['frequency']} postings)\")\n\n"
        "    print('\\n[*] ALIGNED TOPICS CURRENTLY COVERED:')\n"
        "    for item in covered_in_curriculum:\n"
        "        print(f\"    - {item['skill']:<15} (Demanded in {item['frequency']} postings)\")\n"
        "    print('======================================================\\n')\n\n"
        "if __name__ == '__main__':\n"
        "    run_gap_analysis()\n"
    )
}

def bootstrap():
    for file_path, content in PROJECT_TREE.items():
        folder = os.path.dirname(file_path)
        if folder:
            os.makedirs(folder, exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Created: {file_path}")

    print("\nProject scaffolded successfully.")

if __name__ == "__main__":
    bootstrap()