const express = require('express')
const { get } = require('express/lib/response')
const router = express.Router()
const chechAuth = require('../helpers/auth').checkAuth
const UserController = require('../controllers/UserController')

router.get('/', UserController.showHome)

router.get('/login', UserController.login)
router.post('/login', UserController.loginUser)

router.get('/register', UserController.register)
router.post('/register', UserController.registerUser)

router.get('/logout', UserController.logout)

router.get('/configureAccount', checkAuth, UserController.configureAccount)


module.exports = router