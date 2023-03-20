import mongoose from "mongoose";

const Schema = mongoose.Schema

const articleSchema = new Schema({
    theme: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true })

const ArticleModel = mongoose.model('Article', articleSchema)
export { ArticleModel }