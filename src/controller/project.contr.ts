import { Request, Response } from 'express';
import List from "../schemas/lists.schema.js";
import Project from "../schemas/projects.schema.js";
export default {
    async addProject(req: Request, res: Response) { 
        try {
            console.log(req.body);

            
        } catch (error) {
            
        }

    }
}  