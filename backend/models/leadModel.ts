import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    propertyCard: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyCard',
         }]
  });
  
  export const Lead = mongoose.model('Lead', leadSchema);