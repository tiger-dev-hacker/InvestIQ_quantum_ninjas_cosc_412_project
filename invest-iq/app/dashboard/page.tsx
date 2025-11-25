'use client';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/components/forms/InputField";
import { getWatchlistWithData } from '@/lib/actions/watchlist.actions';

// Define the type for watchlist items
type WatchlistStock = {
    symbol: string;
    companyName?: string;
    name?: string;
    price?: number;
    currentPrice?: number;
    changePercent?: number; // Daily change percentage
    change?: number; // Alternative field name
};

export default function DashboardPage() {
    const { register, watch } = useForm();
    const [watchlist, setWatchlist] = useState<WatchlistStock[]>([]);
    const [loading, setLoading] = useState(true);
    
    const moneyValue = watch('moneyAmount');
    const portfolioValue = moneyValue ? parseFloat(moneyValue.toString()) : null;
    
    useEffect(() => {
        async function fetchWatchlist() {
            try {
                setLoading(true);
                const data = await getWatchlistWithData();
                setWatchlist(data);
            } catch (error) {
                console.error('Error fetching watchlist:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchWatchlist();
    }, []);

    // Calculate today's P/L based on stock change percentages
    const calculateDailyPL = () => {
        if (!portfolioValue || watchlist.length === 0) return null;
        
        const moneyPerStock = portfolioValue / watchlist.length;
        let totalPL = 0;
        
        watchlist.forEach(stock => {
            const changePercent = stock.changePercent || stock.change || 0;
            const stockPL = moneyPerStock * (changePercent / 100);
            totalPL += stockPL;
        });
        
        const percentChange = (totalPL / portfolioValue) * 100;
        return { amount: totalPL, percent: percentChange };
    };

    // Calculate risk score based on volatility and concentration
    const calculateRiskScore = () => {
        if (!portfolioValue || watchlist.length === 0) return null;
        
        // Calculate average absolute change (volatility proxy)
        const avgVolatility = watchlist.reduce((sum, stock) => {
            return sum + Math.abs(stock.changePercent || 0);
        }, 0) / watchlist.length;
        
        // Factor in diversification (fewer stocks = higher risk)
        const diversificationPenalty = Math.max(0, (5 - watchlist.length) * 0.5);
        const adjustedVolatility = avgVolatility + diversificationPenalty;
        
        // Determine risk level
        if (adjustedVolatility < 1.0) {
            return { score: 'Low', description: 'Conservative portfolio', color: 'text-emerald-400' };
        } else if (adjustedVolatility < 2.0) {
            return { score: 'Moderate', description: 'Balanced risk/reward', color: 'text-yellow-400' };
        } else {
            return { score: 'High', description: 'Aggressive portfolio', color: 'text-red-400' };
        }
    };

    const calculateShares = () => {
        if (!portfolioValue || watchlist.length === 0) return [];
        
        const moneyPerStock = portfolioValue / watchlist.length;
        
        return watchlist.map((stock) => ({
            symbol: stock.symbol,
            companyName: stock.companyName || stock.name,
            price: stock.price || stock.currentPrice || 0,
            allocatedMoney: moneyPerStock,
            shares: Math.floor(moneyPerStock / (stock.price || stock.currentPrice || 1))
        }));
    };

    const sharesCalculation = calculateShares();
    const dailyPL = calculateDailyPL();
    const riskScore = calculateRiskScore();

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
          <p className="mt-2 text-xl font-semibold text-white">
            {portfolioValue 
              ? `$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : '$100,000'}
          </p>
          <p className="text-xs text-slate-400">
            {portfolioValue ? 'Based on investment amount' : 'Enter amount to calculate'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Today&apos;s P/L
          </p>
          {dailyPL ? (
            <>
              <p className={`mt-2 text-xl font-semibold ${dailyPL.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {dailyPL.amount >= 0 ? '+' : ''}${Math.abs(dailyPL.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className={`text-xs ${dailyPL.percent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {dailyPL.amount >= 0 ? '+' : ''}{dailyPL.percent.toFixed(2)}% today
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-xl font-semibold text-white">+$2,300</p>
              <p className="text-xs text-slate-400">Enter amount to calculate</p>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Risk score
          </p>
          {riskScore ? (
            <>
              <p className={`mt-2 text-xl font-semibold ${riskScore.color}`}>
                {riskScore.score}
              </p>
              <p className="text-xs text-slate-400">
                {riskScore.description}
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-xl font-semibold text-white">Moderate</p>
              <p className="text-xs text-slate-400">Enter amount to calculate</p>
            </>
          )}
        </div>
      </div>

      {/* Money Input */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
        <h3 className="text-lg font-semibold text-white mb-2"> Quant strategy (Equal-weights) recommender</h3>
        <p className="text-xs text-slate-400">
            Note: This system determines your investment recommendations by equally dividing your investment amount to invest into each stock that you have stated in your wishlist. Change your wishlist to reflect your accurate choice of stocks.
          </p>
        <div className="max-w-md mt-4 text-md font-semibold">
          <p className="text-white mb-2"> Total Investment amount ($)</p>
          <InputField 
            name="moneyAmount"
            label=""
            placeholder="100000"
            register={register}
            type="number"
          />
        </div>
      </div>

      {/* Shares Calculation Results */}
      {loading ? (
        <p className="text-slate-400">Loading watchlist...</p>
      ) : watchlist.length > 0 && portfolioValue && portfolioValue > 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recommended Stock Distribution
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Splitting ${portfolioValue?.toLocaleString() || '0'} equally across {watchlist.length} stocks
          </p>
          
          <div className="space-y-3">
            {sharesCalculation.map((item) => (
              <div 
                key={item.symbol}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-800"
              >
                <div>
                  <p className="font-semibold text-white">{item.symbol}</p>
                  <p className="text-sm text-slate-400">{item.companyName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{item.shares} shares</p>
                  <p className="text-sm text-slate-400">
                    @ ${item.price.toFixed(2)} = ${(item.shares * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
          <p className="text-slate-400">
            {watchlist.length === 0 
              ? "Add stocks to your watchlist to see calculations" 
              : "Enter an investment amount to calculate share distribution"}
          </p>
        </div>
      )}
    </section>
  );
}