import mongoose, { Document, Types } from 'mongoose';
// bu joyda interfacelar bo'lishi kerak.

export interface ITest extends Document {
    test: string;
}
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}