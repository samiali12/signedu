"use client";

import useTranslate from "@/hooks/useTranslate";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import T from "../shared/T";

interface AIFeedbackPanelProps {
  feedback: string | null;
  loading: boolean;
  onRequest: () => void;
  signWord: string;
}

const AIFeedbackPanel = ({
  feedback,
  loading,
  onRequest,
  signWord,
}: AIFeedbackPanelProps) => {
  const getFeedbackLabel = useTranslate("Get AI Feedback");
  const retryLabel = useTranslate("Ask Again");

  return (
    <div className="bg-linear-to-br from-violet-950 to-indigo-950 border border-violet-700 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-violet-700 rounded-lg p-1.5">
            <Sparkles size={16} className="text-violet-200" />
          </div>
          <span className="text-white font-semibold text-sm">
            AI Sign Coach
          </span>
        </div>
        <span className="text-violet-500 text-xs">Powered by Gemini AI</span>
      </div>

      {!feedback && !loading && (
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <p className="text-violet-300 text-sm">
            Get personalized feedback on your hand form from AI.
          </p>
          <button
            onClick={onRequest}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition"
          >
            <Sparkles size={15} />
            {getFeedbackLabel}
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-3 py-2">
          <Loader2
            size={18}
            className="text-violet-400 animate-spin shrink-0"
          />
          <span className="text-violet-300 text-sm">
            Analyzing your sign...
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="bg-violet-900/50 border border-violet-700/50 rounded-xl px-4 py-3">
          <p className="text-violet-100 text-sm leading-relaxed">
            {feedback && <T text={feedback} />}
          </p>
        </div>
        <button
          onClick={onRequest}
          className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-xs transition w-fit"
        >
          <RefreshCw size={12} />
          {retryLabel}
        </button>
      </div>
    </div>
  );
};

export default AIFeedbackPanel;
