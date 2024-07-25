'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './hooks/useAuthContext';

export default function Home() {

const {state} = useAuthContext()
const router = useRouter()

useEffect(() => {
  console.log(router)
  console.log(state)
  if (state.user) {
    router.push('/home');
  } else {
    router.push('/login');
  }
});


return(
  <div className='text-center'> redirecting... refresh if this took to long</div>
)
}