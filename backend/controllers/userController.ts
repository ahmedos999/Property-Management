import {User} from '../models/user'
const jwt = require('jsonwebtoken')

const createToken = (_id:string)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

export const loginUser = async(req:any,res:any)=>{
    const {username,password} = req.body 

    try{
       const user =  await User.login(username,password)

        const token = createToken(user._id)
        res.status(200).json({username,token})
    }catch(error:any){
        res.status
        res.status(400).json({error:error.message})
    }
}

export const signupUser = async(req:any,res:any)=>{
    console.log('ran')
    const {username,password} = req.body

    try{
        const user  = await User.signup(username,password)

        const token = createToken(user._id)
        res.status(200).json({username,token})
    }catch(error:any){
        res.status(400).json({error:error.message})
    }
}

export const getallusers = async(req:any,res:any)=>{
    try{
        const allUsers = await User.find().select('email')
        if(allUsers){
            res.status(200).json(allUsers)
        }
    }catch(e){
        res.status(400).json({error:'something went wrong'})
    }
 }
