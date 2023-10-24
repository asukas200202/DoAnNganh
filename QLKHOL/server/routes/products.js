const express = require("express")
const router = express.Router();

const ProductController = require("../controllers/ProductController.js")

router.use('/create', ProductController.create);

router.use('/update/:id', ProductController.update);

router.use('/delete/:id', ProductController.delete);

router.use('/detail/:id', ProductController.detail);

router.get('/search/:option', ProductController.search);

router.post('/buy/:id', ProductController.buy);

router.use('/', ProductController.index);




module.exports = router;