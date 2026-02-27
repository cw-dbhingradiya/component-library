/**
 * What: Client-side prompt analysis engine for furniture image generation.
 * Why: Extracts structured attributes (style, material, color, furniture type,
 *      mood) from free-text prompts so the UI can display analysis tags and
 *      the generation API receives well-structured parameters.
 * What for: Powers the "Prompt Analysis" panel in the Living Room Designer
 *           and enriches the payload sent to the image generation backend.
 */

/* ────────────────────── Vocabulary dictionaries ────────────────────── */

const STYLE_KEYWORDS = [
  "modern", "minimalist", "contemporary", "traditional", "rustic",
  "industrial", "scandinavian", "mid-century", "bohemian", "art deco",
  "farmhouse", "coastal", "vintage", "classic", "luxury", "japandi",
  "retro", "eclectic", "urban", "transitional",
] as const;

const MATERIAL_KEYWORDS = [
  "oak", "walnut", "teak", "pine", "birch", "mahogany", "bamboo",
  "wood", "wooden", "leather", "velvet", "linen", "cotton", "silk",
  "marble", "granite", "glass", "metal", "steel", "iron", "brass",
  "copper", "ceramic", "rattan", "wicker", "fabric", "stone",
] as const;

const COLOR_KEYWORDS = [
  "white", "black", "gray", "grey", "beige", "cream", "ivory",
  "brown", "tan", "navy", "blue", "green", "olive", "sage",
  "terracotta", "rust", "burgundy", "red", "orange", "yellow",
  "gold", "silver", "pink", "blush", "charcoal", "taupe", "neutral",
] as const;

const FURNITURE_KEYWORDS = [
  "sofa", "couch", "sectional", "loveseat", "armchair", "chair",
  "recliner", "ottoman", "coffee table", "side table", "end table",
  "bookshelf", "shelving", "tv stand", "console", "cabinet",
  "dresser", "nightstand", "bed", "desk", "bench", "stool",
  "lamp", "chandelier", "rug", "curtain", "cushion", "pillow",
] as const;

const MOOD_KEYWORDS = [
  "cozy", "warm", "bright", "airy", "elegant", "sophisticated",
  "playful", "calm", "serene", "bold", "dramatic", "inviting",
  "spacious", "compact", "open", "intimate", "luxurious", "simple",
  "clean", "organic", "natural", "sleek", "chic",
] as const;

/* ────────────────────── Types ────────────────────── */

export interface PromptAnalysis {
  styles: string[];
  materials: string[];
  colors: string[];
  furnitureTypes: string[];
  moods: string[];
  /** Total count of recognised attributes — 0 means nothing was detected. */
  totalTags: number;
  /** A confidence score from 0–100 based on how many attributes were found. */
  confidence: number;
  /** The cleaned, normalised version of the original prompt. */
  normalizedPrompt: string;
}

/* ────────────────────── Helper ────────────────────── */

/**
 * What: Scans the normalised prompt for all matching keywords from a list.
 * Why: Reused by every category (style, material, etc.) to avoid duplication.
 */
function extractMatches(text: string, dictionary: readonly string[]): string[] {
  const matches: string[] = [];
  for (const keyword of dictionary) {
    const pattern = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (pattern.test(text)) {
      matches.push(keyword);
    }
  }
  return matches;
}

/* ────────────────────── Public API ────────────────────── */

/**
 * What: Analyses a free-text prompt and returns structured attributes.
 * Why: Lets the UI show immediate feedback (tags) and enriches the
 *      generation request with structured data.
 * What for: Called before the generate request in the Living Room page.
 */
export function analyzePrompt(rawPrompt: string): PromptAnalysis {
  const normalizedPrompt = rawPrompt.trim().toLowerCase();

  const styles = extractMatches(normalizedPrompt, STYLE_KEYWORDS);
  const materials = extractMatches(normalizedPrompt, MATERIAL_KEYWORDS);
  const colors = extractMatches(normalizedPrompt, COLOR_KEYWORDS);
  const furnitureTypes = extractMatches(normalizedPrompt, FURNITURE_KEYWORDS);
  const moods = extractMatches(normalizedPrompt, MOOD_KEYWORDS);

  const totalTags =
    styles.length + materials.length + colors.length +
    furnitureTypes.length + moods.length;

  /**
   * What: Simple confidence heuristic — more recognised keywords = higher score.
   * Why: Gives the user a quick visual hint of how well the system understood
   *      their prompt, encouraging them to add more detail if it's low.
   */
  const confidence = Math.min(100, Math.round((totalTags / 5) * 100));

  return {
    styles,
    materials,
    colors,
    furnitureTypes,
    moods,
    totalTags,
    confidence,
    normalizedPrompt,
  };
}

/**
 * What: Builds an enriched prompt string from the analysis for the API.
 * Why: Structured keywords appended to the original prompt improve
 *      generation quality by making intent explicit to the model.
 * What for: Used as the final prompt payload sent to the generation endpoint.
 */
export function buildEnrichedPrompt(
  original: string,
  analysis: PromptAnalysis,
): string {
  const parts: string[] = [original.trim()];

  if (analysis.styles.length > 0) {
    parts.push(`Style: ${analysis.styles.join(", ")}`);
  }
  if (analysis.materials.length > 0) {
    parts.push(`Materials: ${analysis.materials.join(", ")}`);
  }
  if (analysis.colors.length > 0) {
    parts.push(`Colors: ${analysis.colors.join(", ")}`);
  }
  if (analysis.moods.length > 0) {
    parts.push(`Mood: ${analysis.moods.join(", ")}`);
  }

  return parts.join(". ");
}
