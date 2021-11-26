const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {

    //fields required in the create order form
    const {
        ticker,
        amount,
        price,
        date,
        comment
    } = req.body;

    try {
        //order template
        const newOrder = new Order({
            ticker,
            amount,
            price,
            date,
            comment
        });

        //save order using the newOrder template
        const savedOrder = await newOrder.save();
        if (!savedOrder) throw Error("Error saving the order");


        //If order saved successfully
        res.status(200).json({
            message: "Order saved successfully!"
        });
    } catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
}// end of createOrder

exports.getOrders = async (req, res) => {
    try {
        const {
            id
        } = req.params

        const order = await Order.find({
            id
        })

        if (!order) {
            console.log('Sorry, no orders to display')
        }

        res.status(200).send(order).json({
            message: `Orders found`
        });
    } catch (error) {
        res.status(400).json({
            error: e.message
        })
    }
} // end of getOrders

exports.deleteOrder = async (req, res) => {
    try {
      const {
        id
      } = req.params;
  
      const deleteOrder = await Order.findOneAndDelete({
        _id: id
      })
  
      if (!deleteOrder) res.status(404).send("No order with that id found")
  
      res.status(200).send(`Successfully deleted the following order: \n ${deleteOrder}`)
    } catch (e) {
      res.status(400).json({
        error: e.message
      })
    }
  
  }