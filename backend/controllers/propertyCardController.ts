import {PropertyCard} from '../models/propertyCardModel'
const mongoose =  require('mongoose')


export const getProperties = async(req:any,res:any)=>{

   if(req.user.role !== 'ADMIN') return res.status(400).json({error:'Requier admin access'})

    const property =  await PropertyCard.find().sort({createdAt:-1});

    res.status(200).json(property)
}

export const getPropertiesWithleads = async(req:any,res:any)=>{

   if(req.user.role !== 'ADMIN') return res.status(400).json({error:'Requier admin access'})

   const property =  await PropertyCard.find().sort({createdAt:-1}).populate('leads', 'name');;

   res.status(200).json(property)
}

export const createProperty = async(req:any,res:any)=>{

   if(req.user.role !== 'ADMIN') return res.status(400).json({error:'Requier admin access'})
    const { community, building, unitNo } = req.body;

 if( !community && !building && !unitNo){
    return res.status(400).json({error:'Please fill all fields'})
 }


 try{
    const property = await PropertyCard.create({community,building,unitNo})
    res.status(200).json(property)
 }catch(error:any){
    res.status(400).json({error:error.message})
 }
}

export const deleteProperty = async (req:any,res:any)=>{

   if(req.user.role !== 'ADMIN') return res.status(400).json({error:'Requier admin access'})


   const {id} = req.params
   
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such property"})
   }

   const property = await PropertyCard.findOneAndDelete({_id:id})

   if(!property){
      return res.status(400).json({error:'No such property'})
   }

   res.status(200).json(property)

}


export const updateProperty = async (req:any,res:any)=>{

   if(req.user.role !== 'ADMIN') return res.status(400).json({error:'Requier admin access'})


   const {id} = req.params

   const {community,building,unitNo} = req.body
   
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such property"})
   }

   const property = await PropertyCard.findByIdAndUpdate({_id:id},{$set:{unitNo,community,building}})

   if(!property){
      return res.status(400).json({error:'No such property'})
   }

   res.status(200).json(property)

}

export const addLeadToProperty = async(req:any,res:any)=>{

   if(req.user.role !== 'ADMIN') return res.status(400).json({error:'Requier admin access'})
      
   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such property"})
   }

    const property = await PropertyCard.updateOne({_id:id},{status:'done'})

    if(!property){
      return res.status(400).json({error:'No such property'})
   }

   res.status(200).json(property)

}