const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/productController');
const  {verificarSesion} = require('../middlewares/authMiddleware.js');

router.get('/', ProductController.ShowHome);
router.get('/products', ProductController.ShowProducts);
router.get('/products/:_id', ProductController.showProductById);
router.get('/products/category/:categoria', ProductController.showProdutsCategory)
router.get('/dashboard', ProductController.showLogin);
router.post('/login', ProductController.iniciosession);
router.post('/logout', ProductController.logOut);
router.get('/dashboard/new', verificarSesion, ProductController.showNewProduct);
router.post('/dashboard', verificarSesion, ProductController.createProduct);
router.get('/dashboard/products/category/:categoria',verificarSesion, ProductController.showProdutsCategory)
router.get('/dashboard/products/:_id', verificarSesion, ProductController.showProductById); 
router.get('/dashboard/products/:_id/edit',verificarSesion, ProductController.showEditProduct); 
router.post('/dashboard/products/:_id', verificarSesion, ProductController.updateProduct)
router.post('/dashboard/products/:_id/delete', verificarSesion, ProductController.deleteProduct)





module.exports = router;