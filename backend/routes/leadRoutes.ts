import { createLead,addLeadToProperty } from "../controllers/leadController";

const express  = require('express')

const router = express.Router()

router.post('/',createLead)
router.post('/linkLeadToProperty',addLeadToProperty)

module.exports = router
