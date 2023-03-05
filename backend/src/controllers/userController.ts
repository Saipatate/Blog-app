import * as jwt from 'jsonwebtoken'
import * as express from "express";
const User = require('../models/userModel')

const createToken = (_id: number) => {
    return jwt.sign({_id}, process.env.JWT_SECRET!, { expiresIn: "3d" })
}

// login a user
const loginUser = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: "Error login"})
    } 
}

// signup a user
const signupUser = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: "Error signup"})
    }
}


module.exports = { signupUser, loginUser }