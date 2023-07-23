import companySchema from "../schemas/company.schema.js";
import { Request, Response } from "express";

export class CompaniesContr{
    constructor(){}
    static async GetCompanies (req : Request, res : Response){
        const {id} = req.params;
        if(id){
         const findById = await companySchema.findById(id);
         if(findById == null){
            throw new Error(`Not Found!`)
         }else{
            res.send({
                status : 200,
                message : `${id} - company`,
                success : true,
                data : findById
            })
         }
        }else{
            res.send({
                status : 200,
                message : `All companies`,
                success : true,
                data : await companySchema.find()
            })
        }
    }
}