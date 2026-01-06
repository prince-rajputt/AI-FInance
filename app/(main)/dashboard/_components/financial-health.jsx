"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp, Wallet, PiggyBank } from 'lucide-react';

export function FinancialHealth({ healthScore, savingsRate, totalBalance, spendingGrowth }) {
  const getHealthColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthStatus = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Financial Health Score
        </CardTitle>
        <CardDescription>Your overall financial wellness</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <span className="text-sm font-medium">Overall Score</span>
            <span className={`text-3xl font-bold ${getHealthColor(healthScore)}`}>
              {healthScore}
            </span>
          </div>
          <Progress value={healthScore} className="h-2" />
          <p className={`text-xs ${getHealthColor(healthScore)}`}>
            {getHealthStatus(healthScore)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Savings Rate</span>
            </div>
            <p className="text-xl font-bold text-blue-600">{savingsRate.toFixed(1)}%</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Total Balance</span>
            </div>
            <p className="text-xl font-bold text-green-600">${totalBalance.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-xs text-muted-foreground">Spending Trend</span>
            </div>
            <p className={`text-xl font-bold ${spendingGrowth > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {spendingGrowth > 0 ? '+' : ''}{spendingGrowth}%
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Status</span>
            <p className="text-lg font-semibold capitalize">
              {savingsRate > 20 ? '💪 On Track' : savingsRate > 0 ? '📈 Building' : '⚠️ Watch'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
