import mongoose from 'mongoose';

const cartsCollection = 'Carts';
const cartSchema = new mongoose.Schema({

    products: {
        type:[
            {
                _id:{
                    type: mongoose.Types.ObjectId,
                    ref: 'Products'
                },
                quantity:{
                    type: Number,
                    default:1
                } 
            }
        ],
        default:[]
    }
});

export const cartModel = mongoose.model(cartsCollection, cartSchema)