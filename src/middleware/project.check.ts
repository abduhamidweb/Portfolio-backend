import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ListSchema from "../schemas/List.schema.js";
import projectData from "../schemas/sections/Projects/ProjectData.schema.js";
import userSchema from "../schemas/user.schema.js";
import { JWT } from "../utils/jwt.js";
interface CustomRequest extends Request {
  userToken?: string;
}
export default {
    async authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
           
        
        try {
    let token: any = req.headers.token;
        if (!token) {
        throw new Error('Invalid token')
    }
        
        const decodedToken = JWT.VERIFY(token).id;
        let user = await userSchema.findById(decodedToken);
        if (!user) {
            throw new Error('Invalid token')
}
      req.userToken = decodedToken;

      next();
    } catch (error:any) {        
      return res.status(401).json({
        error: error.message,
      }); 
    }
  },
  async idChecker(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id;
       if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
         throw new Error("Invalid id");
        }
        const existingProjectData = await projectData.findById(projectId).exec();
        
        if (!existingProjectData) {
        throw new Error("Project not found.");
        
      }
next()
    } catch (error:any) {
      res.status(400).send({message:error.message})
    }
  }, 

  
  async idCheckerList(req: CustomRequest, res: Response, next: NextFunction) {
     try {
       const listId = req.params.id;
       if (!listId || !mongoose.Types.ObjectId.isValid(listId)) {
         throw new Error("Invalid id");
       }
       const existingList = await ListSchema.findById(listId).exec();

       if (!existingList) {
         throw new Error("List not found.");
       }
       next();
     } catch (error: any) {
       res.status(400).send({ message: error.message });
     }
  }
};
