import { Schema, model, Types, InferSchemaType } from "mongoose";



const sectionsSchema = new Schema(
  {
   name : {
    type : String
   },
   portfolio : {
    type : Types.ObjectId,
    ref : "Portfolio"
   },
   status : {
    type : Boolean,
    default : true
   }
  },
  {
    timestamps: true,
  }
);  

type sections = InferSchemaType<typeof sectionsSchema>;
export default model<sections>("Sections", sectionsSchema);