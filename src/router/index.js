const express = require("express");
const user=require('./user')
// const client_routes = require('./client_auth')
const file_uploads = require('./file_uploads')


// const router = express();
var router = express.Router();
// router.use('/img', img_routes);
router.use('/user', user);
router.use('/upload', file_uploads);
router.use('/welcome', (req, res) => {
    res.json({ name: "Hello" })
})

module.exports = router
