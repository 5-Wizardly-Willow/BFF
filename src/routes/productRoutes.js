const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/:product_id')
.get(productController.getProduct);

router.route('/:product_id/styles')
.get(productController.getProductStyles);

router.route('/:product_id/info')
.get(productController.getProductInformation);

module.exports = router;