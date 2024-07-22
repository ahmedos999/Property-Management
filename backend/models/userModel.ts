const mongoose = require('mongoose');
const validator = require('validator')
const bcrpypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    unique: true,
    required: true 
},
  password: { 
    type: String,
    required: true
},
  role: {
    type: String,
    enum: ['ADMIN', 'CUSTOMER'],
    required: true
}
});


userSchema.statics.signup = async function(username:string,password:string){
    const exisits = await this.findOne({username})

    if(!username || !password){
        throw Error('All field musr be filled')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong Enough')
    }

    if(exisits){
        throw Error('username is alread in use')
    }

        const salt = await bcrpypt.genSalt(10)
        const hash = await bcrpypt.hash(password,salt)

        const user = await this.create({username,password:hash,role:'ADMIN'})

        return user
}
userSchema.statics.login = async function(username:string,password:string){

    if(!username || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({username})

    if(!user){
        throw Error('Incorrect username')
    }

    const match = await bcrpypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user

}

export const User = mongoose.model('User', userSchema);