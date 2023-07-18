import { Document } from "mongoose";

export interface PostCheckParams {
   
}

export interface PostCheckBody extends  Document {
  listText: string;
  section: "project" | "experience";
  id: string;
} 
