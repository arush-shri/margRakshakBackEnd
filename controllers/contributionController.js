async function MakeContribution (database, collectionName, latitude, longitude) {
    const check1 = await database.collection("AccidentArea").findOne({'location.coordinates': [ longitude, latitude ]});
    const check2 = await database.collection("RailwayCross").findOne({'location.coordinates': [ longitude, latitude ]});
    const check3 = await database.collection("ForestRoad").findOne({'location.coordinates': [ longitude, latitude ]});
    const check4 = await database.collection("GhatRegion").findOne({'location.coordinates': [ longitude, latitude ]});
    const check5 = await database.collection("OtherArea").findOne({'location.coordinates': [ longitude, latitude ]});
    if(!(check1 && check2 && check3 && check4 && check5)){
        const collection = database.collection(collectionName);
        const query = {
            location: {
                "type": 'Point',
                coordinates: [longitude, latitude]
            }
        };
        const result = await collection.insertOne(query);
        if(result.acknowledged === true){
            console.log(collectionName);
            console.log(query);
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = { MakeContribution };