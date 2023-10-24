const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const transporter = require("../config/transporter");
const otpGenerator = require("otp-generator");
const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");
const Otp = require("../models/Otp");

class PaymentController {
    momo(req, res) {

    }
}

module.exports = new PaymentController();
