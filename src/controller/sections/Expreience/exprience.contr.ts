import { Request, Response } from "express";
import Expreience from "../../../schemas/sections/Expreience/expreience.schema.js";
import { JWT } from "../../../utils/jwt.js";
import userSchema from "../../../schemas/user.schema.js";
class expreienceController {
    public async updateExpreience(req: Request, res: Response) {
        try {
            let token: any = req.headers.token;
            if (!token) throw new Error("Invalid token");
            const userId = JWT.VERIFY(token).id;
            if (!userId) throw new Error("Invalid user id");
            const user: any = await userSchema.findById(userId).populate("expreience")
            if (!user) throw new Error("User not found");
            const findExpreience = await Expreience.findById(user.expreience._id)
            if (!findExpreience) throw new Error("Experience not found");
            // Update the status field based on its current value
            const newStatus = !findExpreience.status;

            const addExpreience = await Expreience.findByIdAndUpdate(
                user.expreience._id,
                { status: newStatus },
                { new: true }
            );

            if (!addExpreience) throw new Error("Failed to update experience");

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