const workerpool = require('workerpool');

const epsToSvgPool = workerpool.pool('./src/workers/convertEpsWorker.js');
const aiPdfToSvgPool = workerpool.pool('./src/workers/convertAiPdfWorker.js');
const traceToSvgPool = workerpool.pool('./src/workers/traceToSvgWorker.js');

module.exports.epsToSvgPool = epsToSvgPool;
module.exports.aiPdfToSvgPool = aiPdfToSvgPool;
module.exports.traceToSvgPool = traceToSvgPool;