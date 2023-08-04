const express = require("express");
const user=require('./user')
// const client_routes = require('./client_auth')
// const img_routes = require('./img')


// const router = express();
var router = express.Router();
// router.use('/img', img_routes);
router.use('/user', user);
router.use('/welcome', (req, res) => {
    res.json({ name: "Hello" })
})

module.exports = router
