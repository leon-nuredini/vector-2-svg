const express = require('express');
const router = express.Router();
const traceVectorController = require('../controllers/traceVectorController');
const { uploadPng } = require('../middleware/fileUpload');

router.post('/', uploadPng.single('file'), traceVectorController.convertToSVG);

module.exports = router;