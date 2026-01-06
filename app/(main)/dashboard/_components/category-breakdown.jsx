"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categoryColors } from '@/data/categories';

export function CategoryBreakdown({ topCategories }) {
  const COLORS = Object.values(categoryColors);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spending Categories</CardTitle>
        <CardDescription>This month's spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        {topCategories && topCategories.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={topCategories}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ category, amount }) => `${category}: $${amount.toFixed(2)}`}
                >
                  {topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[entry.category] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {topCategories.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded"
                      style={{ backgroundColor: categoryColors[item.category] }}
                    />
                    <span className="capitalize text-sm">{item.category}</span>
                  </div>
                  <span className="font-medium">${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground py-8">No spending data yet</p>
        )}
      </CardContent>
    </Card>
  );
}
