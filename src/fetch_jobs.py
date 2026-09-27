import json
import os
from pathlib import Path
import requests
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

API_KEY = os.getenv("RAPIDAPI_KEY")
API_HOST = os.getenv("RAPIDAPI_HOST", "jsearch.p.rapidapi.com")
OUTPUT_FILE = BASE_DIR / "data" / "raw" / "pune_jobs.json"


def fetch_market_postings(
    query="CNC Operator OR Machinist in Pune, Maharashtra",
    output_file=None,
):
    target_path = Path(output_file) if output_file else OUTPUT_FILE
    url = f"https://{API_HOST}/search-v2"
    headers = {"X-RapidAPI-Key": API_KEY, "X-RapidAPI-Host": API_HOST}
    params = {
        "query": query,
        "country": "in",
        "page": "1",
        "num_pages": "1",
        "date_posted": "all",
    }

    print(f'[+] Fetching live data for: "{query}"...')
    try:
        response = requests.get(url, headers=headers, params=params, timeout=15)
        if response.status_code != 200:
            # Fallback to /search if /search-v2 returns error
            url_alt = f"https://{API_HOST}/search"
            response = requests.get(url_alt, headers=headers, params=params, timeout=15)

        if response.status_code != 200:
            print(f"[-] API Error: {response.status_code} - {response.text}")
            return []

        res_json = response.json()
        data_field = res_json.get("data", [])
        if isinstance(data_field, dict):
            records = data_field.get("jobs", [])
        elif isinstance(data_field, list):
            records = data_field
        else:
            records = []

        target_path.parent.mkdir(parents=True, exist_ok=True)
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(records, f, indent=4)

        print(f"[✓] Successfully retrieved {len(records)} jobs into {target_path}")
        return records
    except Exception as e:
        print(f"[-] Request failed: {e}")
        return []


if __name__ == "__main__":
    fetch_market_postings()