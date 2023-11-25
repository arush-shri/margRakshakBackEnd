const express = require("express");
const navigating = express.Router();

navigating.post('/myLocation', async (req,res) => {
    const database = req.app.locals.database;
});
navigating.get('/getDangers', async (req,res) => {
    const database = req.app.locals.database;
});

module.exports = navigating;