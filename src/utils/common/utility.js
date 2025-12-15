const bcrypt = require('bcrypt');
const saltRounds = 10;

function encryptedPassword  (plainPassword){
console.log(bcrypt.hashSync(plainPassword,saltRounds))
}

module.exports ={
    encryptedPassword
}