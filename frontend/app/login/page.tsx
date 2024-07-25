'use client'

import { useEffect, useState } from "react";
import { useSignin } from "../hooks/useSignin";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
    const {state:userState} = useAuthContext()
    const router = useRouter()
    console.log(userState)

    
        useEffect(()=>{
            if(userState.user) router.replace('/')
    })


    const [username,setUsername] = useState<string>('')
    const [password,setPassowrd] =  useState<string>('')
     const {signin,isLoading,error} = useSignin()

     const submit = async()=>{
        await signin(username,password)
    }

    return ( 
        
            <div className="lg:w-4/12 md:w-8/12 h-3/5 bg-white rounded-lg p-6 mx-auto my-20 shadow">
        <h2 className=" text-2xl font-bold teko text-center">Welcome to <span className="bg-slate-200 p-1 text-black rounded">Property Management</span></h2>
        <h2 className="font-bold text-xl text-black my-4">Login here</h2>
        <div className="flex flex-col">
        <label htmlFor="" className="">Username</label>
        <input type="text" name="" placeholder="AhmedSheikh" id="email" className="mb-2 rounded border-2 border-slate-800 text-slate-900 p-1" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <label htmlFor="">Password</label>
        <input type="password" placeholder="xxxxxxx" name="" id="pass" className="mb-2 rounded border-2 border-slate-800 text-slate-900 p-1" value={password} onChange={(e)=>setPassowrd(e.target.value)}/>
        <a href="/signup" className="text-sm underline">Dont have an account signup?</a>
        </div>
        <button onClick={submit} disabled={isLoading} className="bg-blue-800 w-full py-2 px-8 rounded mx-auto mt-4 text-white font-bold hover:bg-slate-200 hover:text-black transition-all flex justify-center items-center">login</button>
        {error && <div className='mt-2 text-sm text-red-500 '>{error}</div>}

    </div>
        
);
}
 
export default Login;