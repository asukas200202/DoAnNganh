const express = require("express")
const router = express.Router();

const LessionController = require("../controllers/LessionController.js")

router.use('/create', LessionController.create);

// router.use('/update/:id', CategoryController.update);

// router.use('/detail/:alias', CategoryController.detail);

// router.use('/delete/:id', CategoryController.delete);

// router.get('/search/:option', CategoryController.search);

// router.use('/', CategoryController.index);

module.exports = router;