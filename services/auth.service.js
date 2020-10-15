const jwt = require('jsonwebtoken');

//Keeping a 2h expiry
const TOKEN_EXPIRY="2h" 

//Declaring secret key
const secret = process.env.JWT_SECRET || 'aygsd671re761fuv';

module.exports = {
  issue: (payload) => jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRY }),
  verify: (token, cb) => jwt.verify(token, secret, {}, cb),
  refresh: (token) => {
    const decoded = jwt.decode(token);
    delete decoded['iat']
    delete decoded['exp']
    return jwt.sign(decoded, 
            secret, 
            { expiresIn: TOKEN_EXPIRY })
  },
  decode: (token) => jwt.decode(token),
};
