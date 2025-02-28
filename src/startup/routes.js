const express = require('express');
const epsRoute = require('../routes/epsRoute');
const aiPdfRoute = require('../routes/aiPdfRoute');
const traceVectorRoute = require('../routes/traceVectorRoute');

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/eps', epsRoute);
    app.use('/api/aiPdf', aiPdfRoute);
    app.use('/api/traceVector', traceVectorRoute);
}