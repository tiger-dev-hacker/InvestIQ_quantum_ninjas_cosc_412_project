export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-neutral-400">
          High-level view of your portfolio, market snapshot, and predictions.
        </p>
      </header>

      {/* Top stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Portfolio value
          </p>
          <p className="mt-2 text-xl font-semibold text-white">$100,000</p>
          <p className="text-xs text-emerald-400">+2.3% today (mock)</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Today&apos;s P/L
          </p>
          <p className="mt-2 text-xl font-semibold text-white">+$2,300</p>
          <p className="text-xs text-neutral-400">Sample data for UI only</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Risk score
          </p>
          <p className="mt-2 text-xl font-semibold text-white">Moderate</p>
          <p className="text-xs text-neutral-400">Will connect to real model later</p>
        </div>
      </div>

      {/* Predictions / chart placeholder */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 h-64">
        <p className="text-sm text-neutral-400">
          Prediction chart placeholder – this is where Suril&apos;s model outputs
          (historical vs predicted values) will render.
        </p>
      </div>
    </section>
  );
}
