const express = require("express")
const router = express.Router();

const PaymentController = require("../controllers/PaymentController.js");
const PermissionMiddleware = require("../middlewares/PermissionMiddleware");




router.use('/momo/qrcode', PaymentController.momo);




module.exports = router;