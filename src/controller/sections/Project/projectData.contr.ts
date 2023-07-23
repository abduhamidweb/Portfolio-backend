import { Request, Response } from "express";
import ProjectData from "../../../schemas/sections/Projects/ProjectData.schema.js";
import projectsSchema from "../../../schemas/sections/Projects/project.schema.js";
import { JWT } from "../../../utils/jwt.js";
import userSchema from "../../../schemas/user.schema.js";
class ProjectController {

    public async getProjectData(req: Request, res: Response) {

    }
    public async postProjectData(req: Request, res: Response) {
        const { project } = req.body;
        try {
            let token: any = req.headers.token;
            if (!token) throw new Error("Invalid token");
            const userId = JWT.VERIFY(token).id;
            if (!userId) throw new Error("Invalid user id");
            const user: any = await userSchema.findById(userId).populate("project")
            if (!user) throw new Error("User not found");
            if (!project) throw new Error("you must add an project  Name");
            const addProject = new ProjectData({ projectName: project });
            await addProject.save();
            await projectsSchema.findByIdAndUpdate(user.project._id, {
                $push: {
                    data: addProject._id
                }
            })
            res.status(200).send({
                exprience: addProject,
                message: "Project added successfully"
            })
        } catch (error) {
            console.log('error :', error);
            res.status(500).send({ error: error, message: "Project qo'shishda xatolik" })
        }
    }

}
export default new ProjectController();