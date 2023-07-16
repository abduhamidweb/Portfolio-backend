import { InferSchemaType, Types, Schema, model } from "mongoose";

let listsSchema = new Schema({
  list_text: {
    type: String,
    required: true,
  },
});

type checkStatus = InferSchemaType<typeof listsSchema>;
export default model<checkStatus>("lists", listsSchema);
