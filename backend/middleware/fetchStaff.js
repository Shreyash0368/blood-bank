const jwt = require('jsonwebtoken');

const fetchStaff = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        res.status(422).json({success: false, message: "Invalid Auth Token"}).send();
    }

    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    console.log(decoded);
    req.userid = decoded.userid;    
    next()
}

module.exports = fetchStaff;