import { Schema, model, Types, InferSchemaType } from "mongoose";



const checkStatusSchema = new Schema(
  {
   sections : [{
    type : Types.ObjectId,
    ref : "Sections"
   }]
  },
  {
    timestamps: true,
  }
);  

type checkStatus = InferSchemaType<typeof checkStatusSchema>;
export default model<checkStatus>("CheckStatus", checkStatusSchema);