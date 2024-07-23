import express, { Request, Response } from 'express';
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/userRoutes')
const propertyRoutes = require('./routes/propertyCardRoutes')
const leadRoutes = require('./routes/leadRoutes')


app.use(express.json())

// logging
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// route 
app.use('/api/user',userRoutes)
app.use('/api/property',propertyRoutes)
app.use('/api/lead',leadRoutes)

  mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected to mongodb and server is running')
    })
}).catch((error:any)=>{
    console.log(error)
})