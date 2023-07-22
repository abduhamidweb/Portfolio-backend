import { Request, Response } from "express";
import Project from "../../../schemas/sections/Projects/project.schema.js";
import { JWT } from "../../../utils/jwt.js";
import userSchema from "../../../schemas/user.schema.js";
class projectController {
    public async updateProject(req: Request, res: Response) {
        try {
            let token: any = req.headers.token;
            if (!token) throw new Error("Invalid token");
            const userId = JWT.VERIFY(token).id;
            if (!userId) throw new Error("Invalid user id");
            const user: any = await userSchema.findById(userId).populate("project")
            if (!user) throw new Error("User not found");
            const findProject = await Project.findById(user.project._id)
            if (!findProject) throw new Error("Project not found");
            // Update the status field based on its current value
            const newStatus = !findProject.status;
            const addProject = await Project.findByIdAndUpdate(
                user.project._id,
                { status: newStatus },
                { new: true }
            );

            if (!addProject) throw new Error("Failed to update project");

            res.status(200).send({
                project: addProject,
                message: "Project added successfully"
            })
        } catch (error) {
            console.log('error :', error);
            res.status(500).send({ error: error, message: "project qo'shishda xatolik" })
        }
    }
}
export default new projectController();