const { ObjectId } = require("mongodb");

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
    console.log(objectID);
    const collection = database.collection("UserPosition");
    try{
        const object = new ObjectId(objectID);
        const userPosition = await collection.findOne({_id: object});
        if(userPosition){
            const filter = { _id: objectID };
            const update = {
                $set: {
                    'location.coordinates': [longitude, latitude]
                }
            };
            await collection.updateOne(filter, update);
            return objectID;
        }
    }
    catch{
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
    CreateIndex(database, "AccidentArea");
    CreateIndex(database, "RailwayCross");
    CreateIndex(database, "ForestArea");
    CreateIndex(database, "GhatRegion");
    CreateIndex(database, "OtherRegion");
    CreateIndex(database, "UserPosition");
    result["AccidentArea"] = await FindDanger(database, "AccidentArea", parseFloat(location.longitude, 10), parseFloat(location.latitude, 10));
    result["RailwayCross"] = await FindDanger(database, "RailwayCross", parseFloat(location.longitude, 10), parseFloat(location.latitude, 10));
    result["ForestArea"] = await FindDanger(database, "ForestArea", parseFloat(location.longitude, 10), parseFloat(location.latitude, 10));
    result["GhatRegion"] = await FindDanger(database, "GhatRegion", parseFloat(location.longitude, 10), parseFloat(location.latitude, 10));
    result["OtherRegion"] = await FindDanger(database, "OtherRegion", parseFloat(location.longitude, 10), parseFloat(location.latitude, 10));
    result["UserPosition"] = await FindDanger(database, "UserPosition", parseFloat(location.longitude, 10), parseFloat(location.latitude, 10));
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

function CreateIndex(database, collectionName){
    const result = database.collection(collectionName).indexExists({ location: '2dsphere' });
    if (result) {
        database.collection(collectionName).createIndex({ location: '2dsphere' });
        console.log('2dsphere index created.');
    } else {
        console.log('2dsphere index already exists.');
    }
}

module.exports = { SetMyLocation, GetDangers, SharedUserLocation, SetUserLocation };