module.exports = {
    components: {
        schemas: {
            products: {
                type: "object",
                properties: {
                    _id: {
                        type: "objectId",
                        description: "product identification number",
                        example: "6201064b0028de7866e2b2c4",
                    },
                    nombre: {
                        type: "string",
                        description: "name of product",
                        example: "camiseta Friends",
                    },
                    descripcion: {
                        type: "string",
                        description: "description of product",
                        example: 'camiseta negra de manga corta con logo de la serie Friends',
                    },
                    imagen: {
                        type: "string",
                        description: "image of product",
                        example: "camiseta_Friends.jpg",
                    },
                    categoria: {
                        type: "string",
                        description: "type of products",
                        example: "camisetas",
                    },
                    talla: {
                        type: "string",
                        description: "size of product",
                        example: "XS",
                    },
                    precio: {
                        type: "decimal",
                        description: "price of product",
                        example: "25.99",
                    },
                },
            },
            Productnew: {
                type: "object",
                properties: {
                    nombre: {
                        type: "string",
                        description: "name of product",
                        example: "camiseta Friends",
                    },
                    descripcion: {
                        type: "string",
                        description: "description of product",
                        example: 'camiseta negra de manga corta con logo de la serie Friends',
                    },
                    imagen: {
                        type: "string",
                        description: "image of product",
                        example: "friends.jpg",
                    },
                    categoria: {
                        type: "string",
                        description: "type of products",
                        example: "camisetas",
                    },
                    talla: {
                        type: "string",
                        description: "size of product",
                        example: "XS",
                    },
                    precio: {
                        type: "decimal",
                        description: "price of product",
                        example: "25.99",
                    },
                },
            },
            _id: {
                type: 'objectId',
                description: "An id of a product",
                example: "65df80c665b1a33c854eb7c3"
            },
        },
    },
};