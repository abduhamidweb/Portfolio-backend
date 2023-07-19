import { Schema, model, Types, InferSchemaType } from "mongoose";



const sectionsSchema = new Schema(
  {
   name : {
    type : String
   }
  },
  {
    timestamps: true,
  }
);  

type sections = InferSchemaType<typeof sectionsSchema>;
export default model<sections>("Sections", sectionsSchema);