const express = require("express");
const navigating = express.Router();

navigating.post('/myLocation', async (req,res) => {});
navigating.get('/getDangers', async (req,res) => {});

module.exports = navigating;