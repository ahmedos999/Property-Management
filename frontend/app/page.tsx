'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './hooks/useAuthContext';



export default function HomePage() {

  const {state} = useAuthContext()
const router = useRouter()

useEffect(()=>{
  if(state.user) {router.push('/home')}else{router.push('/login')}
},[])
}