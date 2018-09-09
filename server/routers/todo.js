const routes = require('express').Router()
const { findAll, home, create, update, remove, complete, uncomplete, quotes } = require('../controllers/todoController')
const { auth } = require('../middleware')

routes.get('/findTask', auth, findAll)
routes.post('/create', auth, create)
routes.put('/update/:id', update)
routes.delete('/delete/:id', remove)
routes.put('/complete/:id', complete)
routes.put('/uncomplete/:id', uncomplete)

//TEST API
routes.get('/quotes', quotes)

module.exports = routes