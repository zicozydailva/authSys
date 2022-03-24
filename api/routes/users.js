const { register, login } = require('../controllers/authController');
const router = require('express').Router()
const {validFields, validLoginFields} = require("../config/validFields")

const rateLimiter = require("express-rate-limit")
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    msg: "Too many requests from this IP, please try again after 15 minutes"
})

// router.post("/register", [apiLimiter, validFields], register)
router.post("/register", validFields, register)
router.post("/login", validLoginFields, login)

module.exports = router;