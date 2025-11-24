export default function DashboardPage() {
  return (
    <section
      className="
        mx-auto max-w-5xl
        space-y-6
        rounded-3xl
        border border-slate-800/70
        bg-slate-950/70
        p-6
        shadow-xl shadow-black/40
      "
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-white">My Dashboard</h1>
        <p className="text-sm text-slate-400">
          High-level view of your portfolio, market snapshot, and predictions.
        </p>
      </header>

      {/* Top stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Portfolio value
          </p>
          <p className="mt-2 text-xl font-semibold text-white">$100,000</p>
          <p className="text-xs text-emerald-400">+2.3% today (mock)</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Today&apos;s P/L
          </p>
          <p className="mt-2 text-xl font-semibold text-white">+$2,300</p>
          <p className="text-xs text-slate-400">Sample data for UI only</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Risk score
          </p>
          <p className="mt-2 text-xl font-semibold text-white">Moderate</p>
          <p className="text-xs text-slate-400">
            Will connect to real model later
          </p>
        </div>
      </div>

      {/* Predictions / chart placeholder */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 h-64">
        <p className="text-sm text-slate-400">
          Prediction chart placeholder –.
        </p>
      </div>
    </section>
  );
}
