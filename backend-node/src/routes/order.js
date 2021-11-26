const router = require("express").Router()
const orderController = require("../controllers/orderController")
const {
    check
} = require("express-validator")

router.post("/create-order", orderController.createOrder)
router.get("/orders/:id", orderController.getOrders)
router.delete("/delete/:id", orderController.deleteOrder)

module.exports = router