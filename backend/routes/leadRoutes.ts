import { createLead,addLeadToProperty,getleads } from "../controllers/leadController";

const express  = require('express')

const router = express.Router()

router.get('/',getleads)
router.post('/',createLead)
router.post('/linkLeadToProperty',addLeadToProperty)

module.exports = router
