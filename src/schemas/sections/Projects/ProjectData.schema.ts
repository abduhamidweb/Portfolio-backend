import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";

const projectDataSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    }
});
export default model("projectData", projectDataSchema); 