// Router houses the routes for the /api path 
const router = require("express").Router()

const apiRoutes = require("./apiRoutes")

router.use('/api', apiRoutes)

module.exports = router

