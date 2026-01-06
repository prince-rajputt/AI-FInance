"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function IncomeVsExpense({ monthlyIncome, monthlyExpenses, weeklyExpenses, comparison }) {
  const chartData = [
    { name: 'Income', amount: monthlyIncome },
    { name: 'Expenses', amount: monthlyExpenses },
  ];

  const net = monthlyIncome - monthlyExpenses;
  const isPositive = net >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense (This Month)</CardTitle>
        <CardDescription>Monthly overview of your cash flow</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-2xl font-bold text-green-600">
              ${monthlyIncome.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              ${monthlyExpenses.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Net Balance</p>
            <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : '-'}${Math.abs(net).toFixed(2)}
            </p>
          </div>
        </div>

        {comparison && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm">
              {comparison.isIncrease ? (
                <TrendingUp className="h-4 w-4 text-red-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-600" />
              )}
              <span className="text-muted-foreground">
                vs last month:{' '}
                <span className={comparison.isIncrease ? 'text-red-600' : 'text-green-600'}>
                  {comparison.isIncrease ? '+' : '-'}
                  {Math.abs(comparison.percentageChange)}%
                </span>
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
