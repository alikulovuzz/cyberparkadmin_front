const express = require("express");
const user=require('./user')
const reports = require('./reports')
const audit = require('./audit_report')
const company = require('./company')
const company_form = require('./company_form')
const file_uploads = require('./file_uploads')


var router = express.Router();
router.use('/user', user);
router.use('/company', company);
router.use('/company_form', company_form);
router.use('/upload', file_uploads);
router.use('/reports', reports);
router.use('/audit', audit);
router.use('/welcome', (req, res) => {
    res.json({ name: "Hello" })
})

module.exports = router
