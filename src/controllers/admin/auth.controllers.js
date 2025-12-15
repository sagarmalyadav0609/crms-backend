const signIn = async(req,res)=>{
    try {
       const {email,password} = req.body;
       console.log(email,password);
        
    } catch (error) {
        
    }
}

module.exports = {
    signIn
}