import MarketAnalysis from "@/components/market-analysis";

export const metadata = {
  title: "Trading Analysis",
  description: "Real-time market analysis, trading charts, and forex rates.",
};

export default function TradingPage() {
  return (
    <div className="pt-24">
      <MarketAnalysis />
    </div>
  );
}
