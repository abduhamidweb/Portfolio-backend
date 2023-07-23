import companySchema from "../schemas/company.schema.js";
import { Request, Response } from "express";

export class CompaniesContr {
  constructor() {}
  static async GetCompanies(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const findById = await companySchema.findById(id);
        if (findById == null) {
          throw new Error(`Not Found!`);
        } else {
          res.send({
            status: 200,
            message: `${id} - company`,
            success: true,
            data: findById,
          });
        }
      } else {
        res.send({
          status: 200,
          message: `All companies`,
          success: true,
          data: await companySchema.find(),
        });
      }
    } catch (error: any) {
      res.send({ error: error, success: false, message: error.message });
    }
  }

  static async PostCompany(req: Request, res: Response) {
    try {
      const { companyTitle, companyImg, companyUrl, telegramUrl } = req.body;
      if(!companyTitle){
    throw new Error(`Company title is required!`)
      }
      if(!companyImg){
        throw new Error(`Comoany image is requird!`)
      }
    const newCompany  = await companySchema.create({companyTitle, companyImg, companyUrl, telegramUrl});
    res.send({
        status : 200,
        message : `Succesfuly added`,
        success : true,
        data : newCompany
    })
    } catch (error: any) {
      res.send({ error: error, success: false, message: error.message });
    }
  }


  static  async putCompany(req : Request, res : Response){
    try {
        const {id} = req.params;
        const { companyTitle, companyImg, companyUrl, telegramUrl } = req.body;
       if(!companyTitle && !companyImg && !companyUrl && !telegramUrl){
        throw new Error(`You have not sent nothing data`)
       }
       const checkExists = await companySchema.findById(id);
       if(checkExists == null){
        throw new Error(`Not FOund`)
        }
      const updatedCompany  = await companySchema.findByIdAndUpdate(id, {companyTitle, companyImg, companyUrl, telegramUrl}, {new : true});
      res.send({
          status : 200,
          message : `Succesfuly updated`,
          success : true,
          data : updatedCompany
      })
      } catch (error: any) {
        res.send({ error: error, success: false, message: error.message });
      }
  }
  static async deleteCompany(req : Request, res : Response){
    try {
        const {id} = req.params;
        const checkExists = await companySchema.findById(id);
       if(checkExists == null){
        throw new Error(`Not FOund`)
        }
        const deletedCompany =await companySchema.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : `Successfuly deleted`,
            success : true,
            data : deletedCompany
        })
    } catch (error : any) {
        res.send({ error: error, success: false, message: error.message });
    }
  }
}
