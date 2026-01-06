import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
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
          <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-blue-600">
            <LayoutDashboard size={18}/>
            <span className='hidden md:inline'>Dashboard</span>
          </Button>
          </Link>

          <Link href={"/transaction/create"}>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100">
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
