const express = require("express");
const contributionRoute = express.Router();
const contributionController = require('../controllers/contributionController')

contributionRoute.post('/accidentArea', async (req,res) => {
    const database = req.app.locals.database;
    contributionController.AccidentArea(database, req.body.latitude, req.body.longitude);
});

contributionRoute.post('/blindTurn', async (req,res) => {
    const database = req.app.locals.database;
    contributionController.BlindTurn(database, req.body.latitude, req.body.longitude);
});

contributionRoute.post('/forestRoad', async (req,res) => {
    const database = req.app.locals.database;
    contributionController.ForestRoad(database, req.body.latitude, req.body.longitude);
});

contributionRoute.post('/ghatRegion', async (req,res) => {
    const database = req.app.locals.database;
    contributionController.GhatRegion(database, req.body.latitude, req.body.longitude);
})

module.exports = contributionRoute