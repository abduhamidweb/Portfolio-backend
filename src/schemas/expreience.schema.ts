import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";

const expreienceSchema = new mongoose.Schema({
    exprience: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    data: [{
        type: Types.ObjectId,
        ref: "ExpreienceData"
    }]
});
export default model("Expreience", expreienceSchema);