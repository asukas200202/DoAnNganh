const express = require("express")
const router = express.Router();

const UserController = require("../controllers/UserController.js");
const PermissionMiddleware = require("../middlewares/PermissionMiddleware")

router.use('/delete/:id', UserController.delete);

router.use('/update/:id', UserController.update);

router.use('/create', UserController.create);

router.get('/search/:option', UserController.search);

router.use('/',PermissionMiddleware.accessPermissionRole(["user", "teacher", "admin"]), UserController.index);




module.exports = router;