import mongoose from "mongoose";

const productCollection="products"
const productSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
})

export const productsModel= mongoose.model(productCollection,productSchema)