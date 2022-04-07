const express = require('express')
const { get } = require('express/lib/response')
const router = express.Router();

const checkAuth = require('../helpers/auth').checkAuth
const EventController = require('../controllers/EventController')

const path = require('path')
const multer = require('multer') 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.image + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })




router.get('/', EventController.showAllEvents)
router.get('/showEvent', checkAuth, EventController.showEvent)

router.get('/add', checkAuth, EventController.createEvent)
router.post('/add', upload.array('image'), checkAuth, EventController.createEventSave)

router.post('/remove', checkAuth, EventController.removeEvent)


module.exports = router