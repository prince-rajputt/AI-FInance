"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Calendar } from 'lucide-react';

export function SavingsGoalTracker({ monthlyIncome, monthlyExpenses, savingsRate }) {
  const targetSavingsRate = 20; // 20% target
  const currentSavings = monthlyIncome - monthlyExpenses;
  const targetSavings = (monthlyIncome * targetSavingsRate) / 100;
  const savingsProgress = targetSavings > 0 ? (currentSavings / targetSavings) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Savings Goal Tracker
        </CardTitle>
        <CardDescription>Monthly savings progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Target: {targetSavingsRate}%</span>
            <span className="text-muted-foreground">Current: {savingsRate.toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(100, savingsProgress)} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Current Savings</p>
            <p className={`text-lg font-bold ${currentSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${currentSavings.toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Target Savings</p>
            <p className="text-lg font-bold text-blue-600">
              ${targetSavings.toFixed(2)}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-muted-foreground mb-1">Progress</p>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">
                {savingsProgress > 100 ? '✅' : '⏳'}
              </div>
              <span className="text-sm">
                {savingsProgress > 100
                  ? `${Math.round(savingsProgress - 100)}% above target!`
                  : `${Math.round(savingsProgress)}% of target`}
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded">
          💡 Tip: Aim to save at least 20% of your income each month for long-term financial security.
        </div>
      </CardContent>
    </Card>
  );
}
