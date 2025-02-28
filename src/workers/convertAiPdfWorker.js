const { exec } = require('child_process');
const fs = require('fs');
const { deleteFile } = require('../middleware/fileUpload');
const workerpool = require('workerpool');

function convertToSVG(inputFile, outputFile){
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject("Inkscape process timed out"), 10000);
        exec(`inkscape "${inputFile}" --export-type=svg --export-filename="${outputFile}"`, async (err, stdout, stderr) => {
            clearTimeout(timeout);
            if (err)
                reject(`Inkscape Error: ${stderr}`);

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
    });
}

workerpool.worker({
    convertToSVG
});