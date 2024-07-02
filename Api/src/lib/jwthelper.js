const jwt = require('jsonwebtoken');
const SECRET_KEY = "qwertyuiop987654321";  

const generateToken = (req) => {
    return jwt.sign({ user : req } , SECRET_KEY, {
        expiresIn: '1d'
    });
};
const verifyToken = (req, res, next) => {
    const authtoken = req.headers['authorization'];
    if(!authtoken) return res.status(403).json({
        'success' : false,
        'data' : "A token is required for authentication"
      });
    //console.log(authtoken);  //Bearer token
    const token = authtoken.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.user;
    } catch (err) {
        return res.status(401).json({
            'success' : false,
            'data' : "Invalid Token"
          });
    }
  return next();
};
module.exports = { generateToken, verifyToken };