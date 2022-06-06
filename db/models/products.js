import mongoose from "mongoose";
const { Schema, model } = mongoose

const productSchema = new Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    thumbnail: {
        type: String
    },
    UM: {
        type: String
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    weight: {
        type: Number
    },
    description: {
        type: String
    },
    date: { type: Date, default: Date.now },
    hidden: Boolean,

});

const Product = new model('Product', productSchema)

export default Product