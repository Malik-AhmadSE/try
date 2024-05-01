const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config/index');
const RefreshToken = require('../4-Models/token');

class JWTService{
    static signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: expiryTime});
    }
    static signRefreshToken(payload, expiryTime){
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: expiryTime});
    }

    // verify access token
    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }

    // verify refresh token
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN_SECRET)
    }

    // store refresh token
    static async storeRefreshToken(token, userId){
        try{
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            });
            await newToken.save();
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = JWTService;