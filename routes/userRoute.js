const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/userController')

userRouter.post('/createUser', async (req,res) => {
    const database = req.app.locals.database;
    const result = await userController.initiateSignup(database, req.body.email);
    if(result === true){
        res.status(200).send(result);
    }
    else{
        res.status(402).send(result);
    }
});

userRouter.post('/updateHomeLocation', async (req,res) => {
    const database = req.app.locals.database;
    const result = await userController.setHomeLocation(database, req.body.email, req.body.latitude, req.body.longitude);
    if(result === true){
        res.status(200).send(result);
    }
    else{
        res.status(402).send(result);
    }
});

module.exports = userRouter;