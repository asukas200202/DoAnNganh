const express = require("express")
const router = express.Router();




const AuthController = require("../controllers/AuthController.js")

router.post('/login', AuthController.login);

router.post('/register/verify', AuthController.verifyOTP);

router.post('/register', AuthController.register);

router.get('/role', AuthController.checkRole);

module.exports = router;