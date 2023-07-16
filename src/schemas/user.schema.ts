import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from '../interface/interface';
const User: Schema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        match: /^[a-zA-Z]+$/,
        validate: {
            validator: (value: string) => {
                return validator.isAlphanumeric(value);
            },
            message: 'Username must only contain alphanumeric characters'
        }
    },
    phone: {
        type: String,
        unique: true,
        validator: {
            validator: (value: string) => {
                return validator.isMobilePhone(value)
            },
            message: 'PhoneNumber must only contain number characters'
        }
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value);
            },
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
});

export default mongoose.model<IUser>('User', User);