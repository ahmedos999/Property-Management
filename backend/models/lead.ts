import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyCard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyCard',
        required: true }
  });
  
  const Lead = mongoose.model('Lead', leadSchema);