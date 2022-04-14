const express = require('express')
const { get } = require('express/lib/response')
const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth
const UserController = require('../controllers/UserController')

router.get('/', checkAuth, UserController.showHome)

router.get('/login', UserController.login)
router.post('/login', UserController.loginUser)

router.get('/register', UserController.register)
router.post('/register', UserController.registerUser)

router.get('/edit/:id', checkAuth, UserController.updateUser)
router.post('/edit', checkAuth, UserController.updateUserSave)

router.get('/logout', UserController.logout)

module.exports = router