const routes = require('express').Router()
const ApodController = require('../../controllers/ApodController')

const authenticated = require('../../middlewares/authenticated')

routes.use(authenticated)

routes.post('/', ApodController.getApod)
routes.get('/', ApodController.getMyApod)
routes.get('/:id', ApodController.myApod)
routes.delete('/:id', ApodController.deleteApod)

module.exports = routes