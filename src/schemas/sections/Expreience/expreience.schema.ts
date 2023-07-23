import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";

const expreienceSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default:true,
        required: true
    },
    data: [{
        type: Types.ObjectId,
        ref: "ExpreienceData"
    }]
});
export default model("Expreience", expreienceSchema);