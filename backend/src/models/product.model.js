const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    productName: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true 
    },
    images: [{
        type: String
    }],
    coverPic: {
        type: String,
        required: true 
    },
    condition: {
        type: String,
        default: ""
    },
    purchaseYear: {
        type: Number,
        required: true,
        length: 4,
    },
    status: {
        type: String,
        deafult: "Active"
    },
    clickThrough: {
        type: Number,
        default: 0
    }
},{timestamps: true})

const Product=mongoose.model(productSchema)
module.exports=Product