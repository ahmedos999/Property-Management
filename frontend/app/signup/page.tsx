'use client'

import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/navigation";

const Signup = () => {
    const [username,setUsername] = useState<string>('')
    const [password,setPassowrd] =  useState<string>('')
    const [repassword,setrePassowrd] =  useState<string>('')
    const [passError,setpassError] =  useState<string>()

    const {signup,isLoading,error} = useSignup()
    const {state:userState} = useAuthContext()
    const router = useRouter()

    
        useEffect(()=>{
            if(userState.user) router.replace('/home')
        })
    const submit =async()=>{
        if(password !== repassword ){
            setpassError('Please re-enter password correctly')
            return
        }
        await signup(username,password)
    }

    return ( 
        
            <div className="lg:w-4/12 md:w-8/12 h-3/5 bg-white rounded-lg p-6 mx-auto my-20 shadow">
        <h2 className=" text-2xl font-bold teko text-center">Welcome to <span className="bg-slate-200 p-1 text-black rounded">Property Management</span></h2>
        <h2 className="font-bold text-xl text-black my-4">Register here</h2>
        <div className="flex flex-col">
        <label htmlFor="" className="">Username</label>
        <input type="text" name="" placeholder="AhmedSheikh" id="email" className="mb-2 rounded border-2 border-slate-800 text-slate-900 p-1" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <label htmlFor="">Password</label>
        <input type="password" placeholder="xxxxxxx" name="" id="pass" className="mb-2 rounded border-2 border-slate-800 text-slate-900 p-1" value={password} onChange={(e)=>setPassowrd(e.target.value)}/>
        <label htmlFor="">Re-enter Password</label>
        <input type="password" placeholder="xxxxxxx" name="" id="repass" className="mb-2 rounded border-2 border-slate-800 text-slate-900 p-1" value={repassword} onChange={(e)=>setrePassowrd(e.target.value)}/>
        {passError && <div className='mt-2 text-sm text-red-500 '>{passError}</div>}
        <p className="text-sm">Password should include Upper/lower/number/symbol</p>
        <a href="/login" className="text-sm underline mt-2 font-bold">Already have an account ?</a>
        </div>
        <button onClick={submit} disabled={isLoading} className="bg-blue-800 w-full py-2 px-8 rounded mx-auto mt-4 text-white font-bold hover:bg-slate-200 hover:text-black transition-all flex justify-center items-center">Sign up</button>
        {error && <div className='mt-2 text-sm text-red-500 font-bold'>{error}</div>}
    </div>
        
);
}
 
export default Signup;