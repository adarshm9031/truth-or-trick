import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truth or Trick | AI Social Deception Game",
  description:
    "Guess whether the AI is telling the truth or trying to trick you in this fast, fun social deception game by Adarsh Mittal."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-indigo-600 flex items-center justify-center text-sm font-black shadow-lg shadow-amber-500/30">
                  T/T
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wide uppercase text-amber-300">
                    Truth or Trick
                  </div>
                  <p className="text-xs text-slate-400">
                    An AI social deception game by Adarsh Mittal
                  </p>
                </div>
              </div>
              <nav className="hidden sm:flex items-center gap-4 text-xs text-slate-300">
                <a
                  href="#how-it-works"
                  className="hover:text-amber-300 transition-colors"
                >
                  How it works
                </a>
                <a
                  href="#game"
                  className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200 shadow-sm hover:bg-amber-500/20 transition-colors"
                >
                  Play now
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-800 bg-slate-950/80">
            <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>© {new Date().getFullYear()} Adarsh Mittal. All rights reserved.</span>
              <span className="text-[11px]">
                Built with Next.js, Tailwind CSS & OpenAI – hosted on Vercel.
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
