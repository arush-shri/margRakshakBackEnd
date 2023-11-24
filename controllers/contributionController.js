async function AccidentArea (database, latitude, longitude) {
    const collection = database.collection("AccidentArea");
}
async function BlindTurn (database, latitude, longitude) {
    const collection = database.collection("BlindTurn");
}
async function ForestRoad (database, latitude, longitude) {
    const collection = database.collection("ForestRoad");
}
async function GhatRegion (database, latitude, longitude) {
    const collection = database.collection("GhatRegion");
}

module.exports = { AccidentArea, BlindTurn, ForestRoad, GhatRegion };