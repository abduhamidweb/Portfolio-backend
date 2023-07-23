import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";

const expreienceSchema = new mongoose.Schema({
    companyTitle: {
        type: String,
        required: [true,'Company name is required!']
    },
    companyImg : {
        type : String,
    },
    jobTitle : {
        type : String,
        required : [true, 'Company title is required!']
    },
  
    workDate : {
        type : Date
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
export default model("ExpreienceData", expreienceSchema);