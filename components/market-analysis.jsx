"use client";

import React, { useEffect, useRef, memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import TradingChatbot from '@/components/trading-chatbot';
import MarketNews from '@/components/market-news';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
    Wallet, 
    Activity, 
    Lock, 
    TrendingUp, 
    ArrowRight, 
    PieChart, 
    Calendar,
    Briefcase,
    DollarSign,
    ShieldCheck,
    Clock
} from 'lucide-react';

function TradingViewWidget({ symbol }) {
  const container = useRef();

  useEffect(
    () => {
      // Clear previous widget
      if (container.current) {
        container.current.innerHTML = '';
      }
      
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "tradingview-widget-container h-full w-full";
      
      const widgetDiv = document.createElement("div");
      widgetDiv.className = "tradingview-widget-container__widget h-full w-full";
      widgetContainer.appendChild(widgetDiv);
      
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Asia/Kolkata",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      
      widgetContainer.appendChild(script);
      container.current.appendChild(widgetContainer);
    },
    [symbol]
  );

  return (
    <div className="h-[600px] w-full" ref={container} />
  );
}

const MemoizedTradingViewWidget = memo(TradingViewWidget);

const INDIAN_STOCKS = [
  { symbol: "NSE:NIFTY", name: "Nifty 50" },
  { symbol: "NSE:BANKNIFTY", name: "Bank Nifty" },
  { symbol: "BSE:SENSEX", name: "Sensex" },
  { symbol: "NSE:RELIANCE", name: "Reliance" },
  { symbol: "NSE:TCS", name: "TCS" },
  { symbol: "NSE:INFY", name: "Infosys" },
  { symbol: "NSE:HDFCBANK", name: "HDFC Bank" },
  { symbol: "NSE:SBIN", name: "SBI" },
  { symbol: "NSE:ICICIBANK", name: "ICICI Bank" },
  { symbol: "NSE:BHARTIARTL", name: "Bharti Airtel" },
  { symbol: "NSE:ITC", name: "ITC" },
];

const FOREX_PAIRS = [
  { symbol: "FX:EURUSD", name: "EUR/USD" },
  { symbol: "FX:GBPUSD", name: "GBP/USD" },
  { symbol: "FX:USDJPY", name: "USD/JPY" },
  { symbol: "FX:USDCHF", name: "USD/CHF" },
  { symbol: "FX:AUDUSD", name: "AUD/USD" },
  { symbol: "FX:USDCAD", name: "USD/CAD" },
];

const MOCK_ACCOUNT = {
  balance: 24500.00,
  equity: 24950.00,
  usedMargin: 4500.00,
  freeMargin: 20450.00,
  dailyPnL: 450.00,
  dailyPnLPercent: 1.8,
};

const MOCK_POSITIONS = [
  { id: 1, symbol: "NSE:NIFTY", type: "BUY", quantity: 50, entryPrice: 21500, currentPrice: 21550, pnl: 2500, status: "OPEN" },
  { id: 2, symbol: "FX:EURUSD", type: "SELL", quantity: 1000, entryPrice: 1.0950, currentPrice: 1.0940, pnl: 10.00, status: "OPEN" },
];

const MOCK_HISTORY = [
  { id: 101, symbol: "NSE:RELIANCE", type: "BUY", quantity: 10, price: 2800, time: "2024-03-10 10:30", status: "FILLED" },
  { id: 102, symbol: "NSE:TCS", type: "SELL", quantity: 5, price: 3900, time: "2024-03-09 14:15", status: "FILLED" },
  { id: 103, symbol: "FX:GBPUSD", type: "BUY", quantity: 500, price: 1.2700, time: "2024-03-08 09:45", status: "FILLED" },
];

const MOCK_SIPS = [
    { id: 1, name: "Quant Small Cap Fund", type: "Equity", returns: "45.2%", risk: "Very High", minAmt: 1000, category: "Small Cap" },
    { id: 2, name: "Parag Parikh Flexi Cap", type: "Equity", returns: "22.5%", risk: "Moderate", minAmt: 1000, category: "Flexi Cap" },
    { id: 3, name: "HDFC Balanced Advantage", type: "Hybrid", returns: "18.1%", risk: "Moderate", minAmt: 500, category: "Balanced" },
    { id: 4, name: "SBI Bluechip Fund", type: "Equity", returns: "15.8%", risk: "Low", minAmt: 5000, category: "Large Cap" },
];

