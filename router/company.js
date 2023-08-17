const express = require('express');
const router = express.Router();
const config =require('../config/auth.config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose =require('mongoose');
const {verifyToken,isCompany}=require('../middleware/auth')
const rateLimit = require('../helpers/request_limitter');
const { userLogger, paymentLogger } = require('../helpers/logger');
const Company = require("../db/models/company");
const sendMail = require("../helpers/sendemail")
const RefreshToken=require("../db/models/refreshToken.model")


//( /user/register) in order to register user
router.post("/signup", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { company_name, email, stir, img_link, phone, password } = req.body;
    // Validate user input
    if (!(email && password && company_name && stir)) {
      return res.status(400).json({ code: 400, message: 'All input is required' });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldCompany = await Company.findOne({ stir });

    if (oldCompany) {
      return res.status(400).json({ code: 400, message: 'Company Already Exist. Please Login' });
      // return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    //user validated
    const value = {
      company_name: company_name,
      stir: stir,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      phone: phone,
      img_link: img_link,
      password: encryptedPassword
    };
    const company = new Company(value);
    // validation
    var error = company.validateSync();
    if (error) {
      return res.status(409).json({ code: 409, message: 'Validatioan error', error: error });
      // return res.status(409).send("Validatioan error");
    }
    const saved_company = await company.save();
    // if (name && url) {
    //   user.img = { name: name, url: url }
    // }
    // return new user
    return res.status(201).json({
      status:201,
      data:saved_company});
  } catch (err) {
    return res.status(500).json({ code: 500, message: 'Internal server error', error: err });
  }
  // Our register logic ends here
});
//( /user/login) in order to login user
router.post("/signin", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { stir, password } = req.body;

    // Validate user input
    if (!(stir && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const company = await Company.findOne({ stir:stir });
    console.log(company)
    if (company && (await bcrypt.compare(password, company.password))) {
      // Create token
      const token = jwt.sign({ id: company._id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      let refreshToken = await RefreshToken.createToken(company);
      // let authorities = [];
      // for (let i = 0; i < user.role.length; i++) {
      //   authorities.push("ROLE_" + user.role[i].toUpperCase());
      // }
      // save user token
      company.token = token;
      company.refreshToken = refreshToken;
      // user.authorities = authorities;

      // user
      return res.status(200).json({data:company,token:token,refreshToken:refreshToken});
    }
    return res.status(200).json({ code: 200, message: 'Company does not exist and not verified' });
  } catch (err) {
    userLogger.error(err);
    console.log(err);
    return res.status(500).json({ code: 500, message: 'Internal server error', error: err });
  }
  // Our register logic ends here
});
//( /user/login) in order to login user
router.get("/refreshToken", async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});
//( /user/list) in order to get list of users
router.post("/list",verifyToken,isCompany, async (req, res) => {
  let { pageNumber, pageSize } = req.body;
  pageNumber = parseInt(pageNumber);
  pageSize = parseInt(pageSize);
  // this only needed for development, in deployment is not real function
  try {

    const company = await Company.find()
    .skip((pageNumber - 1) * pageSize) 
    .limit(pageSize)           
    .sort({ first_name: 1 });
    // console.log(user)
    return res.status(202).json({ code: 202, list_of_companies: company });

  } catch (err) {
    userLogger.error(err);
    console.log(err);
    return res.status(500).json({ code: 500, message: 'Internal server error', error: err });
  }
});
//( /user/update/:id) in order to update specific user
router.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  //id check
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: 'Id is not valid',
      error: id,
    });
  }
  const { company_name, email, stir, img_link, phone } = req.body;
  // const value = authorSchema.validate(req.body);
  const updateCompany = await Company.findById(id);

    if (!updateCompany) {
      return res.status(400).json({ code: 404, message: 'User not found' });
      // return res.status(409).send("User Already Exist. Please Login");
    }
  const newValues = {
    company_name: company_name,
    email: email,
    stir: stir,
    img_link: email.toLowerCase(), // sanitize: convert email to lowercase
    phone: phone
  };

  const validateCompany = new Company(newValues);
  // validation
  const error = validateCompany.validateSync();
  if (error) {
    return res.status(409).json({ code: 409, message: 'Validatioan error', error: error });
  }
  const user = await Company.findOneAndUpdate({ _id: id }, newValues);

  if (user.err) {
    return res.status(500).json({ code: 500, message: 'There as not any users yet', error: err })
  }
  else {
    return res.status(200).json({ code: 200, message: 'user exist and updated', olduser: user })
  };
});
//( /user/resetpassworduser) in order to get list of users
router.post('/resetpassworduser', async (req, res) => {
  const { email } = req.body;
  const user = await Company.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ code: 400, message: 'Wrong email or no users' });
    // return res.status(409).send("User Already Exist. Please Login");
  }
  var token = new Token({ _clientId: user._id, token: crypto.randomBytes(16).toString('hex') });
  var error = token.validateSync();
  if (error) {
    return res.status(409).json({ code: 409, message: 'Validatioan error', error: error });
    // return res.status(409).send("Validatioan error");
  }
  const teken_save = await token.save();
  const text = 'Hello ' + user.first_name + ',\n\n' + 'Please verify your account again by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user/resetpassword/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n';
  // console.log(text);
  const emaile = sendMail(email, text);
  return res.status(200).json({ code: 200, message: 'We sent e resent link your ', user: user,text:text });
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
  const user = await Company.findOneAndDelete({ _id: id });
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
  const user = await Company.find({ _id: id });

  if (user.err) {
    return res.status(500).json({ code: 500, message: 'There as not any users yet', error: err })
  }
  else {
    return res.status(200).json({ code: 200, message: 'user exist', user: user })
  };
});
module.exports = router;
