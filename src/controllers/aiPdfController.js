const fs = require('fs');
const path = require('node:path');
const { aiPdfToSvgPool } = require('../startup/worker');

exports.convertToSVG = async(req, res) => {
    try{
        if (!req.file) return res.status(400).send('No file uploaded');

        const inputFile = path.resolve(req.file.path);
        const outputFile = path.resolve(`./converted/${path.parse(req.file.filename).name}.svg`);
    
        if (!fs.existsSync('./converted')) fs.mkdirSync('./converted');

        aiPdfToSvgPool.exec('convertToSVG', [inputFile, outputFile])
        .then((svgData) => {
            res.setHeader("Content-Type", "image/svg+xml");
            res.send(svgData);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(`Conversion failed with error: ${error}`);
        });
    } catch (error){
        return res.status(400).send(error.message);
    }
}