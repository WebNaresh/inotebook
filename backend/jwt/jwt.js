var jwt = require('jsonwebtoken');
const JWT_SECRETE = "nareshbhai";

MakingWEbToken=(user)=>{
    const data = {
        user: { id: user.id }
    }
    
    const authToken = jwt.sign(data, JWT_SECRETE);
    console.log(authToken);
}


module.exports=MakingWEbToken;