const { array } = require('joi');
const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName :{type:String,required:true},
    price:{type:mongoose.Types.Decimal128,required:true},
    category:{type:String,default:""},
    description:{type:String,required:true},
    discount:{type:Number},
    image:{type:Array},
    video:{type:String},
    landingImage:{type:String},
    brand:{type:String,default:""},
    tang:{type:String,default:""},
    blade_material:{type:String,default:""},
    handle_material:{type:String,default:""},
    blade_type:{type:String,default:""},
    blade_length:{type:String,default:""},
    blade_color:{type:String,default:""},
    features:{type:String,default:""},
    origin:{type:String,default:""},
    dexterity:{type:String,default:""},
    blade_edge:{type:String,default:""}
},
    {timestamps:true}
)

// creating model of user

const ProductModel=mongoose.model('product',productSchema);

module.exports=ProductModel;