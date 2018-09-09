const routes = require('express').Router()
const routerUser = require('./users')
const routerTodo = require('./todo')

routes.use('/users', routerUser)
routes.use('/todo', routerTodo)

module.exports = routes
