const express = require("express");
const contributionRoute = express.Router();

contributionRoute.post('/accidentArea', async (req,res) => {
    const database = req.app.locals.database;
});

contributionRoute.post('/blindTurn', async (req,res) => {
    const database = req.app.locals.database;
});

contributionRoute.post('/forestRoad', async (req,res) => {
    const database = req.app.locals.database;
});

contributionRoute.post('/ghatRegion', async (req,res) => {
    const database = req.app.locals.database;
})

module.exports = contributionRoute