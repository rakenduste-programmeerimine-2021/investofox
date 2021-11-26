const jwt = require("jsonwebtoken")

const jwtAuth = (req, res, next) => {
    try {
        if (req.headers["Authorization"]) throw Error("access denied")

        //Authorization: Bearer token
        const accessToken = req.header.Authorization.split("")[1]

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (event){
        return res.status(401).send({ error: event.message})
    }
}

module.exports = jwtAuth

