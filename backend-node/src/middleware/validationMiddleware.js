const { validationResult} = require("express-validator")

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) return res.status(422).json({ msg: errors.array() })
    next()
}

module.exports = validationMiddleware