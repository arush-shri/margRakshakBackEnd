async function initiateSignup( database, email ){
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        return true;
    }
    else{
        const userData = {
            "emailId": email
        }
        try {
            await usersDB.insertOne(userData);
            return true;
        } catch (err) {
            console.log(err)
            return err;
        }
    }
}

module.exports = { initiateSignup };