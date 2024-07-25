import { useAuthContext } from "../hooks/useAuthContext"
import { usePropertyContext } from "../hooks/usePropertyContext"
import { Property } from "../types/property"

interface ChildComponentProps{
    _id:string
    unitNo:string
    community:string
    Building:string
    leads:any

}

export default function PropertyCard({ _id,unitNo, community, Building,leads,}: ChildComponentProps) {
  const {state,dispatch} = usePropertyContext()
  const {state:userState} = useAuthContext()
    const deleteProperty = async(event:any)=>{
      event.stopPropagation()
        const response = await fetch(`http://localhost:4000/api/property/`+_id,{
            method:'DELETE',
            headers:{
              'Authorization':`Bearer ${userState.user?.token}`
            }
          })
          if (!response.ok) {
            throw new Error('Somthing went wrong');
          }
        const json:Property = await response.json()
        dispatch({type:'DELETE_PROPERTY',payload:json})
    }
    return(
        <div className="p-2 m-2 bg-white rounded shadow">
            <div className="flex justify-between">
            <h2 className="text-black">Unit No: <span className="text-blue-800">{unitNo}</span></h2>
            <button className="p-1 rounded bg-red-600 text-sm text-white" onClick={(e)=>deleteProperty(e)}>delete</button>
            </div>
            <h2 className="text-black">Comunity: <span>{community}</span></h2>
            <h2 className="text-black">Building: <span>{Building}</span></h2>
            <h4 className="text-right text-sm">Leads: <span className="text-blue-800">{leads.length}</span></h4>
        </div>
    )

}