const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const dbConnection = require('./config/db');
const routes = require('./routes/productRoutes')
const session = require('express-session');
const firebaseAdmin = require('./config/firebase'); 
const path = require('path');
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");
const docroutes = require('./routes/docRoutes')


dbConnection();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use( 
    session({
    secret: process.env.SECRETO,
    resave: false,
    saveUninitialized: true
   
    })
)

app.use(express.static(path.join(__dirname, '../public')));     
app.use('/', routes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))
app.use('/api', docroutes);


app.listen(PORT, () => {
 console.log(`Servidor levantado en el puerto ${PORT} - http://localhost:${PORT} `)
})


module.exports = app; 
