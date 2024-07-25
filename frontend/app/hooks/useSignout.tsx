
import { useAuthContext } from "./useAuthContext"

export const useSignout = ()=>{

 const {dispatch} = useAuthContext()

    const logout = async()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        
    }
    

    return {logout}
}