import { Request, Response } from "express";
import mongoose from "mongoose";
import { ArticleModel } from "../models/articleModel";

// get all article
const getArticles = async (req: Request, res: Response) => {
    const articles = await ArticleModel.find({}).sort({createdAt: -1})

    res.status(200).json(articles)
}

// get a single article
const getArticle = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such article"})
    }

    const articles = await ArticleModel.findById(id)

    if (!articles) {
        return res.status(404).json({error: "No such articles"})
    }

    res.status(200).json(articles)
}

// create a new article
const createArticle = async (req: Request, res: Response) => {
    const {theme, title, description} = req.body

    let empltyFields = []

    if (!theme) {
        empltyFields.push("theme")
    }

    if (!title) {
        empltyFields.push("title")
    }

    if (!description) {
        empltyFields.push("description")
    }

    if (empltyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fileds", empltyFields })
    }

    // add to the database
    try {
        const article = await ArticleModel.create({ theme, title, description })
        res.status(200).json(article)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a article
const deleteArticle = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such article"})
    }

    const article = await ArticleModel.findOneAndDelete({_id: id})

    if (!article) {
        return res.status(400).json({error: "No such article"})
    }

    res.status(200).json(article)
}

// update a article
const updateArticle= async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such article"})
    }

    const article = await ArticleModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!article) {
        return res.status(400).json({error: "No such article"})
    }

    res.status(200).json(article)
}

module.exports = {
    getArticles,
    getArticle,
    createArticle,
    deleteArticle,
    updateArticle
}