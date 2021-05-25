const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        minlength: 6
    },
    qty:{
        type: Number,
        required: true,
        minlength: 2
    },
    category:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userName:{
       type: String,
       required: true
    }


},{timestamps: true})

const Products = mongoose.model("product", ProductsSchema)
module.exports = Products;