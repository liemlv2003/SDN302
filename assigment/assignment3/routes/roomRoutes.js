const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/', roomController.getAllRooms);
router.get('/add', roomController.showAddRoomForm);
router.post('/add', roomController.addRoom);

module.exports = router;
