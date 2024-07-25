interface ChildComponentProps{
    name:string
    user:any
    propertyCard:any
}

export default function LeadCard({name,propertyCard}:ChildComponentProps){
    return(<div className="p-2 m-2 bg-white rounded text-sm shadow">
        <h2 className="text-black">Customer Name: <span className="text-blue-800">{name}</span></h2>
        <h4 className="text-right text-xs">Properties: <span className="text-blue-800">{propertyCard.length}</span></h4>
    </div>)
}