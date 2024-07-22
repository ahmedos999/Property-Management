import {getProperty,createProperty,deleteProperty} from '../controllers/propertyCardController'
const express  = require('express')

const router = express.Router()

router.get('/',getProperty)
router.post('/',createProperty)
router.delete('/:id',deleteProperty)

module.exports = router