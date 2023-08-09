const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { userLogger } = require('../helpers/logger')
const Reports = require("../db/models/reports")
const Company=require("../db/models/company")
const sendMail = require("../helpers/sendemail")


//( /reports) in reports to create reports
router.post("/", async (req, res) => {
  // Our create logic starts here
  try {
    // Get user input
    const { name_of_report, file_link, company_id, year, quarterly} = req.body;
    // Validate user input
    if (!(name_of_report && company_id && year && file_link && quarterly)) {
      return res.status(400).json({ code: 400, message: 'All input is required' });
    }
        // check if user already exist
    // Validate if user exist in our database
    const checkCompany = await Company.findById(company_id);

    if (!checkCompany) {
      return res.status(400).json({ code: 400, message: 'Company is not in DataBase. Incorrect Company' });
      // return res.status(409).send("User Already Exist. Please Login");
    }
    //order validation
    const value = {
      name_of_report: name_of_report,
      file_link: file_link,
      company_id: company_id,
      year: year,
      quarterly: quarterly
    };
    const validateReports = new Reports(value);
    // validation
    var error = validateReports.validateSync();
    if (error) {
      return res.status(409).json({ code: 409, message: 'Validatioan error', error: error });
    }
    const report = await validateReports.save();

    return res.status(201).json(report);
  } catch (err) {
    userLogger.error(err);
    console.log(err)
    return res.status(500).json({ code: 500, message: 'Internal server error', err: err });
  }
  // Our register logic ends here
});
//( /reports/update/:id) in reports to update specific user
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
  const oldOrder = await Reports.findById(id);

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

  const baseOrder = new Reports(newValues);
  // validation
  const error = baseOrder.validateSync();
  if (error) {
    return res.status(409).json({ code: 409, message: 'Validatioan error', error: error });
    // return res.status(409).send("Validatioan error");
  }
  
  // this only needed for development, in deployment is not real function
  const order = await Reports.findOneAndUpdate({ _id: id }, newValues);

  if (order.err) {
    return res.status(500).json({ code: 500, message: 'There as not any orders yet', error: err })
  }
  else {
    return res.status(200).json({ code: 200, message: 'order exist and updated', oldOrder: order })
  };
});
//( /reports/delete/:id) in reports to delete specific user
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
//( /reports/getone/:id) in reports to get specific client
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
//( /auth/:id) in reports to get specific user
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
