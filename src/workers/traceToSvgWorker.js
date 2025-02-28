const fs = require('fs');
const { deleteFile } = require('../middleware/fileUpload');
const workerpool = require('workerpool');
const { ImageTracerNodejs } = require('@image-tracer-ts/nodejs');

function traceToSVG(inputFile, outputFile, options){
    return new Promise(async (resolve, reject) => {
        await ImageTracerNodejs.fromFileName(inputFile, options);   

        fs.readFile(outputFile, "utf8", async (readErr, svgData) => {
            if (readErr) {
                reject("File Read Error");
                return;
            }

            resolve(svgData);

            await deleteFile(inputFile);
            await deleteFile(outputFile);
        });
    });
}

workerpool.worker({
    traceToSVG
});