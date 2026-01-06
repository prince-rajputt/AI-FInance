import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection />

      <section className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-blue-50 relative overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-amber-300/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-purple-300/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
         </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-semibold tracking-wide uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-gradient-to-b from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 text-transparent bg-clip-text">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card className="p-6 hover:shadow-2xl transition-all duration-500 border-transparent hover:border-purple-200 bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 group rounded-2xl" key={index}>
                <CardContent className="space-y-4 pt-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <div className="text-blue-600 group-hover:text-indigo-600 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Pattern Overlay */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-blue-100">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 border-none bg-gradient-to-br from-gray-50 to-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100/50 to-transparent rounded-bl-full -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 
                <CardContent className="pt-4 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full relative border-2 border-white"
                    />
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-blue-600 font-medium">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
            <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-blue-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-purple-500/20 rounded-full blur-[120px]" />
         </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
             Join thousands of users who are already making smarter financial decisions with Apna Finance.
          </p>
           <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg shadow-xl shadow-orange-500/20 transition-all duration-300 hover:scale-105">
                Start Your Journey Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
