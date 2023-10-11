import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection="products"
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
productSchema.plugin(mongoosePaginate)

export const productsModel= mongoose.model(productsCollection,productSchema)