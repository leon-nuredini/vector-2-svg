const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function(app){
    const limiter = rateLimit({
        windowMs: 3000,
        max: 1,
        message: { error: "Too many requests. You can make only one request in 3 seconds. Please wait before trying again." },
        standardHeaders: true,
        legacyHeaders: false,
        skipFailedRequests: true,
    });

    const speedLimiter = slowDown({
        windowMs: 30 * 1000,
        delayAfter: 5,
        delayMs: (hits) => hits * 100
    });

    app.use(helmet());
    app.use(cors());
    app.use(limiter);
    app.use(speedLimiter);
}