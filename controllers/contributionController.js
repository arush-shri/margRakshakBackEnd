async function MakeContribution (database, collectionName, latitude, longitude) {
    const collection = database.collection(collectionName);
    const query = {
        location: {
            "type": 'Point',
            coordinates: [longitude, latitude]
        }
    };
    const result = await collection.insertOne(query);
    if(result.acknowledged === true){
        return true;
    }
    else{
        return false;
    }
}

module.exports = { MakeContribution };