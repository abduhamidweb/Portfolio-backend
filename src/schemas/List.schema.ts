import { InferSchemaType, Types, Schema, model } from "mongoose";

let listsSchema = new Schema({
  listText: {
    type: String,
    required: true, 
  },
});

export default model("Lists", listsSchema);
