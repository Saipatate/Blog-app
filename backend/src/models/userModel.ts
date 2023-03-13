import mongoose, { Schema, Model, Document } from "mongoose";
import * as bcrypt from "bcrypt";
import validator from "validator";

interface IUser extends Document {
    pseudo: any;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    pseudo: {
        type: String,
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
});

// static signup method
interface UserModel extends Model<IUser> {
    signup?(pseudo: any, email: string, password: string): Promise<IUser>
    login?(email: string, password: string): Promise<IUser>
}

userSchema.statics.signup = async function(pseudo, email, password): Promise<IUser> {
    
    // validation
    if (!email || !password) {
        throw Error('All fileds must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({email});
    const pseudoExists = await this.findOne({pseudo});

    if (exists) {
        throw Error('Email already in use');
    }

    if (pseudoExists) {
        throw Error('Pseudo already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
};

// static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }

const UserModel: UserModel = mongoose.model<IUser>('User', userSchema);

export { IUser, UserModel };
