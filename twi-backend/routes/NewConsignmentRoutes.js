const express = require('express');
const router = express.Router();
const transportController = require('../controllers/NewConsignmentController');

// Routes
router.post('/transport-details', transportController.createTransportDetail);
router.get('/transport-details', transportController.getAllTransportDetails);
router.get('/transport-details/:id', transportController.getTransportDetailById);
router.put('/transport-details/:id', transportController.updateTransportDetail);
router.delete('/transport-details/:id', transportController.deleteTransportDetail);

module.exports = router;
