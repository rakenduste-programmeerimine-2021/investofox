const {Schema, model} = require("mongoose")

const orderSchema = new Schema({
    ticker: {type: String, required: true, uppercase: true},
    amount: {type: Number, require: true},
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    comment: {type: String}
})

const Order = model("Order", orderSchema)

module.exports = Order