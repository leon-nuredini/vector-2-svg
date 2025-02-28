const express = require('express');
const app = express();

require('./startup/config')(app);
require('./startup/routes')(app);
require('./startup/logging')(app);

const port = process.env.PORT || 5555;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });