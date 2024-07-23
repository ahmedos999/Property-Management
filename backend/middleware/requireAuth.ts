const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const requireAuth = async(req:any,res:any,next:any)=>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(400).json({error:'Authorzation token required'})
    }

    const token = authorization.split(" ")[1]

    try{
        const { _id } = jwt.verify(token, process.env.SECRET)
        // req.role = await User.findOne({_id}).select('role')
        console.log(_id)
        next()
    }catch(e){
        console.log(e)
        res.status(401).json({error:'Request is not authorized'})
    }
}

module.exports = requireAuth