import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox, BarChart, ArrowRightLeft, TrendingUp } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {
  await checkUser();
  
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200'>
        <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-amber-500 via-purple-600 to-blue-600 rounded-xl p-0.5 transition-transform duration-300 group-hover:scale-110">
                <div className="bg-white rounded-[10px] p-2">
                   <div className="h-6 w-6 bg-gradient-to-br from-amber-500 via-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="font-bold text-white text-sm">A</span>
                   </div>
                </div>
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 via-purple-600 to-blue-600 text-transparent bg-clip-text tracking-tight group-hover:opacity-90 transition-opacity">
                Apna Finance
              </span>
            </Link>

      <div className='flex items-center space-x-4'>
        <SignedIn>
          <Link href={"/dashboard"} className='text-slate-600 hover:text-blue-600 flex items-center gap-2'>
          <Button variant="outline" className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:text-blue-800 hover:border-blue-300 font-semibold shadow-sm shadow-blue-100">
            <LayoutDashboard size={18}/>
            <span className='hidden md:inline'>Dashboard</span>
          </Button>
          </Link>

          <Link href={"/transfer"} className='text-slate-600 hover:text-green-600 flex items-center gap-2'>
          <Button variant="outline" className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:text-green-800 hover:border-green-300 font-semibold shadow-sm shadow-green-100">
            <ArrowRightLeft size={18}/>
            <span className='hidden md:inline'>Transfer</span>
          </Button>
          </Link>

          <Link href={"/analytics"} className='text-slate-600 hover:text-purple-600 flex items-center gap-2'>
          <Button variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-800 hover:border-purple-300 font-semibold shadow-sm shadow-purple-100">
            <BarChart size={18}/>
            <span className='hidden md:inline'>Analytics</span>
          </Button>
          </Link>

          <Link href={"/trading"} className='text-slate-600 hover:text-orange-600 flex items-center gap-2'>
          <Button variant="outline" className="bg-gradient-to-r from-orange-50 to-rose-50 text-orange-700 border-orange-200 hover:bg-gradient-to-r hover:from-orange-100 hover:to-rose-100 hover:text-orange-800 hover:border-orange-300 font-semibold shadow-sm shadow-orange-100">
            <TrendingUp size={18}/>
            <span className='hidden md:inline'>Trading</span>
          </Button>
          </Link>

          <Link href={"/transaction/create"}>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md shadow-blue-200 font-semibold">
            <PenBox size={18} />
            <span className='hidden md:inline'>Add Transaction</span>
          </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl='/dashboard'>
          <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-blue-600">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton appearance={{
              elements:{
                avatarBox:"w-10 h-10",
              }
            }} />
        </SignedIn>
        </div>
        </nav>
    </div>
  )
}

export default Header
