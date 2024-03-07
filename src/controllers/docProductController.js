const Product = require('../models/product');

const docProductController = {
    async ShowHome(req, res){
        //res.redirect('/products')
        res.send('home')
    },
    async docShowProducts(req, res){
        try{
            const products = await Product.find();  
            res.send(products);
        }
        catch(error){
            res.status(500).send(error);
        }
    },
    async showProductById(req, res) {
        try {
                                                                                 
            const product = await Product.findById(req.params._id);              
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async showLogin(req, res){
        try{
            const products = await Product.find();
            res.send(products)
        }
        catch (error) {
            res.status(500).send(error);
        }
        
    },
    async createProduct(req, res) {
        try {
            const productCreated = await Product.create(req.body);
        /*if (req.session.user) {
            req.session.user = {
                email:req.session.user.email
            };
        }  */
        res.status(201).send({ mensaje: "Producto añadido con éxito", productCreated });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async showEditProduct(req, res){
        try{
            const product = await Product.findById(req.params._id);
            res.send(product)
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
                    email:req.session.user.email
                };
            }       
            res.send(productUpdated)     
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
            res.send({ mensaje: "Producto eliminado éxito", productDeleted })
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = docProductController;



