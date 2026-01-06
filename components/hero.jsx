"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart2, Wallet, Sparkles, TrendingUp, Volume2, VolumeX } from "lucide-react";

const HeroSection = () => {

  const imageRef = useRef();
  const iframeRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (iframeRef.current) {
      const action = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: action,
        args: []
      }), '*');
      setIsMuted(!isMuted);
    }
  };

  useEffect(()=>{
    const imageElement = imageRef.current;

    const handleScroll=()=>{
      const scrollPosition=window.scrollY;
      const scrollThreshold=100;

      if(scrollPosition>scrollThreshold){
        imageElement?.classList.add("scrolled");
      }else{
        imageElement?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll",handleScroll)

    return ()=>window.removeEventListener("scroll",handleScroll);
  }, []);

  return (
    <div className="pb-20 px-4 pt-10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/30 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-blue-200/30 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-purple-100 border border-amber-200 text-amber-800 mb-8 animate-fade-in-up">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold">New Year, New Financial Goals</span>
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 bg-gradient-to-r from-amber-600 via-purple-600 to-blue-600 font-extrabold tracking-tighter pr-2 text-transparent bg-clip-text animate-gradient">
          Make 2026 Your <br /> Best Financial Year
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Start the year right with the all-in-one platform for personal finance tracking and professional trading analysis.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Finance Management Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Wallet className="h-32 w-32 -rotate-12 text-blue-600" />
                </div>
                
                <div className="relative z-10 flex flex-col items-start text-left">
                    <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-lg shadow-blue-200">
                        <Wallet className="h-8 w-8" />
                    </div>
                    <h2 className="mb-3 text-3xl font-bold text-gray-900">Finance Management</h2>
                    <p className="mb-8 text-gray-600 text-lg">
                        Take control of your spending. Track expenses, set smart budgets, and save more with AI-powered insights.
                    </p>
                    <Link href="/dashboard" className="w-full mt-auto">
                        <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-200 transition-all duration-300 transform hover:scale-[1.02]">
                            Start Managing Finances <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Trading Analysis Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <TrendingUp className="h-32 w-32 -rotate-12 text-amber-600" />
                </div>

                <div className="relative z-10 flex flex-col items-start text-left">
                    <div className="mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 text-white shadow-lg shadow-amber-200">
                        <BarChart2 className="h-8 w-8" />
                    </div>
                    <h2 className="mb-3 text-3xl font-bold text-gray-900">Trading Analysis</h2>
                    <p className="mb-8 text-gray-600 text-lg">
                        Level up your trading. Analyze Indian stocks, global indices, and forex with pro-grade charts and data.
                    </p>
                    <Link href="/trading" className="w-full mt-auto">
                        <Button size="lg" variant="outline" className="w-full border-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 shadow-sm transition-all duration-300 transform hover:scale-[1.02]">
                            Explore Markets <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

        <div>
          <div ref={imageRef} className="hero-image relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-lg shadow-2xl border mx-auto bg-black overflow-hidden aspect-video">
                <iframe 
                    ref={iframeRef}
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1uIUUVBrj0g?autoplay=1&mute=1&loop=1&playlist=1uIUUVBrj0g&controls=0&showinfo=0&rel=0&enablejsapi=1" 
                    title="AI in Finance" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                
                <div className="absolute bottom-6 right-6 z-20">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm h-12 w-12"
                        onClick={toggleMute}
                    >
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
