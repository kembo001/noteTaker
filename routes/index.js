const express = require('express');
const notesRouter = require('./notesRouter.js');
const app = express();
app.use('/notes', notesRouter);


module.exports = app;