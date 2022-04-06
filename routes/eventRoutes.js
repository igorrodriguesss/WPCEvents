const express = require('express')
const { get } = require('express/lib/response')
const router = express.Router();
const checkAuth = require('../helpers/auth').checkAuth
const EventController = require('../controllers/EventController')

router.get('/', EventController.showAllEvents)

router.get('/add', EventController.createEvent)
router.post('/add', EventController.createEventSave)


module.exports = router