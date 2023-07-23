import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";

const companiesSchema = new mongoose.Schema({
    companyTitle : {
        type : String,
    required : [true, 'Company title is required!']
    },
    companyImg : {
        type  : String,
    },
    companyUrl : {
        type : String,
        default : null
    },
    telegramUrl : {
        type : String,
        default : null
    }
});
export default model("Companies", companiesSchema);