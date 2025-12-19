const bcrypt = require('bcrypt');
// const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../../config');
// const { JWT_SECRET } = require('../../config/server.config');

function encryptedPassword  (plainPassword){
console.log(bcrypt.hashSync(plainPassword,ServerConfig.SALT_ROUNDS))
}

const comparePassword =async (plainPassword,encryptedPassword)=>{
    
        const match = await bcrypt.compare(plainPassword,encryptedPassword)

   if(match){
    return true
   }
   else{
    return false
   }
}

const generateJwtToken=(values)=>{
return jwt.sign(values,
    ServerConfig.JWT_SECRET,
    {expiresIn:ServerConfig.JWT_EXPIRES_IN})
}
module.exports ={
    encryptedPassword,
    comparePassword,
    generateJwtToken
}