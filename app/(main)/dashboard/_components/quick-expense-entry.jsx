"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createTransaction } from '@/actions/transaction';
import useFetch from '@/hooks/usefetch';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function QuickExpenseEntry({ accounts, defaultAccountId }) {
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState(defaultAccountId || '');
  const [description, setDescription] = useState('');
  
  const router = useRouter();
  const { loading, fn: createFn, error } = useFetch(createTransaction);

  const handleQuickAdd = async () => {
    if (!amount || !accountId) {
      toast.error('Please enter amount and select account');
      return;
    }

    await createFn({
      type: 'EXPENSE',
      amount: parseFloat(amount),
      description: description || 'Quick expense',
      accountId,
      category: 'shopping',
      date: new Date(),
      isRecurring: false,
    });

    if (!error) {
      toast.success('Expense added!');
      setAmount('');
      setDescription('');
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Expense Entry</CardTitle>
        <CardDescription>Add an expense on the go</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Account</label>
          <Select value={accountId} onValueChange={setAccountId}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Description (optional)</label>
          <Input
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button 
          onClick={handleQuickAdd} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            'Quick Add Expense'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
