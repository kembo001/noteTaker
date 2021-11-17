const express = require('express');
const routes = require('./routes.js');
const app = express();
app.use('/notes', routes);


module.exports = app;