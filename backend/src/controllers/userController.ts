import * as jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { IUser, UserModel } from '../models/userModel';

const createToken = (_id: number) => {
    return jwt.sign({_id}, process.env.JWT_SECRET!, { expiresIn: "3d" })
}

// login a user
const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const user = await UserModel.login!(email, password)

        // create a token
        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    } 
}

// signup a user
const signupUser = async (req: Request, res: Response) => {
    const {pseudo, email, password} = req.body

    try {
        const user: IUser = await UserModel.signup!(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({pseudo, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { signupUser, loginUser }