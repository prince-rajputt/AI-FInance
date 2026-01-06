"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, User, Sparkles, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TradingChatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your AI Trading Assistant. I can help you analyze market trends, explain trading concepts, or suggest investment strategies based on your risk profile. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I'm analyzing that for you. ";
      const lowerInput = userMessage.content.toLowerCase();

      if (lowerInput.includes('nifty') || lowerInput.includes('market')) {
        botResponse += "The Nifty 50 is currently showing strong bullish momentum, trading above its 50-day moving average. RSI indicates it's approaching overbought territory, so a minor pullback might be expected.";
      } else if (lowerInput.includes('buy') || lowerInput.includes('sell')) {
        botResponse += "I cannot give specific financial advice, but generally, look for confirmation signals like volume spikes or candlestick patterns before entering a trade. Always manage your risk!";
      } else if (lowerInput.includes('news')) {
        botResponse += "Recent market news suggests positive sentiment in the tech sector. Keep an eye on the upcoming quarterly results.";
      } else {
        botResponse += "That's an interesting question about trading. Could you be more specific? I can help with technical analysis, fundamental data, or general market inquiries.";
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="bg-white border-slate-200 shadow-sm h-[500px] flex flex-col">
      <CardHeader className="border-b border-slate-100 pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-full">
            <Bot className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              TradeAI Assistant
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            </CardTitle>
            <p className="text-xs text-slate-500">Powered by Market Intelligence</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl p-3 rounded-bl-none border border-slate-200 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-xs text-slate-500">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-100 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about stocks, trends, or strategies..."
              className="flex-1 border-slate-200 focus-visible:ring-blue-500"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
