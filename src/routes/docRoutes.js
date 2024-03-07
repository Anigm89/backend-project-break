const express = require("express");
const router = express.Router();
const docProductController = require('../controllers/docProductController.js');


router.get('/products', docProductController.docShowProducts);
router.get('/products/:_id', docProductController.showProductById);
router.get('/dashboard/products', docProductController.showLogin);
router.post('/dashboard/products', docProductController.createProduct);
router.get('/dashboard/products/:_id', docProductController.showProductById); 
router.put('/dashboard/products/:_id', docProductController.updateProduct)
router.delete('/dashboard/products/:_id/delete', docProductController.deleteProduct)


module.exports = router;