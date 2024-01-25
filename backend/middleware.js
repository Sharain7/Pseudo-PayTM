const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require ('./config');
const authMiddleware = (req,res,next) => {
    const authenticationHeader = req.headers.authorization ; 
    if(!authenticationHeader || !authenticationHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    const token = authenticationHeader.split(' ')[1];
    try{
        const decodedToken = jwt.verify(token , JWT_SECRET_KEY);
        req.userId = decodedToken.userId
        next()
        

    }
    catch(err){
        return res.status(403).json({});
    }
   
    
   

    
};
module.exports = {
    authMiddleware
}
