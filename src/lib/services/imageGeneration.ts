import { analyzePrompt, buildEnrichedPrompt, type PromptAnalysis } from "./promptAnalyzer";

/**
 * What: Image generation service — handles the full pipeline from
 *       prompt analysis → API request → result URL.
 * Why: Centralises all generation logic so the UI component stays thin,
 *      and swapping backends (OpenAI, Stability, custom) only requires
 *      changes here.
 * What for: Called by the Living Room page (and future category pages)
 *           when the user clicks "Generate".
 */

/* ────────────────────── Types ────────────────────── */

export type GenerationStep =
  | "idle"
  | "analyzing"
  | "uploading"
  | "generating"
  | "finalizing"
  | "done"
  | "error";

export interface GenerationProgress {
  step: GenerationStep;
  message: string;
}

export interface GenerationResult {
  imageUrl: string;
  analysis: PromptAnalysis;
  enrichedPrompt: string;
}

type ProgressCallback = (progress: GenerationProgress) => void;

/* ────────────────────── Config ────────────────────── */

const API_BASE_URL = import.meta.env.VITE_IMAGE_API_URL as string | undefined;
const API_KEY = import.meta.env.VITE_IMAGE_API_KEY as string | undefined;

/* ────────────────────── Helpers ────────────────────── */

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * What: Converts a File to a base64 data URL.
 * Why: Some generation APIs accept base64-encoded images in the request body.
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ────────────────────── Real API call ────────────────────── */

/**
 * What: Sends image + enriched prompt to the configured generation API.
 * Why: Separated from the orchestration so it can be replaced easily.
 */
async function callGenerationAPI(
  imageFile: File,
  enrichedPrompt: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("prompt", enrichedPrompt);

  const headers: Record<string, string> = {};
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  const res = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "Unknown error");
    throw new Error(`Generation API responded with ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.url ?? data.imageUrl ?? data.image_url ?? "";
}

/* ────────────────────── Simulated fallback ────────────────────── */

/**
 * What: Simulated generation for development when no API is configured.
 * Why: Lets the full UI flow work without a live backend so designers
 *      and developers can iterate on the experience.
 */
async function simulateGeneration(
  imageFile: File,
  onProgress: ProgressCallback,
): Promise<string> {
  onProgress({ step: "uploading", message: "Uploading reference image…" });
  await delay(800);

  onProgress({ step: "generating", message: "AI is generating your concept…" });
  await delay(2000);

  onProgress({ step: "finalizing", message: "Applying finishing touches…" });
  await delay(700);

  return await fileToBase64(imageFile);
}

/* ────────────────────── Public orchestrator ────────────────────── */

/**
 * What: Full generation pipeline — analyse prompt → upload → generate → return.
 * Why: Single entry point that handles progress reporting, error handling,
 *      and automatically falls back to simulation when no API is configured.
 * What for: Called by the LivingRoomPage handleGenerate function.
 */
export async function generateImage(
  imageFile: File,
  rawPrompt: string,
  onProgress: ProgressCallback,
): Promise<GenerationResult> {
  onProgress({ step: "analyzing", message: "Analyzing your prompt…" });
  await delay(600);

  const analysis = analyzePrompt(rawPrompt);
  const enrichedPrompt = buildEnrichedPrompt(rawPrompt, analysis);

  let imageUrl: string;

  const hasAPI = API_BASE_URL && API_BASE_URL.length > 0;

  if (hasAPI) {
    onProgress({ step: "uploading", message: "Uploading reference image…" });
    onProgress({ step: "generating", message: "AI is generating your concept…" });

    imageUrl = await callGenerationAPI(imageFile, enrichedPrompt);

    onProgress({ step: "finalizing", message: "Applying finishing touches…" });
    await delay(400);
  } else {
    imageUrl = await simulateGeneration(imageFile, onProgress);
  }

  onProgress({ step: "done", message: "Generation complete!" });

  return { imageUrl, analysis, enrichedPrompt };
}
