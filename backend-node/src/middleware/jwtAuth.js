const jwt = require("jsonwebtoken")

const jwtAuth = (req, res, next) => {

    try {
        if (!req.headers["authorization"]) throw Error("Access denied");

        // Authorization: Bearer token
        const accessToken = req.headers.authorization.split(" ")[1]
    
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = decoded
    
        next()

    } catch (event){
        return res.status(401).send({ error: event.message})
    }
}

module.exports = jwtAuth

