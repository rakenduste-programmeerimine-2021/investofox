const router = require("express").Router()
const authController = require("../controllers/authController")
const validationMiddleware = require('../middleware/validationMiddleware')
const {
    check
} = require("express-validator")

router.post("/login", [
    check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be correctly formated"),
    check("password")
    .isLength({
        min: 6
    })
    .withMessage("Must be at least 6 characters long")
], validationMiddleware, authController.login)

router.post("/signup", [
    check("firstName")
    .isLength({
        min: 3
    })
    .withMessage("Must be at least 3 characters long")
    .trim()
    .exists()
    .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
    .withMessage("Must be alphabetic"),
    check("lastName")
    .isLength({
        min: 3
    })
    .withMessage("Must be at least 3 characters long")
    .trim()
    .exists()
    .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
    .withMessage("Must be alphabetic"),
    check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be an email"),
    check("password")
    .isLength({
        min: 6
    })
    .withMessage("Must be at least 6 characters long")
], validationMiddleware, authController.signup)

router.get("/users", validationMiddleware, authController.getUsers)
router.get("/user/:email", validationMiddleware, authController.getOneUser)
router.delete("/delete/:id", validationMiddleware, authController.deleteUser)

//order actions
router.put("/add-order/:email", validationMiddleware, authController.addOrder)
router.get("/orders", authController.getOrders)

module.exports = router