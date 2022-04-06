const express = require('express')
const { get } = require('express/lib/response')
const router = express.Router();
const checkAuth = require('../helpers/auth').checkAuth
const EventController = require('../controllers/EventController')

router.get('/', checkAuth, EventController.showAllEvents)
router.get('/showEvent', checkAuth, EventController.showEvent)

router.get('/add', checkAuth, EventController.createEvent)
router.post('/add', checkAuth, EventController.createEventSave)




module.exports = router