import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";

const expreienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    }
});
export default model("ExpreienceData", expreienceSchema);