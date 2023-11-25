async function initiateSignup( database, email ){
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        return true;
    }
    else{
        const userData = {
            "emailId": email,
            "homeLocation": null
        };
        try {
            await usersDB.insertOne(userData);
            return true;
        } catch (err) {
            console.log(err)
            return err;
        }
    }
}

async  function setHomeLocation( database, email, latitude, longitude ){
    const usersDB = database.collection("users");
    const location = {
        "latitude": latitude,
        "longitude": longitude
    };
    const filter = {"emailId": email};
    const updateQuery = {
        $set:{
            "homeLocation": location
        }
    };
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        const result = await usersDB.updateOne(filter, updateQuery);
        if(result.modifiedCount === 1){
            return true;
        }
    }
}

module.exports = { initiateSignup, setHomeLocation };