const MOCK_IPOS = [
    { id: 1, name: "Tata Technologies", price: "₹475 - ₹500", date: "22-24 Nov", status: "Closed", sub: "69.4x" },
    { id: 2, name: "Gandhar Oil Refinery", price: "₹160 - ₹169", date: "22-24 Nov", status: "Closed", sub: "64.1x" },
    { id: 3, name: "Flair Writing Ind", price: "₹288 - ₹304", date: "22-24 Nov", status: "Closed", sub: "46.7x" },
    { id: 4, name: "IREDA", price: "₹30 - ₹32", date: "21-23 Nov", status: "Closed", sub: "38.8x" },
    { id: 5, name: "Ola Electric", price: "₹72 - ₹76", date: "Upcoming", status: "Upcoming", sub: "-" },
];

export default function MarketAnalysis() {
  const [selectedSymbol, setSelectedSymbol] = useState("NSE:NIFTY");
  const [activeTab, setActiveTab] = useState("positions");
  const [viewMode, setViewMode] = useState("market"); // market, sip, ipo
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
        setIsLoggedIn(true);
        setIsLoginOpen(false);
    }
  };

  const AccountSummary = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-slate-900 border-slate-800 text-white shadow-lg shadow-blue-900/10">
        <CardContent className="p-4 flex items-center justify-between">
           <div>
             <p className="text-sm text-slate-400 font-medium">Total Balance</p>
             <h3 className="text-2xl font-bold text-white">${MOCK_ACCOUNT.balance.toLocaleString()}</h3>
           </div>
           <div className="p-2 bg-blue-500/10 rounded-full border border-blue-500/20">
             <Wallet className="h-5 w-5 text-blue-500" />
           </div>
        </CardContent>
      </Card>
      
      <Card className="bg-slate-900 border-slate-800 text-white shadow-lg shadow-green-900/10">
        <CardContent className="p-4 flex items-center justify-between">
           <div>
             <p className="text-sm text-slate-400 font-medium">Equity</p>
             <h3 className="text-2xl font-bold text-white">${MOCK_ACCOUNT.equity.toLocaleString()}</h3>
           </div>
           <div className="p-2 bg-green-500/10 rounded-full border border-green-500/20">
             <Activity className="h-5 w-5 text-green-500" />
           </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800 text-white shadow-lg shadow-purple-900/10">
        <CardContent className="p-4 flex items-center justify-between">
           <div>
             <p className="text-sm text-slate-400 font-medium">Used Margin</p>
             <h3 className="text-2xl font-bold text-white">${MOCK_ACCOUNT.usedMargin.toLocaleString()}</h3>
           </div>
           <div className="p-2 bg-purple-500/10 rounded-full border border-purple-500/20">
             <Lock className="h-5 w-5 text-purple-500" />
           </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800 text-white shadow-lg shadow-amber-900/10">
        <CardContent className="p-4 flex items-center justify-between">
           <div>
             <p className="text-sm text-slate-400 font-medium">Day's P&L</p>
             <div className="flex items-center gap-1">
                <h3 className={`text-2xl font-bold ${MOCK_ACCOUNT.dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {MOCK_ACCOUNT.dailyPnL >= 0 ? '+' : ''}{MOCK_ACCOUNT.dailyPnL}
                </h3>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${MOCK_ACCOUNT.dailyPnL >= 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {MOCK_ACCOUNT.dailyPnLPercent}%
                </span>
             </div>
           </div>
           <div className="p-2 bg-amber-500/10 rounded-full border border-amber-500/20">
             <TrendingUp className="h-5 w-5 text-amber-500" />
           </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section id="market-analysis" className="py-12 bg-slate-950 min-h-screen text-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Trading Dashboard
                </h2>
                <p className="text-slate-400 mt-1">Manage your portfolio, analyze markets, and invest.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
                 <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 shadow-sm flex">
                    <button 
                        onClick={() => setViewMode('market')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'market' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        Market
                    </button>
                    <button 
                        onClick={() => setViewMode('sip')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'sip' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        SIPs
                    </button>
                    <button 
                        onClick={() => setViewMode('ipo')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'ipo' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        IPOs
                    </button>
                 </div>

                 <Link href="/trading/demo">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-900/20">
                        <TrendingUp className="mr-2 h-4 w-4" /> Demo Trading
                    </Button>
                 </Link>

                {!isLoggedIn ? (
                    <Drawer open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                        <DrawerTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Connect Broker Account
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader>
                                    <DrawerTitle>Connect Broker</DrawerTitle>
                                    <DrawerDescription>Enter your broker credentials to access real-time trading.</DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 pb-0">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Broker ID</label>
                                            <Input placeholder="Enter Broker ID" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                         <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                            <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button onClick={handleLogin}>Connect</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                ) : (
                    <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                        Disconnect Account
                    </Button>
                )}
            </div>
        </div>

        {isLoggedIn && <AccountSummary />}
        
        {viewMode === 'market' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar for Symbol Selection */}
          <div className="space-y-6">
             <Card className="bg-white border-slate-200 text-slate-900">
                <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-4 text-black">Indian Market</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                        {INDIAN_STOCKS.map((stock) => (
                            <Button 
                                key={stock.symbol} 
                                variant={selectedSymbol === stock.symbol ? "default" : "outline"}
                                className={`w-full justify-start text-left ${selectedSymbol === stock.symbol ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-slate-200 text-slate-900 hover:bg-slate-100 hover:text-black'}`}
                                onClick={() => setSelectedSymbol(stock.symbol)}
                            >
                                {stock.name}
                            </Button>
                        ))}
                    </div>
                </CardContent>
             </Card>

             <Card className="bg-white border-slate-200 text-slate-900">
                <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-4 text-black">Global Forex</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                        {FOREX_PAIRS.map((pair) => (
                            <Button 
                                key={pair.symbol} 
                                variant={selectedSymbol === pair.symbol ? "default" : "outline"}
                                className={`w-full justify-start text-left ${selectedSymbol === pair.symbol ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-slate-200 text-slate-900 hover:bg-slate-100 hover:text-black'}`}
                                onClick={() => setSelectedSymbol(pair.symbol)}
                            >
                                {pair.name}
                            </Button>
                        ))}
                    </div>
                </CardContent>
             </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
             {/* Chart Area */}
             <div className="border border-slate-800 rounded-lg overflow-hidden shadow-lg bg-slate-900 h-[500px]">
                <MemoizedTradingViewWidget symbol={selectedSymbol} />
             </div>
             <div className="flex justify-between items-center px-2">
                <div className="text-sm text-slate-400">
                    Selected Asset: <span className="font-semibold text-white">{selectedSymbol}</span>
                </div>
                <div className="flex gap-2">
                    <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white w-24"
                        onClick={() => window.open(`https://www.tradingview.com/chart/?symbol=${selectedSymbol}`, '_blank')}
                    >
                        Buy
                    </Button>
                    <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700 text-white w-24"
                        onClick={() => window.open(`https://www.tradingview.com/chart/?symbol=${selectedSymbol}`, '_blank')}
                    >
                        Sell
                    </Button>
                </div>
             </div>

             {/* Bottom Panel: Positions & History */}
             {isLoggedIn && (
                 <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-4 border-b border-slate-800 pb-2">
                            <button 
                                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'positions' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                                onClick={() => setActiveTab('positions')}
                            >
                                Open Positions ({MOCK_POSITIONS.length})
                            </button>
                            <button 
                                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'history' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                                onClick={() => setActiveTab('history')}
                            >
                                Order History
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {activeTab === 'positions' ? (
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                        <TableHead className="text-slate-400">Symbol</TableHead>
                                        <TableHead className="text-slate-400">Type</TableHead>
                                        <TableHead className="text-slate-400">Qty</TableHead>
                                        <TableHead className="text-slate-400">Entry Price</TableHead>
                                        <TableHead className="text-slate-400">Current Price</TableHead>
                                        <TableHead className="text-slate-400">P&L</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {MOCK_POSITIONS.map((pos) => (
                                        <TableRow key={pos.id} className="border-slate-800 hover:bg-slate-800/50">
                                            <TableCell className="font-medium text-slate-200">{pos.symbol}</TableCell>
                                            <TableCell>
                                                <Badge variant={pos.type === 'BUY' ? 'default' : 'destructive'}>{pos.type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-slate-300">{pos.quantity}</TableCell>
                                            <TableCell className="text-slate-300">{pos.entryPrice}</TableCell>
                                            <TableCell className="text-slate-300">{pos.currentPrice}</TableCell>
                                            <TableCell className={pos.pnl >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                                                {pos.pnl >= 0 ? '+' : ''}{pos.pnl}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                        <TableHead className="text-slate-400">Time</TableHead>
                                        <TableHead className="text-slate-400">Symbol</TableHead>
                                        <TableHead className="text-slate-400">Type</TableHead>
                                        <TableHead className="text-slate-400">Qty</TableHead>
                                        <TableHead className="text-slate-400">Price</TableHead>
                                        <TableHead className="text-slate-400">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {MOCK_HISTORY.map((order) => (
                                        <TableRow key={order.id} className="border-slate-800 hover:bg-slate-800/50">
                                            <TableCell className="text-slate-300">{order.time}</TableCell>
                                            <TableCell className="font-medium text-slate-200">{order.symbol}</TableCell>
                                            <TableCell>
                                                <span className={order.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>{order.type}</span>
                                            </TableCell>
                                            <TableCell className="text-slate-300">{order.quantity}</TableCell>
                                            <TableCell className="text-slate-300">{order.price}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-slate-700 text-slate-200 hover:bg-slate-600">{order.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                 </Card>
             )}
          </div>
        </div>
        )}

        {viewMode === 'market' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <TradingChatbot />
                </div>
                <div>
                    <MarketNews />
                </div>
            </div>
        )}

        {viewMode === 'sip' && (
            <div className="space-y-6 animate-in fade-in duration-500">
                <Card className="bg-gradient-to-r from-blue-900 to-purple-900 text-white border-none shadow-xl">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Systematic Investment Plans</h2>
                                <p className="text-blue-200 text-lg">Build wealth over time with disciplined investing. Start with as low as ₹500.</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-full backdrop-blur-md">
                                <PieChart className="h-12 w-12 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_SIPS.map((sip) => (
                        <Card key={sip.id} className="bg-slate-900 border-slate-800 text-white hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-blue-500">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <Badge variant="secondary" className="mb-2 bg-slate-800 text-slate-200 hover:bg-slate-700">{sip.category}</Badge>
                                    <Badge className={sip.risk === 'Very High' ? 'bg-red-900/50 text-red-200 hover:bg-red-900/70' : sip.risk === 'High' ? 'bg-orange-900/50 text-orange-200 hover:bg-orange-900/70' : 'bg-green-900/50 text-green-200 hover:bg-green-900/70'}>
                                        {sip.risk} Risk
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg line-clamp-1 text-slate-100" title={sip.name}>{sip.name}</CardTitle>
                                <CardDescription className="text-slate-400">{sip.type} Fund</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-400">3Y Returns</span>
                                        <span className="text-xl font-bold text-green-400 flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-1" /> {sip.returns}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-slate-800 pt-2">
                                        <span className="text-sm text-slate-400">Min. Investment</span>
                                        <span className="font-semibold text-slate-200">₹{sip.minAmt}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start SIP</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        )}

        {viewMode === 'ipo' && (
             <div className="space-y-6 animate-in fade-in duration-500">
                <Card className="bg-gradient-to-r from-amber-800 to-orange-900 text-white border-none shadow-xl">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">IPO Watch</h2>
                                <p className="text-amber-200 text-lg">Invest in the future market leaders. Track and apply for latest IPOs.</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-full backdrop-blur-md">
                                <Briefcase className="h-12 w-12 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardHeader>
                        <CardTitle className="text-slate-100">Upcoming & Recent IPOs</CardTitle>
                        <CardDescription className="text-slate-400">List of Initial Public Offerings in the market.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                    <TableHead className="text-slate-400">Company</TableHead>
                                    <TableHead className="text-slate-400">Price Band</TableHead>
                                    <TableHead className="text-slate-400">Date</TableHead>
                                    <TableHead className="text-slate-400">Subscription</TableHead>
                                    <TableHead className="text-slate-400">Status</TableHead>
                                    <TableHead className="text-right text-slate-400">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {MOCK_IPOS.map((ipo) => (
                                    <TableRow key={ipo.id} className="border-slate-800 hover:bg-slate-800/50">
                                        <TableCell className="font-medium text-slate-200">{ipo.name}</TableCell>
                                        <TableCell className="text-slate-300">{ipo.price}</TableCell>
                                        <TableCell className="text-slate-300">{ipo.date}</TableCell>
                                        <TableCell className="text-slate-300">{ipo.sub}</TableCell>
                                        <TableCell>
                                            <Badge variant={ipo.status === 'Open' ? 'default' : ipo.status === 'Upcoming' ? 'outline' : 'secondary'} className={ipo.status === 'Upcoming' ? 'text-slate-300 border-slate-600' : ''}>
                                                {ipo.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant={ipo.status === 'Open' ? 'default' : 'ghost'} disabled={ipo.status !== 'Open'} className={ipo.status !== 'Open' ? 'text-slate-500' : ''}>
                                                {ipo.status === 'Open' ? 'Apply Now' : 'Details'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        )}

      </div>
    </section>
  );
}
