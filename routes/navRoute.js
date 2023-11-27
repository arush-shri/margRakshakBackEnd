const express = require("express");
const navigating = express.Router();
const navigatingController = require('../controllers/navigatingController');

let myLocation;
let UserPositionID;
navigating.post('/myLocation', async (req,res) => {
    const database = req.app.locals.database;
    myLocation = {
        "latitude": req.body.latitude,
        "longitude": req.body.longitude
    };
    const result = await navigatingController.SetMyLocation(database, req.body.email, req.body.latitude, req.body.longitude);
    const objectId = await navigatingController.SetUserLocation(database, req.body.latitude, req.body.longitude, UserPositionID);
    if(objectId){
        UserPositionID = objectId;
    }
    if(result){
        UserPositionID = result
        res.status(200).send(objectId);
    }
    else{
        res.status(500).send(false);
    }
});

navigating.get('/getDangers', async (req,res) => {
    const database = req.app.locals.database;
    const result = await navigatingController.GetDangers(database, myLocation);
    res.status(200).send(result);
});

navigating.get('/getUserLocation/:email', async (req,res) => {
    const database = req.app.locals.database;
    const email = req.params.email;
    console.log(email);
    const result = navigatingController.SharedUserLocation(database, email);
    res.redirect(`https://www.google.com/maps?q=${result.latitude},${result.longitude}`);
})

module.exports = navigating;