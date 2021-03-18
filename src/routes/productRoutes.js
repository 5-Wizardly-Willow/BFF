const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/:product_id')
.get(productController.getProductInformation);

module.exports = router;