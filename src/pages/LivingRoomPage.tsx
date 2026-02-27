import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  X,
  ImagePlus,
  Sparkles,
  Loader2,
  CheckCircle2,
  Palette,
  Hammer,
  Paintbrush,
  Sofa,
  Sun,
  AlertCircle,
  Download,
} from "lucide-react";
import type { PromptAnalysis } from "@/lib/services/promptAnalyzer";
import {
  useLivingRoomDesigner,
  STEP_CONFIG,
  TOTAL_STEPS,
} from "./hooks/useLivingRoomDesigner";

/* ────────────────────── Tag category config ────────────────────── */

/**
 * What: Maps each analysis attribute group to a label, icon, and color scheme.
 * Why: Keeps the tag rendering declarative — the JSX iterates over this
 *      array instead of duplicating markup for each category.
 */
interface TagCategory {
  key: keyof Pick<PromptAnalysis, "styles" | "materials" | "colors" | "furnitureTypes" | "moods">;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const TAG_CATEGORIES: TagCategory[] = [
  { key: "styles", label: "Style", icon: <Paintbrush className="size-3.5" />, color: "bg-violet-50 text-violet-700 border-violet-200" },
  { key: "materials", label: "Material", icon: <Hammer className="size-3.5" />, color: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: "colors", label: "Color", icon: <Palette className="size-3.5" />, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "furnitureTypes", label: "Furniture", icon: <Sofa className="size-3.5" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { key: "moods", label: "Mood", icon: <Sun className="size-3.5" />, color: "bg-rose-50 text-rose-700 border-rose-200" },
];

/* ════════════════════════════════════════════════════════════════════
 *  LivingRoomPage — Pure UI Component
 * ════════════════════════════════════════════════════════════════════ */

/**
 * What: Living Room page — upload a reference image, write a prompt,
 *       see real-time analysis, and generate a new AI-styled furniture image.
 * Why: First fully-functional dashboard tab; establishes the upload →
 *      prompt analysis → generate pattern reused by other category pages.
 * What for: Rendered inside DashboardPage when the "living-room" tab is active.
 *
 * All state and business logic live in useLivingRoomDesigner — this
 * component is responsible only for rendering and event wiring.
 */
export default function LivingRoomPage() {
  const {
    uploadedFile,
    previewUrl,
    prompt,
    setPrompt,
    result,
    progress,
    isGenerating,
    isDragOver,
    error,
    fileInputRef,
    liveAnalysis,
    canGenerate,
    currentStepIndex,
    maxFileSizeMb,
    acceptedTypes,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    handleRemoveImage,
    handleGenerate,
    handleDownload,
  } = useLivingRoomDesigner();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10">
      {/* ── Page title ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Living Room Designer
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Upload a reference photo and describe the style you want — we'll
          analyse your prompt and generate a new furniture concept.
        </p>
      </motion.div>

      {/* ── Upload area ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-8"
      >
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Reference Image
        </label>

        <AnimatePresence mode="wait">
          {!previewUrl ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 transition-colors ${
                isDragOver
                  ? "border-black bg-gray-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:bg-gray-200">
                <Upload className="size-5" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-black underline underline-offset-2">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  PNG, JPG or WebP (max {maxFileSizeMb} MB)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes}
                onChange={handleFileChange}
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-xl border border-gray-200"
            >
              <img
                src={previewUrl}
                alt="Uploaded reference"
                className="h-72 w-full object-cover sm:h-80"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
              >
                <X className="size-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/50 to-transparent px-4 pb-3 pt-8">
                <p className="truncate text-sm font-medium text-white">
                  {uploadedFile?.name}
                </p>
                <p className="text-xs text-white/70">
                  {((uploadedFile?.size ?? 0) / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Error message ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700"
          >
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Prompt input + Generate button ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="mt-6"
      >
        <label
          htmlFor="generation-prompt"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Describe your vision
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <ImagePlus className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <input
              id="generation-prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canGenerate) handleGenerate();
              }}
              placeholder="e.g. Modern minimalist sofa with oak legs and linen upholstery"
              disabled={isGenerating}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-black focus:outline-none focus:ring-4 focus:ring-black/5 disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            disabled={!canGenerate}
            onClick={handleGenerate}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {isGenerating ? "Generating…" : "Generate"}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-gray-400">
          Press{" "}
          <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 text-[10px] font-medium text-gray-500">
            Enter
          </kbd>{" "}
          to generate
        </p>
      </motion.div>

      {/* ── Live prompt analysis panel ── */}
      <AnimatePresence>
        {liveAnalysis && liveAnalysis.totalTags > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
              {/* Header row with confidence */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Prompt Analysis
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      className="h-full rounded-full bg-black"
                      initial={{ width: 0 }}
                      animate={{ width: `${liveAnalysis.confidence}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {liveAnalysis.confidence}% match
                  </span>
                </div>
              </div>

              {/* Tag groups */}
              <div className="mt-3 flex flex-wrap gap-2">
                {TAG_CATEGORIES.map((cat) => {
                  const tags = liveAnalysis[cat.key];
                  if (tags.length === 0) return null;
                  return tags.map((tag) => (
                    <motion.span
                      key={`${cat.key}-${tag}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${cat.color}`}
                    >
                      {cat.icon}
                      <span className="capitalize">{tag}</span>
                    </motion.span>
                  ));
                })}
              </div>

              {/* Low-confidence hint */}
              {liveAnalysis.confidence < 40 && (
                <p className="mt-2.5 text-xs text-gray-400">
                  Tip: Add more details about style, material, color, or
                  furniture type for better results.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Generation progress stepper ── */}
      <AnimatePresence>
        {isGenerating && progress && progress.step !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6 rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              {Object.entries(STEP_CONFIG).map(([, cfg], i) => {
                const isActive = i === currentStepIndex;
                const isCompleted = i < currentStepIndex;
                return (
                  <div key={cfg.label} className="flex items-center gap-2">
                    {i > 0 && (
                      <div
                        className={`h-px w-6 transition-colors duration-300 ${
                          isCompleted ? "bg-black" : "bg-gray-200"
                        }`}
                      />
                    )}
                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <CheckCircle2 className="size-4 text-black" />
                      ) : isActive ? (
                        <Loader2 className="size-4 animate-spin text-black" />
                      ) : (
                        <div className="size-4 rounded-full border border-gray-300" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          isActive || isCompleted
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-black"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentStepIndex + 1) / TOTAL_STEPS) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">{progress.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Generated result ── */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            {/* Result header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Generated Concept
                </h3>
                <p className="text-xs text-gray-500">
                  Based on your reference image and prompt analysis
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Download className="size-4" />
                Download
              </button>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
                  Reference
                </div>
                <img
                  src={previewUrl ?? ""}
                  alt="Reference"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
                  Generated
                </div>
                <img
                  src={result.imageUrl}
                  alt="AI-generated furniture concept"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>
            </div>

            {/* Analysis summary beneath the result */}
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <p className="mb-2 text-xs font-medium text-gray-500">
                Enriched prompt sent to AI
              </p>
              <p className="text-sm text-gray-700">
                &ldquo;{result.enrichedPrompt}&rdquo;
              </p>
              {result.analysis.totalTags > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {TAG_CATEGORIES.map((cat) => {
                    const tags = result.analysis[cat.key];
                    if (tags.length === 0) return null;
                    return tags.map((tag) => (
                      <span
                        key={`result-${cat.key}-${tag}`}
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${cat.color}`}
                      >
                        {cat.icon}
                        <span className="capitalize">{tag}</span>
                      </span>
                    ));
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
