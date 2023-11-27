async function SetMyLocation(database, email, latitude, longitude){
    const DBCollection = database.collection("UserLocation");
    const location = {
        "latitude": latitude,
        "longitude": longitude
    };
    const filter = {"emailId": email};
    const user = await DBCollection.findOne(filter);
    if(user){
        const updateQuery = {
            $set:{
                "Location": location
            }
        };
        const result = await DBCollection.updateOne(filter, updateQuery);
        if(result.modifiedCount === 1){
            return true;
        }
    }
    else{
        const result = await DBCollection.insertOne({ "emailId": email, "Location": location });
        if(result.acknowledged === true){
            return true;
        }
    }
}

async function SetUserLocation(database, latitude, longitude, objectID){
    const collection = database.collection("UserPosition");
    const position = await collection.findOne({_id: objectID});
    if(position){
        const filter = { _id: objectID };
        const update = {
            $set: {
                'location.coordinates': [longitude, latitude]
            }
        };
        await collection.updateOne(filter, update);
        return objectID;
    }
    else{
        const query = {
            location: {
                "type": 'Point',
                coordinates: [longitude, latitude]
            }
        };
        const result = await collection.insertOne(query);
        if(result.acknowledged === true){
            return result.insertedId;
        }
        else{
            return false;
        }
    }
}

async function SharedUserLocation(database, email){
    const DBCollection = database.collection("UserLocation");
    const result = await DBCollection.findOne({ "emailId": email });
    return result.Location;
}

async function GetDangers(database, location){
    const result = {};
    await CreateIndex(database, "AccidentArea");
    await CreateIndex(database, "RailwayCross");
    await CreateIndex(database, "ForestRoad");
    await CreateIndex(database, "GhatRegion");
    await CreateIndex(database, "OtherArea");
    await CreateIndex(database, "UserPosition");
    result["AccidentArea"] = await FindDanger(database, "AccidentArea", location.longitude, location.latitude);
    result["RailwayCross"] = await FindDanger(database, "RailwayCross", location.longitude, location.latitude);
    result["ForestArea"] = await FindDanger(database, "ForestArea", location.longitude, location.latitude);
    result["GhatRegion"] = await FindDanger(database, "GhatRegion", location.longitude, location.latitude);
    result["OtherRegion"] = await FindDanger(database, "OtherRegion", location.longitude, location.latitude);
    result["UserPosition"] = await FindDanger(database, "UserPosition", location.longitude, location.latitude);
    return result;
}

async function FindDanger(database, collectionName, myLongitude, myLatitude){
    return await database.collection(collectionName).find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [myLongitude, myLatitude],
                },
                $maxDistance: 1000,
            },
        },
    }).toArray((err, documents) => {
        if (err) throw err;

        console.log('Documents within 1000 meters:', documents);
        client.close();
    });
}

async function CreateIndex(database, collectionName){
    database.collection(collectionName).indexExists({ location: '2dsphere' }, (err, result) => {
        if (err) throw err;

        if (!result) {
            database.collection(collectionName).createIndex({ location: '2dsphere' }, (err, result) => {
                if (err) throw err;
                console.log('2dsphere index created.');
            });
        } else {
            console.log('2dsphere index already exists.');
        }
    });
}

module.exports = { SetMyLocation, GetDangers, SharedUserLocation, SetUserLocation };