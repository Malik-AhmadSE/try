const joi = require("joi");
const { BACKEND_SERVER_PATH } = require("../config/index");
const fs = require('fs');
const ProductModel=require('../4-Models/products');
const productDTO=require('../DTO/products');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const productController = {
  // for creating the product
  async createProduct(req, res, next) {
    try {
    const createproductschema = joi.object({
      productName: joi.string().required(),
      price: joi.number().required(),
      category:joi.string().required(),
      description: joi.string().required(),
      discount: joi.number(),
      image: joi.string().required(),
      video: joi.string().required(),
      landingImage:joi.string().required(),
      brand:joi.string(),
      tang:joi.string(),
      blade_material:joi.string(),
      handle_material:joi.string(),
      blade_type:joi.string(),
      blade_length:joi.string(),
      blade_color:joi.string(),
      features:joi.string(),
      origin:joi.string(),
      dexterity:joi.string(),
      blade_edge:joi.string()
    });
   
// let url="https://bcd.citizenblades.com/files/";
// // let url="https://localhost:8000/files/";
// const landing=req.files.landingImage[0].filename;
// const video_data=req.files.video[0].filename;
//  req.body.landingImage=url+landing;
//  req.body.video=url+video_data;
//  const image_data=req.files.image;
// console.log(image_data);
//  if (req.files && req.files.image) {
//   req.body.image = req.files.image.map(image => url + image.filename);
// } else {
//   req.body.image = [];
// }
  const { error } = createproductschema.validate(req.body);
    if (error) {
      return next(error);
    }  
    const {productName,price,category,brand,tang,blade_material,handle_material,blade_type,blade_length,blade_color,features,origin,dexterity,blade_edge,description, discount,landingImage,image, video} =
      req.body;
    console.log(req.body);
    const newProduct = new ProductModel({
        productName, 
        price, 
        category,
        description, 
        discount, 
        image,
        video,
        landingImage,
        brand,
        tang,
        blade_material,
        handle_material,
        blade_type,
        blade_length,
        blade_color,
        features,
        origin,
        dexterity,
        blade_edge
      });
     const data= await newProduct.save();
     const productDto = new productDTO(newProduct);
     return res.status(201).json({ product: productDto });
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },
  // for updating product
  async updateProduct(req, res, next) {
    try {
      const updateProductSchema = joi.object({
        productName: joi.string(),
        price: joi.number(),
        category: joi.string(),
        description: joi.string(),
        discount: joi.number(),
        image: joi.string(),
        video: joi.string(),
        landingImage: joi.string(),
        brand: joi.string(),
        tang: joi.string(),
        blade_material: joi.string(),
        handle_material: joi.string(),
        blade_type: joi.string(),
        blade_length: joi.string(),
        blade_color: joi.string(),
        features: joi.string(),
        origin: joi.string(),
        dexterity: joi.string(),
        blade_edge: joi.string(),
      });
  
      const { error } = updateProductSchema.validate(req.body);
      if (error) {
        return next(error);
      }
  
      const { productName, price, category, brand, tang, blade_material, handle_material, blade_type, blade_length, blade_color, features, origin, dexterity, blade_edge, description, discount, landingImage, image, video } = req.body;
      console.log(req.body)
      const updatedFields = {
        ...(productName && { productName }),
        ...(price && { price }),
        ...(category && { category }),
        ...(description && { description }),
        ...(discount && { discount }),
        ...(image && { image }),
        ...(video && { video }),
        ...(landingImage && { landingImage }),
        ...(brand && { brand }),
        ...(tang && { tang }),
        ...(blade_material && { blade_material }),
        ...(handle_material && { handle_material }),
        ...(blade_type && { blade_type }),
        ...(blade_length && { blade_length }),
        ...(blade_color && { blade_color }),
        ...(features && { features }),
        ...(origin && { origin }),
        ...(dexterity && { dexterity }),
        ...(blade_edge && { blade_edge }),
      };
  
      const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const productDto = new productDTO(updatedProduct);
      return res.status(200).json({ product: productDto });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },  
  // for getting all product
  async getAll(req, res, next) {
        try {
                const allProduct = await ProductModel.find({});
          
                const productDTOarr = [];
          
                for (let i = 0; i < allProduct.length; i++) {
                  const productdto = new productDTO(allProduct[i]);
                  productDTOarr.push(productdto);
                }
                console.log(productDTOarr)
                return res.status(200).json({ products: productDTOarr });
              } catch (error) {
                return next(error);
              }
  },
  // for getting product using id
  async getProductById(req, res, next) {
        
    const getByIdSchema = joi.object({
        id: joi.string().regex(mongodbIdPattern).required(),
      });
  
      const { error } = getByIdSchema.validate(req.params);
  
      if (error) {
        return next(error);
      }
  
      let productbyid;
  
      const { id } = req.params;
  
      try {
        productbyid = await ProductModel.findOne({ _id: id });
        if(productbyid._id ==null){
            return next(error);
        }
      } catch (error) {
        return next(error);
      }
  
      const productdto = new productDTO(productbyid);
      return res.status(200).json({ product: productdto });
  },
  // for deleting the product using id
  async deleteProductById(req, res, next) {
    const deleteSchema = joi.object({
      id: joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = deleteSchema.validate(req.params);
    if(error){
      return next(error);
    }
    const { id } = req.params;
    try {
      await ProductModel.deleteOne({ _id : id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: "product deleted" });
  },

};

module.exports = productController;