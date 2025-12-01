"use client";

import { useEffect, useState } from "react";

type RoundState = {
  statement: string;
  explanation: string;
  isTruth: boolean;
};

type GameStatus = "idle" | "thinking" | "awaiting_guess" | "revealed";

export default function Game() {
  const [round, setRound] = useState<RoundState | null>(null);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [guess, setGuess] = useState<"truth" | "trick" | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [roundNumber, setRoundNumber] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedHighScore = window.localStorage.getItem("truth_or_trick_highscore");
    if (storedHighScore) {
      const parsed = parseInt(storedHighScore, 10);
      if (!Number.isNaN(parsed)) {
        setHighScore(parsed);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("truth_or_trick_highscore", String(highScore));
  }, [highScore]);

  async function startNewRound() {
    try {
      setStatus("thinking");
      setGuess(null);
      setIsCorrect(null);
      setError(null);

      const res = await fetch("/api/round", {
        method: "POST"
      });

      if (!res.ok) {
        throw new Error("Failed to contact AI. Please try again.");
      }

      const data = (await res.json()) as RoundState;
      if (!data.statement || typeof data.isTruth !== "boolean") {
        throw new Error("Unexpected AI response. Please try again.");
      }

      setRound(data);
      setRoundNumber((prev) => prev + 1);
      setStatus("awaiting_guess");
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  function handleGuess(choice: "truth" | "trick") {
    if (!round || status !== "awaiting_guess") return;
    const correct = (choice === "truth") === round.isTruth;

    setGuess(choice);
    setIsCorrect(correct);
    setStatus("revealed");

    if (correct) {
      setScore((prev) => {
        const nextScore = prev + 1;
        setHighScore((hs) => (nextScore > hs ? nextScore : hs));
        return nextScore;
      });
    } else {
      setScore(0);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-4 shadow-xl shadow-slate-950/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Play <span className="text-amber-300">Truth or Trick</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Hit “New round” to let the AI craft a statement, then decide whether it&apos;s
            telling the truth or trying to trick you.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-1.5">
            <div className="text-[10px] uppercase tracking-wide text-slate-400">
              Current Streak
            </div>
            <div className="text-base font-semibold text-amber-300 text-right">
              {score}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-1.5">
            <div className="text-[10px] uppercase tracking-wide text-slate-400">
              Best Streak
            </div>
            <div className="text-base font-semibold text-emerald-300 text-right">
              {highScore}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950/70 px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI live
        </span>
        <span>Round: {roundNumber || "—"}</span>
        <span>Mode: Solo • No login</span>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
        {status === "idle" && (
          <p className="text-sm text-slate-300">
            Ready when you are.{" "}
            <span className="font-semibold text-amber-200">
              Click &ldquo;New round&rdquo;
            </span>{" "}
            to generate your first statement.
          </p>
        )}

        {status === "thinking" && (
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <div className="h-8 w-8 rounded-full border-2 border-slate-600 border-t-amber-400 animate-spin" />
            <div>
              <p>AI is crafting a statement for you…</p>
              <p className="text-xs text-slate-400">
                It randomly decides whether to tell the truth or trick you.
              </p>
            </div>
          </div>
        )}

        {round && (
          <div className="space-y-3">
            <p className="text-sm text-slate-100 leading-relaxed">
              {round.statement}
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleGuess("truth")}
                disabled={status !== "awaiting_guess"}
                className={`flex-1 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  guess === "truth"
                    ? "border-emerald-400 bg-emerald-500/15 text-emerald-100"
                    : "border-emerald-400/50 bg-emerald-500/5 text-emerald-200 hover:bg-emerald-500/15 disabled:opacity-50 disabled:hover:bg-emerald-500/5"
                }`}
              >
                Truth
              </button>
              <button
                onClick={() => handleGuess("trick")}
                disabled={status !== "awaiting_guess"}
                className={`flex-1 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  guess === "trick"
                    ? "border-rose-400 bg-rose-500/15 text-rose-100"
                    : "border-rose-400/50 bg-rose-500/5 text-rose-200 hover:bg-rose-500/15 disabled:opacity-50 disabled:hover:bg-rose-500/5"
                }`}
              >
                Trick
              </button>
            </div>

            {status === "revealed" && (
              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-3 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Result:{" "}
                    {round.isTruth ? (
                      <span className="text-emerald-300">Truth</span>
                    ) : (
                      <span className="text-rose-300">Trick</span>
                    )}
                  </span>
                  {isCorrect !== null && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        isCorrect
                          ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/50"
                          : "bg-rose-500/15 text-rose-200 border border-rose-400/50"
                      }`}
                    >
                      {isCorrect ? "You got it!" : "Nice try"}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {round.explanation}
                </p>
                {!isCorrect && (
                  <p className="text-[10px] text-slate-500">
                    Your streak resets on a wrong guess. Try to build it back up!
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
            {error}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <button
          onClick={startNewRound}
          disabled={status === "thinking"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-amber-500/40 hover:bg-amber-300 disabled:opacity-60 disabled:hover:bg-amber-400 transition"
        >
          {round ? "New round" : "Start first round"}
        </button>
        <p className="text-[11px] text-slate-500">
          Pro tip: Play a few rounds, then share your best streak with friends or
          colleagues as a challenge.
        </p>
      </div>
    </div>
  );
}
