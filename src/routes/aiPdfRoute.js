const express = require('express');
const router = express.Router();
const aiPdfController = require('../controllers/aiPdfController');
const { uploadAiPdf } = require('../middleware/fileUpload');

router.post('/', uploadAiPdf.single('file'), aiPdfController.convertToSVG);

module.exports = router;