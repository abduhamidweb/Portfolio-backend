import experienceSchema from "../schemas/experience.schema.js";
import { Request, Response } from "express";



export class ExperienceContr{
    constructor(){}
    static async addExperience(req : Request, res : Response){
      try {
        const {companyImg, aboutInfo, companyTitle, jobTitle, workDate, companyUrl, telegramUrl, section_id} = req.body;
        if(!companyImg  || !companyTitle || !jobTitle || !workDate ||!companyUrl  ||!section_id){
            throw new Error(`Data is incompleted!`)
        }

        const newExp = await experienceSchema.create({companyImg, aboutInfo, companyTitle, jobTitle, workDate, companyUrl, telegramUrl, section_id});
        res.send({
            status : 200,
            message : `Experience added successfuly!`,
            success : true,
            data : newExp
        })
      } catch (error : any) {
        res.send({
             status : 400,
             message : error.message,
             success : false
        })
      }
    }

    static async putExperience(req:Request, res : Response){
      try {
        // const {}
        const {id} = req.params;
        const checkExists = await experienceSchema.findById(id);
        if(checkExists == null){
            throw new Error(`Not found experience`)
        }
        const {companyImg, aboutInfo, companyTitle, jobTitle, workDate, companyUrl, telegramUrl, section_id} = req.body;
        if(!companyImg &&!aboutInfo && !companyTitle && !jobTitle && !workDate &&!companyUrl && !telegramUrl && !section_id){
            throw new Error(`You are not sent nothing data!`)
        }
        const updatedExperience = await experienceSchema.findByIdAndUpdate(id, {companyImg, aboutInfo, companyTitle, jobTitle, workDate, companyUrl, telegramUrl, section_id}, {new : true});
        res.send({
            status : 200,
            message : `Experience was updated successfuly!`,
            success : true,
            data : updatedExperience
        })
      } catch (error : any) {
        res.send({
            status : 400,
            message : error.message,
            success : false
       })
      }
    }


    static async deleteExperience (req: Request,res : Response){
        try {
            const {id} = req.params;
            const checkExists = await experienceSchema.findById(id);
            if(checkExists == null){
                throw new Error(`Not found experience`)
            }
            const deletedExp= await experienceSchema.findByIdAndDelete(id)
            res.send({
                status : 200,
                message : `Experience was deleted successfuly!`,
                success : true,
                data : deletedExp
            })
        } catch (error : any) {
            res.send({
                status : 400,
                message : error.message,
                success : false
           })
        }
    }

     
}