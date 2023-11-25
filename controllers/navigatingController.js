async function SetMyLocation(database, email, latitude, longitude){
    const DBCollection = database.collection("navigation");
    const location = {
        "latitude": latitude,
        "longitude": longitude
    };
    const filter = {"emailId": email};
    const updateQuery = {
        $set:{
            "Location": location
        }
    };
    const user = await DBCollection.findOne({ "emailId": email });
    if(user){
        const result = await DBCollection.updateOne(filter, updateQuery);
        if(result.modifiedCount === 1){
            return true;
        }
    }
}

module.exports = { SetMyLocation };