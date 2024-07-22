import mongoose from 'mongoose'

const propertyCardSchema = new mongoose.Schema({
    community:{
        type: String,
        enum: ['CommunityA', 'CommunityB'],
        required: true
    },
    building: {
        type: String,
        enum: ['BuildingA', 'BuildingB'],
        required: true
    },
    unitNo: {
        type: String,
        required: true
    },
    leads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
    }]
  });
  
  propertyCardSchema.index({ community: 1, building: 1, unitNo: 1 }, { unique: true });
  
  const PropertyCard = mongoose.model('PropertyCard', propertyCardSchema);