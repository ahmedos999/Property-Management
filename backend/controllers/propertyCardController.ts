import {PropertyCard} from '../models/propertyCardModel'
const mongoose =  require('mongoose')


export const getProperty = async(req:any,res:any)=>{

    const tasks =  await PropertyCard.find().sort({createdAt:-1});

    res.status(200).json(tasks)
}

export const createProperty = async(req:any,res:any)=>{
    const { community, building, unitNo } = req.body;

 if( !community && !building && !unitNo){
    return res.status(400).json({error:'Please fill all fields'})
 }


 try{
    const task = await PropertyCard.create({community,building,unitNo})
    res.status(200).json(task)
 }catch(e:any){
    res.status(400).json({error:e.message})
 }
}

export const deleteProperty = async (req:any,res:any)=>{
   const {id} = req.params
   
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such Task"})
   }

   const property = await PropertyCard.findOneAndDelete({_id:id})

   if(!property){
      return res.status(400).json({error:'No such property'})
   }

   res.status(200).json(property)

}

export const addLeadToProperty = async(req:any,res:any)=>{
   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such Task"})
   }

    const property = await PropertyCard.updateOne({_id:id},{status:'done'})

    if(!property){
      return res.status(400).json({error:'No such property'})
   }

   res.status(200).json(property)

}