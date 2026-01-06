"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, RefreshCw, Plus, Minus, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';

// Mock initial data
const INITIAL_BALANCE = 100000;
const INITIAL_STOCKS = [
  { symbol: "NIFTY 50", price: 21500.00, change: "+0.75%" },
  { symbol: "RELIANCE", price: 2850.50, change: "+1.20%" },
  { symbol: "TCS", price: 3900.00, change: "-0.45%" },
  { symbol: "HDFCBANK", price: 1650.75, change: "+0.30%" },
  { symbol: "INFY", price: 1540.25, change: "+0.90%" },
];

export default function DemoTradingPage() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [positions, setPositions] = useState([]);
  const [selectedStock, setSelectedStock] = useState(INITIAL_STOCKS[0]);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('BUY'); // BUY or SELL
  const [prices, setPrices] = useState(INITIAL_STOCKS);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(currentPrices => 
        currentPrices.map(stock => ({
          ...stock,
          price: stock.price * (1 + (Math.random() * 0.002 - 0.001)) // Random fluctuation +/- 0.1%
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update selected stock price when prices change
  useEffect(() => {
    const updatedStock = prices.find(s => s.symbol === selectedStock.symbol);
    if (updatedStock) {
      setSelectedStock(updatedStock);
    }
  }, [prices, selectedStock.symbol]);

  const handleTrade = () => {
    const totalAmount = selectedStock.price * quantity;

    if (orderType === 'BUY') {
      if (totalAmount > balance) {
        toast.error("Insufficient funds for this trade");
        return;
      }

      setBalance(prev => prev - totalAmount);
      
      const existingPosition = positions.find(p => p.symbol === selectedStock.symbol);
      if (existingPosition) {
        setPositions(prev => prev.map(p => 
          p.symbol === selectedStock.symbol 
            ? { ...p, quantity: p.quantity + quantity, avgPrice: ((p.avgPrice * p.quantity) + totalAmount) / (p.quantity + quantity) }
            : p
        ));
      } else {
        setPositions(prev => [...prev, { symbol: selectedStock.symbol, quantity: quantity, avgPrice: selectedStock.price }]);
      }
      toast.success(`Bought ${quantity} shares of ${selectedStock.symbol}`);
    } else {
        // Sell logic
        const existingPosition = positions.find(p => p.symbol === selectedStock.symbol);
        if (!existingPosition || existingPosition.quantity < quantity) {
            toast.error("Insufficient holdings to sell");
            return;
        }

        setBalance(prev => prev + totalAmount);

        if (existingPosition.quantity === quantity) {
            setPositions(prev => prev.filter(p => p.symbol !== selectedStock.symbol));
        } else {
            setPositions(prev => prev.map(p => 
                p.symbol === selectedStock.symbol 
                  ? { ...p, quantity: p.quantity - quantity }
                  : p
              ));
        }
        toast.success(`Sold ${quantity} shares of ${selectedStock.symbol}`);
    }
  };

  const calculatePnL = (position) => {
    const currentPrice = prices.find(s => s.symbol === position.symbol)?.price || 0;
    return (currentPrice - position.avgPrice) * position.quantity;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/trading">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Demo Trading Account</h1>
                    <p className="text-slate-500">Practice trading with virtual currency</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div>
                    <p className="text-sm text-slate-500">Available Balance</p>
                    <p className="text-2xl font-bold text-blue-600">₹{balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-blue-600 cursor-pointer hover:rotate-180 transition-all duration-500" onClick={() => setBalance(INITIAL_BALANCE)} />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Watch */}
            <Card className="bg-white border-slate-200 h-fit">
                <CardHeader>
                    <CardTitle>Market Watch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {prices.map((stock) => (
                        <div 
                            key={stock.symbol}
                            onClick={() => setSelectedStock(stock)}
                            className={`p-3 rounded-lg flex justify-between items-center cursor-pointer transition-colors ${selectedStock.symbol === stock.symbol ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'}`}
                        >
                            <div>
                                <p className="font-bold text-slate-800">{stock.symbol}</p>
                                <p className={`text-xs ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stock.change}</p>
                            </div>
                            <p className="font-mono text-slate-700">₹{stock.price.toFixed(2)}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Trading Panel */}
            <Card className="bg-white border-slate-200 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Trade {selectedStock.symbol}
                        <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">LIVE</Badge>
                    </CardTitle>
                    <CardDescription>Current Price: <span className="text-slate-900 font-bold text-lg">₹{selectedStock.price.toFixed(2)}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                                <button 
                                    className={`flex-1 py-2 rounded-md font-bold text-sm transition-all ${orderType === 'BUY' ? 'bg-green-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                    onClick={() => setOrderType('BUY')}
                                >
                                    BUY
                                </button>
                                <button 
                                    className={`flex-1 py-2 rounded-md font-bold text-sm transition-all ${orderType === 'SELL' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                    onClick={() => setOrderType('SELL')}
                                >
                                    SELL
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Quantity</label>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input 
                                        type="number" 
                                        value={quantity} 
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                                        className="text-center font-bold"
                                    />
                                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Margin Required</span>
                                <span className="font-bold text-slate-800">₹{(selectedStock.price * quantity).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Charges (approx)</span>
                                <span className="font-bold text-slate-800">₹{((selectedStock.price * quantity) * 0.001).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-slate-200 pt-3 flex justify-between">
                                <span className="font-bold text-slate-800">Total</span>
                                <span className="font-bold text-blue-600 text-lg">₹{(selectedStock.price * quantity * 1.001).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <Button 
                        className={`w-full py-6 text-lg font-bold shadow-lg transition-transform hover:scale-[1.01] ${orderType === 'BUY' ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 'bg-red-600 hover:bg-red-700 shadow-red-200'}`}
                        onClick={handleTrade}
                    >
                        {orderType} {selectedStock.symbol}
                    </Button>
                </CardContent>
            </Card>

            {/* Positions Table */}
            <div className="lg:col-span-3">
                <Card className="bg-white border-slate-200">
                    <CardHeader>
                        <CardTitle>Your Positions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {positions.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">
                                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p>No open positions. Start trading!</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 uppercase">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Symbol</th>
                                            <th className="px-4 py-3">Qty</th>
                                            <th className="px-4 py-3">Avg. Price</th>
                                            <th className="px-4 py-3">LTP</th>
                                            <th className="px-4 py-3 rounded-r-lg">P&L</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {positions.map((pos) => {
                                            const pnl = calculatePnL(pos);
                                            const currentPrice = prices.find(s => s.symbol === pos.symbol)?.price || 0;
                                            return (
                                                <tr key={pos.symbol} className="hover:bg-slate-50">
                                                    <td className="px-4 py-4 font-bold text-slate-800">{pos.symbol}</td>
                                                    <td className="px-4 py-4">{pos.quantity}</td>
                                                    <td className="px-4 py-4">₹{pos.avgPrice.toFixed(2)}</td>
                                                    <td className="px-4 py-4">₹{currentPrice.toFixed(2)}</td>
                                                    <td className={`px-4 py-4 font-bold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
