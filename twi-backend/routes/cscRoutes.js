const express = require('express');
const router = express.Router();
const cscController = require('../controllers/cscController'); // Adjust the path as necessary

router.post('/csc', cscController.createCsc);
router.get('/csc', cscController.getAllCscs);
router.get('/csc/:id', cscController.getCscById);
router.put('/csc/:id', cscController.updateCsc);
router.delete('/csc/:id', cscController.deleteCsc);

module.exports = router;
