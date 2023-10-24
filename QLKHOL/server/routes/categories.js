const express = require("express")
const router = express.Router();

const CategoryController = require("../controllers/CategoryController.js")

router.use('/create', CategoryController.create);

router.use('/update/:id', CategoryController.update);

router.use('/detail/:alias', CategoryController.detail);

router.use('/delete/:id', CategoryController.delete);

router.get('/search/:option', CategoryController.search);

router.use('/', CategoryController.index);

module.exports = router;