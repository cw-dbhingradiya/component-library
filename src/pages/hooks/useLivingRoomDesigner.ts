import {
  useState,
  useRef,
  useCallback,
  useMemo,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { analyzePrompt, type PromptAnalysis } from "@/lib/services/promptAnalyzer";
import {
  generateImage,
  type GenerationProgress,
  type GenerationStep,
  type GenerationResult,
} from "@/lib/services/imageGeneration";

/**
 * What: Maximum allowed file size for image uploads (10 MB).
 * Why: Prevents excessively large payloads before they reach any backend.
 */
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

/**
 * What: Step definitions for the generation progress stepper.
 * Why: Shared between the hook (for deriving currentStepIndex) and the UI
 *      (for rendering the progress indicator).
 */
export const STEP_CONFIG: Record<
  Exclude<GenerationStep, "idle" | "done" | "error">,
  { label: string; index: number }
> = {
  analyzing: { label: "Analyzing prompt", index: 0 },
  uploading: { label: "Uploading image", index: 1 },
  generating: { label: "Generating concept", index: 2 },
  finalizing: { label: "Finishing up", index: 3 },
};

export const TOTAL_STEPS = Object.keys(STEP_CONFIG).length;

/* ────────────────────── Return type ────────────────────── */

export interface LivingRoomDesignerState {
  /** The raw uploaded File object, or null when nothing is selected. */
  uploadedFile: File | null;
  /** Object URL of the uploaded image for <img> display. */
  previewUrl: string | null;
  /** Current prompt text entered by the user. */
  prompt: string;
  setPrompt: (value: string) => void;
  /** The generation result once complete; null before first generation. */
  result: GenerationResult | null;
  /** Live progress updates during the generation pipeline. */
  progress: GenerationProgress | null;
  /** True while the generation pipeline is running. */
  isGenerating: boolean;
  /** True when a file is being dragged over the dropzone. */
  isDragOver: boolean;
  /** User-facing error message, or null when there is none. */
  error: string | null;
  /** Ref attached to the hidden file input so the dropzone can trigger it. */
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  /** Live prompt analysis — null when prompt is too short. */
  liveAnalysis: PromptAnalysis | null;
  /** Whether the Generate button should be enabled. */
  canGenerate: boolean;
  /** 0-based index of the current progress step (-1 when idle). */
  currentStepIndex: number;
  /** Max file size constant for displaying in the UI. */
  maxFileSizeMb: number;
  /** Accepted MIME types for the file input accept attribute. */
  acceptedTypes: string;

  /* ── Handlers ── */
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  handleGenerate: () => Promise<void>;
  handleDownload: () => void;
}

/**
 * What: Encapsulates all state, validation, handlers, and derived values
 *       for the Living Room Designer page.
 * Why: Keeps the LivingRoomPage component free of business logic so the
 *      UI layer only handles rendering and event wiring — matching the
 *      hook pattern used by useLoginForm / useSignUpForm.
 * What for: Used by LivingRoomPage inside DashboardPage.
 */
export function useLivingRoomDesigner(): LivingRoomDesignerState {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ──────────────────── Live prompt analysis ──────────────────── */

  /**
   * What: Re-analyses the prompt on every keystroke.
   * Why: Gives the user instant visual feedback about which attributes
   *      the system recognises, encouraging richer prompts.
   */
  const liveAnalysis = useMemo<PromptAnalysis | null>(() => {
    if (prompt.trim().length < 2) return null;
    return analyzePrompt(prompt);
  }, [prompt]);

  /* ──────────────────── File validation ──────────────────── */

  const validateAndSetFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Please upload a PNG, JPG, or WebP image.");
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File size must be under ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const url = URL.createObjectURL(file);
      setUploadedFile(file);
      setPreviewUrl(url);
      setResult(null);
    },
    [previewUrl],
  );

  /* ──────────────────── Drag & drop handlers ──────────────────── */

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) validateAndSetFile(file);
    },
    [validateAndSetFile],
  );

  /* ──────────────────── Browse handler ──────────────────── */

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSetFile(file);
      e.target.value = "";
    },
    [validateAndSetFile],
  );

  /* ──────────────────── Remove uploaded image ──────────────────── */

  const handleRemoveImage = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setPrompt("");
    setError(null);
    setProgress(null);
  }, [previewUrl]);

  /* ──────────────────── Generate handler ──────────────────── */

  const handleGenerate = useCallback(async () => {
    if (!uploadedFile || !prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const genResult = await generateImage(
        uploadedFile,
        prompt,
        (p) => setProgress(p),
      );
      setResult(genResult);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Generation failed. Please try again.";
      setError(message);
      setProgress({ step: "error", message });
    } finally {
      setIsGenerating(false);
    }
  }, [uploadedFile, prompt]);

  /* ──────────────────── Download generated image ──────────────────── */

  const handleDownload = useCallback(() => {
    if (!result?.imageUrl) return;
    const a = document.createElement("a");
    a.href = result.imageUrl;
    a.download = `living-room-concept-${Date.now()}.png`;
    a.click();
  }, [result]);

  /* ──────────────────── Derived values ──────────────────── */

  const canGenerate = !!uploadedFile && prompt.trim().length > 0 && !isGenerating;

  const currentStepIndex =
    progress &&
    progress.step !== "idle" &&
    progress.step !== "done" &&
    progress.step !== "error"
      ? STEP_CONFIG[progress.step]?.index ?? -1
      : -1;

  return {
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
    maxFileSizeMb: MAX_FILE_SIZE_MB,
    acceptedTypes: ACCEPTED_TYPES.join(","),
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    handleRemoveImage,
    handleGenerate,
    handleDownload,
  };
}
