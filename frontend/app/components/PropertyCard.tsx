interface ChildComponentProps{
    unitNo:string
    community:string
    Building:string
    leads:any
}

export default function PropertyCard({ unitNo, community, Building,leads }: ChildComponentProps) {
    return(
        <div className="p-2 m-2 bg-white rounded">
            <h2 className="text-black">Unit No: <span className="text-blue-800">{unitNo}</span></h2>
            <h2 className="text-black">Comunity: <span>{community}</span></h2>
            <h2 className="text-black">Building: <span>{Building}</span></h2>
            <h4 className="text-right text-sm">Leads: <span className="text-blue-800">{leads.length}</span></h4>
        </div>
    )

}