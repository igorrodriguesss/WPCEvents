const express = require('express')
const { get } = require('express/lib/response')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.showHome)
router.get('/login', UserController.login)
router.post('/login', UserController.login)
router.get('/register', UserController.register)
router.post('/register', UserController.registerUser)
router.get('/logout', UserController.logout)
module.exports = router