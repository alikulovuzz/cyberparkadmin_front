const express = require("express");
const user=require('./user')
const reports = require('./reports')
const company = require('./company')
const file_uploads = require('./file_uploads')


var router = express.Router();
router.use('/user', user);
router.use('/company', company);
router.use('/upload', file_uploads);
router.use('/reports', reports);
router.use('/welcome', (req, res) => {
    res.json({ name: "Hello" })
})

module.exports = router
