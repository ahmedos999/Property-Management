import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = ()=>{

 const [isLoading,setIsLoading] = useState<boolean>(false)
 const [error,setError] = useState<string| null>(null)
 const {dispatch} = useAuthContext()

    const signup = async(username:string,password:string)=>{
        console.log(username+" "+password)
        setIsLoading(true)
        const response = await fetch(`http://localhost:4000/api/user/signup`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,password})
        })
        const json = await response.json()

        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            setIsLoading(false)
            dispatch({type:'LOGIN',payload:json})
        }else{
            console.log(json)
            setIsLoading(false)
            setError(json.error)
        }
    }
    

    return {signup,isLoading,error}
}