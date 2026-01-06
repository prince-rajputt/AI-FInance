"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, AlertCircle, Zap } from 'lucide-react';

export function NetWorthAndAccounts({ totalBalance, accountCount, accounts }) {
  const accountsSorted = accounts.sort((a, b) => Number(b.balance) - Number(a.balance));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Net Worth & Accounts
        </CardTitle>
        <CardDescription>Your financial snapshot</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Total Net Worth</p>
          <p className={`text-3xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${totalBalance.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Across {accountCount} account{accountCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Account Breakdown</h4>
          {accountsSorted.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium capitalize">{account.name}</p>
                <p className="text-xs text-muted-foreground">{account.type.toLowerCase()}</p>
              </div>
              <Badge variant={Number(account.balance) > 0 ? 'default' : 'destructive'}>
                ${Number(account.balance).toFixed(2)}
              </Badge>
            </div>
          ))}
        </div>

        {totalBalance > 0 && (
          <div className="flex items-start gap-2 text-xs bg-green-50 p-3 rounded border border-green-200">
            <Zap className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-green-700">
              You have a positive net worth! Keep building your wealth.
            </span>
          </div>
        )}

        {totalBalance < 0 && (
          <div className="flex items-start gap-2 text-xs bg-red-50 p-3 rounded border border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
            <span className="text-red-700">
              Your net worth is negative. Focus on reducing expenses and increasing income.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
