import { Lead } from "../models/leadModel";
import {PropertyCard} from '../models/propertyCardModel'
const mongoose =  require('mongoose')

export const createLead = async(req:any,res:any)=>{
 const {name} = req.body

 if(!name)
    return res.status(400).json({error:'Please fill all fields'})

 try{
    const lead = await Lead.create({name})
    res.status(200).json(lead)
 }catch(error:any){
    return res.status(400).json({error:error.message})
 }
}

export const getleads = async(req:any,res:any)=>{
  
   try{
      const lead = await Lead.find()
      res.status(200).json(lead)
   }catch(error:any){
      return res.status(400).json({error:error.message})
   }
  }

export const addLeadToProperty = async (req:any, res:any) => {
   const { leadId, propertyCardId } = req.body;

   if(!mongoose.Types.ObjectId.isValid(leadId)){
      return res.status(404).json({error:"No such lead"})
   }

   if(!mongoose.Types.ObjectId.isValid(propertyCardId)){
      return res.status(404).json({error:"No such property"})
   }
 
   try {
     const lead = await Lead.findById(leadId);
     if (!lead) {
       return res.status(404).send('Lead not found');
     }
 
     const propertyCard = await PropertyCard.findById(propertyCardId);
     if (!propertyCard) {
       return res.status(404).send('Property Card not found');
     }
 
     lead.propertyCard.push(propertyCardId);
     await lead.save();
 
     propertyCard.leads.push(leadId);
     await propertyCard.save();
 
     res.status(200).json(propertyCard);
   } catch (error:any) {
      res.status(400).json({error:error.message})
   }
 };