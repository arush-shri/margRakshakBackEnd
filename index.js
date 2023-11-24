const express = require("express");
const application = express();
const router = express.Router();
const contributionRoute = require('./routes/contributeRoute')

const cors = require("cors");

application.use(cors());
application.use(express.json);

application.use("/contribute", contributionRoute);

application.get('/', (req,res) => {
    res.status(200).send("Hello! Welcome to marg rakshak");
});

application.listen(4000, () => {
    console.log("Server started at port 4000");
});