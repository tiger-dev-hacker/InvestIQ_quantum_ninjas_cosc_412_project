export type Transaction = {
  id: string;
  userId: string;
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  price: number;
  createdAt: string;
};

export type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
};

export type PredictionPoint = {
  timestamp: string;
  actual?: number;
  predicted: number;
};
