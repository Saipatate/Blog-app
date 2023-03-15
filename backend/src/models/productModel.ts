import mongoose from "mongoose";

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const ProductModel = mongoose.model('Product', productSchema)
export { ProductModel }