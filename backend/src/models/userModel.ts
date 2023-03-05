import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema

interface IUser {
    name: string,
    email: string,
    password: string,
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
/*
userSchema.static.signup = async function(email: string, password: string) {
    
    // validation
    if (!email || !password) {
        throw Error('All fileds must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }
}*/

module.exports = mongoose.model<IUser>('User', userSchema)