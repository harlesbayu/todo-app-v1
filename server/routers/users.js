const routes = require('express').Router()
const { home, findAll, signup, signin, signinFacebook, update, remove } = require('../controllers/userController')
const { auth } = require('../middleware')

routes.post('/signup', signup)
routes.post('/signin', signin)
routes.post('/signinFb', signinFacebook)
routes.put('/update/:id', update)
routes.delete('/delete/:id', remove)

module.exports = routes