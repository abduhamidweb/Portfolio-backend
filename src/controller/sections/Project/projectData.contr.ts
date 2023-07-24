import { Request, Response } from "express";
import List from "../../../schemas/List.schema.js";
import ProjectData from "../../../schemas/sections/Projects/ProjectData.schema.js";
import projectsSchema from "../../../schemas/sections/Projects/project.schema.js";
import { JWT } from "../../../utils/jwt.js";
import userSchema from "../../../schemas/user.schema.js";
import mongoose, { Error } from "mongoose";
class ProjectController {
  
  public async getProjectData(req: Request, res: Response) {
    try {
      let id: any = req.query.id;

      let data: any = await ProjectData.findById(id)
        .populate("technology")
        .populate("aboutInfo");

      if (!data) throw new Error("Invalid id");

      res.send({
        status: 201,
        success: true,
        data: data,
      });
    } catch (error: any) {
      res.status(400).send({
        message: `Error: ${error.message}`,
      });
    }
  }

  public async postProjectData(req: Request, res: Response) {
    try {
      const { webTitle, webImg, webLink, description } = req.body;

      if (!webTitle || !webImg || !webLink || !description) {
        throw new Error("Incomplete data.");
      }

      const newProjectData = await new ProjectData({
        webTitle,
        webImg,
        webLink,
        description,
      });

      const savedProjectData = await newProjectData.save();

      res.status(201).json(savedProjectData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async PutProjectData(req: Request, res: Response) {
    try {
      const projectId = req.params.id;
      const updateData = req.body;

      
      if (Object.keys(updateData).length === 0) {
        throw new Error("No data provided for update.");
      }

      const existingProjectData: any = await ProjectData.findById(projectId);

      if (!existingProjectData) {
        return res.status(404).json({ message: "Project not found." });
      }

      for (const field in updateData) {
        isNaN(updateData[field])
          ? (updateData[field] = updateData[field].trim())
          : "";
        if (
          updateData[field] !== undefined &&
          updateData[field] !== null &&
          updateData[field] !== ""
        ) {
          existingProjectData[field] = updateData[field];
        }
      }

      const updatedProjectData = await existingProjectData.save();

      res.json(updatedProjectData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

    public async deleteProjectData(req: Request, res: Response) {
      try {
        const projectId: string = req.params.id;
        const deletedProject = await ProjectData.findByIdAndDelete(projectId);

        if (!deletedProject) {
        throw new Error("Project not found");
        }
         res.json({
           status: 200,
           success: true,
           message: "Project deleted",
         });

      } catch (error:any) {
        res.status(400).json({ message: error.message });
      }
  }
}
export default new ProjectController();
