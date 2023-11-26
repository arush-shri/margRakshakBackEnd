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

async function GetDangers(database, location){
    const result = []
    await CreateIndex(database, "AccidentArea");
    await CreateIndex(database, "RailwayCross");
    await CreateIndex(database, "ForestRoad");
    await CreateIndex(database, "GhatRegion");
    await CreateIndex(database, "OtherArea");
    result.concat(await FindDanger(database, "AccidentArea", location.longitude, location.latitude));
    result.concat(await FindDanger(database, "RailwayCross", location.longitude, location.latitude));
    result.concat(await FindDanger(database, "AccidentArea", location.longitude, location.latitude));
    result.concat(await FindDanger(database, "AccidentArea", location.longitude, location.latitude));
    result.concat(await FindDanger(database, "AccidentArea", location.longitude, location.latitude));
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

module.exports = { SetMyLocation, GetDangers };