const express=require('express');
const productOperations=require('../db/productOperations');
var productRoute=express.Router();

productRoute.post('/products/addproduct',(request, response)=>{

    var productObject=request.body;
    console.log('productObject',productObject);
    productOperations.addProduct(productObject,request,response);

});

module.exports=productRoute;