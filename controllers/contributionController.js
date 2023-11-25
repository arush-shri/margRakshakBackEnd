async function MakeContribution (database, collectionName, latitude, longitude) {
    const collection = database.collection(collectionName);
    const location = {
        "latitude": latitude,
        "longitude": longitude
    };
    const result = await collection.insertOne(location);
    if(result.acknowledged === true){
        return true;
    }
    else{
        return false;
    }
}

module.exports = { MakeContribution };