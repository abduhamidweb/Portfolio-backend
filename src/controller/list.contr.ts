import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  PostCheckBody,
  PostCheckParams,
} from "../interface/project.interface.js";
import List from "../schemas/lists.schema.js";
import Project from "../schemas/projects.schema.js";
export default {
  async addLists(req: Request, res: Response) {
    try {
      let { listText, section, id } = req.body;
        if (!section || !id || !listText) throw new Error("Invalid data");
        const projectDATA = await Project.findById(id);
        if(!projectDATA) throw new Error("Invalid id");
      let addedData = await List.create({ listText });

      if (section == "project") {
        await Project.updateOne(
          { _id: id },
          {
            $push: { aboutInfo: addedData._id },
          }
        );
      } else if (section == "experience") {
          await Project.updateOne(
            { _id: id },
            {
              $push: { aboutInfo: addedData._id },
            }
          );
      } else {
          throw new Error("Invalid section")
      }
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

  async getList(req: Request, res: Response) {
    try {
      const id: string = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid id");
    }
    
    const list = await List.findById(id);
    
    if (!list) {
          throw new Error("Invalid id");
        
      }

      res.json({
        status: 200,
        success: true,
        data: list,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  },

  async putList(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const { listText } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid id");
      }

      if (!listText) {
        throw new Error("Invalid data");
      }

      const updatedList = await List.findByIdAndUpdate(
        id,
        { listText },
        { new: true }
      );

      if (!updatedList) {
        throw new Error("Invalid id");
      }

      res.json({
        status: 200,
        success: true,
        message: "List updated",
        data: updatedList,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
    }, 
  
async deleteList(req: Request, res: Response) {
  try {
    const listId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(listId)) {
      throw new Error('Invalid id');
    }

    const deletedList = await List.findByIdAndDelete(listId);

    if (!deletedList) {
      throw new Error('Invalid id');
      }
      const relatedProjectsId = await Project.distinct("_id", {
        aboutInfo: deletedList._id,
      });

       if (relatedProjectsId) { 
         await Project.updateOne(
           { _id: relatedProjectsId },
           { $pull: { aboutInfo: deletedList._id } }
         );
       }
      
      
    

    res.json({
      status: 200,
      success: true,
      message: 'List deleted',
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
}
};
