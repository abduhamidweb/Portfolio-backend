import { Request, Response } from "express";
import mongoose, { Types, model } from "mongoose";
import validator from "validator";
let { isURL } = validator;

let check = function (urls: string) {
  return isURL(urls);
};

const projectDataSchema = new mongoose.Schema(
  {
    webTitle: {
      type: String,
      required: true,
    },
    webImg: {
      type: String,
      required: true,
      validate: {
        validator: check,
        message: "Invalid image",
      },
    },
    webLink: {
      type: String,
      required: true,
      validate: {
        validator: check,
        message: "Invalid url",
      },
    },

    description: {
      type: String,
      required: true,
    },

    aboutInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lists" }],
    technology: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lists" }],
  },
  {
    timestamps: true,
  }
);
export default model("projectData", projectDataSchema); 