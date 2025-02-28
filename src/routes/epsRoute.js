const express = require('express');
const router = express.Router();
const epsController = require('../controllers/epsController');
const { uploadEps } = require('../middleware/fileUpload');

router.post('/', uploadEps.single('file'), epsController.convertToSVG);

module.exports = router;