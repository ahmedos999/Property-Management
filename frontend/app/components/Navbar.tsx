'use client'
import React from 'react'
import logo from './logo.png'
import Image from 'next/image'
import { useAuthContext } from '../hooks/useAuthContext'
import { useSignout } from '../hooks/useSignout'
import { useRouter } from 'next/navigation'
export default function Navbar() {
   const {logout} = useSignout()
    const {state} = useAuthContext()
    const router = useRouter()
    const signout=()=>{
      logout()
      router.replace('/login')
    } 
  return (
    <nav className='pb-4
      border-b-2 border-gray-200
      flex items-center gap-5 
      my-10 mx-auto 
      max-w-5xl justify-between
      '>
      <div>
      <Image
      src={logo}
      alt='Real Estate logo'
      width={70}
      quality={100}
      placeholder='blur'>

      </Image>
        <h1>
          Property Management
        </h1>
      </div>
      <div className='flex gap-4 items-center'>
        {state.user && <h2>{state.user.username}</h2>}
        {state.user && <button onClick={signout} className='px-2 py-1 border bg-blue-500 text-white rounded hover:text-blue-500 hover:bg-white hover:border-blue-500'>Logout</button>}
      </div>
      </nav>
  )
}