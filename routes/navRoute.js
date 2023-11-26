const express = require("express");
const navigating = express.Router();
const navigatingController = require('../controllers/navigatingController');

let myLocation;
navigating.post('/myLocation', async (req,res) => {
    const database = req.app.locals.database;
    myLocation = {
        "latitude": latitude,
        "longitude": longitude
    };
    const result = navigatingController.SetMyLocation(database, req.body.email, req.body.latitude, req.body.longitude);
    if(result === true){
        res.status(200).send(true);
    }
    else{
        res.status(500).send(false);
    }
});
navigating.get('/getDangers', async (req,res) => {
    const database = req.app.locals.database;
    const result = await navigatingController.GetDangers(database, myLocation)
});

module.exports = navigating;