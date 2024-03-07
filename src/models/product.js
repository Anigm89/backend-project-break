const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Introduce un nombre para el producto'],
    },
    descripcion: String,
    imagen: String,
    categoria: String,
    talla: String,
    precio:{
        type: mongoose.Schema.Types.Decimal,
        required:[true, 'Introduce el precio'],
    },
}, {Timestamps: true});

const Product = mongoose.model('Shop', ProductSchema)

module.exports = Product;