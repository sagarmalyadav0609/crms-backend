const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

function encryptedPassword  (plainPassword){
console.log(bcrypt.hashSync(plainPassword,saltRounds))
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
return jwt.sign(values,'JWT@SWCR#eT12',{ expiresIn: '3d' })
}
module.exports ={
    encryptedPassword,
    comparePassword,
    generateJwtToken
}