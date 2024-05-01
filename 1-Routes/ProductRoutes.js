const express = require('express');

const ProductRoutes=express.Router();

const productController=require('../2-Controllers/productController');
const auth = require('../2-Controllers/middlewares/auth');
const {upload} =require("../2-Controllers/middlewares/multerFileHndler")

// 1.get all product

ProductRoutes.get('/all',productController.getAll);

// 2.create product

ProductRoutes.post('/add',productController.createProduct);
// 3.update product by id 
ProductRoutes.put('/update/:id',productController.updateProduct);
// 4.get product by id 
ProductRoutes.get('/single/:id',productController.getProductById);
// 5.delete product by id
ProductRoutes.delete('/delete/:id',auth,productController.deleteProductById);

module.exports=ProductRoutes;