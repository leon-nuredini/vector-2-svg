const winston = require('winston');

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [
        new winston.transports.Console({ colorize: true, prettyPrint: true }), // Log to the console
        new winston.transports.File({ filename: 'logs/combined.log' }) // Log to a file
      ]
});

module.exports = logger;