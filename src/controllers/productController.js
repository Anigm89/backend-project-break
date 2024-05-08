const Product = require('../models/product');
const {baseHtml, getNavBar, home, getProductCards, getProductCardsById, getProductCardsCategories, formLogin, formAddProduct, formEdit, newUsu, smserror, footer } = require('../utils/htmlUtils');
const firebaseAdmin = require('../config/firebase');
const {createUser, loginUser} = require('./authController')


const ProductController = {
    async ShowHome(req, res){
        const homeHtml = await home();
        const htm = baseHtml() + getNavBar(req) + homeHtml + footer();
        res.send(htm) ;
    },
    async ShowProducts(req, res){
        try{

            const { page = 1, limit = 10 } = req.query;
          
            const products = await Product.find().limit(limit).skip((page - 1) * limit);
            const totalProducts = await Product.countDocuments();
            const hasNextPage = (page * limit) < totalProducts;
            const hasPreviousPage = page > 1;

            const nextPageUrl = hasNextPage ? `/products?page=${parseInt(page) + 1}` : null;
            const previousPageUrl = hasPreviousPage ? `/products?page=${page - 1}` : null;

            const productCards = getProductCards(products, false, nextPageUrl,previousPageUrl);
            const html = baseHtml() + getNavBar(req) + productCards + footer();
            
            res.send(html);
        }
        catch(error){
            res.status(500).send(error);
        }
    },
    async showProductById(req, res) {
        try {
                                                                                 
            const product = await Product.findById(req.params._id);                 
            let productCardsId = req.session.user ? getProductCardsById(product, true) : getProductCardsById(product, false);
            const html = baseHtml() + getNavBar(req) + productCardsId + footer();
            res.send(html);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async showProdutsCategory(req, res){
        try{
            const category = req.params.categoria;
            const productsCat = await Product.find({ categoria: category });
            let productCardsCategories = req.session.user ? getProductCardsCategories(productsCat, true) : getProductCardsCategories(productsCat, false);
            const html = baseHtml() + getNavBar(req) + productCardsCategories + footer();
           res.send(html)
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    async showLogin(req, res){
        try{
            if(req.session.user){
                const products = await Product.find();
                const productCards = getProductCards(products, true);
                const html = baseHtml() + getNavBar(req) +  formLogin(req) + productCards + footer();
                res.send(html)
                
            }
            else{
                const html = baseHtml() + getNavBar(req) +  formLogin(req) + footer();
                res.send(html)
            }
            
        }
        catch (error) {
            res.status(500).send(error);
        }
        
    },
    async iniciosession(req, res) {

        const email = req.body.email;
        const password = req.body.password;
        const isLoginOrSignup = req.body.isLoginOrSignup;

        let user = '';                      
        try {
            if (isLoginOrSignup === 'isLogin') {
                user = await loginUser(req, email, password);
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                
                const userRecord = await createUser(req, email, password);
                const html = baseHtml() + getNavBar(req) + newUsu() + footer();
                res.send(html);
            }
       
        } catch (error) {
            console.error(error);
            const html = baseHtml() + getNavBar(req) + smserror() + footer();
            res.status(500).send(html);
        }
    },
    async logOut(req, res){
        req.session.destroy();
        res.redirect('/');
        console.log('has cerrado sesion')
    },
    async showNewProduct(req,res){
        const html = baseHtml() + getNavBar(req) + formAddProduct() + footer();
        res.send(html)
    },
    async createProduct(req, res) {
        try {
            const productCreated = await Product.create(req.body);
        if (req.session.user) {
            req.session.user = {
                email:req.session.user.email,
                uid: req.session.user.uid,
                token: req.session.customToken
            };
        }     
        const product = await Product.findById(productCreated._id);                                  
        res.redirect(`/dashboard/products/${product._id}`)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async showEditProduct(req, res){
        try{
            const product = await Product.findById(req.params._id);
            const formeditId = formEdit(product)
            const html = baseHtml() + getNavBar(req) + formeditId + footer();
            res.send(html)
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    async updateProduct(req,res){
        try{
            const productUpdated = await Product.findByIdAndUpdate(req.params._id, {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen:req.body.imagen,
                categoria:req.body.categoria,
                talla:req.body.talla,
                precio:req.body.precio
            }, { new: true });
            if (req.session.user) {
                req.session.user = {
                    email:req.session.user.email,
                    uid: req.session.user.uid,
                    token: req.session.customToken
                };
                
            }       
            res.redirect(`/dashboard/products/${req.params._id}`)        
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    async deleteProduct(req, res){
        try{     
            const productDeleted = await Product.findByIdAndDelete(req.params._id);
            if (req.session.user) {
                const userData = req.session.user;
                req.session.user = {
                    ...userData
                };
            }
            res.redirect('/dashboard')
        }
        catch (error) {
            res.status(500).send(error);
        }
    }


}

module.exports = ProductController;



