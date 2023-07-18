import mongoose, { InferSchemaType, Types, Schema, model, Mongoose } from "mongoose";
import validator from "validator";
let {isURL}= validator

let check = function (urls: string) {
  return isURL(urls);
};

const checkStatusSchema = new Schema(
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

    aboutInfo:[{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
    
    // {
    //   type: [String],
    //   default: [],
    //   ref: "lists",
    //   field: "id",
    // },
  },
  {
    timestamps: true,
  }
);
 

type checkStatus = InferSchemaType<typeof checkStatusSchema>;
export default model<checkStatus>("projects", checkStatusSchema);
