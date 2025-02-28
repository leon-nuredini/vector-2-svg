const multer = require('multer');
const path = require('node:path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
})

const aiPdfFilter = (req, file, cb) => {
    if (file.fieldname === 'file' && (path.extname(file.originalname) === '.ai' || path.extname(file.originalname) === '.pdf')) {
      cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .ai and .pdf files are allowed in file property!'), false);
    }
}

const epsFilter = (req, file, cb) => {
    if (file.fieldname === 'file' && path.extname(file.originalname) === '.eps') {
      cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .eps files are allowed in file property!'), false);
    }
}

const pngFilter = (req, file, cb) => {
    if (file.fieldname === 'file' && (path.extname(file.originalname) === '.png') 
        || path.extname(file.originalname) === '.jpg' 
        || path.extname(file.originalname) == '.tiff'
        || path.extname(file.originalname) == '.gif') {
      cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .png, .jpg, .tiff, and gif files are allowed in file property!'), false);
    }
}

const uploadAiPdf = multer({ 
    storage: storage,
    fileFilter: aiPdfFilter
});

const uploadEps = multer({ 
    storage: storage,
    fileFilter: epsFilter
});

const uploadPng = multer({ 
    storage: storage,
    fileFilter: pngFilter,
    limits: { fileSize: 5 * 1024 * 1024 } //5mb upload limit
});

function deleteFile(filePath){
    return new Promise((resolve) => {
        setTimeout(() => {
            fs.unlink(filePath, (err) => {
                if (err && err.code !== 'ENOENT') {
                    console.error(`Failed to delete file: ${filePath}`, err);
                }
                resolve();
            });
        }, 1000)
    });
}

module.exports.uploadAiPdf = uploadAiPdf;
module.exports.uploadEps = uploadEps;
module.exports.uploadPng = uploadPng;
module.exports.deleteFile = deleteFile;