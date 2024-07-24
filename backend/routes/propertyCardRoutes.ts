import {getProperties,getPropertiesWithleads,createProperty,deleteProperty,updateProperty} from '../controllers/propertyCardController'
const express  = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/',getProperties)
router.get('/getPropertiesWithLeads',getPropertiesWithleads)
router.post('/',createProperty)
router.delete('/:id',deleteProperty)
router.patch('/:id',updateProperty)

module.exports = router