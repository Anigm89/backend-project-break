module.exports = {
    paths: {
        "/api/products": {
            get: {
                tags: ["Products"],
                summary: "Get all products",
                operationId: "getProducts",
                responses: {
                    200: {
                        description: "Products were obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/products",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/products/{_id}": {
            get: {
                summary: "Get product by Id",
                operationId: "getProductById",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/_id",
                    },
                    description: "Id of product",
                }],
                responses: {
                    200: {
                        description: "Product found successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/products" },
                            },
                        },
                    },
                    404: { description: "Product not found" },
                    500: { description: "Server error" },
                },
            },
        },  
        "/api/dashboard/products": {
            get: {
                tags: ["Products"],
                summary: "Get all products in dashboard",
                operationId: "getProductsDashboard",
                responses: {
                    200: {
                        description: "Products were obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/products",
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Products"],
                summary: "Create a product",
                operationId: "postProduct",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Productnew",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Product created",
                    },
                    401: {
                        description: "No active session",
                    },
                    403: {
                        description: "Permission denied to add a new product",
                    },
                },
            },
        },
        "/api/dashboard/products/{_id}": {
            get: {
                summary: "Get product by Id in /dashboard",
                operationId: "getProductById",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/_id",
                    },
                    description: "Id of product",
                }],
                responses: {
                    200: {
                        description: "Product found successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/products" },
                            },
                        },
                    },
                    404: { description: "Product not found" },
                    500: { description: "Server error" },
                },
            },
            put: {
                tags: ["Products"],
                summary: "Update a product",
                description: "Update product",
                operationId: "updateProduct",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/_id",
                    },
                    description: "Id of Task to be updated",
                }],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Productnew" },
                        },
                    },
                },
                responses: {
                    200: { description: "Product updated successfully" },
                    404: { description: "Product not found" },
                    500: { description: "Server error" },
                },
            },
        },
        "/api/dashboard/products/{_id}/delete": {
            delete: {
                tags: ["Products"],
                summary: "Delete a product",
                description: "Deleting a product",
                operationId: "deleteProduct",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/_id",
                    },
                    description: "Id of product to be deleted",
                }],
                responses: {
                    200: { description: "Product deleted successfully" },
                    404: { description: "Product not found" },
                    500: { description: "Server error" },
                },
            },
        },
    },
}
