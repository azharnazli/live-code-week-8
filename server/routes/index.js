const routes = require('express').Router()
const users = require('./users')
const apods = require('./apods')

routes.use('/', users)
routes.use('/apods', apods)

module.exports = routes