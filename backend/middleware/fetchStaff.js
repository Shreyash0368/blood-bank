const jwt = require('jsonwebtoken');

const fetchStaff = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        res.status(422).json({success: false, message: "Invalid Auth Token"}).send();
        return;
    }
    
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        // console.log(decoded.role, typeof(decoded.role));
        
        if (decoded.iat > Date.now() || decoded.exp < Date.now()) { 
            res.status(422).json({success: false, message: "Invalid or Expired Auth Token"}).send();
            return;
        }
        
        req.userid = decoded.userid; 
        req.role = decoded.role   
        next()
        
    } catch (error) {
        res.status(500).json({success: false, message: "Invalid Auth Token"}).send();      
        return;  
    }

}

module.exports = fetchStaff;