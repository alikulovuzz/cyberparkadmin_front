const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { userLogger } = require('../helpers/logger');
const Order = require("../db/models/orders");
const sendMail = require("../helpers/sendemail")


//( /order/create) in order to create order
router.post("/create", async (req, res) => {
  // Our create logic starts here
  try {
    // Get user input
    const { name, img_id, tasker_id, user_id, payment_uz, status, location } = req.body;
    // Validate user input
    if (!(user_id && location && name)) {
      return res.status(400).json({ code: 400, message: 'All input is required' });
    }
    //order validation
    const value = {
      name: name,
      img_id: img_id,
      tasker_id: tasker_id,
      user_id: user_id,
      payment_uz: payment_uz,
      status: status,
      location: location
    };
    const baseOrder = new Order(value);
    // validation
    var error = baseOrder.validateSync();
    if (error) {
      return res.status(409).json({ code: 409, message: 'Validatioan error', error: error });
      // return res.status(409).send("Validatioan error");
    }
    const order = await baseOrder.save();

    const text = 'Hello ' + user.first_name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user/confirmation\/' + user.email + '\/' + tekennn.token + '\n\nThank You!\n';
    // console.log(text);
    const emaile = sendMail(email, text);

    return res.status(201).json(order);
  } catch (err) {
    userLogger.error(err);
  }
  // Our register logic ends here
});

//( /order/update/:id) in order to update specific user
router.post("/update/:id", async (req, res) => {

  const id = req.params.id;
  //id check
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: 'Id is not valid',
      error: id,
    });
  }

  const { name, img_id, tasker_id, user_id, payment_uz, status, location } = req.body;

  // const value = authorSchema.validate(req.body);
  const oldOrder = await Order.findById(id);

  if (!oldOrder) {
    return res.status(400).json({ code: 404, message: 'User not found' });
    // return res.status(409).send("User Already Exist. Please Login");
  }
  const newValues = {
    name: name,
    img_id: img_id,
    tasker_id: tasker_id,
    user_id: user_id,
    payment_uz: payment_uz,
    status: status,
    location: location
  };

  const baseOrder = new Order(newValues);
  // validation
  const error = baseOrder.validateSync();
  if (error) {
    return res.status(409).json({ code: 409, message: 'Validatioan error', error: error });
    // return res.status(409).send("Validatioan error");
  }
  
  // this only needed for development, in deployment is not real function
  const order = await Order.findOneAndUpdate({ _id: id }, newValues);

  if (order.err) {
    return res.status(500).json({ code: 500, message: 'There as not any orders yet', error: err })
  }
  else {
    return res.status(200).json({ code: 200, message: 'order exist and updated', oldOrder: order })
  };
});
//( /user/delete/:id) in order to delete specific user
router.delete("/delete/:id", async (req, res) => {

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: 'Id is not valid',
      error: id,
    });
  }

  // this only needed for development, in deployment is not real function
  const user = await User.findOneAndDelete({ _id: id });
  // console.log(user) 
  if (!user) {
    return res.status(500).json({ code: 500, message: 'There as not any users yet', error: user })
  };
  if (user.err) {
    return res.status(500).json({ code: 500, message: 'There as not any users yet', error: user })
  }
  else {
    return res.status(200).json({ code: 200, message: 'user exist and deleted', deleted_user: user })
  };
});
//( /getone/:id) in order to get specific client
router.get("/getone/:id", async (req, res) => {

  const id = req.params.id;
  // id valid chech
  if (!checkForHexRegExp.test(id)) {
    return res.status(422).json({
      message: 'Id is not valid',
      error: id,
    });
  }
  // console.log(req)
  // userLogger.info(req.header)
  // this only needed for development, in deployment is not real function
  const user = await User.find({ _id: id });

  if (user.err) {
    return res.status(500).json({ code: 500, message: 'There as not any users yet', error: err })
  }
  else {
    return res.status(200).json({ code: 200, message: 'user exist', user: user })
  };
});
//( /auth/:id) in order to get specific user
router.patch("/auth/:id", async (req, res) => {

  const id = req.params.id;
  // id valid chech
  if (!checkForHexRegExp.test(id)) {
    return res.status(422).json({
      message: 'Id is not valid',
      error: id,
    });
  }
  // console.log(req)
  // userLogger.info(req.header)
  // this only needed for development, in deployment is not real function
  const user = await User.findOneAndUpdate({ _id: id }, { status: "verified" });

  if (user.err) {
    return res.status(500).json({ code: 500, message: 'There as not any users yet', error: err })
  }
  else {
    return res.status(200).json({ code: 200, message: 'user exist', user: user })
  };
});
module.exports = router;
