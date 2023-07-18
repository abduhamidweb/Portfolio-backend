import { InferSchemaType, Types, Schema, model } from "mongoose";

let listsSchema = new Schema({ 
  listText: {  
    type: String,
    required: true,
  },
});

type checkStatus = InferSchemaType<typeof listsSchema>;
export default model<checkStatus>("lists", listsSchema);
