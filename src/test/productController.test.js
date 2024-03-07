const Product = require('../models/product');
const request = require("supertest");
//const request = require('supertest-session');
const app = require("../index.js");


const agent = request.agent(app);

describe('ProductController', () => {
    test('ShowProducts should return a list of products', async () => {
        const res = await request(app).get('/products');
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined(); 
    });
    

    test('showProductById should return product details by ID', async () => {
        const productId = '65e602c855961715c26c1e6a';
        const res = await request(app).get(`/products/${productId}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });


    test("debería actualizar un producto después de iniciar sesión", async () => {

        await agent.post('/login')
            .send({ email: 'admin@ejemplo.es', password: '123456', isLoginOrSignup: 'isLogin' });

        const productId = '65e602c855961715c26c1e6a';
        const updatedProduct = {
            nombre: 'Heidiii',
            descripcion: 'Nueva descripción editado en el test',
            precio: 20.99,
            talla: 'L',
            imagen: 'heidi.jpg'
        };

        const updateResponse = await agent.post(`/dashboard/products/${productId}`)
            .send(updatedProduct)
            .expect(302);

        expect(updateResponse.header.location).toBe(`/dashboard/products/${productId}`);
    });

    test('crear nuevo producto después de iniciar sesión', async () => {
        await agent.post('/login').send({ email: 'admin@ejemplo.es', password: '123456', isLoginOrSignup: 'isLogin' });

        const newProductData = {
            nombre: 'prueba',
            descripcion: 'Descripción del nuevo producto',
            precio: 10.99,
            talla: 'M',
            imagen: 'imagen_nuevo_producto.jpg'
        };
    
        const createResponse = await agent.post('/dashboard').send(newProductData).expect(302);

        expect(createResponse.header.location).toMatch(/^\/dashboard\/products\/[a-fA-F0-9]{24}$/);
       
    });
    
    test("eliminar un producto por su ID", async () => {
        await agent.post('/login').send({ email: 'admin@ejemplo.es', password: '123456', isLoginOrSignup: 'isLogin' });

        const productId = '65e8abfac419e3c246052ae2';
    
        const deleteResponse = await agent.post(`/dashboard/products/${productId}/delete`).expect(302); 
    
        expect(deleteResponse.header.location).toBe('/dashboard');     
        const deletedProduct = await Product.findById(productId);
        expect(deletedProduct).toBeNull();
    });
    


});
