import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  PostCheckBody,
  PostCheckParams,
} from "../interface/project.interface.js";
import List from "../schemas/lists.schema.js";
import Project from "../schemas/projects.schema.js";
export default {
  async addProject(req: Request, res: Response) {
    try {
      let { webTitle, webImg, webLink, description } = req.body;
      let data = { webTitle, webImg, webLink, description };
      if (!webTitle || !webImg || !webLink || !description)
        throw new Error("Invalid data");

      let addedData = await Project.create(data);

      res.send({
        status: 201,
        message: "Successfuly added data",
        success: true,
        data: addedData,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },


  async getProject(req: Request, res: Response) {
    try {
      let id: any = req.query.id;
      if (!id) throw new Error("Invalid data");
      if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id");
      let data: any = await Project.findById(id);

      if (!data) throw new Error("Invalid id");
      res.send({
        status: 201,
        success: true,
        data: data,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },

  async putProject(req: Request, res: Response) {
    try {
      const projectId: string = req.params.id;
      const { webTitle, webImg, webLink, description } = req.body;

      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid id");
      }
      const updatedFields: any = {};
      if (webTitle) updatedFields.webTitle = webTitle;
      if (webImg) updatedFields.webImg = webImg;
      if (webLink) updatedFields.webLink = webLink;
      if (description) updatedFields.description = description;

      if (Object.keys(updatedFields).length === 0) {
        throw new Error("No fields to update");
      }

      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $set: updatedFields },
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        throw new Error("Invalid id");
      }

      res.send({
        status: 200,
        success: true,
        message: "Project updated",
        data: updatedProject,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },

  async  deleteProject(req: Request, res: Response) {
  try {
    const projectId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid id');
    }
    
    const deletedProject = await Project.findByIdAndDelete(projectId);
    
    if (!deletedProject) {
      throw new Error('Invalid id');
    }
    await List.deleteMany({ _id: { $in: deletedProject.aboutInfo } });

    res.json({
      status: 200,
      success: true,
      message: 'Project deleted',
    });
  } catch (error:any) {
    res.status(400).json({
      status: 400,
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}
};
