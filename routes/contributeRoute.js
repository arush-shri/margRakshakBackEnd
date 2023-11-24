const express = require("express");
const contributionRoute = express.Router();



contributionRoute.get('/', async (req,res) => {
    const database = req.app.locals.database;
})

module.exports = contributionRoute