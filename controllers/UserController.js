const JwtService = require('../services/auth.service');
const BcryptService = require('../services/bcrypt.service');
const DBUtils = require('../utils/DBUtils')();

//Authenticating user
exports.authUser = async (username,password) => {
    if(username === undefined || password === undefined ){
        return { token: null, success: false, status: 400 , error: "Bad Request"}
    }
    try {
        //Cheking is the username aleady exists
        existingUser = await DBUtils.getEntity(
            "User",
            `username='${username}'`
        )
        if(existingUser){
            return { token: null, success: false, status: 400 , error: "User already exists"}
        }

        //Hashing the password using bcryptjs
        hashedPass = BcryptService.password(password);

        //Storing the new user in DB
        await DBUtils.saveEntity(
            "User",
            "userId,username,password",
            `'${username}','${hashedPass}'`
            )

        //Fetching the user fomr DB to get its ID
        let user = await DBUtils.getEntity(
            "User",
            `username='${username}'`
        )

        //Generating token and sending to client
        token = JwtService.issue({
            username,
            password: hashedPass,
            userId:user.userId
        })
    }catch(error){
        console.error("Error in registering user: ", error);
        return {token:null, error, success: false, status: 500}
    }
    return { token, error:null, success: true, status: 200 } 
}