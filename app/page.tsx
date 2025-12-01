import Game from "@/components/Game";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <section className="grid gap-8 md:grid-cols-[1.4fr,1fr] items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200">
            New • AI Social Deception Game
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            Can you outsmart{" "}
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              the AI?
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            In <span className="font-semibold text-amber-200">Truth or Trick</span>,
            an AI generates bold claims about technology, science, and everyday
            life. Some are{" "}
            <span className="font-semibold text-emerald-300">facts</span>.
            Others are{" "}
            <span className="font-semibold text-rose-300">carefully crafted lies</span>.
            Your job: call <span className="font-semibold">Truth</span> or{" "}
            <span className="font-semibold">Trick</span> before the reveal.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Short, fast rounds – perfect for a quick break</li>
            <li>• AI explains each statement after you guess</li>
            <li>• Local high score system – try to beat your best streak</li>
          </ul>
          <a
            href="#game"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/40 hover:bg-amber-300 transition-colors"
          >
            Start playing now
            <span className="text-xs">▼</span>
          </a>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-amber-500/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Live Preview
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-400/40">
                AI Powered
              </span>
            </div>
            <div className="space-y-3 rounded-2xl bg-slate-950/70 p-4 border border-slate-800">
              <p className="text-xs text-slate-300">
                “A typical smartphone has more computing power than all of NASA
                during the Apollo moon missions.”
              </p>
              <div className="flex gap-2">
                <button className="flex-1 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-200">
                  Truth
                </button>
                <button className="flex-1 rounded-full border border-rose-400/60 bg-rose-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-200">
                  Trick
                </button>
              </div>
              <div className="rounded-xl bg-slate-900/80 px-3 py-2 text-[11px] text-slate-300 border border-slate-800">
                <span className="font-semibold text-emerald-300">Result:</span>{" "}
                Truth – modern smartphones are vastly more powerful than the
                computers used for the Apollo missions.
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-4 -bottom-6 h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/40 via-pink-500/40 to-indigo-500/30 blur-3xl opacity-60" />
        </div>
      </section>

      <section id="game">
        <Game />
      </section>

      <section
        id="how-it-works"
        className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-4"
      >
        <h2 className="text-lg sm:text-xl font-semibold">How the game works</h2>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
          <li>The AI generates a short, punchy statement.</li>
          <li>
            Secretly, it tags it as either{" "}
            <span className="font-semibold text-emerald-300">Truth</span> or{" "}
            <span className="font-semibold text-rose-300">Trick</span>.
          </li>
          <li>You decide: is the AI being honest or trying to fool you?</li>
          <li>After you guess, the AI reveals the answer and explains.</li>
          <li>
            Your score and best streak are stored locally in your browser – no
            login needed.
          </li>
        </ol>
        <p className="text-xs text-slate-400">
          Note: Statements are generated by AI and may occasionally simplify
          details for fun or brevity. Always double-check important facts with
          reliable sources.
        </p>
      </section>
    </div>
  );
}
