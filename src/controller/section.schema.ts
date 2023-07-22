import sectionSchema from "../schemas/section.schema.js";
import { Request, Response } from "express";

export class SectionContr {
  constructor() {}
   static async AddSection(req: Request, res: Response) {
    try {
        const {name, portfolio, status} = req.body;
        if(!name ||!status || !portfolio){
            throw new Error(`Data is incomplated!`)
        }
        const newSection = await sectionSchema.create({name, status, portfolio});
        res.send({
            status : 201,
            message : `Section added successfuly`,
            success : true,
            data : newSection
        })
    } catch (error: any) {
      res.send({
        status: 400,
        success: false,
        message: error.message
      });
    }
  }

  static async PutSection (req : Request, res : Response){
    try {
        const {name, status, portfolio} = req.body;
        const {id} = req.params;
        if(!name &&!status &&!portfolio){
            throw new Error(`You must send data!`)
        }
        const checkExists = await sectionSchema.findById(id);
        if(checkExists == null){
            throw new Error(`Not Found Section`)
        }
        const updatedSec = await sectionSchema.findByIdAndUpdate(id,{name, status, portfolio}, {new : true});
        res.send({
            status : 201,
            message : `Section added successfuly`,
            success : true,
            data : updatedSec
        })
    } catch (error : any) {
        res.send({
            status: 400,
            success: false,
            message: error.message
          });
    }
  }

  static async DeleteSection(req:Request, res : Response){
    try {
        const {id} = req.params;
        const checkExists = await sectionSchema.findById(id);
        if(checkExists == null){
            throw new Error(`Not Found Section`)
        }
        const deletedSec = await sectionSchema.findByIdAndDelete(id)
        res.send({
            status : 200,
            message : `section deleted successfuly`,
            success : true,
            data : deletedSec
        })

    } catch (error : any) {
        res.send({
            status: 400,
            success: false,
            message: error.message
          });
    }
  }


}
