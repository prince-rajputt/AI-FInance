import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MOCK_NEWS = [
  {
    id: 1,
    title: "Nifty hits all-time high as IT stocks rally",
    source: "Financial Express",
    time: "2 hours ago",
    sentiment: "positive",
    summary: "Indian benchmark indices touched fresh record highs on Monday led by strong buying interest in IT and banking stocks."
  },
  {
    id: 2,
    title: "Rupee falls against US Dollar amid global uncertainty",
    source: "Bloomberg",
    time: "4 hours ago",
    sentiment: "negative",
    summary: "The Indian Rupee depreciated by 15 paise against the US Dollar tracking weak Asian peers and rising crude oil prices."
  },
  {
    id: 3,
    title: "Q3 Results: HDFC Bank reports 33% jump in net profit",
    source: "MoneyControl",
    time: "5 hours ago",
    sentiment: "positive",
    summary: "HDFC Bank reported a standalone net profit of ₹16,372 crore for the quarter ended December 31, 2023."
  },
  {
    id: 4,
    title: "Gold prices steady ahead of Fed meeting",
    source: "Reuters",
    time: "6 hours ago",
    sentiment: "neutral",
    summary: "Gold prices held steady on Tuesday as investors awaited the Federal Reserve's policy decision for clues on interest rate cuts."
  }
];

export default function MarketNews() {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl font-bold text-slate-800">Market News</CardTitle>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Live Updates</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_NEWS.map((news) => (
            <div key={news.id} className="p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  {news.source} • {news.time}
                </span>
                {news.sentiment === 'positive' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : news.sentiment === 'negative' ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                )}
              </div>
              <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                {news.summary}
              </p>
              <button className="text-xs font-medium text-blue-600 flex items-center gap-1 hover:underline">
                Read full story <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
