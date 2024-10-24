const express = require('express');
const router = express.Router();
const slotController = require('../Controller/slotbook_controller');

router.post('/insert', slotController.createSlot);
router.get('/getall', slotController.getAllSlots);
router.get('/byid:id', slotController.getSlotById);
router.put('/update:id', slotController.updateSlot);
router.delete('/delete:id', slotController.deleteSlot);

module.exports = router;
