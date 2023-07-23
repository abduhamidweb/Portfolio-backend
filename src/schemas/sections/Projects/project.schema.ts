import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";

const projectSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default:true,
        required: true
    },
    data: [{
        type: Types.ObjectId,
        ref: "projectData"
    }]
});
export default model("Project", projectSchema);