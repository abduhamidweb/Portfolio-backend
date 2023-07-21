import { Request, Response } from "express";
import Expreience from "../schemas/ExpreienceData.schema.js";
import expreienceSchema from "../schemas/expreience.schema.js";
import { JWT } from "../utils/jwt.js";
import userSchema from "../schemas/user.schema.js";
class expreienceController {

    public async getExpreienceData(req: Request, res: Response) {

    }
    public async postExpreienceData(req: Request, res: Response) {
        const { company } = req.body;
        try {
            let token: any = req.headers.token;
            if (!token) throw new Error("Invalid token");
            const userId = JWT.VERIFY(token).id; 
            if (!userId) throw new Error("Invalid user id");
            const user:any = await userSchema.findById(userId).populate("expreience")
            if (!user) throw new Error("User not found");
            if (!company) throw new Error("you must add an company Name");
            const addExpreience = new Expreience({ companyName: company });
            await addExpreience.save();
            await expreienceSchema.findByIdAndUpdate(user.expreience._id, {
                $push: {
                    data: addExpreience._id
                }
            })
            res.status(200).send({
                exprience: addExpreience,
                message: "expreience added successfully"
            })
        } catch (error) {
            console.log('error :', error);
            res.status(500).send({ error: error, message: "Expreience qo'shishda xatolik" })
        }
    }

}
export default new expreienceController();