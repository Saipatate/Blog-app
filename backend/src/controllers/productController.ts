import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProductModel } from "../models/productModel";

// get all product
const getProducts = async (req: Request, res: Response) => {
    const products = await ProductModel.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

// get a single product
const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such product"})
    }

    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(404).json({error: "No such product"})
    }

    res.status(200).json(product)
}

// create a new product
const createProduct = async (req: Request, res: Response) => {
    const {title, price, image} = req.body

    let empltyFields = []

    if (!title) {
        empltyFields.push("title")
    }

    if (!price) {
        empltyFields.push("price")
    }

    if (!image) {
        empltyFields.push("image")
    }

    if (empltyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fileds", empltyFields })
    }

    // add to the database
    try {
        const product = await ProductModel.create({ title, price, image })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a product
const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such product"})
    }

    const product = await ProductModel.findOneAndDelete({_id: id})

    if (!product) {
        return res.status(400).json({error: "No such product"})
    }

    res.status(200).json(product)
}

// update a product
const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such product"})
    }

    const product = await ProductModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!product) {
        return res.status(400).json({error: "No such product"})
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}