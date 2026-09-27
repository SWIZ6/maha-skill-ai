import path from "path";
import fs from "fs";

export const PYTHON_BACKEND_URL =
  process.env.PYTHON_BACKEND_URL || "http://127.0.0.1:8000";

const DATA_DIR = path.resolve(process.cwd(), "../../data");

export function getJsonFile<T>(relativePath: string, defaultValue: T): T {
  try {
    const fullPath = path.join(DATA_DIR, relativePath);
    if (!fs.existsSync(fullPath)) {
      return defaultValue;
    }
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${relativePath}:`, error);
    return defaultValue;
  }
}

export function writeJsonFile<T>(relativePath: string, data: T): boolean {
  try {
    const fullPath = path.join(DATA_DIR, relativePath);
    const parentDir = path.dirname(fullPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 4), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing ${relativePath}:`, error);
    return false;
  }
}

export async function forwardToPython(
  endpoint: string,
  options?: RequestInit,
  timeoutMs: number = 3000
): Promise<Response | null> {
  const url = `${PYTHON_BACKEND_URL}${endpoint}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      cache: "no-store",
    });
    clearTimeout(id);
    return response;
  } catch {
    clearTimeout(id);
    return null;
  }
}
