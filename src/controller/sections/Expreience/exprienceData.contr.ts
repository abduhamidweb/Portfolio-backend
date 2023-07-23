import { Request, Response } from "express";
import expreienceSchema from "../../../schemas/sections/Expreience/expreience.schema.js";
import { JWT } from "../../../utils/jwt.js";
import ExpreienceDataSchema from "../../../schemas/sections/Expreience/ExpreienceData.schema.js";
import companySchema from "../../../schemas/company.schema.js";
import userSchema from "../../../schemas/user.schema.js";
import portfolioSchema from "../../../schemas/portfolio.schema.js";
class expreienceController {

    public async getExpreienceData(req: Request, res: Response) {

    }
    public async postExpreienceData(req: Request, res: Response) {
        const { companyTitle, companyImg, jobTitle, workDate, companyUrl, telegramUrl } = req.body;
        try {
            let token: any = req.headers.token;
            if (!token) throw new Error("Invalid token");
            const userId = JWT.VERIFY(token).id;
            if (!userId) throw new Error("Invalid user id");
            const user: any = await userSchema.findById(userId).populate("expreience")
            if (!user) throw new Error("User not found");
            if (!companyTitle) throw new Error("you must add a company title");
            if(!companyImg) throw new Error(`You must add a company img`)
            if(!jobTitle) throw new Error(`You must add a job title`)
            if(!workDate) throw new Error(`You must add a work date`)
            
            const addExpreience = new ExpreienceDataSchema({ companyTitle, companyImg, jobTitle, workDate, companyUrl, telegramUrl });
            await addExpreience.save();
            await companySchema.create({companyTitle, companyImg, companyUrl, telegramUrl})
            await expreienceSchema.findByIdAndUpdate(user.expreience._id, {
                $push: {
                    data: addExpreience._id
                }
            })
            res.status(200).send({
                data: addExpreience,
                success : true,
                status : 200,
                message: "expreience added successfully"
            })
        } catch (error) {
            console.log('error :', error);
            res.status(500).send({ error: error, message: "Expreience qo'shishda xatolik" })
        }
    }

    public async putExperienceData(req : Request, res : Response){
        try {
            const {id} = req.params;
            let token: any = req.headers.token;
            const userId = JWT.VERIFY(token).id;
            const checkExists = await ExpreienceDataSchema.findById(id);
            if(checkExists == null){
                throw new Error(`Not found!`)
            }            
            const { companyTitle, companyImg, jobTitle, workDate, companyUrl, telegramUrl } = req.body;
              if(!companyTitle && !companyImg && !jobTitle && !workDate && !companyUrl && !telegramUrl){
                res.send(`You haven't sent anyting!`)
              }
              const updatedExperienceData = await ExpreienceDataSchema.findByIdAndUpdate(id , {companyTitle, companyImg, jobTitle, workDate, companyUrl, telegramUrl}, {new : true});
              res.send({
                status : 200,
                message : `Successufly updated!`,
                success : true,
                data : updatedExperienceData
              })
        } catch (error : any) {
            res.send({error : error, message :error.message}).status(500)
        }
    }


    public async deleteExperienceData (req: Request,res: Response){
        try {
            const {id} = req.params;
            const checkExists = await ExpreienceDataSchema.findById(id);
            if(checkExists ==  null){
                throw new Error(`Not Found!`)
            }
            const deletedExperienceData = await ExpreienceDataSchema.findByIdAndDelete(id);
            res.send({
                status : 200,
                message : `Successulfy deleted!`,
                success : true,
                data : deletedExperienceData
            })
        } catch (error : any) {
            res.send({error : error, message : error.message}).status(500)
        }
    }

}
export default new expreienceController();