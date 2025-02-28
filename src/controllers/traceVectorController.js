const path = require('node:path');
const { traceToSvgPool } = require('../startup/worker');

exports.convertToSVG = async(req, res) => {
    try{
        if (!req.file) return res.status(400).send('No file uploaded');

        const inputFile = path.resolve(req.file.path);
        const outputFile = path.resolve(`./converted/${path.parse(req.file.filename).name}.svg`);

        const options = {
            output: "svg",
            out: outputFile
        }

        traceToSvgPool.exec('traceToSVG', [inputFile, outputFile, options])
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