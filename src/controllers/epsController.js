const fs = require('fs');
const path = require('node:path');
const { epsToSvgPool } = require('../startup/worker');
    
exports.convertToSVG = async(req, res) => {
    try{
        if (!req.file) return res.status(400).send('No file uploaded');

        const inputFile = path.resolve(req.file.path);
        const outputFile = path.resolve(`./converted/${path.parse(req.file.filename).name}.svg`);
        //const inkscapePath = `"C:\\Program Files\\Inkscape\\bin\\inkscape.exe"`; //  windows path
        const inkscapePath = `/usr/bin/inkscape`; // linux path

        if (!fs.existsSync('./converted')) fs.mkdirSync('./converted');

        epsToSvgPool.exec('convertToSVG', [inputFile, outputFile, inkscapePath])
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