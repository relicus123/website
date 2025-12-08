"use client";

import { useState } from "react";

interface ChatbotPanelProps {
  onComplete: (score: number) => void;
}

const PHQ2_QUESTIONS = [
  "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?",
  "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
];

const GAD2_QUESTIONS = [
  "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
  "Over the last 2 weeks, how often have you been unable to stop or control worrying?",
];

const RESPONSE_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function ChatbotPanel({ onComplete }: ChatbotPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [currentResponse, setCurrentResponse] = useState<number | null>(null);

  const allQuestions = [...PHQ2_QUESTIONS, ...GAD2_QUESTIONS];
  const totalSteps = allQuestions.length + 1; // +1 for result screen

  const handleResponse = (value: number) => {
    setCurrentResponse(value);
  };

  const handleNext = () => {
    if (currentResponse === null) return;

    const newResponses = [...responses, currentResponse];
    setResponses(newResponses);
    setCurrentResponse(null);

    if (step < allQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate total score
      const totalScore = newResponses.reduce((sum, val) => sum + val, 0);
      setStep(step + 1); // Move to result screen
    }
  };

  const handleRestart = () => {
    setStep(0);
    setResponses([]);
    setCurrentResponse(null);
  };

  const handleUseScore = () => {
    const totalScore = responses.reduce((sum, val) => sum + val, 0);
    onComplete(totalScore);
    setIsOpen(false);
    handleRestart();
  };

  const getTotalScore = () => responses.reduce((sum, val) => sum + val, 0);

  const getScoreInterpretation = (score: number) => {
    if (score <= 2)
      return { level: "Minimal", color: "text-green-600", bg: "bg-green-50" };
    if (score <= 5)
      return { level: "Mild", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (score <= 8)
      return {
        level: "Moderate",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    return { level: "Severe", color: "text-red-600", bg: "bg-red-50" };
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brand-green text-white px-6 py-3 rounded-full shadow-lg hover:bg-brand-dark transition-colors font-semibold flex items-center gap-2 z-40"
      >
        <span>💬</span>
        <span>Mental Health Screening</span>
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl border border-brand-light z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-brand-dark text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">PHQ-2 & GAD-2 Screening</h3>
              <p className="text-sm text-brand-blue">
                {step < allQuestions.length
                  ? `Question ${step + 1} of ${allQuestions.length}`
                  : "Results"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {step < allQuestions.length ? (
              <div className="space-y-4">
                {/* Question */}
                <div className="bg-brand-blue/20 rounded-lg p-4">
                  <p className="text-brand-dark font-medium">
                    {allQuestions[step]}
                  </p>
                </div>

                {/* Response Options */}
                <div className="space-y-2">
                  {RESPONSE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleResponse(option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                        currentResponse === option.value
                          ? "border-brand-green bg-brand-green/10 text-brand-dark font-medium"
                          : "border-brand-light hover:border-brand-green/50 text-slate-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex gap-3 pt-4">
                  {step > 0 && (
                    <button
                      onClick={() => {
                        setStep(step - 1);
                        setCurrentResponse(responses[step - 1] ?? null);
                        setResponses(responses.slice(0, -1));
                      }}
                      className="px-4 py-2 border border-brand-dark text-brand-dark rounded-lg hover:bg-brand-light"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={currentResponse === null}
                    className={`flex-1 py-2 rounded-lg font-semibold transition ${
                      currentResponse !== null
                        ? "bg-brand-green text-white hover:bg-brand-dark"
                        : "bg-brand-light text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {step === allQuestions.length - 1 ? "See Results" : "Next"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Results */}
                <div className="text-center py-4">
                  <div className="text-5xl font-bold text-brand-dark mb-2">
                    {getTotalScore()}
                  </div>
                  <p className="text-slate-600 text-sm">
                    Total Score (out of 12)
                  </p>
                </div>

                {(() => {
                  const interpretation = getScoreInterpretation(
                    getTotalScore()
                  );
                  return (
                    <div className={`rounded-lg p-4 ${interpretation.bg}`}>
                      <p
                        className={`font-semibold ${interpretation.color} text-center text-lg`}
                      >
                        {interpretation.level} symptoms detected
                      </p>
                    </div>
                  );
                })()}

                <div className="bg-brand-light/50 rounded-lg p-4 text-sm text-slate-700 space-y-2">
                  <p className="font-semibold text-brand-dark">
                    What happens next?
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-xs">
                    <li>
                      Your score will be shared with your physiologist for
                      clinical context.
                    </li>
                    <li>This is a screening tool, not a diagnosis.</li>
                    <li>
                      Your physiologist may recommend further evaluation if
                      needed.
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleRestart}
                    className="flex-1 px-4 py-2 border border-brand-dark text-brand-dark rounded-lg hover:bg-brand-light"
                  >
                    Restart
                  </button>
                  <button
                    onClick={handleUseScore}
                    className="flex-1 button-primary"
                  >
                    Use in booking
                  </button>
                </div>

                <p className="text-xs text-center text-slate-500">
                  Your score will be attached to your next booking
                  automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
