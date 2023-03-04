const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
    if(!req.session.jwt) {
        return res.status(401).json({msg: "There is no token!"});
    }

    try {
        const decodedToken = jwt.verify(req.session.jwt, "tokenSecretKey");
        const user = await User.findById(decodedToken.user_id);

        if(!user) await res.status(404).json({ msg: "User not found!"});
        
        req.userId = user._id;
        next();
    } catch (error) {
        return res.status(401).json({msg: "Something went wrong!"});
    }
};

export default verifyToken;