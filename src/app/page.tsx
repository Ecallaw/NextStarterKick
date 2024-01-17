'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'


export default function Home() {
  const { data : session, status, update } = useSession()
  console.log("USE SESSION")
  console.log(status, session)
  return (
    <main className=''>
      {/* <header className='flex flex-1 justify-start bg-gray-500 px-20'>
        <Image width={500} height={500} priority={true} className="h-20 w-auto" src="/MintsetLogoMonochrommeBlanc.svg" alt="Your Company"/>
        <div className='flex flex-1 justify-end items-center gap-8 mx-'>
          <Link href="/dashboard">Dashboard</Link>
          {session !== null ?  
            <button className='block px-6 py-2 bg-green-500 rounded-lg' onClick={() => signOut()}>Logout</button> :
            <>
              <Link href="/auth/signIn">Sign In</Link>
              <Link href="/register" className='block px-6 py-2 bg-green-500 rounded-lg'>Sign up</Link>
            </>
          }
        </div>
      </header>  */}
    </main>
  )
}
