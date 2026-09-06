const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    productName:{
        type:String,
        required:true,
        trim:true,
    },

    category:{
        type:String,
        required:true,
    },

    material:{
        type:String,
        enum:["Gold","One Gram","Silver"],
        required:true,
    },

    weight:{
        type:Number,
        required:true,
    },

    stock:{
        type:Number,
        required:true,
        default:0,
    },

    purchasePrice:{
        type:Number,
        required:true,
    },

    sellingPrice:{
        type:Number,
        required:true,
    },

    supplier:{
        type:String,
        required:true,
    },

    image: {
        type: String,
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model("Product", productSchema);