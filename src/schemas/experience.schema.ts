import { Schema, model, Types, InferSchemaType } from "mongoose";



const experinceSchema = new Schema(
  {
   companyImg : {
    type : String,
    required : [true, 'Company name is required']
   },
   section_id : {
    type : Types.ObjectId,
    ref : 'Sections'
   },
   aboutInfo : [{
    type : Types.ObjectId,
    ref : 'Lists',
   }],
   companyTitle : {
    type : String,
    required : [true, 'company name is required!']
   },
   jobTitle : {
    type : String,
    required : [true, 'job  is required!']
   },
   workDate : {
    type : Date
   },
   companyUrl : {
    type : String,
    maxLength : [100, 'url is very long!']
   },
   telegramUrl : {
    type : String,
    default : null,
   }
  },
  {
    timestamps: true,
  }
);

type experince = InferSchemaType<typeof experinceSchema>;
export default model<experince>("Experience", experinceSchema);